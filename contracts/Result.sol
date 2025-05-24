// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Results {
    address public admin;

    struct CandidateResult {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => CandidateResult) public candidateResults;
    uint public totalCandidates;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can access this function.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidateResult(
        uint _id,
        string memory _name,
        uint _voteCount
    ) public onlyAdmin {
        CandidateResult memory newResult = CandidateResult({
            id: _id,
            name: _name,
            voteCount: _voteCount
        });

        candidateResults[_id] = newResult;
        totalCandidates++;
    }

    function getCandidateResult(uint _id)
        public
        view
        returns (string memory name, uint voteCount)
    {
        CandidateResult memory result = candidateResults[_id];
        return (result.name, result.voteCount);
    }

    function getTotalCandidates() public view returns (uint) {
        return totalCandidates;
    }
}
