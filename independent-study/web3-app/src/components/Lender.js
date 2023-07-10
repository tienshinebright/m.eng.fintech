import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Lender = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [investmentPreference, setInvestmentPreference] = useState('');
  const [riskAppetite, setRiskAppetite] = useState('');
  const [lendingPoolCommunityName, setLendingPoolCommunityName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:',{
      fullName,
      email,
      address,
      phoneNumber,
      investmentPreference,
      riskAppetite,
      lendingPoolCommunityName
    });
  };

  return (
    <div className="container">
      <div className="form-container">
      <h2>Lender Personal Information</h2>
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
          <label htmlFor="email">Email:</label>
          <input
            type="text"
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
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="investmentPreference">Investment Preference:</label>
          <input
            type="text"
            id="investmentPreference"
            value={investmentPreference}
            onChange={(e) => setInvestmentPreference(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="riskAppetite">Risk Appetite:</label>
          <input
            type="text"
            id="riskAppetite"
            value={riskAppetite}
            onChange={(e) => setRiskAppetite(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="lendingPoolCommunityName">Lending Pool Community Name:</label>
          <input
            type="text"
            id="lendingPoolCommunityName"
            value={lendingPoolCommunityName}
            onChange={(e) => setLendingPoolCommunityName(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
      <div className="link-container">
        <Link to="/lender/claims">Claim Funds</Link>
      </div>
    </div>
  );
};

export default Lender;