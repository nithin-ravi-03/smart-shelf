const axios = require("axios");
const Image = require("../models/ImageModel");

// Upload & Predict Image
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Send image to Flask API for model prediction
        const flaskAPI = "https://flask-api1-mobilenetv2.onrender.com/predict";  // Flask API URL
        const flaskResponse = await axios.post(flaskAPI, {
            image_path: req.file.path
        });

        // Extract prediction result
        const { prediction, confidence } = flaskResponse.data;

        // Save in database
        const image = new Image({
            filename: req.file.filename,
            prediction,
            confidence
        });
        await image.save();

        res.json({ success: true, prediction, confidence });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
