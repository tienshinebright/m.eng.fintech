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

        // Use for-loop to iterate over elements
    function iterate(uint256 iterations) public pure returns(uint256) {
        uint256 totalIterations = 0;
    
        for (uint256 i = 0; i < iterations; i++) {
            totalIterations++;
        }

        return totalIterations;
    }

    // Summing Array Elements
    function sumArray(uint256[] memory numbers) public pure returns (uint256) {
        uint256 sum = 0;

        for(uint256 i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }

        return sum;
    }

    // Emitting Events for Array Elements
    event ElementProcessed(uint256 element);

    function processArray(uint256[] memory numbers) public {
        for(uint256 i = 0; i < numbers.length; i++) {
            emit ElementProcessed(numbers[i]);
        }
    }

    //Dynamic Array Initialization
    function createDynamicArray(uint256 size) public pure returns (uint256[] memory) {
        uint256[] memory dynamicArray = new uint256[](size);

        for (uint256 i = 0; i < size; i++) {
            dynamicArray[i] = i;
        }

        return dynamicArray;
  }
}