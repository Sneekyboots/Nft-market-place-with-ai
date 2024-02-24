import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="layout navbar">
      <div className="searchbar">
        <input name="search" type="text" />
      </div>
      <div className="action">
        <div>
          <button>notification</button>
        </div>
        <div>
          <button>creator / collection</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
