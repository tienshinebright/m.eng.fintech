import React, { useState } from 'react';
import '../css/loan.css'

const Loan = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTermMonths, setLoanTermMonths] = useState('');
  const [interestRate, setInterestRate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      loanAmount,
      loanTermMonths,
      interestRate
    });
  }

  return (
    <div className="container">
       <div className="form-container">
        <h2>Loan Application: Minimum Eligibility</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="loanAmount">Loan Amount:</label>
            <input
              type="text"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            </div>
            <div className="form-row">
            <label htmlFor="loanTermMonths ">Loan Term Months:</label>
            <input
              type="text"
              id="loanTermMonths "
              value={loanTermMonths }
              onChange={(e) => setLoanTermMonths(e.target.value)}
            />
            </div>
            <div className="form-row">
            <label htmlFor="interestRate">Interest Rate:</label>
            <input
              type="text"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            </div>
            <button type="submit">Submit</button>
        </form>
       </div>
    </div>
  );
};

export default Loan;
