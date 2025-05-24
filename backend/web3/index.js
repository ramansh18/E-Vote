const Web3 = require("web3").default;
const deployedAddresses = require("../../contractAddresses.json"); // updated path

const VoterABI = require("../../client/src/contracts/VoterRegistration.json").abi;
const CandidateABI = require("../../client/src/contracts/CandidateRegistration.json").abi;
const ElectionABI = require("../../client/src/contracts/Election.json").abi;
const VotingABI = require("../../client/src/contracts/Voting.json").abi;
const ResultsABI = require("../../client/src/contracts/Results.json").abi;
const AdminABI = require("../../client/src/contracts/AdminControl.json").abi;

// Connect to Ganache or specified network
const web3 = new Web3("http://localhost:7545");

const contracts = {
  voterContract: new web3.eth.Contract(VoterABI, deployedAddresses.voterRegistration),
  candidateRegistrationContract: new web3.eth.Contract(CandidateABI, deployedAddresses.candidateRegistration),
  electionContract: new web3.eth.Contract(ElectionABI, deployedAddresses.election),
  votingContract: new web3.eth.Contract(VotingABI, deployedAddresses.voting),
  resultsContract: new web3.eth.Contract(ResultsABI, deployedAddresses.Results),
  adminContract: new web3.eth.Contract(AdminABI, deployedAddresses.AdminControl),
};

module.exports = { web3, contracts };
