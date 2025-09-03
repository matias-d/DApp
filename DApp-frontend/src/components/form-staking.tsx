import { IconLoad } from "./icons/IconLoad"
import { useWeb3 } from "../hooks/useWeb3"
import { toast } from "sonner"
import Web3 from "web3"

export default function FormStaking() {


  const web3 = new Web3()  
  const { loadActionTokens, tokens, stakeToken, unstakeTokens } = useWeb3()

  const jamBalance = tokens.JamToken?.jamTokenBalance || '0'
  const jamInEther = web3.utils.fromWei(jamBalance, 'ether');
  const jamInWei = web3.utils.fromWei(jamBalance, 'wei')
  
  const stakingBalance = tokens.TokenFarm?.stakingBalance || '0'
  const stakingInEther = web3.utils.fromWei(stakingBalance, 'ether')
  const stakingFormatted = parseFloat(stakingInEther).toFixed(2)

  const stellartBalance = tokens.StellartToken?.stellartTokenBalance || '0'
  const stellartInEther = web3.utils.fromWei(stellartBalance, 'ether')
  const stellartFormatted = parseFloat(stellartInEther).toFixed(2)

  const jamFormatted = parseFloat(jamInEther).toFixed(2);
  const jamFormattedWei = parseFloat(jamInWei).toFixed(2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget; 
        const input = form.querySelector<HTMLInputElement>("input[type='number']");
        const value = input?.value.toString();

        if (!value) {
            toast.error("Debe introducir una cantidad de tokens");
            return;
        }

        const amount = web3.utils.toWei(value, "ether");
        await stakeToken(amount);

        // 👇 limpiar input
        if (input) {
            input.value = "";
        }
  };

  return (
     <section className="py-10 px-32 ">
        <h2 className="text-violet-200 font-medium  mb-3">
            Tokens disponibles
        </h2>
        <div className="flex items-center justify-between gap-x-12 mb-6">
            <div className="w-full">
                <span className="text-zinc-400 mb-1 block">En stake</span>
                <div className="flex items-center gap-x-2  bg-[radial-gradient(ellipse_200%_100%_at_top_right,#fee8a0,#f3d17a)] border border-yellow-100  w-full rounded-lg p-2">
                    <img src="/public/tokens/JamToken.png" className="size-10 rounded-full ring-violet-500 "/>
                    <p className="text-yellow-700 font-medium">{stakingFormatted} JAM</p>
                </div>
            </div>
            <div className="w-full">
                <span className="text-zinc-400 mb-1 block">Recompensas obtenidas</span>
                <div className="flex items-center gap-x-2 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#8e51ff,#d8bfff)] border border-violet-300  w-full rounded-lg p-2">
                    <img src="/public/tokens/StellartToken.png" className="size-10 rounded-full ring-violet-600 "/>
                    <p className="text-violet-800 font-medium">{stellartFormatted} STE</p>
                </div>
            </div>
        </div>  
        
        <span className="text-zinc-400 mb-1 block">Balance</span>

        <div className="flex items-center gap-x-4 w-full mb-4">
                <div className="flex items-center gap-x-2 bg-[radial-gradient(ellipse_200%_100%_at_top_right,#fee8a0,#f3d17a)] border border-yellow-100  w-full rounded-lg p-2 ">
                    <img src="/public/tokens/JamToken.png" className="size-10 rounded-full ring-violet-500 "/>
                    <p className="text-yellow-800 font-medium  truncate ">{jamFormattedWei} JAM</p>
                </div>
                <div className="flex items-center gap-x-2 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#4a90ff,#a0c8ff)] border border-blue-100  w-full rounded-lg p-2">
                    <img src="/public/tokens/ether.png" className="size-10 rounded-full ring-violet-500 "/>
                    <p className="text-blue-700 font-medium truncate">{jamFormatted} ETHER</p>
                </div>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full">
            <label className=" block w-full">
                <span className="mb-1 block pl-6 text-zinc-400 ">Cantidad</span>
                <input required type="number" className="focus:outline-violet-400 border-2 text-lg border-zinc-400 rounded-l-full py-3.5 px-6 bg-zinc-500 w-full" placeholder="Ingresar JAM tokens"/>
            </label>
            <div className="flex items-end w-auto">
                <button disabled={loadActionTokens.stake} type="submit" className="bg-emerald-300/30 text-emerald-300 font-medium w-28  py-3.5 text-lg border-emerald-300 border-2 flex items-center justify-center  cursor-pointer hover:scale-[0.98] transition-transform duration-500">{loadActionTokens.stake ? <IconLoad className="size-7 animate-spin"/> : 'Stake'}</button>   

                <button onClick={unstakeTokens} type="button" disabled={loadActionTokens.unstake} className="bg-red-300/30 text-red-300 font-medium w-28  py-3.5 text-lg border-red-300 border-2  cursor-pointer hover:scale-[0.98] transition-transform duration-500 rounded-r-full flex items-center justify-center">{loadActionTokens.stake ? <IconLoad className="size-7 animate-spin"/> : 'Retirar'}</button>

            </div>
        </form>
     </section>
  )
}