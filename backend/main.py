from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os

app = FastAPI(title="Calculator API", version="1.0.0")

# CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# File path for storing history
HISTORY_FILE = "calculator_history.json"

# Pydantic models for request/response
class CalculationRequest(BaseModel):
    expression: str
    result: str

class FinancialRequest(BaseModel):
    principal: float
    rate: float
    time: float
    calculation_type: str  # 'loan', 'compound', 'simple'

class HistoryItem(BaseModel):
    id: int
    expression: str
    result: str
    timestamp: str

class CalculationResponse(BaseModel):
    result: str
    expression: str

class FinancialResponse(BaseModel):
    result: float
    expression: str
    calculation_type: str

# Helper functions for file operations
def load_history() -> List[dict]:
    """Load history from JSON file"""
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r') as f:
                return json.load(f)
        except:
            return []
    return []

def save_history(history: List[dict]):
    """Save history to JSON file"""
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f, indent=2)

# Basic calculator endpoints
@app.get("/")
async def root():
    """API information"""
    return {
        "name": "Calculator API",
        "version": "1.0.0",
        "description": "Backend API for calculator application",
        "endpoints": {
            "health": "/health",
            "calculate": "/calculate",
            "financial_calculate": "/financial/calculate",
            "history": "/history"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/calculate", response_model=CalculationResponse)
async def calculate(request: CalculationRequest):
    """
    Store a calculation result (for logging purposes)
    Frontend does the actual calculation, backend stores it
    """
    try:
        history = load_history()
        
        # Create new history item
        new_item = {
            "id": len(history) + 1,
            "expression": request.expression,
            "result": request.result,
            "timestamp": datetime.now().isoformat()
        }
        
        # Add to history
        history.insert(0, new_item)
        
        # Keep only last 50 items
        if len(history) > 50:
            history = history[:50]
        
        save_history(history)
        
        return CalculationResponse(
            result=request.result,
            expression=request.expression
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Financial calculator endpoints
@app.post("/financial/calculate", response_model=FinancialResponse)
async def financial_calculate(request: FinancialRequest):
    """
    Perform financial calculations on the backend
    """
    try:
        principal = request.principal
        rate = request.rate
        time = request.time
        calc_type = request.calculation_type
        
        result = 0.0
        expression = ""
        
        if calc_type == "loan":
            # Monthly loan payment: P * (r(1+r)^n) / ((1+r)^n - 1)
            monthly_rate = rate / 100 / 12
            months = time * 12
            monthly_payment = principal * (monthly_rate * (1 + monthly_rate) ** months) / ((1 + monthly_rate) ** months - 1)
            result = round(monthly_payment, 2)
            expression = f"Loan Payment: ${principal} at {rate}% for {time} years"
            
        elif calc_type == "compound":
            # A = P(1 + r/n)^(nt) - assuming annual compounding
            compound_amount = principal * (1 + rate / 100) ** time
            result = round(compound_amount, 2)
            expression = f"Compound Interest: ${principal} at {rate}% for {time} years"
            
        elif calc_type == "simple":
            # Simple Interest: P * r * t
            simple_interest = principal * (rate / 100) * time
            total_amount = principal + simple_interest
            result = round(total_amount, 2)
            expression = f"Simple Interest: ${principal} at {rate}% for {time} years"
            
        else:
            raise HTTPException(status_code=400, detail="Invalid calculation type")
        
        # Store in history
        history = load_history()
        new_item = {
            "id": len(history) + 1,
            "expression": expression,
            "result": f"${result}",
            "timestamp": datetime.now().isoformat()
        }
        history.insert(0, new_item)
        if len(history) > 50:
            history = history[:50]
        save_history(history)
        
        return FinancialResponse(
            result=result,
            expression=expression,
            calculation_type=calc_type
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# History endpoints
@app.get("/history", response_model=List[HistoryItem])
async def get_history():
    """Get all calculation history"""
    try:
        history = load_history()
        return [HistoryItem(**item) for item in history]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/history/{item_id}")
async def delete_history_item(item_id: int):
    """Delete a specific history item"""
    try:
        history = load_history()
        history = [item for item in history if item["id"] != item_id]
        save_history(history)
        return {"message": "Item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/history")
async def clear_history():
    """Clear all history"""
    try:
        save_history([])
        return {"message": "History cleared successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
