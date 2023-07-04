const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EscrowLoanAmortization", function () {
  // Step: 1 Define variables
  let escrow;
  let borrower;
  let lender1;
  let lender2;

  // Step: 2 Define constants for loan parameters
  const loanAmount = 15000;
  const loanTermMonths = 3;
  const interestRate = 8;

  // Set up the contract and accounts before each test
  beforeEach(async function () {
    // Deploy a new instance of EscrowLoanAmortization contract
    const EscrowLoanAmortization = await ethers.getContractFactory("EscrowLoanAmortization");
    [borrower, lender1, lender2] = await ethers.getSigners();

    escrow = await EscrowLoanAmortization.deploy(
      borrower.address,
      [lender1.address, lender2.address],
      loanAmount,
      loanTermMonths,
      interestRate,
      ethers.constants.AddressZero
    );
    await escrow.deployed();
  });

  // Test case: Check if the loan can be requested
  it("should request a loan", async function () {
    // Ensure contract is in wait status before making the request
    expect(await escrow.getContractStatus()).to.equal(1);

    // Call the requestLoan function
    await escrow.requestLoan();

    // Assert that the contract status has changed to acceptance status
    expect(await escrow.getContractStatus()).to.equal(2);
  });

  // Test case: Check if the loan can be transferred to the borrower
  it("should transfer the loan to the borrower", async function () {
    // Ensure contract is in acceptance status before transferring the loan
    await escrow.requestLoan();
    expect(await escrow.getContractStatus()).to.equal(2);

    // Call the transferLoanToBorrower function
    await escrow.transferLoanToBorrower();

    // Assert that the contract status has changed to returning status
    expect(await escrow.getContractStatus()).to.equal(3);
  });

  // Test case: Check if a payment can be made
  it("should make a payment", async function () {
    // Ensure contract is in returning status before making the payment
    await escrow.requestLoan();
    await escrow.transferLoanToBorrower();
    expect(await escrow.getContractStatus()).to.equal(3);

    // Call the makePayment function
    await escrow.makePayment();

    // Assert that the payment installment amount has increased
    expect((await escrow.payment()).installmentAmount).to.equal(1);

    // Assert that the contract status has changed to ending status
    expect(await escrow.getContractStatus()).to.equal(4);
  });

  // Test case: Check if funds can be withdrawn and distributed to lenders
  it("should withdraw funds and distribute to lenders", async function () {
    // Ensure contract is in ending status before withdrawing funds
    await escrow.requestLoan();
    await escrow.transferLoanToBorrower();
    await escrow.makePayment();
    expect(await escrow.getContractStatus()).to.equal(4);

    // Call the withdraw function
    await escrow.withdraw();

    // Assert that the lender balances have been updated correctly
    const lender1Balance = await escrow.lenderBalances(lender1.address);
    const lender2Balance = await escrow.lenderBalances(lender2.address);
    const totalPaymentAmount = loanAmount + (loanAmount * interestRate * loanTermMonths) / 100;

    expect(lender1Balance).to.equal(totalPaymentAmount / 2);
    expect(lender2Balance).to.equal(totalPaymentAmount / 2);
  });

  // Test case: Check if lenders can claim their funds
  it("should allow lenders to claim their funds", async function () {
    // Ensure contract is in ending status and funds have been distributed
    await escrow.requestLoan();
    await escrow.transferLoanToBorrower();
    await escrow.makePayment();
    await escrow.withdraw();
    expect(await escrow.getContractStatus()).to.equal(4);

    // Claim funds for lender1
    const lender1BalanceBefore = await ethers.provider.getBalance(lender1.address);
    await escrow.connect(lender1).claimFunds();
    const lender1BalanceAfter = await ethers.provider.getBalance(lender1.address);

    // Assert that lender1's balance has increased
    expect(lender1BalanceAfter.sub(lender1BalanceBefore)).to.equal(totalPaymentAmount / 2);

    // Claim funds for lender2
    const lender2BalanceBefore = await ethers.provider.getBalance(lender2.address);
    await escrow.connect(lender2).claimFunds();
    const lender2BalanceAfter = await ethers.provider.getBalance(lender2.address);

    // Assert that lender2's balance has increased
    expect(lender2BalanceAfter.sub(lender2BalanceBefore)).to.equal(totalPaymentAmount / 2);
  });
});
