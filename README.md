# Calculator Backend API

FastAPI backend for the calculator application with history persistence.

## Features

- **Basic Calculator**: Store calculation results
- **Financial Calculator**: Perform loan, compound interest, and simple interest calculations
- **History Management**: Persistent storage with CRUD operations
- **CORS Enabled**: Ready for frontend integration

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

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

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Data Storage

History is stored in `calculator_history.json` file in the same directory.
