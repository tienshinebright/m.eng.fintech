// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanCalculator {
    uint256 public loanAmount;
    uint256 public interestRate;
    uint256 public duration; // in months

    constructor(uint256 _loanAmount, uint256 _interestRate, uint256 _duration) {
        loanAmount = _loanAmount;
        interestRate = _interestRate;
        duration = _duration;
    }

    function calculateMonthlyPayment() public view returns (uint256) {
        // Convert interest rate from percentage to decimal
        uint256 decimalInterestRate = interestRate * 100;

        // Calculate monthly interest rate
        uint256 monthlyInterestRate = decimalInterestRate / 12 / 100;

        // Calculate the total number of monthly payments
        uint256 totalPayments = duration;

        // Calculate the monthly payment amount
        uint256 numerator = loanAmount * monthlyInterestRate * (1 + monthlyInterestRate)**totalPayments;
        uint256 denominator = (1 + monthlyInterestRate)**totalPayments - 1;

        uint256 monthlyPayment = numerator / denominator;
        return monthlyPayment;
    }
}
