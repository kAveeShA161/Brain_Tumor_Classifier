from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # 0=all messages, 3=errors only

# Initialize app
app = Flask(__name__)
CORS(app)

# Create uploads folder if not exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Load model
model = load_model('model/brain_model.h5')
classes = ['Glioma', 'Meningioma', 'No Tumor', 'Pituitary']

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # Preprocess image
    img = image.load_img(filepath, target_size=(64,64))
    img_array = image.img_to_array(img)/255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predict
    pred = model.predict(img_array)
    predicted_class = classes[np.argmax(pred)]

    return jsonify({'prediction': predicted_class})

if __name__ == '__main__':
    # Run on all interfaces (0.0.0.0) and a safe port (5050)
    app.run(host='0.0.0.0', port=5050, debug=True)