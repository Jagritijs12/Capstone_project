import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import global CSS (if you have any)
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome for icons

// Create a root for React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);