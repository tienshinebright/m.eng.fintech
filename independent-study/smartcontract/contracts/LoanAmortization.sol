// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoanAmortization {
    struct Payment {
        uint256 paymentNumber;
        uint256 paymentAmount;
        uint256 principalAmount;
        uint256 interestAmount;
        uint256 remainingBalance;
    }

    function calculateLoanAmortization(
        uint256 loanAmount,
        uint256 interestRate,
        uint256 loanTermMonths
    )
        public
        pure
        returns (Payment[] memory)
    {
        Payment[] memory payments = new Payment[](loanTermMonths);

        uint256 monthlyInterestRate = (interestRate * 10**18) / 100 / 12;
        uint256 monthlyPayment = calculateMonthlyPayment(
            loanAmount,
            monthlyInterestRate,
            loanTermMonths
        );

        uint256 remainingBalance = loanAmount;

        for (uint256 i = 0; i < loanTermMonths; i++) {
            uint256 interestAmount = (remainingBalance * monthlyInterestRate) / 10**18;
            uint256 principalAmount = monthlyPayment - interestAmount;

            remainingBalance -= principalAmount;

            payments[i] = Payment(
                i + 1,
                monthlyPayment,
                principalAmount,
                interestAmount,
                remainingBalance
            );
        }

        return payments;
    }

    function calculateMonthlyPayment(
        uint256 loanAmount,
        uint256 monthlyInterestRate,
        uint256 loanTermMonths
    )
        internal
        pure
        returns (uint256)
    {
        // Calculate monthly payment using the loan amortization formula
        uint256 denominator = (1 + monthlyInterestRate)**loanTermMonths;

        return (loanAmount * monthlyInterestRate * denominator) / (denominator - 1);
    }
}

contract LoanAmortizationExample {
    LoanAmortization loanAmortization;

    constructor() {
        loanAmortization = new LoanAmortization();
    }

    function getLoanAmortization() public view returns (LoanAmortization.Payment[] memory) {
        // Provide example values for loanAmount, interestRate, and loanTermMonths
        uint256 loanAmount = 100000;  // $100,000
        uint256 interestRate = 5;     // 5%
        uint256 loanTermMonths = 12;  // 12 months

        return loanAmortization.calculateLoanAmortization(
            loanAmount,
            interestRate,
            loanTermMonths
        );
    }
}
