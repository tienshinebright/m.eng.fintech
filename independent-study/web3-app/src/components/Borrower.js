// Borrower.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../borrower.css'

const Borrower = () => {
  const [fullName, setFullName] = useState('');
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [education, setEducation] = useState('');
  const [sourceOfIncome, setSourceOfIncome] = useState('');
  const [businessInfo, setBusinessInfo] = useState('');
  const [accountAddress, setAccountAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [communityName, setCommunityName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or data handling here
    console.log('Form submitted:', {
      fullName,
      salary,
      email,
      address,
      education,
      sourceOfIncome,
      businessInfo,
      accountAddress,
      phoneNumber,
      communityName,
    });
  };

  return (
    <div className="container">
      <h2>Your Information</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          </div>

        <div className="form-row">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="sourceOfIncome">Source of Income:</label>
          <input
            type="text"
            id="sourceOfIncome"
            value={sourceOfIncome}
            onChange={(e) => setSourceOfIncome(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="businessInfo">Your Business Information:</label>
          <textarea
            id="businessInfo"
            value={businessInfo}
            onChange={(e) => setBusinessInfo(e.target.value)}
          ></textarea>
        </div>

        <div className="form-row">
          <label htmlFor="communityName">Lending Pool Community Name:</label>
          <input
            type="text"
            id="communityName"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
          />
        </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="link-container">
        <Link to="/borrower/loan">Go to Loan</Link>
      </div>
    </div>
  );
};

export default Borrower;
