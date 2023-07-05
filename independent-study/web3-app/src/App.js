import './App.css';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import LoanContract from './contracts/LoanContract.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loanAmount, setLoanAmount] = useState(0);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [isLoanRepaid, setIsLoanRepaid] = useState(false);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);
        } catch (error) {
          console.error('Error connecting to Web3 provider', error);
        }
      } else {
        console.error('Web3 provider not found');
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = LoanContract.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          LoanContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Error initializing contract', error);
      }
    };

    if (web3) {
      initializeContract();
    }
  }, [web3]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      } catch (error) {
        console.error('Error fetching accounts', error);
      }
    };

    if (web3) {
      fetchAccounts();
    }
  }, [web3]);

  const handleRepayLoan = async () => {
    try {
      const receipt = await contract.methods.repayLoan().send({
        from: accounts[0],
        value: repaymentAmount
      });
      console.log('Loan repaid:', receipt);
      setIsLoanRepaid(true);
    } catch (error) {
      console.error('Error repaying loan', error);
    }
  };

  return (
    <div>
      <h1>Loan Details</h1>
      <p>Lender: {contract && contract.options.address}</p>
      <p>Borrower: {accounts[0]}</p>
      <p>Loan Amount: {loanAmount} ETH</p>
      <p>Repayment Amount: {repaymentAmount} ETH</p>
      <p>Loan Status: {isLoanRepaid ? 'Repaid' : 'Not Repaid'}</p>
      <button onClick={handleRepayLoan} disabled={isLoanRepaid}>
        Repay Loan
      </button>
    </div>
  );
};

export default App;
