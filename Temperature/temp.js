// script.js

const convertBtn = document.getElementById("convertBtn");

convertBtn.addEventListener("click", () => {
  const temperature = document.getElementById("temperature").value;
  const unit = document.getElementById("unit").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");

  error.textContent = "";

  // Validate input
  if (temperature === "" || isNaN(temperature)) {
    error.textContent = "Please enter a valid number!";
    result.textContent = "--";
    return;
  }

  const temp = parseFloat(temperature);
  let convertedTemp = "";
  let convertedUnit = "";

  // Celsius input
  if (unit === "celsius") {
    convertedTemp = (temp * 9/5) + 32;
    convertedUnit = "°F";
  }

  // Fahrenheit input
  else if (unit === "fahrenheit") {
    convertedTemp = (temp - 32) * 5/9;
    convertedUnit = "°C";
  }

  // Kelvin input
  else if (unit === "kelvin") {
    convertedTemp = temp - 273.15;
    convertedUnit = "°C";
  }

  result.textContent = `${convertedTemp.toFixed(2)} ${convertedUnit}`;
});