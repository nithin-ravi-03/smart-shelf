import React from "react";
import { motion } from "framer-motion";

const PredictionResult = ({ result }) => {
    return (
        <motion.div
            className="bg-white shadow-lg rounded-md p-4 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
        >
            <h2 className="text-xl font-bold text-gray-700">Prediction Result</h2>
            <p className="text-gray-500">
                Predicted Class: <span className="font-semibold">{result.predicted_class}</span>
            </p>
            <p className="text-gray-500">
                Confidence: <span className="font-semibold">{(result.confidence * 100).toFixed(2)}%</span>
            </p>
        </motion.div>
    );
};

export default PredictionResult;