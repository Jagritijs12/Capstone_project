const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./routes/auth");
const tutorialRoutes = require("./routes/tutorial");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/tutorials", express.static(path.join(__dirname, "tutorials"))); // static files if needed

// Serve frontend
app.use(express.static(path.join(__dirname, "public"))); // built React files go here

// React routing fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5001, () => console.log("Server running on port 5001"));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
