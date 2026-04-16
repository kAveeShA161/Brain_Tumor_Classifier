import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload an image.");

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5050/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Error predicting image.");
    }
    setLoading(false);
  }

  // Determine color: green if no tumor, red if tumor
  const getResultColor = (pred) => {
    if (!pred) return '#000';
    return pred.toLowerCase() === 'no tumor' ? 'green' : 'red';
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🧠 Brain Tumor Classifier</h2>
        <p style={styles.subtitle}>Upload an MRI image to predict if it contains a brain tumor.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="file" accept="image/*" onChange={handleFileChange} style={styles.input} />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>

        {preview && (
          <div style={styles.previewContainer}>
            <h4>Uploaded Image:</h4>
            <img src={preview} alt="MRI Preview" style={styles.previewImage} />
          </div>
        )}

        {prediction && !loading && (
          <div style={styles.resultContainer}>
            <h3>
              Prediction: <span style={{ ...styles.result, color: getResultColor(prediction) }}>{prediction}</span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    padding: '50px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    background: '#fff',
    borderRadius: '15px',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    textAlign: 'center'
  },
  title: { marginBottom: '10px', color: '#333' },
  subtitle: { marginBottom: '20px', color: '#666', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' },
  input: { padding: '10px', borderRadius: '10px', border: '1px solid #ccc', width: '100%' },
  button: {
    padding: '12px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#667eea',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s'
  },
  previewContainer: { marginTop: '20px' },
  previewImage: { maxWidth: '100%', maxHeight: '300px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', marginTop: '10px' },
  resultContainer: { marginTop: '20px' },
  result: { fontWeight: 'bold' }
};

export default UploadForm;