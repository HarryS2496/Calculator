const {
  handleNumberInput,
  handleDecimalInput,
  handleOperatorInput,
  calculateResult,
  clearCalculation,
} = require("./calculator.js"); // Assuming your calculator code is saved as 'calculator.js'

let num1 = "";
let num2 = "";
let result = "";
let operator = null;
let isBuildingNum2 = false;
let isResultDisplayed = false;

beforeEach(() => {
  num1 = "";
  num2 = "";
  result = "";
  operator = null;
  isBuildingNum2 = false;
  isResultDisplayed = false;
});

test("handles number input correctly", () => {
  handleNumberInput(5);
  expect(num1).toBe("5");

  handleNumberInput(3);
  expect(num1).toBe("53");

  handleOperatorInput("+");
  handleNumberInput(2);
  expect(num2).toBe("2");

  handleNumberInput(1);
  expect(num2).toBe("21");
});

test("handles decimal input correctly", () => {
  handleDecimalInput();
  expect(num1).toBe("0.");

  handleNumberInput(5);
  handleDecimalInput(); // Should not add another decimal
  expect(num1).toBe("0.5");

  handleOperatorInput("+");
  handleDecimalInput();
  expect(num2).toBe("0.");
});

test("handles operator input correctly", () => {
  handleNumberInput(4);
  handleOperatorInput("+");
  expect(operator).toBe("+");

  handleOperatorInput("-");
  expect(operator).toBe("-");
});

test("calculates result correctly for basic operations", () => {
  handleNumberInput(6);
  handleOperatorInput("+");
  handleNumberInput(3);
  calculateResult();
  expect(result).toBe("9");

  handleNumberInput(10);
  handleOperatorInput("-");
  handleNumberInput(4);
  calculateResult();
  expect(result).toBe("6");

  handleNumberInput(2);
  handleOperatorInput("*");
  handleNumberInput(5);
  calculateResult();
  expect(result).toBe("10");

  handleNumberInput(8);
  handleOperatorInput("/");
  handleNumberInput(2);
  calculateResult();
  expect(result).toBe("4");

  handleNumberInput(2);
  handleOperatorInput("^");
  handleNumberInput(3);
  calculateResult();
  expect(result).toBe("8");
});

test("handles division by zero", () => {
  handleNumberInput(5);
  handleOperatorInput("/");
  handleNumberInput(0);
  calculateResult();
  expect(result).toBe("Error: Div by 0");
});

test("clears calculation", () => {
  handleNumberInput(5);
  handleOperatorInput("+");
  handleNumberInput(3);
  calculateResult();
  expect(result).toBe("8");

  clearCalculation();
  expect(num1).toBe("");
  expect(num2).toBe("");
  expect(result).toBe("");
  expect(operator).toBe(null);
});