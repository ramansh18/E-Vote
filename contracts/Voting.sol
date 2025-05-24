// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVoterRegistration {
    function isRegistered(address _voter) external view returns (bool);
}

interface ICandidateRegistration {
    function isCandidate(address _candidate) external view returns (bool);
}

contract Voting {
    address public admin;
    IVoterRegistration public voterContract;
    ICandidateRegistration public candidateContract;

    mapping(address => bool) public hasVoted;
    mapping(address => uint256) public votesReceived;
    address[] public candidates;

    event VoteCast(address indexed voter, address indexed candidate);

    constructor(address _voterContract, address _candidateContract) {
        admin = msg.sender;
        voterContract = IVoterRegistration(_voterContract);
        candidateContract = ICandidateRegistration(_candidateContract);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function addCandidate(address _candidate) external onlyAdmin {
        require(candidateContract.isCandidate(_candidate), "Not a registered candidate");
        for (uint i = 0; i < candidates.length; i++) {
            require(candidates[i] != _candidate, "Candidate already added");
        }
        candidates.push(_candidate);
    }

    // ✅ Gasless vote function (only one, used by relayer)
    function voteFor(address _voter, address _candidate) external {
        require(voterContract.isRegistered(_voter), "Not a registered voter");
        require(candidateContract.isCandidate(_candidate), "Invalid candidate");
        require(!hasVoted[_voter], "Voter has already voted");

        hasVoted[_voter] = true;
        votesReceived[_candidate] += 1;

        emit VoteCast(_voter, _candidate);
    }

    function getVotes(address _candidate) external view returns (uint256) {
        return votesReceived[_candidate];
    }

    function getAllCandidates() external view returns (address[] memory) {
        return candidates;
    }
}
