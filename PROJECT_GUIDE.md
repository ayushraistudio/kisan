# Project Guide

## 1. Project Introduction

Kisan Saathi is a Next.js and FastAPI farming application. Its primary integrated workflows are crop-image disease analysis and the Saathi agriculture chat assistant. The frontend also includes a broader dashboard experience for farm profile information, crop advice, weather, market prices, knowledge, experts, alerts, and settings.

The project is currently a local/demo-oriented application. Several frontend pages use local constants and React state rather than a persistence layer or live service. The backend combines a local TensorFlow model with cloud and mock fallbacks so that the disease workflow can still return a result when the primary model is unavailable.

## 2. Complete Architecture

```text
Browser
  |
  v
Next.js App Router frontend (frontend/src/app)
  |-- disease image -> POST /api/analyze-disease
  |-- chat message -> POST /api/chat
  |-- weather integration is available in FastAPI, while the current weather page uses local view data
  v
FastAPI application (backend/main.py)
  |-- weather -> Open-Meteo
  |-- disease -> CustomKerasModel
  |                 |-- success -> local result
  |                 |-- failure or confidence < 60 -> Roboflow
  |                 |-- both fail -> random fail-safe result
  |-- chat -> Groq OpenAI-compatible API
  v
JSON response
  |
  v
Frontend state, toast notifications, charts, and result panels
```

There is no database or shared server-side application state. Frontend settings, alerts, farm edits, article filters, expert requests, and most display data exist in component state or constants.

## 3. Complete Project Structure

```text
ai-krishi-advisor/
├── README.md
├── PROJECT_GUIDE.md
├── backend/
│   ├── main.py                 # FastAPI app, routes, integrations, inference
│   ├── train_model.py          # Dataset loading, training, checkpointing
│   ├── class_labels.json       # Numeric model index to class-name mapping
│   ├── custom_disease_model.h5 # Saved Keras model, 11,551,464 bytes in workspace
│   ├── dataset/
│   │   ├── Early_Blight/       # 1,000 images
│   │   ├── Healthy/            # 1,591 images
│   │   └── Late_Blight/        # 1,909 images
│   ├── venv/                   # Existing local Python environment directory
│   └── __pycache__/             # Generated Python cache directory
└── frontend/
    ├── package.json            # Scripts and npm dependencies
    ├── package-lock.json       # npm lockfile
    ├── next.config.ts          # Next.js compiler and dev-origin settings
    ├── tsconfig.json           # TypeScript compiler settings and @ alias
    ├── eslint.config.mjs       # Next.js ESLint configuration
    ├── postcss.config.mjs      # Tailwind PostCSS plugin
    ├── tailwind.config.ts      # Tailwind theme and scrollbar plugin
    ├── next-env.d.ts           # Next.js TypeScript declarations
    ├── AGENTS.md               # Next.js agent guidance
    ├── CLAUDE.md               # References the local agent guidance
    ├── public/
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    └── src/
        ├── app/
        │   ├── layout.tsx             # Root client layout and toaster
        │   ├── page.tsx               # Dashboard and upload flow
        │   ├── globals.css             # Global visual system and utilities
        │   ├── favicon.ico
        │   ├── alerts/page.tsx
        │   ├── crop-advisory/page.tsx
        │   ├── disease-detection/page.tsx
        │   ├── expert-connect/page.tsx
        │   ├── knowledge-hub/page.tsx
        │   ├── market-prices/page.tsx
        │   ├── my-farm/page.tsx
        │   ├── settings/page.tsx
        │   └── weather/page.tsx
        ├── components/layout/
        │   ├── AppShell.tsx             # Shared sidebar/topbar layout
        │   ├── SaathiAssistant.tsx      # Chat drawer and browser voice input
        │   ├── Sidebar.tsx               # Main route navigation
        │   └── Topbar.tsx                # Search, alerts, language, Saathi entry
        └── i18n/config.ts                # English, Hindi, Gujarati translations
```

The workspace also contains installed/generated frontend directories such as `node_modules/` and `.next/`. Individual dataset image filenames are not expanded in this guide; the class folders and verified counts are shown above.

