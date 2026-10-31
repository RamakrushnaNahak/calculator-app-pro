# Calculator Application

A comprehensive calculator application with basic, scientific, and financial calculators, featuring history management.

## Project Structure

```
calculator_backend/
├── backend/              # FastAPI backend (optional)
│   ├── main.py          # API server
│   ├── requirements.txt # Python dependencies
│   ├── pyproject.toml   # Project configuration
│   └── calculator_history.json # Data storage
├── frontend/            # Frontend development files (local reference)
│   ├── index.html       # Calculator UI
│   ├── style.css        # Main CSS file
│   └── script.js        # Main JavaScript file
├── index.html           # Main HTML file (for deployment)
├── style.css            # Main CSS file (for deployment)
├── script.js            # Main JavaScript file (for deployment)
├── vercel.json          # Vercel deployment configuration
├── .gitignore           # Git ignore rules
└── README.md
```

## Features

- **Basic Calculator**: Standard arithmetic operations (+, -, ×, ÷)
- **Scientific Calculator**: Advanced mathematical functions
  - Trigonometric: sin, cos, tan, and their inverses
  - Logarithmic: log (base 10), ln (natural)
  - Power functions: √, x², x³, x^y, e^x
  - Other: factorial, absolute value, reciprocal
  - Constants: π, e
  - Degree/Radian mode toggle
- **Financial Calculator**: 
  - Loan payment calculation
  - Compound interest
  - Simple interest
- **History Management**: Persistent storage using localStorage
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Option 1: Run Locally (Static Version)

1. Clone the repository:
```bash
git clone https://github.com/RamakrushnaNahak/calculator-app-pro.git
cd calculator-app-pro
```

2. Serve the application:
```bash
# Using Python
python -m http.server 8080

# Or using Node.js
npx http-server -p 8080
```

3. Open your browser and visit: `http://localhost:8080`

### Option 2: Run with Backend (Full-Stack)

If you want to use the backend API for history storage:

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

The backend will run on `http://localhost:8000`

4. In a separate terminal, serve the frontend:
```bash
cd ..
python -m http.server 8080
```

## Deployment

### Vercel Deployment

The application is deployed on Vercel: https://calculator-app-pro.vercel.app

To deploy your own version:

1. Fork this repository
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Click "Deploy"

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: localStorage (for history)
- **Deployment**: Vercel
- **Backend (Optional)**: FastAPI, Python

## Usage

### Basic Calculator
- Use the number pad and operators to perform calculations
- Press `C` to clear
- Press `=` to calculate

### Scientific Calculator
- Enter numbers and use scientific functions
- Toggle between DEG and RAD mode with the DEG button
- Use π and e constants
- Perform complex calculations with operators

### Financial Calculator
- Enter principal amount, interest rate, and time
- Select calculation type (Loan, Compound, Simple)
- Click "Calculate" to see results

### History
- All calculations are automatically saved
- View history in the History section
- Delete individual items or clear all history
- History persists in browser localStorage

## API Endpoints (Optional Backend)

If using the backend:

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

## Configuration

The static version uses localStorage for history storage. No configuration needed.

If using the backend, the frontend connects to `http://localhost:8000` by default. To change this, edit the `API_BASE_URL` constant in `script.js`.

## License

This project is open source and available under the MIT License.
