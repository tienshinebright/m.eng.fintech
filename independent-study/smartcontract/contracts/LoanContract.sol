// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanContract {
    address public lender;
    address public borrower;
    uint256 public loanAmount;
    uint256 public interestRate;
    uint256 public repaymentTerm;
    uint256 public repaymentAmount;
    uint256 public startDate;
    bool public isLoanRepaid;

    constructor(
        address _lender,
        address _borrower,
        uint256 _loanAmount,
        uint256 _interestRate,
        uint256 _repaymentTerm
    ) {
        lender = _lender;
        borrower = _borrower;
        loanAmount = _loanAmount;
        interestRate = _interestRate;
        repaymentTerm = _repaymentTerm;
        repaymentAmount = loanAmount + (loanAmount * interestRate / 100);
        startDate = block.timestamp;
        isLoanRepaid = false;
    }

    function repayLoan() external payable {
        require(msg.sender == borrower, "Only the borrower can repay the loan");
        require(!isLoanRepaid, "Loan has already been repaid");

        require(msg.value == repaymentAmount, "Invalid repayment amount");
        isLoanRepaid = true;

        // Transfer the repayment amount to the lender
        (bool success, ) = lender.call{value: msg.value}("");
        require(success, "Failed to transfer funds to lender");
    }
}
