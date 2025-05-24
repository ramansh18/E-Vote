// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    address public admin;
    uint public electionStartTime;
    uint public electionEndTime;
    bool public isElectionStarted;
    bool public isElectionEnded;

    event ElectionStarted(uint startTime, uint endTime);
    event ElectionEnded(uint endTime);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier electionNotStarted() {
        require(!isElectionStarted, "Election already started");
        _;
    }

    modifier electionOngoing() {
        require(isElectionStarted && !isElectionEnded, "Election is not ongoing");
        _;
    }

    constructor() {
        admin = msg.sender;
        isElectionStarted = false;
        isElectionEnded = false;
    }

    function startElection(uint _durationInSeconds) public onlyAdmin electionNotStarted {
        electionStartTime = block.timestamp;
        electionEndTime = block.timestamp + _durationInSeconds;
        isElectionStarted = true;
        emit ElectionStarted(electionStartTime, electionEndTime);
    }

    function endElection() public onlyAdmin electionOngoing {
        require(block.timestamp >= electionEndTime, "Election duration not yet completed");
        isElectionEnded = true;
        emit ElectionEnded(block.timestamp);
    }

    function getElectionStatus() public view returns (string memory) {
        if (!isElectionStarted) {
            return "Not Started";
        } else if (isElectionStarted && !isElectionEnded) {
            return "Ongoing";
        } else {
            return "Ended";
        }
    }
}
