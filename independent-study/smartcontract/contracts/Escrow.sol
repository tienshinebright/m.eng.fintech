// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow {
    address payable public borrower;
    address payable[] public lenders;
    uint public loanAmount;
    uint public loanTermMonths;
    uint public interestRate;

    uint public installmentAmount;
    uint public totalInterest;
    uint public currentInstallment;
    uint public remainingPrincipal;
    
    uint public contractStatus;
    IERC20 public thbToken;
    mapping(address => uint) public lenderBalances;

    constructor(
        address payable _borrower,
        address payable[] memory _lenders,
        uint _loanAmount,
        uint _loanTermMonths,
        uint _interestRate,
        address _thbTokenAddress
    ) {
        require(_lenders.length <= 3, "Exceeded maximum number of lenders");
        require(_loanAmount <= 20000, "Loan amount exceeds maximum limit");

        borrower = _borrower;
        lenders = _lenders;
        loanAmount = _loanAmount;
        loanTermMonths = _loanTermMonths;
        interestRate = _interestRate;
        contractStatus = 1;
        thbToken = IERC20(_thbTokenAddress);
        calculateInstallmentDetails();
    }

    function calculateInstallmentDetails() private {
        uint totalAmount = loanAmount + calculateInterestAmount();
        installmentAmount = totalAmount / loanTermMonths;
        totalInterest = totalAmount - loanAmount;
        remainingPrincipal = loanAmount;
    }

    function calculateInterestAmount() private view returns(uint) {
        return (loanAmount * interestRate * loanTermMonths) / 10000;
    }

    function requestLoan() external {
        require(msg.sender == borrower, "Only the borrower can request the loan");
        require(contractStatus == 1, "Contract is not in the wait status");
        thbToken.transferFrom(borrower, address(this), loanAmount);
        contractStatus = 2; // Acceptance status
    }

    function transferLoanToBorrower() external {
        require(msg.sender == borrower, "Only the borrower can transfer the loan");
        require(contractStatus == 2, "Contract is not in the acceptance status");
        thbToken.transfer(borrower, loanAmount);
        contractStatus = 3; // Returning status
    }

    function makePayment() external {
        require(msg.sender == borrower, "Only the borrower can make payments");
        require(contractStatus == 3, "Contract is not in the returning status");
        require(currentInstallment < loanTermMonths, "All installments have been paid");
        thbToken.transferFrom(borrower, address(this), installmentAmount);
        remainingPrincipal -= installmentAmount - calculateInterestAmount();
        currentInstallment++;

        if (currentInstallment == loanTermMonths) {
            contractStatus = 4; // Ending status
        }
    }

    function withdraw() external {
        require(contractStatus == 4, "Contract is not in the ending status");
        uint totalAmount = loanAmount + totalInterest;
        uint amountPerLender = totalAmount / lenders.length;

        for (uint i = 0; i < lenders.length; i++) {
            lenderBalances[lenders[i]] = amountPerLender;
        }
    }

    function claimFunds() external {
        require(lenderBalances[msg.sender] > 0, "No funds available for withdrawal");
        uint amount = lenderBalances[msg.sender];
        lenderBalances[msg.sender] = 0;
        thbToken.transfer(msg.sender, amount);
    }

    function getContractStatus() external view returns(uint) {
        return contractStatus;
    }
}

