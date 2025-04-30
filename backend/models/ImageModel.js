const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    filename: String,
    prediction: String,
    confidence: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", ImageSchema);
