const CandidateRegistration = artifacts.require("CandidateRegistration");
const VoterRegistration = artifacts.require("VoterRegistration");
const Election = artifacts.require("Election");
const Results = artifacts.require("Results");
const AdminControl = artifacts.require("AdminControl");
const Voting = artifacts.require("Voting");

const fs = require("fs");

module.exports = async function (deployer) {
  // Deploy independent contracts first
  await deployer.deploy(CandidateRegistration);
  const candidateRegistration = await CandidateRegistration.deployed();
  console.log("CandidateRegistration deployed at:", candidateRegistration.address);

  await deployer.deploy(VoterRegistration);
  const voterRegistration = await VoterRegistration.deployed();
  console.log("VoterRegistration deployed at:", voterRegistration.address);

  await deployer.deploy(Election);
  const election = await Election.deployed();
  console.log("Election deployed at:", election.address);

  await deployer.deploy(Results);
  const results = await Results.deployed();
  console.log("Results deployed at:", results.address);

  await deployer.deploy(AdminControl);
  const adminControl = await AdminControl.deployed();
  console.log("AdminControl deployed at:", adminControl.address);

  // Deploy Voting with constructor args
  await deployer.deploy(Voting, voterRegistration.address, candidateRegistration.address);
  const voting = await Voting.deployed();
  console.log("Voting deployed at:", voting.address);

  // Save all addresses to JSON
  const contractAddresses = {
    candidateRegistration: candidateRegistration.address,
    voterRegistration: voterRegistration.address,
    election: election.address,
    results: results.address,
    adminControl: adminControl.address,
    voting: voting.address,
  };

  fs.writeFileSync("./contractAddresses.json", JSON.stringify(contractAddresses, null, 2));
  console.log("Contract addresses saved to contractAddresses.json");
};
