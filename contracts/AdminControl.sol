// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdminControl {
    address public superAdmin;

    mapping(address => bool) public isAdmin;

    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Only Super Admin can perform this action");
        revert("Super Admin cannot remove themselves!");
        _;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only Admin can perform this action");
        _;
    }

    constructor() {
        superAdmin = msg.sender;
        isAdmin[msg.sender] = true;
    }

    function addAdmin(address _admin) external onlySuperAdmin {
        isAdmin[_admin] = true;
    }

    function removeAdmin(address _admin) external onlySuperAdmin {
        isAdmin[_admin] = false;
    }

    function checkAdmin(address _addr) external view returns (bool) {
        return isAdmin[_addr];
    }
}
