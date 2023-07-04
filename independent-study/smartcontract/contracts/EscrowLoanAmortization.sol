// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EscrowLoanAmortization {
    address payable public borrower;
    address payable[] public lenders;

    uint public loanAmount;
    uint public interestRate;
    uint public loanTermMonths;

    uint public totalInterestAmount;
    uint public totalPaymentAmount;

    uint public contractStatus;
    mapping(address => uint) public lenderBalances;
    IERC20 public thbToken;

    struct Payment {
        uint256 paymentNumber;
        uint256 installmentAmount;
        uint256 principalAmount;
        uint256 interestAmount;
        uint256 remainingPrincipal;
    }

    Payment public payment;

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
        contractStatus = 1; // Wait status
        thbToken = IERC20(_thbTokenAddress);
        calculateLoanAmortization();
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
        require(payment.installmentAmount < loanTermMonths, "All installments have been paid");
        thbToken.transferFrom(borrower, address(this), payment.installmentAmount);
        payment.remainingPrincipal -= payment.installmentAmount - payment.interestAmount;
        payment.installmentAmount++;

        if (payment.installmentAmount == loanTermMonths) {
            contractStatus = 4; // Ending status
        }
    }

    function withdraw() external {
        require(contractStatus == 4, "Contract is not in the ending status");
        totalPaymentAmount = loanAmount + totalInterestAmount;
        uint amountPerLender = totalPaymentAmount / lenders.length;

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

    function calculateLoanAmortization () public view returns(Payment[] memory) {
        Payment[] memory payments = new Payment[](loanTermMonths);
        uint256 monthlyInterestRate = (interestRate * 10**18) / 100 / 12;
        uint256 monthlyPayment = calculateMonthlyPayment(
            loanAmount,
            monthlyInterestRate,
            loanTermMonths
        );
        uint256 remainingPrincipal = loanAmount;

        for (uint256 i = 0; i < loanTermMonths; i++) {
            uint256 interestAmount = (remainingPrincipal * monthlyInterestRate) / 10**18;
            uint256 principalAmount = monthlyPayment - interestAmount;

            remainingPrincipal -= principalAmount;

            payments[i] = Payment(
                i + 1,
                monthlyPayment,
                principalAmount,
                interestAmount,
                remainingPrincipal
            );
        }

        return payments;
    }
    
    function calculateMonthlyPayment(
        uint256 _loanAmount,
        uint256 _monthlyInterestRate,
        uint256 _loanTermMonths
        ) internal pure returns (uint256) 
    {
        // Calculate monthly payment using the loan amortization formula
        uint256 denominator = (1 + _monthlyInterestRate)**_loanTermMonths;
        return (_loanAmount * _monthlyInterestRate * denominator) / (denominator - 1);
    }

    function calculateTotal() external returns (uint256, uint256) {
        totalInterestAmount = 0;
        totalPaymentAmount = 0;

        for (uint256 i = 0; i < loanTermMonths; i++) {
            totalInterestAmount += payment.interestAmount;
            totalPaymentAmount += payment.installmentAmount;
        }

        return (totalInterestAmount, totalPaymentAmount);
    }
}
