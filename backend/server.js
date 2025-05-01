const connectDB = require("./config/db"); // Adjust the path based on your project structure
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data"); // Add this
const uploadRoutes = require("./routes/uploadRoutes"); // Add this
require("dotenv").config();
// Connect to MongoDB
connectDB();


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

// Multer for handling image uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage });

// Use routes
app.use("/api", uploadRoutes); // Add this

// Route to handle image upload & send to Flask API
app.post("/predict", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            console.log("No file uploaded");
            return res.status(400).json({ error: "No file uploaded" });
        }
        // Add this check in your /predict route
        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads");
        }

        const filePath = req.file.path;
        console.log("Processing file:", filePath);

        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath), {
            filename: req.file.originalname,
        });

        console.log("Sending to Flask API...");
        const flaskResponse = await axios.post(
            process.env.FLASK_API_URL ||
            "https://flask-api1-mobilenetv2.onrender.com/predict",
            formData,
            {
                headers: formData.getHeaders(),
                timeout: 30000 // 30 seconds timeout
            }
        ).catch(err => {
            console.error("Flask API Error:", err.message);
            if (err.response) {
                console.error("Response data:", err.response.data);
                console.error("Response status:", err.response.status);
            }
            throw err;
        });

        fs.unlinkSync(filePath);
        console.log("Prediction successful:", flaskResponse.data);
        res.json(flaskResponse.data);
    } catch (error) {
        console.error("Full Error:", error);
        console.error("Stack Trace:", error.stack);
        res.status(500).json({ 
            error: "Internal server error",
            details: error.message 
        });
    }
});

// Start server
const PORT = process.env.PORT || 5001; // Use port 5001
app.listen(PORT, () => {
    console.log(`MERN Backend running on http://localhost:${PORT}`);
});