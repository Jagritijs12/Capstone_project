const express = require("express");
const app = express();

// Define a port
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
