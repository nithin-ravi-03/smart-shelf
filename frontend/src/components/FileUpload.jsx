import React, { useState } from "react";
import { motion } from "framer-motion";
import { predictImage } from "../api/api";
import PredictionResult from "./PredictionResult";
import { toast } from "react-toastify";

const FileUpload = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);

    // Handle Image Selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle Prediction
    const handlePredict = async () => {
        if (!image) {
            toast.error("Please upload an image!");
            return;
        }

        const formData = new FormData();
        formData.append("file", image); // Use "file" as the key

        const response = await predictImage(formData);
        if (response.error) {
            toast.error(response.error);
        } else {
            setResult(response);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <motion.label
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                whileHover={{ scale: 1.1 }}
            >
                Upload Image
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </motion.label>

            {preview && (
                <motion.img
                    src={preview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}

            <motion.button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handlePredict}
                whileHover={{ scale: 1.1 }}
            >
                Predict
            </motion.button>

            {result && <PredictionResult result={result} />}
        </div>
    );
};

export default FileUpload;