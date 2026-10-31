# Calculator Application

A full-stack calculator application with basic, scientific, and financial calculators, featuring persistent history storage.

## Project Structure

```
calculator_backend/
├── backend/              # FastAPI backend
│   ├── main.py          # API server
│   ├── requirements.txt # Python dependencies
│   ├── pyproject.toml   # Project configuration
│   └── calculator_history.json # Data storage
├── frontend/            # Frontend application
│   ├── css/             # Stylesheets
│   │   └── style.css    # Main CSS file
│   ├── js/              # JavaScript files
│   │   └── script.js    # Main JavaScript file
│   └── html/            # HTML files
│       └── index.html   # Calculator UI
└── README.md
```

## Features

- **Basic Calculator**: Standard arithmetic operations
- **Scientific Calculator**: Advanced mathematical functions (sin, cos, tan, log, etc.)
- **Financial Calculator**: Loan payments, compound interest, simple interest
- **History Management**: Persistent storage with CRUD operations
- **Separated Architecture**: Distinct backend and frontend folders

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Open `html/index.html` in a web browser, or serve it using a local server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js (if you have http-server installed)
npx http-server -p 3000
```

The frontend will be available at `http://localhost:3000/html/index.html`

## API Endpoints

### Health Check
- `GET /` - API information
- `GET /health` - Health check

### Calculator Operations
- `POST /calculate` - Store a calculation result
- `POST /financial/calculate` - Perform financial calculations

### History Management
- `GET /history` - Get all history items
- `DELETE /history/{item_id}` - Delete specific item
- `DELETE /history` - Clear all history

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Data Storage

History is stored in `backend/calculator_history.json` file.

## Configuration

The frontend is configured to connect to the backend at `http://localhost:8000`. If you need to change this, edit the `API_BASE_URL` constant in `frontend/js/script.js`.
