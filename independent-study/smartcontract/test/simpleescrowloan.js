const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EscrowLoan", function () {
  let escrowLoan;
  let borrower;
  let lender;
  const loanAmount = ethers.utils.parseEther("1");
  const interestRate = 5; // 5%
  const loanTerm = 1; // 1 month

  beforeEach(async () => {
    const EscrowLoan = await ethers.getContractFactory("EscrowLoan");
    escrowLoan = await EscrowLoan.deploy();
    await escrowLoan.deployed();

    [borrower, lender] = await ethers.getSigners();
  });

  it("should create a loan", async function () {
    const createLoanTx = await escrowLoan.createLoan(interestRate, loanTerm, {
      value: loanAmount,
    });

    await createLoanTx.wait();

    const loans = await escrowLoan.loans(borrower.address);

    expect(loans.length).to.equal(1);
    expect(loans[0].loanAmount).to.equal(loanAmount);
    expect(loans[0].interestRate).to.equal(interestRate);
    expect(loans[0].term).to.equal(loanTerm);
    expect(loans[0].borrower).to.equal(borrower.address);
    expect(loans[0].lender).to.equal(ethers.constants.AddressZero);
    expect(loans[0].isRepaid).to.be.false;
  });

  it("should lend a loan", async function () {
    await escrowLoan.createLoan(interestRate, loanTerm, { value: loanAmount });

    const lendLoanTx = await escrowLoan.lendLoan(borrower.address, 0, {
      value: loanAmount,
    });

    await lendLoanTx.wait();

    const loans = await escrowLoan.loans(borrower.address);

    expect(loans[0].lender).to.equal(lender.address);
  });

  it("should repay a loan", async function () {
    await escrowLoan.createLoan(interestRate, loanTerm, { value: loanAmount });
    await escrowLoan.lendLoan(borrower.address, 0, { value: loanAmount });

    const repayLoanTx = await escrowLoan.repayLoan(borrower.address, 0, {
      value: loanAmount,
    });

    await repayLoanTx.wait();

    const loans = await escrowLoan.loans(borrower.address);

    expect(loans[0].isRepaid).to.be.true;
  });
});
