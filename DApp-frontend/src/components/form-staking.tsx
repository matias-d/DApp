import { IconLoad } from "./icons/IconLoad";
import { useWeb3 } from "../hooks/useWeb3";
import useFormStaking from "../hooks/useFormStaking";

export default function FormStaking() {
  const {
    handleSubmit,
    jamFormatted,
    jamFormattedWei,
    stakingFormatted,
    stellartFormatted,
  } = useFormStaking();
  const { loadActionTokens, unstakeTokens } = useWeb3();

  return (
    <section className="py-10 px-4 lg:px-32 ">
      <h2 className="text-violet-200 font-medium  mb-3">Available tokens</h2>
      <div className="flex items-center justify-between gap-x-2 lg:gap-x-12 mb-6">
        <div className="w-full">
          <span className="text-zinc-400 mb-1 block">In stake</span>
          <div className="flex items-center gap-x-2  bg-[radial-gradient(ellipse_200%_100%_at_top_right,#fee8a0,#f3d17a)] border border-yellow-100  w-full rounded-lg p-2">
            <img
              src="/public/tokens/JamToken.png"
              className="size-10 rounded-full ring-violet-500 "
            />
            <p className="text-yellow-700 font-medium">
              {stakingFormatted} JAM
            </p>
          </div>
        </div>
        <div className="w-full">
          <span className="text-zinc-400 mb-1 block">Rewards earned</span>
          <div className="flex items-center gap-x-2 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#8e51ff,#d8bfff)] border border-violet-300  w-full rounded-lg p-2">
            <img
              src="/public/tokens/StellartToken.png"
              className="size-10 rounded-full ring-violet-600 "
            />
            <p className="text-violet-800 font-medium">
              {stellartFormatted} STE
            </p>
          </div>
        </div>
      </div>

      <span className="text-zinc-400 mb-1 block">Balance</span>

      <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 w-full mb-4">
        <div className="flex items-center gap-x-2 bg-[radial-gradient(ellipse_200%_100%_at_top_right,#fee8a0,#f3d17a)] border border-yellow-100  w-full rounded-lg p-2 ">
          <img
            src="/public/tokens/JamToken.png"
            className="size-10 rounded-full ring-violet-500 "
          />
          <p className="text-yellow-800 font-medium  truncate ">
            {jamFormattedWei} JAM
          </p>
        </div>
        <span>=</span>
        <div className="flex items-center gap-x-2 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#4a90ff,#a0c8ff)] border border-blue-100  w-full rounded-lg p-2">
          <img
            src="/public/tokens/ether.png"
            className="size-10 rounded-full ring-violet-500 "
          />
          <p className="text-blue-700 font-medium truncate">
            {jamFormatted} ETHER
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full mb-4">
        <label className=" block w-full">
          <span className="mb-1 block pl-6 text-zinc-400 ">Amount</span>
          <input
            required
            type="number"
            className="focus:outline-violet-400 border-2 text-lg border-zinc-400 rounded-l-full py-3.5 px-6 bg-zinc-500 w-full"
            placeholder="Enter JAM tokens"
          />
        </label>
        <div className="flex items-end w-auto">
          <button
            disabled={loadActionTokens.stake}
            type="submit"
            className="bg-emerald-300/30 text-emerald-300 font-medium w-28  py-3.5 text-lg border-emerald-300 rounded-r-full border-2 flex items-center justify-center  cursor-pointer hover:scale-[0.98] transition-transform duration-500"
          >
            {loadActionTokens.stake ? (
              <IconLoad className="size-7 animate-spin" />
            ) : (
              "Stake"
            )}
          </button>
        </div>
      </form>
      <button
        disabled={loadActionTokens.unstake}
        onClick={unstakeTokens}
        className="bg-red-300/30 text-red-300 flex items-center justify-center font-medium w-full rounded-full  py-3.5 text-lg border-red-300 shadow hover:bg-red-300/50 cursor-pointer"
      >
        {loadActionTokens.unstake ? (
          <IconLoad className="size-7 animate-spin" />
        ) : (
          "Withdraw staked tokens"
        )}
      </button>
    </section>
  );
}
