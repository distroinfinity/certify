/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");

const privateKey =
  "0ba050684efd760bb599daa533daf9a5bba0e425d788354428db8ec6c9d5c85b";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
