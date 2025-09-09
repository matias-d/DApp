const StellartToken = artifacts.require("StellartToken");
const TokenFarm = artifacts.require("TokenFarm");
const JamToken = artifacts.require("JamToken");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(JamToken);
  const jamToken = await JamToken.deployed();

  await deployer.deploy(StellartToken);
  const stellartToken = await StellartToken.deployed();

  await deployer.deploy(TokenFarm, stellartToken.address, jamToken.address);
  const tokenFarm = await TokenFarm.deployed();

  // Transfer StellartToken tokens (reward tokens) to TokenFarm (1 million tokens)
  await stellartToken.transfer(tokenFarm.address, "1000000000000000000000000");
};
