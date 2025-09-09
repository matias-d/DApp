/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import Web3 from "web3";

export async function loadWeb3() {
  const startTime = Date.now();
  const loadingToastId = toast.loading("Loading Web3...");

  try {
    if (!window.ethereum) {
      throw new Error("Ethereum browser not found");
    }

    window.web3 = new Web3(window.ethereum);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    toast.dismiss(loadingToastId);

    toast.success(`Web3 loaded successfully in ${elapsed}s`);

    setTimeout(() => {
      toast.success(`Charged accounts: ${accounts[0]}`);
    }, 1000);

    return accounts;
  } catch (error: any) {
    toast.dismiss(loadingToastId);
    toast.error(error.message || "Error loading Web3");
    console.error(error);
    throw error;
  }
}

export async function loadBlockchainData(account: string) {
  const web3 = new Web3(window.ethereum);

  const networkId = await web3.eth.net.getId();

  // BSC Testnet networkId: 97
  if (Number(networkId) !== 97) {
    toast.error("You need to be connected to BSC Testnet. (ID: 97).");
    throw new Error("Wrong network");
  }

  // JamToken
  const jamJson = await fetch("/abi/JamToken.json").then((res) => res.json());
  const jamData = jamJson.networks[Number(networkId)];
  const jamToken = new web3.eth.Contract(jamJson.abi, jamData.address);
  const jamTokenBalance = await jamToken.methods.balanceOf(account).call();

  const jamTokenData = {
    data: jamToken,
    jamTokenBalance: jamTokenBalance.toString(),
  };

  // StellartToken
  const stellartJson = await fetch("/abi/StellartToken.json").then((res) =>
    res.json()
  );
  const stellartData = stellartJson.networks[Number(networkId)];
  const stellartToken = new web3.eth.Contract(
    stellartJson.abi,
    stellartData.address
  );
  const stellartTokenBalance = await stellartToken.methods
    .balanceOf(account)
    .call();
  const stellartTokenData = {
    data: stellartToken,
    stellartTokenBalance: stellartTokenBalance.toString(),
  };

  // TokenFarm
  const farmJson = await fetch("/abi/TokenFarm.json").then((res) => res.json());
  const farmData = farmJson.networks[Number(networkId)];
  const tokenFarm = new web3.eth.Contract(farmJson.abi, farmData.address);
  const stakingBalance = await tokenFarm.methods.stakingBalance(account).call();
  const tokenFarmData = {
    data: tokenFarm,
    stakingBalance: stakingBalance.toString(),
  };

  return {
    jamToken: jamTokenData,
    stellartToken: stellartTokenData,
    tokenFarm: tokenFarmData,
  };
}
