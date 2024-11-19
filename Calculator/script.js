// script.js
const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('number')) {
      handleNumber(button.getAttribute('data-num'));
    } else if (button.classList.contains('operator')) {
      handleOperator(button.getAttribute('data-op'));
    } else if (button.id === 'equals') {
      calculateResult();
    } else if (button.id === 'clear') {
      clearDisplay();
    } else if (button.classList.contains('decimal')) {
      addDecimal();
    }
  });
});

function handleNumber(num) {
  currentInput = currentInput === '0' ? num : currentInput + num;
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (currentInput !== '') {
    if (op === '√') {
      currentInput = Math.sqrt(parseFloat(currentInput)).toString();
      updateDisplay(currentInput);
      return;
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
  }
}

function calculateResult() {
  if (previousInput !== '' && currentInput !== '') {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num2 === 0 ? 'Error' : num1 / num2; break;
      case '%': result = (num1 * num2) / 100; break;
    }

    updateDisplay(result);
    currentInput = result.toString();
    previousInput = '';
    operator = '';
  }
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay(0);
}

function addDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay(currentInput);
  }
}

function updateDisplay(value) {
  display.textContent = value;
}
