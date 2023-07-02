// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // State variable and other contract code
    uint public myNumber;
    string public myWords;

    constructor(uint _number, string memory _words) {
        // Initialization code
        myNumber = _number;
        myWords = _words;
    }
}