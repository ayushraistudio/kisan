# 🌾 Kisan Saathi

**AI-powered crop health analysis and farming assistance for Indian farmers.**

Kisan Saathi is a web-based farming dashboard that brings crop disease analysis, weather information, crop guidance, market-price views, farming knowledge, and an AI agriculture assistant into one interface.

**Live Demo:** https://kisan-saaathi.vercel.app/

---

## ✨ Features

- **Crop Disease Detection** — Upload a crop-leaf image to receive a predicted label, confidence score, risk level, and suggested next steps.
- **Saathi AI Assistant** — Ask farming questions with language-aware responses.
- **Weather Information** — Retrieve weather data through Open-Meteo.
- **Crop Advisory** — Browse guidance for Wheat, Rice, Maize, and Potato.
- **Market Prices** — Explore crop market-price charts.
- **Knowledge Hub** — Search farming knowledge articles.
- **Expert Connect** — Browse the expert directory and available contact interactions.
- **Alerts and Settings** — Review alerts and manage available profile preferences.
- **Responsive Dashboard** — Navigate through the sidebar and top bar.

> **Note:** Some dashboard sections currently use frontend-defined or static sample data rather than live services. See [Current Limitations](#-current-limitations).

## 🧰 Technology Stack

### Frontend
- Next.js with the App Router
- React and TypeScript
- Tailwind CSS
- Axios, React Dropzone, Recharts, Zustand
- i18next / react-i18next, lucide-react, react-hot-toast

### Backend
- Python, FastAPI, Uvicorn, Pydantic
- TensorFlow / Keras
- NumPy and Pillow for image processing
- Requests for external HTTP calls
- OpenAI-compatible Python client for Groq

### External Services
- **Open-Meteo** — Weather data
- **Groq API** — AI chat responses

## 🏗️ Architecture

```text
User
  │
  ▼
Next.js + React frontend
  ├── Weather requests ─────► FastAPI ─────► Open-Meteo
  ├── Crop image upload ────► FastAPI ─────► TensorFlow/Keras model
  └── Assistant messages ───► FastAPI ─────► Groq API
  │
  ▼
Results displayed in the dashboard
```

## 📁 Project Structure

```text
ai-krishi-advisor/
├── LICENSE
├── README.md
├── backend/
│   ├── main.py
│   ├── train_model.py
│   ├── requirements.txt
│   ├── class_labels.json
│   ├── custom_disease_model.h5
│   └── dataset/
│       ├── Early_Blight/
│       ├── Healthy/
│       └── Late_Blight/
└── frontend/
    ├── package.json
    ├── package-lock.json
    └── src/
        ├── app/
        │   ├── page.tsx
        │   ├── disease-detection/
        │   ├── my-farm/
        │   ├── crop-advisory/
        │   ├── weather/
        │   ├── market-prices/
        │   ├── knowledge-hub/
        │   ├── expert-connect/
        │   ├── alerts/
        │   └── settings/
        ├── components/
        └── i18n/
```

Generated directories such as `node_modules/`, `.next/`, and Python virtual environments should not be committed.

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- Python version compatible with `backend/requirements.txt`
- A Groq API key
- The trained model and class-label files for local disease inference

### 1. Clone the repository

```bash
git clone https://github.com/ayushraistudio/kisan.git
cd kisan
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
```

Activate the environment:

**Windows PowerShell**
```powershell
.\venv\Scripts\Activate.ps1
```

**macOS / Linux**
```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key
```

Start the API from the `backend/` directory:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The local API will be available at `http://localhost:8000`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Ensure the frontend uses this variable for backend requests. Restart Next.js after changing environment variables.

Run the frontend:

```bash
npm run dev
```

Open `http://localhost:3000`.

## 🔌 API Endpoints

| Method | Endpoint | Purpose | Request |
|---|---|---|---|
| `GET` | `/api/weather` | Fetch weather information | Optional `lat` and `lon` query parameters |
| `POST` | `/api/analyze-disease` | Analyze a crop image | Multipart fields: `file`, optional `crop` |
| `POST` | `/api/chat` | Get an AI assistant response | JSON with `message`, `language`, optional `diseaseData` |

### Example chat request

```json
{
  "message": "Meri fasal ke patton par daag hain, kya karun?",
  "language": "Hinglish",
  "diseaseData": null
}
```

A successful chat response uses this shape:

```json
{
  "reply": "..."
}
```

Refer to `backend/main.py` for the exact request validation and response fields.

## 🧠 Machine Learning

The project includes a TensorFlow/Keras image-classification model and a class-label mapping file. The training script uses a MobileNetV2-based model with a custom classification head. Images are resized to `224 × 224` and pixel values are normalized to `[0, 1]`.

The dataset contains **4,500 images** across three classes:

| Class | Image count |
|---|---:|
| Early Blight | 1,000 |
| Healthy | 1,591 |
| Late Blight | 1,909 |
| **Total** | **4,500** |

Dataset size alone does not establish real-world accuracy. Evaluate the model on a separate, representative test set before relying on predictions in the field.

## 🔐 Configuration and Security

- Keep `GROQ_API_KEY` in the backend environment; never commit it to source control.
- Set `NEXT_PUBLIC_API_URL` to the correct backend base URL for each environment.
- Configure CORS for only the frontend origins you intend to support.
- CORS controls browser cross-origin access; it is not API authentication. Add server-side authentication and rate limiting if access restrictions are required.
- Do not commit `.env` files, build outputs, virtual environments, or private credentials.
- Rotate any API credential that has previously been exposed.

## ⚠️ Current Limitations

- Disease predictions depend on the availability and suitability of the local model and label mapping.
- AI chat requires a valid Groq API key and network access.
- Some market-price, advisory, alert, expert, and knowledge content may be static or frontend-managed rather than live.
- A configured database and a dedicated automated test suite are not documented in the current project.
- Predictions are informational. Confirm consequential crop-treatment decisions with a qualified agricultural expert.

## 🛣️ Possible Improvements

- Connect market prices and additional agricultural data to reliable live APIs.
- Add automated tests for frontend flows and backend endpoints.
- Evaluate disease-model performance using a separate test dataset and report class-wise metrics.
- Add authentication, rate limiting, structured logging, and monitoring where appropriate.
- Improve accessibility and test mobile and desktop layouts.

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request with a clear description.

## 📄 License

This project is distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

<p align="center">
  Built to make practical farming guidance more accessible.
</p>
