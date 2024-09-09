import { useState, useEffect } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';
import React from 'react';
import './main.css'; 

const App = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchBalance = async () => {
    const balance = await dbank_backend.checkBalance();
    setCurrentValue(balance.toFixed(2));   
    console.log(balance);   
  };

  fetchBalance();

  function  handleClick(){
    let topUp = document.getElementById('input-amount').value;
    let withdraw = document.getElementById('withdrawal-amount').value;
    if (topUp === "0" && withdraw === "0") {
      alert("Please enter a value to top up or withdraw");
      return;
    }
    if(topUp ==""){
      topUp = 0;
    }
    if(withdraw == ""){
      withdraw = 0;
    }
    setIsUpdating(true);
    const finallingTransaction = async () => {
      await dbank_backend.topUp(parseFloat(topUp));
      await dbank_backend.withdraw(parseFloat(withdraw));
      setIsUpdating(false);
      console.log("Transaction finalised");
      fetchBalance();
      document.getElementById('input-amount').value = 0;
      document.getElementById('withdrawal-amount').value = 0;  
    }
    finallingTransaction();
    
  }

  return (
    <div className="container">
      <img src="/dbank_logo.png" alt="DBank logo" width="200" />
      <h1>
        Current Balance: $<span id="value">{currentValue}</span>
      </h1>
      <div className="divider"></div>
      <form action="#">
        <h2>Amount to Top Up</h2>
        <input
          id="input-amount"
          type="number"
          step="0.01"
          min="0"
          name="topUp"
          defaultValue="0"
        />
        <h2>Amount to Withdraw</h2>
        <input
          id="withdrawal-amount"
          type="number"
          name="withdraw"
          step="0.01"
          min="0"
          defaultValue="0"
        />
        <input
          id="submit-btn"
          type="submit"
          value="Finalise Transaction"
          onClick ={handleClick}
          disabled={isUpdating}
        />
      </form>
    </div>
  );
};

export default App;
