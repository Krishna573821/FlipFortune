import React, { useState } from "react";
import "./CoinFlip.css";

const CoinFlip = ({ wallet, setWallet }) => {
  const [betAmount, setBetAmount] = useState("");
  const [side, setSide] = useState("heads");
  const [message, setMessage] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [outcome, setOutcome] = useState(null);

  const handleFlip = async () => {
    if (!betAmount || betAmount <= 0) {
      setMessage("Please enter a valid amount to bet.");
      return;
    }

    setFlipping(true);
    setMessage("");


    // Simulate the coin flip duration
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      setOutcome(result); // Set outcome state
      const bet = parseFloat(betAmount);
      const currentBalance = parseFloat(wallet.balance);

      if (result === side) {
        const newBalance = currentBalance + bet;
        setWallet((prevWallet) => ({
          ...prevWallet,
          balance: newBalance.toFixed(4),
        }));
        setMessage(
          `You won! The coin landed on ${result}. You get ${bet * 2} ETH.`
        );
      } else {
        const newBalance = currentBalance - bet;
        setWallet((prevWallet) => ({
          ...prevWallet,
          balance: newBalance.toFixed(4),
        }));
        setMessage(
          `You lost! The coin landed on ${result}. You lose your bet.`
        );
      }
      setFlipping(false);
    }, 2000);
  };

  return (
    <>
      <div className="coin-flip">
        <h2>Flip Your Way to Fortune!</h2>
        <div className={`coin ${flipping ? "flipping" : ""}`}>
          <div className="question-mark">?</div>
          <div
            className={`coin-face heads ${
              outcome === "heads" ? "show" : "hidden"
            }`}
          >
            H
          </div>
          <div
            className={`coin-face tails ${
              outcome === "tails" ? "show" : "hidden"
            }`}
          >
            T
          </div>
        </div>
        <div className="bet">
          <label>Bet Amount :</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
        </div>
        <div className="bet">
          <label>Choose Side :</label>
          <select value={side} onChange={(e) => setSide(e.target.value)}>
            <option value="heads">Heads</option>
            <option value="tails">Tails</option>
          </select>
        </div>
        <button onClick={handleFlip}>Flip Coin</button>
      </div>
      <p className="bet">{message}</p>
    </>
  );
};

export default CoinFlip;
