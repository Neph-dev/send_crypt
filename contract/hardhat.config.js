require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-chai-matchers")
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  }
};