import React from "react";
import "./Home.css";
import Card from "./Card";

const Home = () => {
  const cardsData = [
    {
      id: 1,
      title: "About Logs",
      subtitle: "Learn More",
      action: "Analyze Logs",
      icon: "/images/log.jpg", // Corrected local image path
      backgroundColor: "#64ffda",
    },
    {
      id: 2,
      title: "About Images",
      subtitle: "Learn More",
      action: "Analyze Images",
      icon: "/images/img.jpg", // Corrected local image path
      backgroundColor: "#64ffda",
    },
    {
      id: 3,
      title: "About Documents",
      subtitle: "Learn More",
      action: "Analyze Documents",
      icon: "/images/doc.jpg", // Corrected local image path
      backgroundColor: "#64ffda",
    },
  ];

  return (
    <section className="home">

      <div className="cards-container">
        {cardsData.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Home;