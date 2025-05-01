import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./components/FileUpload";

const App = () => {
    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Grocery Image Classifier</h1>
                <FileUpload />
            </div>
        </>
    );
};

export default App;