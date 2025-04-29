// Home.js
import React from "react";
import "./Home.css";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const cardsData = [
    {
      id: 1,
      title: "About Logs",
      subtitle: "Tutorial",
      action: "Analyze Logs",
      icon: "/images/log.jpg", // Corrected local image path
      backgroundColor: "#64ffda",
      route: "/analyze/logs"
    },
    {
      id: 2,
      title: "About Images",
      subtitle: "Tutorial",
      action: "Analyze Images",
      icon: "/images/img.jpg", // Corrected local image path
      backgroundColor: "#64ffda",
      route: "/analyze/images"
    },
    {
      id: 3,
      title: "About Documents",
      subtitle: "Tutorial",
      action: "Analyze Documents",
      icon: "/images/doc.jpg", // Corrected local image path
      backgroundColor: "#64ffda",
      route: "/analyze/documents"
    },
  ];

  return (
    <section className="home">
      <div className="cards-container">
        {cardsData.map((card) => (
          <Card key={card.id} {...card} onActionClick={() => navigate(card.route)} />
        ))}
      </div>
    </section>
  );
};

export default Home;
