require('dotenv').config();
const Web3 = require('web3');

// Connect to Ethereum network using Infura
const web3 = new Web3(process.env.INFURA_URL);

// Set the default account using the private key
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address;

// Instantiate the smart contract
const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = []; // Add your smart contract ABI here
const contract = new web3.eth.Contract(abi, contractAddress);

async function storeData(data) {
    try {
      const result = await contract.methods.storeData(data).send();
      console.log('Transaction Hash:', result.transactionHash);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  storeData('Hello, World!');
  