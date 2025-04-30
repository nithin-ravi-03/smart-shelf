const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// Upload image & get prediction
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
