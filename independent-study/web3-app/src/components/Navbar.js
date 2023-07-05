import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Borrower from './Borrower';
import Lender from './Lender';
import LendingPools from './LendingPools';
import Analytics from './Analytics';
import CustomerSupport from './CustomerSupport';

import logo from '../assets/p2p.png';

const Navbar = () => {
  return (
    <Router>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
            <h1>Peer-To-Peer Lending Using Ethereum Blockchain</h1>
          </div>
          <ul className="navbar-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/borrower">Borrower</Link>
            </li>
            <li>
              <Link to="/lender">Lender</Link>
            </li>
            <li>
              <Link to="/lending-pools">Lending Pools</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/customer-support">Customer Support</Link>
            </li>
            <li className="navbar-button-container">
              <button className="navbar-button">Log Out</button>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrower" element={<Borrower />} />
        <Route path="/lender" element={<Lender />} />
        <Route path="/lending-pools" element={<LendingPools />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
