// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleEscrowLoan {
    struct Loan {
        address borrower;
        address lender;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 term; // In months
        uint256 startDate;
        bool isRepaid;
    }

    mapping(address => Loan[]) public loans;

    event LoanCreated(address indexed borrower, address indexed lender, uint256 loanAmount, uint256 interestRate, uint256 term);
    event LoanRepaid(address indexed borrower, address indexed lender, uint256 loanAmount, uint256 interestRate, uint256 term);

    function createLoan(uint256 _interestRate, uint256 _term) external payable {
        require(msg.value > 0, "Loan amount must be greater than zero");
        require(_term >= 1 && _term <= 3, "Invalid loan term");

        Loan memory newLoan = Loan({
            borrower: msg.sender,
            lender: address(0),
            loanAmount: msg.value,
            interestRate: _interestRate,
            term: _term,
            startDate: block.timestamp,
            isRepaid: false
        });

        loans[msg.sender].push(newLoan);

        emit LoanCreated(msg.sender, address(0), msg.value, _interestRate, _term);
    }

    function lendLoan(address _borrower, uint256 _loanIndex) external payable {
        require(_loanIndex < loans[_borrower].length, "Invalid loan index");
        Loan storage loan = loans[_borrower][_loanIndex];
        require(loan.lender == address(0), "Loan already lent");

        loan.lender = msg.sender;

        emit LoanCreated(loan.borrower, msg.sender, loan.loanAmount, loan.interestRate, loan.term);
    }

    function repayLoan(address _borrower, uint256 _loanIndex) external payable {
        require(_loanIndex < loans[_borrower].length, "Invalid loan index");
        Loan storage loan = loans[_borrower][_loanIndex];
        require(!loan.isRepaid, "Loan already repaid");
        require(loan.lender == msg.sender, "Only lender can repay the loan");

        uint256 interestAmount = calculateInterest(loan.loanAmount, loan.interestRate, loan.term);
        uint256 totalAmount = loan.loanAmount + interestAmount;
        require(msg.value >= totalAmount, "Insufficient repayment amount");

        loan.isRepaid = true;

        if (msg.value > totalAmount) {
            payable(msg.sender).transfer(msg.value - totalAmount);
        }

        emit LoanRepaid(_borrower, loan.lender, loan.loanAmount, loan.interestRate, loan.term);
    }

    function calculateInterest(uint256 _loanAmount, uint256 _interestRate, uint256 _term) internal pure returns (uint256) {
        // Simple interest formula: Interest = Principal * Rate * Time
        return (_loanAmount * _interestRate * _term) / 100;
    }
}
