import React, { useState } from 'react';
import '../css/lendingpools.css';
import borrowerOne from '../assets/b1.png';
import borrowerTwo from '../assets/b2.png';
import borrowerThree from '../assets/b3.png';

const LendingPools = () => {
  const [loanAmountA, setLoanAmountA] = useState('');
  const [progressA, setProgressA] = useState(0);

  const [loanAmountB, setLoanAmountB] = useState('');
  const [progressB, setProgressB] = useState(0);

  const [loanAmountC, setLoanAmountC] = useState('');
  const [progressC, setProgressC] = useState(0);

  const handleLoanAmountChangeA = (e) => {
    setLoanAmountA(e.target.value);
    // Update the progress based on the selected loan amount
    const selectedAmountA = parseInt(e.target.value);
    if (selectedAmountA === 3500) {
      setProgressA(33); // 33% progress
    } else if (selectedAmountA === 7500) {
      setProgressA(66); // 66% progress
    } else if (selectedAmountA === 15000) {
      setProgressA(100); // 100% progress
    } else {
      setProgressA(0); // Reset progress if no loan amount is selected
    }
  }

  const handleLoanAmountChangeB = (e) => {
    setLoanAmountB(e.target.value);
    // Update the progress based on the selected loan amount
    const selectedAmountB = parseInt(e.target.value);
    if (selectedAmountB === 4000) {
      setProgressB(33); // 33% progress
    } else if (selectedAmountB === 6000) {
      setProgressB(66); // 66% progress
    } else if (selectedAmountB === 12000) {
      setProgressB(100); // 100% progress
    } else {
      setProgressB(0); // Reset progress if no loan amount is selected
    }
  }

  const handleLoanAmountChangeC = (e) => {
    setLoanAmountC(e.target.value);
    // Update the progress based on the selected loan amount
    const selectedAmountC = parseInt(e.target.value);
    if (selectedAmountC === 2500) {
      setProgressC(33); // 33% progress
    } else if (selectedAmountC === 3750) {
      setProgressC(66); // 66% progress
    } else if (selectedAmountC === 7500) {
      setProgressC(100); // 100% progress
    } else {
      setProgressC(0); // Reset progress if no loan amount is selected
    }
  }


  return (
    <div className="container">
      <h2>Lending Pool #1: Sukhumvit Residents Association (10 Members)</h2>
      <div className="card-container">
        <div className="card">
          <h3>Level: 1 Matching</h3>
          <div className="sub-card">
            <img src={borrowerOne} alt="Profile" />
            <div className="info-container">
              <div className="info-row">
                <p>Full Name: <span>Saranya Suthipan</span></p>
              </div>
              <div className="info-row">
                <p>Salary: <span>30,000 Thai baht per month</span></p>
              </div>
              <div className="info-row">
                <p>Source of Income: <span>Employed as a Marketing Executive at XYZ Company</span></p>
              </div>
              <div className="info-row">
                <p>Loan Amount: <span>15,000 Thai baht</span></p>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressA}%` }}></div>
            </div>
            <div className="select-number">
              <select value={loanAmountA} onChange={handleLoanAmountChangeA}>
                <option value="15000">15,000</option>
                <option value="7500">7,500</option>
                <option value="3500">3,500</option>
              </select>
            </div>
            <button type="submit">Provide a Loan</button>
          </div>
          {/* ... other sub-cards ... */}
        </div>
        {/* ... other cards ... */}
        <div className="card">
          <h3>Level: 2 Matching</h3>
          <div className="sub-card">
            <img src={borrowerTwo} alt="Profile" />
            <div className="info-container">
              <div className="info-row">
                <p>Full Name: <span>Pongsak Wongchai</span></p>
              </div>
              <div className="info-row">
                <p>Salary: <span>25,000 Thai baht per month</span></p>
              </div>
              <div className="info-row">
                <p>Source of Income: <span>Business owner at ABC Company</span></p>
              </div>
              <div className="info-row">
                <p>Loan Amount: <span>12,000 Thai baht</span></p>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressB}%` }}></div>
            </div>
            <div className="select-number">
              <select value={loanAmountB} onChange={handleLoanAmountChangeB}>
                <option value="12000">12,000</option>
                <option value="6000">6,000</option>
                <option value="4000">4,000</option>
              </select>
            </div>
            <button type="submit">Provide a Loan</button>
          </div>
          {/* ... other sub-cards ... */}
        </div>
        {/* ... other cards ... */}
        <div className="card">
          <h3>Level: 3 Matching</h3>
          <div className="sub-card">
            <img src={borrowerThree} alt="Profile" />
            <div className="info-container">
              <div className="info-row">
                <p>Full Name: <span>Somchai Thongdee</span></p>
              </div>
              <div className="info-row">
                <p>Salary: <span>Varies based on restaurant profits</span></p>
              </div>
              <div className="info-row">
                <p>Source of Income: <span>Restaurant owner and chef</span></p>
              </div>
              <div className="info-row">
                <p>Loan Amount: <span>7,500 Thai baht</span></p>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressC}%` }}></div>
            </div>
            <div className="select-number">
              <select value={loanAmountC} onChange={handleLoanAmountChangeC}>
                <option value="7500">7,500</option>
                <option value="3750">3,750</option>
                <option value="2500">2,500</option>
              </select>
            </div>
            <button type="submit">Provide a Loan</button>
          </div>
          {/* ... other sub-cards ... */}
        </div>
        {/* ... other cards ... */}
      </div>
    </div>
  );
};

export default LendingPools;
