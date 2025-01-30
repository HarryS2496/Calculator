// Currently only works for tenths in decimals
let num1 = null, num2 = null;
let result = 0;
let operator = null;
let isBuildingNum2 = false;
let num1DecimalCount = 0, num2DecimalCount = 0; // Track decimal places for num1 and num2
let isResultDisplayed = false;

// Split updateCalculation into two functions
// One handles numbers, another handles operators.

function updateCalculation(value) {
  // If the result is displayed, start the new calculation with the result as num1
  if (isResultDisplayed) {
    num1 = result;  // Use the previous result as num1
    num2 = null;     // Reset num2
    operator = null; // Reset operator for the new calculation
    num1DecimalCount = 0; // Reset decimal count for num1
    num2DecimalCount = 0; // Reset decimal count for num2
    isResultDisplayed = false; // Reset the flag
  }

  if (typeof value === 'string' && (value === ' + ' || value === ' - ' || value === ' * ' || value === ' / ')) {
    if (num1 !== null) {
      operator = value;
      isBuildingNum2 = true;
    }
  }
  else if (isBuildingNum2) {
    if (value === '.') {
      if (num2DecimalCount === 0) {
        num2DecimalCount = 1;  
        num2 = num2 === null ? 0 : num2; // Ensures num2 is initialized to 0 when the decimal is first entered.
      }
    } 
    else {
      if (num2DecimalCount > 0) {
        num2 += value / Math.pow(10, num2DecimalCount); // Appends a decimal digit to num2 while maintaining decimal precision.
        num2DecimalCount++;  // Increment decimal count for every digit after decimal
      } else {
        num2 = num2 === null ? value : num2 * 10 + value;
      }
    }
  } 
  else {
    if (value === '.') {
      if (num1DecimalCount === 0) {
        num1DecimalCount = 1;
        num1 = num1 === null ? 0 : num1; // Ensures num2 is initialized to 0 when the decimal is first entered.
      }
    } 
    else {
      if (num1DecimalCount > 0) {
        num1 += value / Math.pow(10, num1DecimalCount); // Appends a decimal digit to num1 while maintaining decimal precision.
        num1DecimalCount++;  // Increment decimal count for every digit after decimal
      } else {
        num1 = num1 === null ? value : num1 * 10 + value;
      }
    }
  }
  updateDisplay(num1, operator, num2);
}

// 
function updateDisplay(num1, operator, num2) {
  const display = document.getElementById("res");

  // Ensure no extra zeroes are shown for num1
  let formattedNum1 = num1 !== null ? num1 : "";
  
  // If num2 exists, format it the same way
  let formattedNum2 = num2 !== null ? num2 : "";

  // Dynamically format and avoid trailing zeroes, only showing necessary digits
  if (operator) {
    display.value = `${formattedNum1} ${operator} ${formattedNum2}`;
  } else {
    display.value = formattedNum1;  // Only num1 if no operator
  }
}

function calculateResult() {
  switch (operator) {
    case ' + ':
      result = num1 + num2; // Addition
      break;
    case ' - ':
      result = num1 - num2; // Subtraction
      break;
    case ' * ':
      result = num1 * num2; // Multiplication
      break;
    case ' / ':
      if (num2 === 0) {
        result = "Error: Div by 0"; // Handle division by zero
      } else {
        result = num1 / num2; // Division
      }
      break;
    default:
      result = "Invalid operation";
  }
  updateDisplay(result, null, null); // Update display after each input
  isResultDisplayed = true; // Checks flag
}

function clearCalculation() {
  num1 = null;
  num2 = null;
  operator = null;
  isBuildingNum2 = false;
  num1DecimalCount = 0;
  num2DecimalCount = 0;
  updateDisplay(null, null, null); // Clear the display
}

module.exports = {
  updateCalculation,
  calculateResult,
  clearCalculation
};
