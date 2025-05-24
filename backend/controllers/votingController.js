const { contracts, web3 } = require("../web3/index.js");
require("dotenv").config({ path: "../.env" });
const User = require("../models/User");
const { votingContract ,voterContract } = contracts;
const deployedAddresses = require("../../contractAddresses.json"); 

require("dotenv").config({ path: "../.env" });
exports.castVote = async (req, res) => {
  try {
    const { candidateAddress } = req.body;

    // Fetch voter info from JWT user
    const userId = req.user.id;
   
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified) return res.status(403).json({ message: "Email not verified" });
    if (user.hasVoted) return res.status(400).json({ message: "You have already voted" });
    console.log(candidateAddress)
    // Ensure voter is registered (check VoterRegistration contract)
    const isRegistered = await voterContract.methods.isRegistered(user.walletAddress).call();
    if (!isRegistered) {
      return res.status(400).json({ message: "Voter is not registered" });
    }
    const relayerPrivateKey = process.env.RELAYER_PRIVATE_KEY;
    const relayerWallet = web3.eth.accounts.privateKeyToAccount(relayerPrivateKey);
    // Prepare transaction: Voting contract
    const tx = votingContract.methods.voteFor(user.walletAddress,candidateAddress);
    
    // Estimate gas for the transaction
    const gas = await tx.estimateGas({ from: relayerWallet.address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(relayerWallet.address);

    // Sign the transaction with the relayer's private key
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: votingContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: await web3.eth.getChainId(),
      },
      relayerPrivateKey  // This should be the relayer's private key
    );

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // Update hasVoted in MongoDB for the voter
    user.hasVoted = true;
    await user.save();

    res.status(200).json({
      message: "Vote cast successfully",
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ message: "Failed to cast vote", error });
  }
};

// Fetch all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await votingContract.methods.getAllCandidates().call();
    res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Failed to fetch candidates", error: error.message });
  }
};

// Fetch votes for a candidate
exports.getVotesForCandidate = async (req, res) => {
  try {
    const { candidateAddress } = req.params;
    const votes = await votingContract.methods.getVotes(candidateAddress).call();
    res.status(200).json({ votes });
  } catch (error) {
    console.error("Error fetching vote count:", error);
    res.status(500).json({ message: "Failed to fetch vote count", error: error.message });
  }
};
// Get election results (total votes for each candidate)
exports.getElectionResults = async (req, res) => {
  try {
    const candidates = await votingContract.methods.getAllCandidates().call();
    let results = [];

    // Loop through all candidates to get vote counts
    for (let candidate of candidates) {
      const votesBigNumber = await votingContract.methods.getVotes(candidate).call();
      
      // Convert BigNumber to a string or number
      const votes = votesBigNumber.toString();  // You can also use .toNumber() if the number is not too large
      results.push({ candidate, votes });
    }

    // Sort by vote count (descending)
    results = results.sort((a, b) => b.votes - a.votes);  // Make sure votes are converted to numbers for sorting

    res.status(200).json({ results });
  } catch (error) {
    console.error("Error fetching election results:", error);
    res.status(500).json({ message: "Failed to fetch election results", error });
  }
};


exports.addCandidate = async (req, res) => {
  try {
    const { candidateAddress } = req.body;

    // const { address: voterWalletAddress } = generateWallet();

    // Optional: Check if already a candidate
    // const isCandidate = await votingContract.methods.isCandidate(candidateAddress).call();
    // if (isCandidate) {
    //   return res.status(400).json({ message: 'Candidate is already registered in Voting contract' });
    // }
    const relayerPrivateKey = process.env.RELAYER_PRIVATE_KEY;
    
        // Step 2: Create the relayer wallet using the private key (No need to generate a wallet for the candidate)
        const relayerWallet = web3.eth.accounts.privateKeyToAccount(relayerPrivateKey);
    // Encode method call to add the candidate
    const txData = votingContract.methods.addCandidate(candidateAddress).encodeABI();

    // Estimate gas
    const gas = await web3.eth.estimateGas({
      to: deployedAddresses.voting,
      data: txData,
      from: relayerWallet.address,
    });

    const gasPrice = await web3.eth.getGasPrice();

    // Sign transaction
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: deployedAddresses.voting,
        data: txData,
        gas,
        gasPrice,
        from: relayerWallet.address,
      },
      relayerPrivateKey
    );

    // Send signed transaction
    const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return res.status(200).json({
      message: 'Candidate added to Voting contract successfully!',
      txHash: tx.transactionHash,
    });

  } catch (error) {
    console.error('Error adding candidate to Voting contract:', error);
    return res.status(500).json({ message: 'Failed to add candidate', error });
  }
};