## 4. Frontend Technology

| Technology/library | Version | Purpose | Project use |
|---|---|---|---|
| Next.js | 16.3.6 | React framework and App Router | Route pages under `src/app` and development/build scripts |
| React | 19.2.8 | Component rendering and state | All interactive pages and layout components |
| TypeScript | `^5` | Static typing | `.ts` and `.tsx` files; strict mode is enabled |
| Tailwind CSS | `^4` | Utility CSS processing | Tailwind directives and theme configuration; many components also use inline styles |
| Axios | `^1.20.0` | HTTP client | Disease-analysis requests from dashboard and disease page |
| React Dropzone | `^20.1.2` | File selection/drop handling | Crop-image upload controls |
| Recharts | `^3.10.1` | Charts | Dashboard yield/crop-health and market-price charts |
| i18next / react-i18next | `^26.4.2` / `^17.0.15` | Translation state and hooks | Sidebar, dashboard, and assistant language strings |
| react-hot-toast | `^2.6.1` | Toast notifications | Upload, analysis, settings, language, and error feedback |
| lucide-react | `^1.47.0` | Icons | Navigation and page controls |
| Zustand | `^5.0.15` | Client state library dependency | No concrete store usage was identified in the inspected source files |
| PostCSS | configured through `@tailwindcss/postcss` | CSS transformation | `postcss.config.mjs` |

`next.config.ts` enables the React Compiler and allows development origins `192.168.1.13` and `localhost`. The `@/*` TypeScript path maps to `frontend/src/*`.

## 5. Backend Technology

| Library | Version | Purpose | Where/how used |
|---|---|---|---|
| FastAPI | Not specified in the project files | Web framework and route declarations | `backend/main.py` creates the app and three routes |
| Uvicorn | Not specified in the project files | ASGI server | `uvicorn.run` in the module entry point; command-line launch |
| Pydantic | Not specified in the project files | Request model validation | `ChatRequest` validates chat JSON fields |
| Requests | Not specified in the project files | Outbound HTTP | Open-Meteo and Roboflow calls |
| Pillow | Not specified in the project files | Image decoding, conversion, resizing | Local disease inference preprocessing |
| NumPy | Not specified in the project files | Array conversion and prediction calculations | Image batch creation, argmax, confidence |
| TensorFlow/Keras | Not specified in the project files | Model loading, training, and inference | Loads `.h5`; training script builds and fits the model |
| OpenAI Python client | Not specified in the project files | OpenAI-compatible chat client | Configured with Groq’s base URL |
| Python standard library | Python version not specified | File paths, JSON, bytes/base64, randomness, ABCs | Model files, API payloads, fallback behavior, interfaces |

No dependency manifest for Python is present, so exact backend package versions cannot be verified from the repository.

## 6. Backend Detailed Explanation

### Application entry point

`main.py` imports backend dependencies, sets TensorFlow log suppression, creates the Groq client, defines model abstractions, creates the FastAPI app, installs CORS middleware, initializes `HybridModelManager`, and registers routes. Running the file directly starts Uvicorn on `0.0.0.0:8000` with reload enabled.

### CORS and configuration

The application allows all origins, credentials, methods, and headers. This is permissive development/demo configuration. The model path, label path, Roboflow URL, Groq base URL, model name, and API credentials are defined directly in code. No environment variables are read.

### Disease upload and validation

`POST /api/analyze-disease` accepts a required FastAPI `UploadFile` named `file` and a multipart `crop` field defaulting to `Wheat`. The route reads the complete file into memory and passes its bytes plus crop type to `HybridModelManager`. The backend does not explicitly validate MIME type, file size, crop values, or image dimensions before model processing.

### Model orchestration

`HybridModelManager` calls the local `CustomKerasModel` first. If the local result is failed or has confidence below `60.0`, it calls `RoboflowAPIModel`. A successful Roboflow result is returned. If the local result failed and the fallback did not succeed, the manager returns a random result from four hardcoded labels with a random confidence between 85.0 and 96.5.

### Response generation

