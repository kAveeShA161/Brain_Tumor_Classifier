# 🧠 Brain Tumor Classification using MRI Images

## 📌 Project Overview
Brain tumor detection is a critical medical task. Early detection can significantly improve patient survival rates.  
This project uses **Deep Learning (CNN & VGG16)** to classify MRI brain images into four categories:

- Glioma Tumor  
- Meningioma Tumor  
- Pituitary Tumor  
- No Tumor  

The system is deployed as a **web application using Flask (backend) and React (frontend)**.

---

## 🎯 Objectives
- Build a deep learning model for brain tumor classification
- Compare two models (Custom CNN vs VGG16)
- Develop a full ML pipeline
- Deploy a working web application

---

## 📊 Dataset
- **Source:** Kaggle  
- **Dataset Link:** https://www.kaggle.com/datasets/sartajbhuvaji/brain-tumor-classification-mri  

### Dataset Details:
- Total Images: ~3000  
- Classes:
  - Glioma (~826)
  - Meningioma (~822)
  - Pituitary (~827)
  - No Tumor (~395)

---

## 🧠 Features & Target
- **Features:** MRI Image pixel values (64 × 64 × 3)
- **Target Variable:** Tumor Type (4 classes)

---

## ⚙️ Technologies Used
- Python
- TensorFlow / Keras
- NumPy, Matplotlib, Scikit-learn
- Flask (Backend)
- React.js (Frontend)

---

## 🔄 Machine Learning Pipeline

### 1. Data Preprocessing
- Image rescaling (normalization)
- Data augmentation:
  - Shear transformation
  - Zoom
  - Horizontal flipping
- Train-Test split using directory structure

---

### 2. Models Used

#### ✅ Model 1: Custom CNN
- Convolutional Layers
- MaxPooling Layers
- Fully Connected Layers

#### ✅ Model 2: VGG16 (Transfer Learning)
- Pretrained on ImageNet
- Frozen base layers
- Custom classifier added

### Features of web application:
- Upload MRI image
- Preview image before prediction
- Predict tumor type
- Color-coded result:
  - 🟢 Green → No Tumor
  - 🔴 Red → Tumor detected

---
