# 🛒 Grocery Image Classifier

This is a full-stack image classification app where users can upload images of grocery items and receive predictions (item name and confidence) in real time from a moel which is selected by the user. The prediction is powered by a pre-trained MobileNetV2,Resnet50 and Densenet1698 deep learning model deployed through a Flask API. The UI and interaction are handled via a React frontend, with a Node.js + Express backend that communicates between the frontend and ML model.

> 🚀 **Live Demo**: [Add your deployed URL here](https://your-live-demo-link.com)

---

## 📌 Features

- 🖼️ Upload images of grocery items
- 🧠 Get instant predictions using a MobileNetV2 ML model
- 📈 View prediction confidence score
- 🔁 End-to-end integration from frontend to ML model API

---

## 🔧 Tech Stack

### 🧩 Frontend
- React.js
- Axios
- Tailwind CSS

### 🔧 Backend
- Node.js
- Express.js
- MongoDB (for storing results)
- Multer (image upload)

### 🤖 Machine Learning API
- Flask
- TensorFlow + MobileNetV2
- NumPy, Pillow (image processing)

### ☁️ Deployment
- Frontend: Vercel / Netlify
- Backend: Render / Cyclic
- ML API: Render

---

## 🔍 How It Works

1. **User Uploads Image**  
   ↳ React frontend allows the user to select and preview a grocery image.

2. **Image Sent to Backend**  
   ↳ The image is sent to the Express.js backend via Axios.

3. **Backend Forwards to Flask API**  
   ↳ Express uploads the image to the ML Flask API which processes and classifies it using MobileNetV2.

4. **Prediction Returned**  
   ↳ Flask returns the predicted label + confidence, and the backend forwards it to the frontend.

5. **Result Displayed**  
   ↳ Frontend shows the predicted grocery item and the confidence score.

---

## 🚀 Getting Started Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/grocery-image-classifier.git
cd grocery-image-classifier

# Setup backend
cd backend
npm install
npm start

# Setup frontend
cd ../frontend
npm install
npm run dev
