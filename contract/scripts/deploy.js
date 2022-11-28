const hre = require("hardhat");

const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory("Transaction");
  const transactionsContract = await transactionsFactory.deploy();

  await transactionsContract.deployed();

  console.log("Transactions address: ", transactionsContract.address);
}


main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
