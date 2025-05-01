import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://smart-shelf-backend-1w1c.onrender.com"; // Updated backend URL

// Upload Image & Predict
export const predictImage = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/predict`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Prediction Error:", error);
        return { error: "Failed to get prediction." };
    }
};