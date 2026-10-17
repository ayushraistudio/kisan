import os
import io
import json
import requests
import numpy as np
from PIL import Image
from abc import ABC, abstractmethod

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Any
from openai import OpenAI
import uvicorn
from dotenv import load_dotenv

load_dotenv()

# Suppress TensorFlow logging for a cleaner terminal
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array

# ==========================================
# GROQ API SETUP (FREE & FAST)
# ==========================================
# Make sure your API key is correct


# GROQ API SETUP
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError(
        "GROQ_API_KEY is missing. Configure it in your backend .env file."
    )

client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1",
)
class ChatRequest(BaseModel):
    message: str
    language: str
    diseaseData: Optional[Any] = None


# ==========================================
# DISEASE MODEL INTERFACE
# ==========================================

class DiseaseModelInterface(ABC):
    """Abstract base class defining the standard structure for any disease prediction model."""
    @abstractmethod
    async def predict(self, image_bytes: bytes, crop_type: str) -> dict:
        pass

class CustomKerasModel(DiseaseModelInterface):
    """Implementation for the local custom-trained ML model."""
    def __init__(self):
        self.model_path = 'custom_disease_model.h5'
        self.labels_path = 'class_labels.json'
        self.is_trained_and_loaded = False
        self.model = None
        self.class_labels = {}
        
        # Attempt to load model and labels on startup
        try:
            if os.path.exists(self.model_path) and os.path.exists(self.labels_path):
                self.model = tf.keras.models.load_model(self.model_path)
                with open(self.labels_path, 'r') as f:
                    self.class_labels = json.load(f)
                self.is_trained_and_loaded = True
                print("Success: Custom AI model loaded perfectly.")
            else:
                print("Warning: Custom model files not found.")
        except Exception as e:
            print(f"Warning: Failed to load custom model. Exception: {str(e)}")

    async def predict(self, image_bytes: bytes, crop_type: str) -> dict:
        if not self.is_trained_and_loaded:
            return {"status": "failed", "reason": "Custom model is not trained yet."}
        
        try:
            # Process incoming image
            image = Image.open(io.BytesIO(image_bytes))
            if image.mode != "RGB":
                image = image.convert("RGB")
            
            image = image.resize((224, 224))
            img_array = img_to_array(image)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = img_array / 255.0  # Normalize to [0, 1] exactly like training

            # Execute prediction
            predictions = self.model.predict(img_array, verbose=0)
            predicted_class_index = str(np.argmax(predictions[0]))
            confidence = float(np.max(predictions[0])) * 100

            predicted_label = self.class_labels.get(predicted_class_index, "Unknown")
            
            # Formatting class name for UI (e.g., "Leaf_Rust" -> "Leaf Rust")
            formatted_label = predicted_label.replace("_", " ")

            return {
                "status": "success",
                "prediction": formatted_label,
                "confidence": round(confidence, 1),
                "source": "Custom_Local_Model"
            }
        except Exception as e:
            return {"status": "failed", "reason": f"Prediction error: {str(e)}"}


class HybridModelManager:
    """Runs disease predictions using only the custom-trained TensorFlow model."""

    def __init__(self):
        self.primary_model = CustomKerasModel()

    async def get_prediction(self, image_bytes: bytes, crop_type: str) -> dict:
        return await self.primary_model.predict(image_bytes, crop_type)


# ==========================================
# FASTAPI APPLICATION SETUP
# ==========================================

app = FastAPI(title="Kisan Saathi AI API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://kisan-saaathi.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Initialize the architecture
ai_manager = HybridModelManager()

@app.get("/api/weather")
def get_weather(lat: float = 28.66, lon: float = 77.45):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    try:
        response = requests.get(url)
        return response.json() if response.status_code == 200 else {"error": "Weather fetch failed"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/analyze-disease")
async def analyze_disease(file: UploadFile = File(...), crop: str = Form("Wheat")):
    image_bytes = await file.read()
    
    # Process image through the custom TensorFlow model
    prediction_data = await ai_manager.get_prediction(image_bytes, crop)
    
    if prediction_data.get("status") != "success":
        raise HTTPException(
            status_code=503,
            detail=prediction_data.get("reason", "Disease prediction is currently unavailable."),
        )

    predicted_disease = prediction_data["prediction"]
    confidence_score = prediction_data["confidence"]
    source = prediction_data.get("source", "Custom_Local_Model")
    
    risk_level = "High Risk" if predicted_disease != "Healthy" else "Low Risk"
    
    recommended_actions = []
    if risk_level == "High Risk":
        recommended_actions.append({"action": "Apply Fungicide", "details": "Propiconazole 25% EC (1 ml/liter)"})
        recommended_actions.append({"action": "Manage Irrigation", "details": "Maintain moderate soil moisture"})
    else:
        recommended_actions.append({"action": "Maintain Routine", "details": "Crop looks healthy. Continue normal schedule."})
    
    return {
        "filename": file.filename,
        "crop_analyzed": crop,
        "prediction": predicted_disease,
        "confidence": confidence_score,
        "risk_level": risk_level,
        "actions": recommended_actions,
        "source": source
    }

# ==========================================
# GROQ AI CHAT ENDPOINT (STABLE MIXTRAL MODEL)
# ==========================================

@app.post("/api/chat")
async def chat_with_saathi(request: ChatRequest):
    try:
        system_prompt = (
            f"You are 'Kisan Saathi', an expert AI agriculture assistant for Indian farmers.\n"
            f"CRITICAL RULES:\n"
            f"1. LANGUAGE MATCHING: You must detect the language of the user's message. If the user writes in 'Hinglish' (e.g., 'kya karu'), you MUST reply entirely in Hinglish. If they write in Hindi script, reply in Hindi. If they write in English, reply in English.\n"
            f"2. FORMATTING: Structure your answer using short bullet points (-). Do not write long paragraphs. Keep it easy to read.\n"
            f"3. TONE: Keep your answers concise, practical, easy to understand, and highly accurate for farming."
        )

        # Inject disease data into context if the user has recently analyzed an image
        if request.diseaseData:
            disease_info = request.diseaseData.get("prediction", "Unknown condition")
            risk_level = request.diseaseData.get("risk_level", "Unknown risk")
            system_prompt += (
                f"\nContext: The user recently scanned a crop leaf on the dashboard. "
                f"The AI detected '{disease_info}' with a '{risk_level}'. "
                f"If the user asks about their crop health, disease, or recommended actions, base your advice strongly on this data."
            )

        # Make the API call using your exact original model
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=300
        )

        ai_reply = response.choices[0].message.content

        return {"reply": ai_reply}

    except Exception as e:
        print(f"Error communicating with Groq API: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch response from AI server.")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)