import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer breakout">
      <div className="footer-header">
        If you want something to be truly and wholeheartedly yours, turn it into
        an NFT.
      </div>
      <div className="footer-links">
        <div className="link">
          <h5>Marketplace</h5>
          <p>Home</p>
          <p>Get Started</p>
          <p>Discover</p>
          <p>Learn More</p>
        </div>
        <div className="link">
          <h5>Company</h5>
          <p>About Us</p>
          <p>Services</p>
          <p>Team Info</p>
        </div>
        <div className="link">
          <h5>Contact</h5>
          <p>Github</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
