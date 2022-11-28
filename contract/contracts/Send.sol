// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Send {
    uint256 favoriteNumber;

    function storeFavoriteNumber(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
