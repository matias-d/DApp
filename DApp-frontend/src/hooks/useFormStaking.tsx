import { useWeb3 } from "./useWeb3";
import { toast } from "sonner";
import Web3 from "web3";

export default function useFormStaking() {
  const web3 = new Web3();

  const { tokens, stakeToken } = useWeb3();

  const jamBalance = tokens.JamToken?.jamTokenBalance || "0";
  const jamInEther = web3.utils.fromWei(jamBalance, "ether");
  const jamInWei = web3.utils.fromWei(jamBalance, "wei");

  const stakingBalance = tokens.TokenFarm?.stakingBalance || "0";
  const stakingInEther = web3.utils.fromWei(stakingBalance, "ether");
  const stakingFormatted = parseFloat(stakingInEther).toFixed(2);

  const stellartBalance = tokens.StellartToken?.stellartTokenBalance || "0";
  const stellartInEther = web3.utils.fromWei(stellartBalance, "ether");
  const stellartFormatted = parseFloat(stellartInEther).toFixed(2);

  const jamFormatted = parseFloat(jamInEther).toFixed(2);
  const jamFormattedWei = parseFloat(jamInWei).toFixed(2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.querySelector<HTMLInputElement>("input[type='number']");
    const value = input?.value.toString();

    if (!value) {
      toast.error("You must enter a number of tokens.");
      return;
    }

    const amount = web3.utils.toWei(value, "ether");
    await stakeToken(amount);

    if (input) input.value = "";
  };

  return {
    handleSubmit,
    stellartFormatted,
    jamFormatted,
    jamFormattedWei,
    stakingFormatted,
  };
}
