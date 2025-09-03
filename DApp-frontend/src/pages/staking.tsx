import FormStaking from "../components/form-staking";
import IconArrow from "../components/icons/IconArrow";
import { IconLoad } from "../components/icons/IconLoad";
import { useWeb3 } from "../hooks/useWeb3";

export default function Staking() {
  const { loading } = useWeb3();

  return (
    <main className="container mx-auto flex items-center justify-center px-4 lg:px-0 py-12 flex-col">
      <section className="bg-zinc-700 w-full lg:w-[75%] 2xl:w-[50%] rounded-lg  overflow-hidden pb-8">
        <header className="bg-zinc-900 flex flex-col items-center gap-4 p-6 border-b border-zinc-600">
          <h2 className="text-2xl font-bold tracking-wider">Staking.</h2>
          <div className="flex items-center gap-x-12">
            <img
              src="/public/tokens/JamToken.png"
              className="size-26 lg:size-36 ring-4 rounded-full ring-violet-500 "
            />
            <IconArrow />
            <img
              src="/public/tokens/StellartToken.png"
              className="size-26 lg:size-36 ring-4 rounded-full ring-violet-500"
            />
          </div>
        </header>
        {loading ? (
          <section className="py-10 px-4 lg:px-32 flex gap-y-4 flex-col items-center justify-center">
            <span className="animate-spin">
              <IconLoad />
            </span>
          </section>
        ) : (
          <FormStaking />
        )}
      </section>
    </main>
  );
}