The route maps a prediction other than exactly `Healthy` to `High Risk`; `Healthy` maps to `Low Risk`. High-risk results receive fixed actions for fungicide and irrigation management. Healthy results receive a fixed routine-maintenance action. The response includes the uploaded filename, crop, prediction, confidence, risk level, actions, and source.

### Chat handling

`POST /api/chat` validates `message`, `language`, and optional arbitrary `diseaseData`. It builds a system prompt requiring concise agricultural advice in the requested language. When disease data is provided, prediction and risk-level values are inserted into the prompt. The client calls Groq’s OpenAI-compatible chat endpoint with model `openai/gpt-oss-20b`, temperature `0.7`, and `max_tokens=300`. The route returns the first response message. Any exception is logged and converted to HTTP 500 with a generic detail message.

### Error handling

Weather catches request exceptions and returns an error object. Disease model errors are converted to failed result dictionaries, then handled by the fallback chain. Chat errors become HTTP 500. The backend does not define custom exception handlers, structured logging, authentication, rate limiting, or persistence.

## 7. API Documentation

### `GET /api/weather`

Fetches current weather from `https://api.open-meteo.com/v1/forecast` using query parameters `latitude`, `longitude`, and `current_weather=true`.

Parameters:

- `lat: float`, optional, default `28.66`.
- `lon: float`, optional, default `77.45`.

On a successful upstream response, the backend returns upstream JSON unchanged. For a non-200 response it returns `{ "error": "Weather fetch failed" }`; for a request exception it returns the exception text in an error object. The current `weather/page.tsx` contains local forecast data and does not call this endpoint.

### `POST /api/analyze-disease`

Accepts multipart form data:

- `file`: required uploaded image.
- `crop`: optional text field, default `Wheat`.

The local inference path accepts images Pillow can decode. It converts non-RGB images to RGB, resizes to `(224, 224)`, converts to a NumPy array, adds a batch dimension, and divides values by `255.0`.

Example request:

```bash
curl -X POST http://127.0.0.1:8000/api/analyze-disease -F "file=@leaf.jpg" -F "crop=Wheat"
```

Example response shape:

```json
{
  "filename": "leaf.jpg",
  "crop_analyzed": "Wheat",
  "prediction": "Early Blight",
  "confidence": 87.4,
  "risk_level": "High Risk",
  "actions": [
    {"action": "Apply Fungicide", "details": "Propiconazole 25% EC (1 ml/liter)"},
    {"action": "Manage Irrigation", "details": "Maintain moderate soil moisture"}
  ],
  "source": "Custom_Local_Model"
}
```

The exact prediction and confidence depend on the image and selected prediction source. Decode, model-loading, upstream, and other prediction failures are handled internally through fallback results; explicit request validation constraints beyond the required upload are not defined in the route.

### `POST /api/chat`

Accepts JSON matching `ChatRequest`:

```json
{
  "message": "Should I irrigate today?",
  "language": "en",
  "diseaseData": null
}
```

`diseaseData` is optional and can contain the prior disease response. A successful response is `{ "reply": "..." }`. Errors communicating with Groq result in HTTP 500 with detail `Failed to fetch response from AI server.`

## 8. Machine Learning Detailed Guide

The verified pipeline is:

```text
backend/dataset/
  -> ImageDataGenerator rescale and augmentation
  -> flow_from_directory training subset (80%) and validation subset (20%)
  -> frozen ImageNet MobileNetV2 feature extractor
  -> GlobalAveragePooling2D
  -> Dense(128, relu)
  -> Dropout(0.5)
  -> Dense(number of discovered classes, softmax)
  -> Adam / categorical_crossentropy / accuracy
  -> best checkpoint custom_disease_model.h5
  -> saved class_indices mapping class_labels.json
  -> backend image preprocessing and model.predict
```

Verified details:

