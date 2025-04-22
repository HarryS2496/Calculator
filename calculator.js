// Add square root and percentages to operators

let num1 = "";
let num2 = "";
let result = "";
let operator = null;
let isBuildingNum2 = false;
let isResultDisplayed = false;

// Handles numerical input
function handleNumberInput(value) {
  // Start new calculation if result is already displayed
  if (isResultDisplayed) {
    num1 = result.toString();
    num2 = "";
    operator = null;
    isResultDisplayed = false;
    isBuildingNum2 = false;
  }

  // Assign input to num1 or 2 based on isBuildingNum2 flag
  if (isBuildingNum2) {
    num2 += value.toString();
  } else {
    num1 += value.toString();
  }

  // Update display of numbers and operator
  updateDisplay(num1, operator, num2);
}

// Handles decimal input
function handleDecimalInput() {
  // Start new calculation if result is already displayed
  if (isResultDisplayed) {
    num1 = result.toString();
    num2 = "";
    operator = null;
    isResultDisplayed = false;
    isBuildingNum2 = false;
  }

  // Check if decimal is added to num1 or num2
  if (isBuildingNum2) {
    if (num2.includes(".")) return;
    num2 = num2 === "" ? "0." : num2 + ".";
  } else {
    if (num1.includes(".")) return;
    num1 = num1 === "" ? "0." : num1 + ".";
  }

  // Update display of numbers and operator
  updateDisplay(num1, operator, num2);
}

// Handles operator input
function handleOperatorInput(op) {
  // Start new calculation if result is already displayed
  if (isResultDisplayed) {
    num1 = result.toString();
    num2 = "";
    isResultDisplayed = false;
  }

  // If the operator is √ or %, handle the operation immediately
  if (op === "√" || op === "%") {
    operator = op;
    calculateResult();
    return; // Do not continue the regular operator handling for √ or %
  }

  // Ensure num1 is not empty before setting an operator
  // After operator is set, change isBuildingNum2 flag
  if (num1 !== "") {
    operator = op;
    isBuildingNum2 = true;
  }

  // Update display of numbers and operator
  updateDisplay(num1, operator, num2);
}

// Handles the calculator's display of numbers and operators
function updateDisplay(num1, operator, num2) {
  const display = document.getElementById("res");
  let formatted = num1;

  if (operator) {
    formatted += operator;
    if (num2) {
      formatted += num2;
    }
  }

  display.value = formatted;
}

// Combines num1, operator, num2 to get the result
function calculateResult() {
  const n1 = parseFloat(num1);
  const n2 = num2 ? parseFloat(num2) : null;  // Only use num2 if it exists

  switch (operator) {
    // Addition
    case " + ":
      result = (n1 + n2).toString();
      break;
    // Subtraction
    case " - ":
      result = (n1 - n2).toString();
      break;
    // Multiplication
    case " * ":
      result = (n1 * n2).toString();
      break;
    // Division
    case " / ":
      result = n2 === 0 ? "Error: Div by 0" : (n1 / n2).toString();
      break;
    // Exponent
    case " ^ ":
      result = Math.pow(n1, n2).toString();
      break;
    default:
      result = "Invalid operation";
  }

  // Update display
  updateDisplay(result, null, null);
  isResultDisplayed = true;
}

// Resets all variables when user hits the Clear button
function clearCalculation() {
  num1 = "";
  num2 = "";
  result = "";
  operator = null;
  isBuildingNum2 = false;
  isResultDisplayed = false;
  updateDisplay("", null, "");
}

// Export
module.exports = {
  handleNumberInput,
  handleDecimalInput,
  handleOperatorInput,
  calculateResult,
  clearCalculation,
};
