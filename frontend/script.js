// Basic Calculator Functions
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const expression = document.getElementById('display').value;
    if (!expression) return;

    try {
        const result = eval(expression);
        document.getElementById('display').value = result;
        addToHistory(expression, result);
    } catch (error) {
        document.getElementById('display').value = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}

// Scientific Calculator Functions
let isDegreeMode = true;

function scientificAppend(value) {
    document.getElementById('scientificDisplay').value += value;
}

function clearScientificDisplay() {
    document.getElementById('scientificDisplay').value = '';
}

function toRadians(angle) {
    return isDegreeMode ? angle * (Math.PI / 180) : angle;
}

function toDegrees(radians) {
    return isDegreeMode ? radians * (180 / Math.PI) : radians;
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function scientificFunction(func) {
    const display = document.getElementById('scientificDisplay');
    const currentValue = parseFloat(display.value) || 0;

    switch(func) {
        case 'sin':
            display.value = Math.sin(toRadians(currentValue)).toFixed(8);
            break;
        case 'cos':
            display.value = Math.cos(toRadians(currentValue)).toFixed(8);
            break;
        case 'tan':
            display.value = Math.tan(toRadians(currentValue)).toFixed(8);
            break;
        case 'asin':
            display.value = toDegrees(Math.asin(currentValue)).toFixed(8);
            break;
        case 'acos':
            display.value = toDegrees(Math.acos(currentValue)).toFixed(8);
            break;
        case 'atan':
            display.value = toDegrees(Math.atan(currentValue)).toFixed(8);
            break;
        case 'log':
            display.value = Math.log10(currentValue).toFixed(8);
            break;
        case 'ln':
            display.value = Math.log(currentValue).toFixed(8);
            break;
        case 'sqrt':
            display.value = Math.sqrt(currentValue).toFixed(8);
            break;
        case 'pow2':
            display.value = Math.pow(currentValue, 2).toFixed(8);
            break;
        case 'pow3':
            display.value = Math.pow(currentValue, 3).toFixed(8);
            break;
        case 'exp':
            display.value = Math.exp(currentValue).toFixed(8);
            break;
        case 'fact':
            if (currentValue < 0 || !Number.isInteger(currentValue)) {
                display.value = 'Error';
            } else {
                display.value = factorial(Math.round(currentValue));
            }
            break;
        case 'abs':
            display.value = Math.abs(currentValue).toFixed(8);
            break;
        case '1/x':
            display.value = currentValue !== 0 ? (1 / currentValue).toFixed(8) : 'Error';
            break;
        case 'deg':
            isDegreeMode = !isDegreeMode;
            alert(`Switched to ${isDegreeMode ? 'DEGREE' : 'RADIAN'} mode`);
            break;
        case 'pow':
            display.value += '^';
            break;
    }
}

function calculateScientific() {
    const expression = document.getElementById('scientificDisplay').value;
    if (!expression) return;

    try {
        let jsExpression = expression.replace(/\^/g, '**');
        jsExpression = jsExpression.replace(/π/g, Math.PI).replace(/e/g, Math.E);
        
        const result = eval(jsExpression);
        document.getElementById('scientificDisplay').value = parseFloat(result.toFixed(8));
        addToHistory(expression, parseFloat(result.toFixed(8)));
    } catch (error) {
        document.getElementById('scientificDisplay').value = 'Error';
        setTimeout(clearScientificDisplay, 1500);
    }
}

// Financial Calculator Functions
function calculateFinancial() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    const calcType = document.getElementById('calcType').value;

    if (!principal || !rate || !time) {
        alert('Please fill in all fields');
        return;
    }

    let result = 0;
    let expression = '';

    if (calcType === 'loan') {
        const monthlyRate = rate / 100 / 12;
        const months = time * 12;
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        result = round(monthlyPayment, 2);
        expression = `Loan Payment: $${principal} at ${rate}% for ${time} years`;
    } else if (calcType === 'compound') {
        const compoundAmount = principal * Math.pow(1 + rate / 100, time);
        result = round(compoundAmount, 2);
        expression = `Compound Interest: $${principal} at ${rate}% for ${time} years`;
    } else if (calcType === 'simple') {
        const simpleInterest = principal * (rate / 100) * time;
        const totalAmount = principal + simpleInterest;
        result = round(totalAmount, 2);
        expression = `Simple Interest: $${principal} at ${rate}% for ${time} years`;
    }

    const resultDiv = document.getElementById('financialResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<strong>Result:</strong> $${result}<br><small>${expression}</small>`;
    
    addToHistory(expression, `$${result}`);
}

function round(num, decimals) {
    return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
}

// History Functions (using localStorage)
function addToHistory(expression, result) {
    const history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    const newItem = {
        id: Date.now(),
        expression: expression,
        result: result.toString(),
        timestamp: new Date().toISOString()
    };
    history.unshift(newItem);
    if (history.length > 50) history.pop();
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    const container = document.getElementById('historyContainer');
    
    if (history.length === 0) {
        container.innerHTML = '<div class="empty-history">No calculations yet</div>';
        return;
    }

    container.innerHTML = history.map(item => `
        <div class="history-item">
            <div>
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
                <div class="history-time">${new Date(item.timestamp).toLocaleString()}</div>
            </div>
            <button class="delete-btn" onclick="deleteHistoryItem(${item.id})">Delete</button>
        </div>
    `).join('');
}

function deleteHistoryItem(id) {
    const history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    const newHistory = history.filter(item => item.id !== id);
    localStorage.setItem('calculatorHistory', JSON.stringify(newHistory));
    displayHistory();
}

function clearHistory() {
    if (!confirm('Are you sure you want to clear all history?')) return;
    localStorage.removeItem('calculatorHistory');
    displayHistory();
}

// Load history on page load
displayHistory();
