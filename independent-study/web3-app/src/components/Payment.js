import React from 'react';

const Payment = () => {
  return (
    <div>
      <h2>Payment Page</h2>
      <p>This is the payment page.</p>
    </div>
  );
};

export default Payment;

const data = [
  {
    "Payment Number": 1,
    "Installment Amount": "5000",
    "Interest Amount":"100",
    "Principal Amount":"4500",
    "remainingPrincipal": "10000",
    "status": "Already Paid",
  },
  {
    "Payment Number": 2,
    "Installment Amount": "5000",
    "Interest Amount":"100",
    "Principal Amount":"4500",
    "remainingPrincipal": "10000",
    "status": "Already Paid",
  },
  {
    "Payment Number": 3,
    "Installment Amount": "5000",
    "Interest Amount":"100",
    "Principal Amount":"4500",
    "remainingPrincipal": "10000",
    "status": "Not yet paid",
  }
]