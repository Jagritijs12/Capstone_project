const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const path = require('path');
const { spawn } = require("child_process");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/tutorials', express.static(path.join(__dirname, 'tutorials')));
app.use('/api/tutorials', require('./routes/tutorial'));
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => console.log('Server running on the port 5000'))
    })


// --- Predict from log data ---
app.post("/api/predict-log", (req, res) => {
    const py = spawn("python", ["./models/predict.py"]);
    py.stdin.write(JSON.stringify(req.body));
    py.stdin.end();
    
    let result = "";
    py.stdout.on("data", (data) => {
        result += data.toString();
    });
    
    py.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });
    
    py.on("close", (code) => {
        try {
            res.json({ prediction: parseInt(result.trim()) });
        } catch (err) {
            res.status(500).json({ error: "Prediction failed" });
        }
    });
});
    
// --- Predict from document features ---
app.post("/api/predict-doc", (req, res) => {
    const py = spawn("python", ["./models/predict_doc.py"]);
    py.stdin.write(JSON.stringify(req.body));
    py.stdin.end();
    
    let result = "";
    py.stdout.on("data", (data) => {
        result += data.toString();
    });
    
    py.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });
    
    py.on("close", (code) => {
        res.json({ prediction: result.trim() });
    });
});
    
// --- Predict from image path ---
app.post("/api/predict-img", (req, res) => {
    const py = spawn("python", ["./models/predict_img.py"]);
    py.stdin.write(JSON.stringify(req.body));
    py.stdin.end();
    
    let result = "";
    py.stdout.on("data", (data) => {
        result += data.toString();
    });
    
    py.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
    });
    
    py.on("close", (code) => {
        try {
            res.json(JSON.parse(result));
        } catch (e) {
            res.status(500).json({ error: "Invalid image prediction output" });
        }
    });
});
    