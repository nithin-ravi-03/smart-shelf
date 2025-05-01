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
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = req.file.path; // Get uploaded file path

        // Create a new FormData object
        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath), {
            filename: req.file.originalname,
        });

        // Send image to Flask API
        const flaskResponse = await axios.post("https://flask-api1-mobilenetv2.onrender.com/predict", formData, {
            headers: {
              ...formData.getHeaders(),
            },
          });
          
        

        // Delete the uploaded file after processing
        fs.unlinkSync(filePath);

        // Send the Flask API response back to the frontend
        res.json(flaskResponse.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start server
const PORT = process.env.PORT || 5001; // Use port 5001
app.listen(PORT, () => {
    console.log(`MERN Backend running on http://localhost:${PORT}`);
});