const express = require("express");
const router = express.Router();
const { castVote, getAllCandidates, getVotesForCandidate ,getElectionResults,addCandidate,getVotingHistory} = require("../controllers/votingController");
const { protect } = require("../middleware/auth");

router.post("/vote", protect, castVote); // Voter casts vote
router.get("/candidates", getAllCandidates);
router.post('/addCandidate', addCandidate);
router.get("/history", protect, getVotingHistory);
router.get("/votes/:candidateAddress", getVotesForCandidate);
router.get("/results", protect, getElectionResults);
module.exports = router;
