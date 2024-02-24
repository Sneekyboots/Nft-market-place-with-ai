import React from "react";
import "./UserCard.css";

const UserCard = () => {
  return (
    <div className="layout user-card">
      <div className="avatar">SD</div>
      <div className="user-details">
        <h3>Sourav Das</h3>
        <div className="flex">
          <h4>1.2343 ETH</h4>
          <div className="flex">
            <p>account address</p>
            <div>copy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
