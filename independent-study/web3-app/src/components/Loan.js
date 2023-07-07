import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/loan.css'

const Loan = () => {
  const [LoanAmount, setLoanAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      LoanAmount
    });
  }

  return (
    <div className="container">
       <div className="form-container">
        <h2>Loan Application: Minimum Eligibility</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="LoanAmount">LoanAmount:</label>
            <input
              type="text"
              id="LoanAmount"
              value={LoanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            </div>
            <button type="submit">Submit</button>
        </form>
       </div>
    </div>
  );
};

export default Loan;
