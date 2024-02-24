import React from "react";
import { twMerge } from "tailwind-merge";
import "./Card.css";

const Card = ({ children, className }: any) => {
  return <div className={twMerge("card", className)}>{children}</div>;
};

export default Card;
