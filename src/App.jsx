import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import CoinFlip from "./components/Coinflip.jsx";
import img from "../src/assets/images/background.jpg";
import logo from "../src/assets/images/logo.png";
import { GrInstallOption } from "react-icons/gr";

function App() {
  const [wallet, setWallet] = useState({
    address: "",
    balance: null,
  });

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [address] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);

        setWallet({
          address,
          balance: ethers.utils.formatEther(balance),
        });
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Please connect your MetaMask wallet.");
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to use this feature."
      );
    }
  };

  return (
    <>
      <div className="App">
        <img src={img} alt="background image" />
        {!wallet.address ? (
          <>
            <center className="center-content floating-content ">
              <h1>FlipFortune</h1>
              <button onClick={connectWallet}>Connect Wallet</button>
            </center>
            <h4>
              <a
                className="bottom-info"
                href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en&pli=1"
                target="__blank"
              >
                You will be needing MetaMask in your Browser <GrInstallOption />
              </a>
            </h4>
          </>
        ) : (
          <>
            <div className="title" onClick={() => window.location.reload()}>
              <img className="logo" src={logo} alt="logo" /> FlipFortune
            </div>
            <div className="balance">
              <strong>Balance:</strong>
              <span className="amount">
                {wallet.balance ? `${wallet.balance} ETH` : "Loading..."}
              </span>
            </div>
            <div className="center-content">
              <CoinFlip wallet={wallet} setWallet={setWallet} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
