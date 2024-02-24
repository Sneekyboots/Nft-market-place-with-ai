import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <div className="features">
      <p className="header">Getting Started</p>
      <p className="info-text">
        {`Buy and Sell NFTs from the world's top artists`}
      </p>
      <div className="items-box">
        <div className="item-container">
          <div className="item">
            <i className="bx bx-check-shield"></i>
          </div>
          <p>All transactions are safe</p>
        </div>
        <div className="item-container">
          <div className="item">
            <i className="bx bx-wallet-alt"></i>
          </div>
          <p>Connect your wallet</p>
        </div>
        <div className="item-container">
          <div className="item">
            <i className="bx bx-money"></i>
          </div>
          <p>Always free of any charges</p>
        </div>
        <div className="item-container">
          <div className="item">
            <i className="bx bx-rocket"></i>
          </div>
          <p>Very fast transactions</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
