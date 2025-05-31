const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
  // Replace these with your actual deployed contract addresses:
  const voterContractAddress = "0x1cff61b8259f05F4BBF7aA4F769321e5Fa70B22d";
  const candidateContractAddress = "0x1148d9138ccdc770d5a544f4ECD2738831DD5B0e";

  await deployer.deploy(Voting, voterContractAddress, candidateContractAddress);

  const voting = await Voting.deployed();
  console.log("Voting deployed at:", voting.address);
};
