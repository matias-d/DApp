
import IconExternalLink from "../components/icons/IconExternalLink"
import { useWeb3 } from "../hooks/useWeb3"

export default function Home() {
  
  const { accounts, loading } = useWeb3()

  return (
    <main className="container mx-auto flex items-center justify-center pt-12 flex-col">
        <h2 className="text-2xl font-medium text-zinc-400">Smart Contracts</h2>
        <p className="text-zinc-500 mb-4">Aplicación ejemplo de uso de <b className="font-medium text-violet-500">Smart Contract</b> con <b className="font-medium text-violet-500">React</b> y <b className="font-medium text-violet-500">Truffle</b> en una Defi.</p>
        
        <section>
          <span className="text-xs text-zinc-500">Tu dirección</span>
          <div className="bg-zinc-700 px-3 rounded-lg py-2 mb-12 hover:bg-zinc-600 transition-colors ">
            {
              accounts.length > 0 
              ? (
                <a 
                target="_blank" 
                href={`https://etherscan.io/address/${accounts}`}       
                className="truncate flex items-center gap-x-2 text-zinc-300 group-hover:text-zinc-300 transition-color">{
                  loading ? 'Cargando...' : 
                  <>
                    {accounts[0]}
                    <IconExternalLink />
                  </>} 
                </a>
              )
              : (
                <p className="text-zinc-400">No hay cuentas o no se conecto correctamente.</p>
              )

            }
          
      
          </div>
        </section>

        <div className="w-[52rem] ">
            <img src="https://cdn.prod.website-files.com/632d9fabf10dfd11fd2a3c6f/63500bbaf027935fc6bc5541_61e6d27af3824ff95c24784a_smart-contract-blockchain-crypto.jpeg" alt="Background smart contract" className="w-full h-full rounded-xl ring ring-zinc-700 shadow"/>
        </div>
    </main>
  )
}