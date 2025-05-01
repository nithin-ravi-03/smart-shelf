const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const Image = require("../models/ImageModel");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath), {
      filename: req.file.originalname,
    });

    const flaskResponse = await axios.post(
      "https://flask-api1-mobilenetv2.onrender.com/predict",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    fs.unlinkSync(filePath);

    const { predicted_class, confidence } = flaskResponse.data;

    const image = new Image({
      filename: req.file.filename,
      prediction: predicted_class,
      confidence,
    });
    await image.save();

    res.json({ success: true, predicted_class, confidence });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};