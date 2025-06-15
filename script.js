// Select all button container and the display
const calculatorButtons = document.querySelector('.buttons');
const resultContainer = document.querySelector('.display');
const historyContainer = document.querySelector('.history'); 

let result = '';
let justEvaluated = false;

// Function to add calculation to history
function addToHistory(expression, answer) {
  const entry = document.createElement('div');
  entry.textContent = `${expression} = ${answer}`;
  historyContainer.prepend(entry); // Add latest at the top
}

// Function to evaluate result
function evaluateExpression() {
  try {
    const computed = eval(result
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/\^/g, '**') // Handle exponentiation
      .replace(/−/g, '-'));

    resultContainer.textContent = computed;
    addToHistory(result, computed);
    result = computed.toString();
    justEvaluated = true;
  } catch (error) {
    resultContainer.textContent = 'Error';
    result = '';
    justEvaluated = false;
  }
}

// Button click logic
calculatorButtons.addEventListener('click', (ev) => {
  if (ev.target.tagName.toLowerCase() === 'button') {
    const value = ev.target.textContent;
    ev.preventDefault();

    // Handle "=" to evaluate the expression
    if (value === '=') {
      evaluateExpression();
      return;
    }

    // Handle "C" to clear the display and reset input
    if (value === 'C') {
      result = '';
      resultContainer.textContent = '0';
      return;
    }

    // Handle backspace to remove last character 
    if (value === '←') {
      result = result.slice(0, -1);
      resultContainer.textContent = result || '0'; // Show '0' if empty
      return;
    }

    // If just evaluated, reset input if value is a number
    if (justEvaluated) {
      if (!isNaN(value)) {
        result = '';
        resultContainer.textContent = '';
      }
      justEvaluated = false;
    }

    // If error is showing, reset before adding new input
    if (resultContainer.textContent === 'Error') {
      resultContainer.textContent = '';
      result = '';
    }

    // Append number/operator to current input
    result += value;
    resultContainer.textContent = result;
    console.log('Current expression =>', result);
  }
});


// Keyboard input logic (MOVED OUTSIDE to run only once)
document.addEventListener('keydown', (e) => {
  const key = e.key;
  e.preventDefault(); // Prevent default browser behavior

  const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','(',')','^','%'];

  // If number or operator key is pressed
  if (!isNaN(key) || allowedKeys.includes(key)) {
    if (justEvaluated && !isNaN(key)) {
      result = '';
      resultContainer.textContent = '';
    }

    result += key;
    resultContainer.textContent = result;
    justEvaluated = false;
    console.log('Keyboard input =>', result);
  }

  // If Enter or = is pressed
  else if (key === 'Enter' || key === '=') {
    evaluateExpression();
  }

  // If Backspace is pressed
  else if (key === 'Backspace') {
    result = result.slice(0, -1);
    resultContainer.textContent = result || '0';
  }

  // If Escape or 'c' is pressed, clear the result
  else if (key === 'Escape' || key.toLowerCase() === 'c') {
    result = '';
    resultContainer.textContent = '0';
  }
});
