// src/components/Card.js
import React from "react";
//import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ title, subtitle, action, icon, backgroundColor, onActionClick }) => {
  return (
    <div className="card" style={{ backgroundColor }}>
      <img src={icon} alt={title} className="card-icon" />
      <button className="card-button">{title}</button>
      <button className="card-button">{subtitle}</button>
      <button className="card-button" onClick={onActionClick}>{action}</button>
    </div>
  );
};

export default Card;
