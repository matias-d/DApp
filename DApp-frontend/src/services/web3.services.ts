import { toast } from "sonner"
import Web3 from "web3"

export async function loadWeb3() {
  const startTime = Date.now()
  const loadingToastId = toast.loading("Cargando Web3...")

  try {
    if (!window.ethereum) {
      throw new Error("No se encontró el navegador de Ethereum")
    }

    window.web3 = new Web3(window.ethereum)

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)

    toast.dismiss(loadingToastId)

    toast.success(`Web3 cargado correctamente en ${elapsed}s`)

    setTimeout(() => {
      toast.success(`Cuentas cargadas: ${accounts[0]}`)
    }, 1000) 

    return accounts
  } catch (error) {
    toast.dismiss(loadingToastId)
    toast.error(error.message || "Error al cargar Web3")
    console.error(error)
    throw error
  }
}

export async function loadBlockchainData (account : string) {

  const web3 = new Web3('http://127.0.0.1:7545');
  const networkId = await web3.eth.net.getId();

  if (Number(networkId) !== 5777) {
    toast.error("Necesitás estar conectado a la red de Ganache (ID: 5777).")
    throw new Error("Wrong network")
  }

 // JamToken
  const jamJson = await fetch("/abi/JamToken.json").then(res => res.json())
  const jamData = jamJson.networks[Number(networkId)]
  const jamToken = new web3.eth.Contract(jamJson.abi, jamData.address)
  const jamTokenBalance = await jamToken.methods.balanceOf(account).call()

  const jamTokenData = { data : jamToken, jamTokenBalance : jamTokenBalance.toString() }

  // StellartToken
  const stellartJson = await fetch("/abi/StellartToken.json").then(res => res.json())
  const stellartData = stellartJson.networks[Number(networkId)]
  const stellartToken = new web3.eth.Contract(stellartJson.abi, stellartData.address)
  const stellartTokenBalance = await stellartToken.methods.balanceOf(account).call()
  const stellartTokenData = { data : stellartToken, stellartTokenBalance : stellartTokenBalance.toString() }

  // TokenFarm
  const farmJson = await fetch("/abi/TokenFarm.json").then(res => res.json())
  const farmData = farmJson.networks[Number(networkId)]
  const tokenFarm = new web3.eth.Contract(farmJson.abi, farmData.address)
  const stakingBalance = await tokenFarm.methods.stakingBalance(account).call()
  const tokenFarmData = { data : tokenFarm, stakingBalance: stakingBalance.toString()}

  
  return { jamToken : jamTokenData, stellartToken : stellartTokenData, tokenFarm : tokenFarmData }

}
