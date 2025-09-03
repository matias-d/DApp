import { Link } from "wouter";
import IconExternalLink from "../components/icons/IconExternalLink";
import { useWeb3 } from "../hooks/useWeb3";

export default function Home() {
  const { accounts, loading } = useWeb3();

  return (
    <main className="container mx-auto flex items-center justify-center pt-12 flex-col gap-y-8 px-4 lg:px-0">
      <section className="text-center lg:max-w-2xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-violet-200 mb-4 ">
          DeFi Staking DApp 🚀
        </h1>
        <div className="bg-zinc-700/40 p-4 rounded-lg">
          <p className="text-zinc-400">
            A decentralized finance application built with{" "}
            <b className="text-violet-500 font-medium">React</b>,{" "}
            <b className="text-violet-500 font-medium">Truffle</b>, and{" "}
            <b className="text-violet-500 font-medium">Ganache</b>. Stake your{" "}
            <b className="text-violet-500 font-medium">JAM tokens</b> and earn{" "}
            <b className="text-violet-500 font-medium">Stellar (STE) rewards</b>
            .
          </p>
        </div>
      </section>

      <section className="">
        <span className="text-xs text-zinc-500 ">Your connected account</span>
        <div className="bg-zinc-700 px-3 rounded-lg py-2 mb-6 hover:bg-zinc-600 transition-colors ">
          {accounts.length > 0 ? (
            <a
              target="_blank"
              href={`https://etherscan.io/address/${accounts[0]}`}
              className="truncate w-80 lg:w-auto flex items-center gap-x-2 text-zinc-300 group-hover:text-zinc-300 transition-color"
            >
              {loading ? "Loading..." : accounts[0]}
              <IconExternalLink />
            </a>
          ) : (
            <p className="text-zinc-400">
              No account connected. Please connect MetaMask.
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Link
            href={"/staking"}
            className="bg-violet-600  hover:bg-violet-700 text-white px-6 py-2 rounded-lg shadow transition"
          >
            Start Staking
          </Link>
        </div>
      </section>

      {/* Imagen */}
      <div className="w-[16rem] lg:w-[52rem] ">
        <img
          src="https://cdn.prod.website-files.com/632d9fabf10dfd11fd2a3c6f/63500bbaf027935fc6bc5541_61e6d27af3824ff95c24784a_smart-contract-blockchain-crypto.jpeg"
          alt="Smart contract background"
          className="w-full h-full rounded-xl ring ring-zinc-700 shadow"
        />
      </div>
    </main>
  );
}
