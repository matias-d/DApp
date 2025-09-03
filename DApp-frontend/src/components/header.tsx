import { IconRefresh } from "./icons/IconRefresh";
import { useWeb3 } from "../hooks/useWeb3";
import DropdownMenu from "./dropdown-menu";
import SidebarMenu from "./sidebar-menu";
import IconCopy from "./icons/IconCopy";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "wouter";

export default function Header() {
  const { accounts, refreshAccounts, loading } = useWeb3();
  const [canRefresh, setCanRefresh] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(accounts[0]);
    toast.success("Copiado al portapapeles");
  };

  const handleRefresh = async () => {
    if (!canRefresh) return;

    setCanRefresh(false); // bloqueamos el botón
    await refreshAccounts(); // refrescamos cuentas

    // desbloqueamos después de 15 segundos (15000 ms)
    setTimeout(() => {
      setCanRefresh(true);
    }, 15000);
  };

  return (
    <header className="w-full py-8 px-4 lg:px-0 bg-zinc-900 border-b border-zinc-700 ">
      <div className="container mx-auto flex items-center  justify-between">
        <h2 className="font-bold text-2xl tracking-widest">
          <span className="text-violet-500">D</span>App.
        </h2>

        <nav className="hidden lg:flex items-center gap-x-16 bg-zinc-700/40 border-[0.5px] border-zinc-700 w-96 justify-center rounded-full py-2">
          <Link
            href="/"
            className={(active) =>
              active
                ? " hover:text-gray-100 transition-colors text-gray-100"
                : "text-gray-400 hover:text-gray-100 transition-colors"
            }
          >
            Home
          </Link>
          <Link
            href="/staking"
            className={(active) =>
              active
                ? " hover:text-gray-100 transition-colors text-gray-100"
                : "text-gray-400 hover:text-gray-100 transition-colors"
            }
          >
            Staking
          </Link>
        </nav>
        <section className="flex items-center gap-x-12">
          <div className="hidden lg:flex items-center gap-x-2 group">
            <button
              onClick={handleRefresh}
              disabled={loading || !canRefresh}
              className="hover:bg-zinc-800 transition-colors p-1.5 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconRefresh />
            </button>
            <div className="border rounded-lg border-zinc-700 bg-zinc-800 w-80  py-2 px-4">
              {accounts.length > 0 ? (
                <a
                  target="_blank"
                  href={`https://etherscan.io/address/${accounts}`}
                  className="truncate text-zinc-400 group-hover:text-zinc-300 transition-colors	block"
                >
                  {loading ? "Loading..." : accounts[0]}
                </a>
              ) : (
                <p className="truncate text-zinc-400 group-hover:text-zinc-300 transition-colors	block">
                  No hay cuentas o no se conecto correctamente
                </p>
              )}
            </div>
            <button
              disabled={accounts.length === 0}
              onClick={handleCopy}
              className="hover:bg-zinc-800 transition-colors p-1.5 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconCopy />
            </button>
          </div>
          <DropdownMenu />
        </section>

        <SidebarMenu />
      </div>
    </header>
  );
}
