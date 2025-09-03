
import { IconRefresh } from "./icons/IconRefresh";
import { useWeb3 } from "../hooks/useWeb3";
import IconCopy from "./icons/IconCopy";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "wouter";

export default function Header() {

  const { accounts, refreshAccounts, loading } = useWeb3()
  const [canRefresh, setCanRefresh] = useState(true)

  const handleCopy = () => {
    navigator.clipboard.writeText(accounts[0])
    toast.success('Copiado al portapapeles')
  }

  const handleRefresh = async () => {
    if (!canRefresh) return

    setCanRefresh(false)           // bloqueamos el botón
    await refreshAccounts()        // refrescamos cuentas


    // desbloqueamos después de 15 segundos (15000 ms)
    setTimeout(() => {
      setCanRefresh(true)
    }, 15000)
  }

  return (
    <header className="w-full py-8  bg-zinc-900 border-b border-zinc-700 ">
        <div className="container mx-auto flex items-center  justify-between">
            <nav className="flex items-center gap-x-16">
                 <h2 className="font-bold text-2xl tracking-widest mb-1"><span className="text-violet-500">D</span>App.</h2>
                 <div className="flex items-center gap-x-4">
                  <Link href="/" className="text-xl text-gray-300 font-medium hover:text-gray-100 transition-colors">Inicio</Link>
                  <Link href="/staking" className="text-xl text-gray-300 font-medium hover:text-gray-100 transition-colors">Staking</Link>
                 </div>
            </nav>
            <div className="flex items-center gap-x-2 group">
                <button onClick={handleRefresh} disabled={loading || !canRefresh} className="hover:bg-zinc-800 transition-colors p-1.5 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <IconRefresh />
                </button>
                <div className="border rounded-lg border-zinc-700 bg-zinc-800 w-80  py-2 px-4">
                    
                    {
                      accounts.length > 0 ?
                      <a target="_blank" href={`https://etherscan.io/address/${accounts}`} className="truncate text-zinc-400 group-hover:text-zinc-300 transition-colors	block">{
                        loading ? 'Cargando...' : accounts[0]   
                        }</a>
                      : <p className="truncate text-zinc-400 group-hover:text-zinc-300 transition-colors	block">No hay cuentas o no se conecto correctamente</p>
                    }
                    
                    
                </div>
                <button disabled={accounts.length === 0} onClick={handleCopy} className="hover:bg-zinc-800 transition-colors p-1.5 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <IconCopy />
                </button>
                  
            </div>
        </div>
    </header>
  )
}