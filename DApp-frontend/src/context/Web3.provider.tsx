/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadBlockchainData, loadWeb3 } from "../services/web3.services"
import { createContext, useEffect, useState } from "react"
import { toast } from "sonner"
import type { Contract } from "web3"

interface IWeb3Context {
  accounts: string[]
  loading: boolean
  refreshAccounts: () => Promise<void>
  stakeToken : (amount : string) => Promise<void>
  unstakeTokens : () => Promise<void>
  loadActionTokens : {
    stake : boolean,
    unstake : boolean,
    issue : boolean
  }
  tokens: {
    JamToken: {data : Contract<any>, jamTokenBalance : string}  | null
    StellartToken: {data : Contract<any>, stellartTokenBalance : string}  | null
    TokenFarm: {data : Contract<any>, stakingBalance : string}  | null
  }
}

// Valores iniciales
export const Web3Context = createContext<IWeb3Context>({
  accounts: [],
  loading: false,
  refreshAccounts: async () => {},
  stakeToken : async () => {},
  unstakeTokens : async () => {},
  loadActionTokens : {
    stake : false,
    unstake : false,
    issue : false
  },
  tokens: {
    JamToken: null,
    StellartToken: null,
    TokenFarm: null,
  },
})

interface Web3ProviderProps {
  children: React.ReactNode
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [tokens, setTokens] = useState<IWeb3Context["tokens"]>({
    JamToken: null,
    StellartToken: null,
    TokenFarm: null,
  })
  const [accounts, setAccounts] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [loadActionTokens, setLoadActionTokens] = useState({
    stake : false,
    unstake : false,
    issue : false
  })

  const loadBalance = async (account : string) => {
     const blockchainData = await loadBlockchainData(account)
        setTokens({
          JamToken: blockchainData.jamToken,
          StellartToken: blockchainData.stellartToken,
          TokenFarm: blockchainData.tokenFarm,
    })
  }

  // Cargar cuentas
 const refreshAccounts = async () => {
    setLoading(true)
    try {
      const accs = await loadWeb3()
      setAccounts(accs)
      
      if (accs.length > 0) loadBalance(accs[0])
        
    } catch (error) {
      console.error(error)
      setAccounts([])
      setTokens({ JamToken: null, StellartToken: null, TokenFarm: null })
    } finally {
      setLoading(false)
    }
  }

  const stakeToken = async (amount: string) => {

    if (!tokens.TokenFarm?.data || !tokens.JamToken?.data) return;

    setLoadActionTokens((values) => ({ ...values, stake: true }));

    const jamToken = tokens.JamToken.data;
    const tokenFarm = tokens.TokenFarm.data;

    const balance  = await jamToken.methods.balanceOf(accounts[0]).call();
    const allowance = await jamToken.methods.allowance(accounts[0], tokenFarm._address).call();

    try {
            
      if (BigInt(balance) < BigInt(amount)) {
          toast.error("No tienes suficientes tokens para stakear esa cantidad.");
          return;
      }

      // Si allowance es menor que amount, hacer approve automático
        if (BigInt(allowance) < BigInt(amount)) {
          console.log("Allowance insuficiente, aprobando tokens...");
          await jamToken.methods
            .approve(tokenFarm._address, amount)
            .send({ from: accounts[0] });
        }

     
      await tokenFarm.methods.stakeTokens(amount).send({ from: accounts[0], gas: 500000 });
      toast.success("Tus tokens ahora están en stake.");  

    } catch (error) {
      console.error("Error al hacer stake:", error);
      toast.error("Ocurrió un error al stakear.");
    } finally {
      setLoadActionTokens((values) => ({ ...values, stake: false }));
      loadBalance(accounts[0])
    } 

};


 const unstakeTokens = async (): Promise<void> => {
  if (!tokens.TokenFarm?.data || !tokens.JamToken?.data) return;

  setLoadActionTokens((values) => ({ ...values, unstake: true }));

  const tokenFarm = tokens.TokenFarm.data;

  try {
    await tokenFarm.methods
      .unstakeTokens()
      .send({ from: accounts[0] })
      .on("transactionHash", (_) => {
  
      })
      .on("receipt", (_) => {
        toast.success("Tus tokens fueron retirados correctamente.");
        setLoadActionTokens((values) => ({ ...values, unstake: false }));
      })
      .on("error", (err: any) => {
        console.error("Error al retirar tokens:", err);
        toast.error("Ocurrió un error al retirar tus tokens.");
        setLoadActionTokens((values) => ({ ...values, unstake: false }));
      });
  } catch (err) {
    console.error("Error inesperado al retirar tokens:", err);
    toast.error("Ocurrió un error inesperado.");
    setLoadActionTokens((values) => ({ ...values, unstake: false }));
  } finally {
    loadBalance(accounts[0])
  }
};


  useEffect(() => {
    refreshAccounts()
  }, [])

  return (
    <Web3Context.Provider value={
      { 
        accounts, 
        loading, 
        refreshAccounts,
        tokens, 
        stakeToken,
        unstakeTokens,
        loadActionTokens 
      }}
      >
      {children}
    </Web3Context.Provider>
  )
}