- Dataset size: 4,500 image files in the current workspace.
- Classes: 3: `Early_Blight`, `Healthy`, and `Late_Blight`.
- Class mapping: `0` Early Blight, `1` Healthy, `2` Late Blight.
- Input dimensions: 224x224x3.
- Training split: 80% training and 20% validation through `validation_split=0.2`.
- Test split: Not specified in the project files.
- Rescaling: `1./255` during training and division by `255.0` during inference.
- Augmentation: rotation up to 20 degrees, width and height shifts up to 0.2, horizontal flip.
- Architecture: MobileNetV2 without its top, frozen base; global average pooling; 128-ReLU dense layer; 0.5 dropout; softmax classifier.
- Parameter count: Not specified in the project files.
- Maximum epochs: 10.
- Batch size: 32.
- Optimizer: Adam with learning rate `0.001`.
- Loss: categorical cross-entropy.
- Metric: accuracy.
- Callbacks: best `val_accuracy` checkpoint and early stopping on `val_loss` with patience 3 and restored best weights.
- Hardware: Not specified in the project files.
- Saved format: HDF5 file `custom_disease_model.h5`.
- Label format: JSON object in `class_labels.json`.

During inference, `np.argmax` selects the largest output probability and `np.max` becomes the confidence percentage. The label map converts the numeric index to a class name, and underscores are replaced with spaces for the UI.

## 9. Machine Learning Libraries

| Library | Purpose | Where Used |
|---|---|---|
| TensorFlow/Keras | Model construction, loading, fitting, preprocessing utilities | `backend/train_model.py` and `backend/main.py` |
| NumPy | Image arrays and prediction calculations | `backend/main.py` |
| Pillow | Decode, RGB conversion, and resize uploaded images | `backend/main.py` |

## 10. Dataset Details

The project contains one image dataset at `backend/dataset/`. It uses three class directories and 4,500 checked-in image files:

| Directory | Meaning from project labels | Count |
|---|---|---:|
| `Early_Blight` | Early Blight | 1,000 |
| `Healthy` | Healthy | 1,591 |
| `Late_Blight` | Late Blight | 1,909 |

Dataset name, source, collection method, original dimensions, duplicate policy, and licensing information are not specified in the project files.

## 11. Model Details

The saved model is a Keras HDF5 model at `backend/custom_disease_model.h5`. The training script creates a transfer-learning classifier from ImageNet-weighted MobileNetV2 with the top removed. The base is frozen, and the custom head contains global average pooling, a 128-unit ReLU layer, dropout, and a three-class softmax output.

The model expects a 224x224 RGB batch with pixel values scaled to `[0, 1]`. `class_labels.json` maps output indices to the three class names. Model parameter count and recorded evaluation metrics are Not specified in the project files.

## 12. Prediction Flow

1. The user selects one JPG, JPEG, or PNG file in the dashboard or disease-detection page.
2. The frontend builds `FormData` with the file and `crop=Wheat`.
3. The dashboard first tries its configured Cloudflare tunnel URL and then the local URL; the dedicated disease page uses the local URL.
4. FastAPI reads the multipart upload into memory.
5. `HybridModelManager` calls the local model.
6. Pillow converts the image to RGB if needed and resizes it to 224x224.
7. NumPy adds the batch dimension and normalizes pixels.
8. Keras predicts a class probability vector.
9. The largest probability becomes the selected class and percentage confidence.
10. If local inference failed or confidence is below 60%, Roboflow is attempted.
11. If local inference failed and Roboflow does not succeed, the mock engine returns a random demo result.
12. The route adds risk classification and fixed recommended actions.
13. The frontend stores and displays the response in a result panel or modal.

## 13. External APIs and Services

| Service | Purpose | Endpoint/base URL | Data exchanged | Where used |
|---|---|---|---|---|
| Open-Meteo | Current weather | `https://api.open-meteo.com/v1/forecast` | Latitude, longitude, current-weather query; upstream weather JSON | `get_weather` in `main.py` |
| Roboflow | Cloud disease fallback | `https://detect.roboflow.com/plant-disease-model/1` | Base64 image body and API-key query; prediction JSON | `RoboflowAPIModel` in `main.py` |
| Groq | Agriculture chat completion | `https://api.groq.com/openai/v1` | System/user messages, language and optional disease context; assistant completion | `chat_with_saathi` in `main.py` |
| Cloudflare tunnel | Dashboard disease-analysis primary URL | URL is embedded in `frontend/src/app/page.tsx` | Multipart image request and analysis response | Dashboard only |

