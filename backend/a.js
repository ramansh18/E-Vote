const Web3 = require('web3').default;
const web3 = new Web3();

const wallet = web3.eth.accounts.create();
console.log("wallet ->",wallet.address)

