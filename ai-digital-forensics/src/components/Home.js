// src/pages/Home.js
import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="home-container">
      <h1>Welcome{user?.name ? `, ${user.name}` : user?.email ? `, ${user.email}` : ""}!</h1>
      <p>You have successfully logged in or registered.</p>
    </div>
  );
};

export default Home;