API key values are not documented here. The project currently hardcodes a Groq credential and a Roboflow placeholder in source; no secure secret configuration is present.

## 14. Database

No database exists in the project files. There are no tables, ORM models, migrations, database initialization routines, or CRUD endpoints. Farm edits, settings, alerts, and expert request state are held in browser component state and are not persisted by the backend.

## 15. Deployment

No deployment files, hosting configuration, Dockerfile, CI workflow, production server command, or platform configuration is present. Verified local ports and commands are:

- Backend: Uvicorn on port `8000`, from `backend/`.
- Frontend: Next.js development script `npm run dev`, normally port `3000`.
- Production frontend scripts: `npm run build` and `npm run start` are declared in `frontend/package.json`.
- Backend production command: Not specified in the project files.
- Required environment variables: None are read by the application.

The frontend’s dashboard disease request references a Cloudflare tunnel, but the repository does not contain configuration for operating that tunnel.

## 16. Complete End-to-End Flow

For disease analysis, the user interacts with a Next.js route. React Dropzone accepts one image and creates a preview. Axios sends the file to FastAPI. FastAPI delegates prediction to the local TensorFlow model, optionally calls Roboflow, and may use the mock fail-safe. The route classifies risk and attaches fixed actions, then returns JSON. The frontend stores the result and renders prediction, confidence, risk, actions, and source. The dashboard also dispatches the result as a browser custom event for assistant context handling.

For chat, the user opens Saathi, chooses or inherits a language, and submits text or browser speech input. The component sends JSON to the local FastAPI chat route. The backend builds the agriculture system prompt, includes prior disease context when supplied, calls Groq, and returns the first completion. The assistant adds the reply to its local message list.

For weather, the backend can proxy Open-Meteo using coordinates. The current weather page itself renders a hardcoded five-day forecast and Ghaziabad location. The other dashboard views are primarily local UI state and constants, with no database flow.

## 17. Troubleshooting

- **Model files not found:** Run the backend from `backend/`, because model and label paths are relative. Both `custom_disease_model.h5` and `class_labels.json` must exist for the local model to load.
- **Upload request fails:** Confirm Uvicorn is running on `127.0.0.1:8000` and that the selected file is a decodable image. The frontend does not provide a configurable backend URL.
- **Dashboard request uses an unavailable tunnel:** The dashboard tries its embedded Cloudflare URL first and then local FastAPI. The dedicated disease page uses local FastAPI directly.
- **Chat returns HTTP 500:** The Groq service, credential, configured model, network, or request may be unavailable. The backend exposes only a generic error to the client.
- **Roboflow fallback does not return a prediction:** The source contains a placeholder API key unless configured manually; the local model or final mock fallback may then determine the result.
- **Voice input is unavailable:** Saathi relies on browser `SpeechRecognition` or `webkitSpeechRecognition`; unsupported browsers show a text-input error.
- **Python installation is unclear:** There is no `requirements.txt`, so exact backend package versions are Not specified in the project files.

## 18. Important Limitations

- A hardcoded Groq credential is present in backend source and must be rotated and moved to secure configuration.
- The Roboflow key is a source placeholder, and the external service’s operational status is not verified by the repository.
- A random mock engine can produce a successful-looking diagnosis when both real prediction paths fail; this is not a validated medical or agronomic diagnosis.
- Risk is determined by the exact string `Healthy`, so every other label is treated as high risk.
- The backend does not enforce upload size, MIME, crop, or authentication validation.
- CORS allows every origin and credentials, which is unsuitable as-is for a public production deployment.
- There is no database or persistence for settings, farms, alerts, expert requests, or chat history.
- The weather backend endpoint is live-capable, but the current weather page uses hardcoded display data.
- Market prices, forecasts, advisory content, experts, alerts, and knowledge articles are primarily local/demo data.
- No test suite, measured model accuracy, test split, model parameter count, training hardware, or deployment setup is specified in the project files.
