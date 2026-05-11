const buttons = document.querySelectorAll(".btn");
const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

let expression = "";
let lastAnswer = "";

// Update expression display
function updateDisplay() {
  expressionDisplay.textContent = expression;

  if (expression === "") {
    resultDisplay.textContent = "0";
  }
}

// Check operators
function isOperator(char) {
  return ["+", "-", "×", "÷", "%"].includes(char);
}

// Convert display symbols to JS operators
function formatExpression(exp) {
  return exp
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/√\(/g, "Math.sqrt(")
    .replace(/√/g, "Math.sqrt");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {

    const value = button.textContent.toLowerCase();

    // ================= CLEAR =================
    if (value === "clear") {

      expression = "";
      expressionDisplay.textContent = "";
      resultDisplay.textContent = "0";
    }

    // ================= DELETE =================
    else if (value === "del") {

      expression = expression.slice(0, -1);
      updateDisplay();
    }

    // ================= ANSWER =================
    else if (value === "ans") {

      expression += lastAnswer;
      updateDisplay();
    }

    // ================= ENTER =================
    else if (value === "enter" ) {

      if (expression === "") return;

      try {

        let finalExpression = formatExpression(expression);

        let result = eval(finalExpression);

        // Handle invalid result
        if (
          result === Infinity ||
          result === -Infinity ||
          isNaN(result)
        ) {
          resultDisplay.textContent = "Error";
          return;
        }

        resultDisplay.textContent = result;

        lastAnswer = result.toString();

      } catch (error) {

        resultDisplay.textContent = "Error";
      }
    }

    // ================= PLUS / MINUS =================
    else if (value === "±") {

      if (expression === "") return;

      // Toggle sign of full expression
      if (expression.startsWith("-")) {
        expression = expression.slice(1);
      } else {
        expression = "-" + expression;
      }

      updateDisplay();
    }

    // ================= DOT =================
    else if (value === ".") {

      let parts = expression.split(/[+\-×÷%]/);
      let lastPart = parts[parts.length - 1];

      // Prevent multiple dots
      if (!lastPart.includes(".")) {

        // Auto add 0 before dot
        if (
          expression === "" ||
          isOperator(expression.slice(-1))
        ) {
          expression += "0.";
        } else {
          expression += ".";
        }

        updateDisplay();
      }
    }

    // ================= SQRT =================
    else if (value === "√") {

      expression += "√(";
      updateDisplay();
    }

    // ================= OPERATORS =================
    else if (
      value === "+" ||
      value === "-" ||
      value === "×" ||
      value === "÷" ||
      value === "%"
    ) {

      if (expression === "") return;

      let lastChar = expression.slice(-1);

      // Prevent double operators
      if (isOperator(lastChar)) {

        expression = expression.slice(0, -1) + value;

      } else {

        expression += value;
      }

      updateDisplay();
    }

    // ================= BRACKETS =================
    else if (value === "(" || value === ")") {

      expression += value;
      updateDisplay();
    }

    // ================= NUMBERS =================
    else {

      expression += value;
      updateDisplay();
    }

  });
});