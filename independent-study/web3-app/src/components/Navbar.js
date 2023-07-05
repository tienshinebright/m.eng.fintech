import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from 'react-router-dom';
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
              <NavLink exact to="/" activeClassName="active">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/borrower" activeClassName="active">BORROWER</NavLink>
            </li>
            <li>
              <NavLink to="/lender" activeClassName="active">LENDER</NavLink>
            </li>
            <li>
              <NavLink to="/lending-pools" activeClassName="active">LENDING POOLS</NavLink>
            </li>
            <li>
              <NavLink to="/analytics" activeClassName="active">ANALYTICS</NavLink>
            </li>
            <li>
              <NavLink to="/customer-support" activeClassName="active">CUSTOMER SUPPORT</NavLink>
            </li>
            <li className="navbar-button-container">
              <button className="navbar-button">LOG OUT</button>
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
