// Home.js
import React from "react";
import "./Home.css";
import Card from "./Card";

const Home = () => {
  const cardsData = [
    {
      id: 1,
      title: "About Logs",
      subtitle: "Tutorial",
      action: "Analyze Logs",
      icon: "/images/log.jpg",
      backgroundColor: "#ADE8F4",
      backText: (
        <>
          <h2>Logs Tutorial</h2>
          <p>Here you’ll learn how to parse, filter and visualize system logs step by step…</p>
        </>
      ),
    },
    {
      id: 2,
      title: "About Images",
      subtitle: "Tutorial",
      action: "Analyze Images",
      icon: "/images/img.jpg",
      backgroundColor: "#ADE8F4",
      backText: (
        <>
          <h2>Images Tutorial</h2>
          <p>Learn how to preprocess, segment and classify images using our AI models…</p>
        </>
      ),
    },
    {
      id: 3,
      title: "About Documents",
      subtitle: "Tutorial",
      action: "Analyze Documents",
      icon: "/images/doc.jpg",
      backgroundColor: "#ADE8F4",
      backText: (
        <>
          <h2>Documents Tutorial</h2>
          <p>Discover how to extract text, detect entities and summarize documents…</p>
        </>
      ),
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
