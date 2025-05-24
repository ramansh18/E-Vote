const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: 596877,
      host: "127.0.0.1",
      port: 7545, // for Ganache GUI
      // port: 8545, // for Ganache CLI
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // ✅ Use Solidity 0.8.x
    },
  },
  
};
