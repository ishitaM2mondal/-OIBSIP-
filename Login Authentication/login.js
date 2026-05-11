// FORM SWITCHING

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const tabButtons = document.querySelectorAll(".tab-btn");

function showRegister() {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");

  tabButtons[0].classList.add("active");
  tabButtons[1].classList.remove("active");
}

function showLogin() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");

  tabButtons[1].classList.add("active");
  tabButtons[0].classList.remove("active");
}

// REGISTER FUNCTION

function register() {

  const username = document.getElementById("registerUsername").value.trim();

  const password = document.getElementById("registerPassword").value.trim();

  const message = document.getElementById("registerMessage");

  if(username === "" || password === ""){

    message.style.color = "red";
    message.innerText = "Please fill all fields.";

    return;
  }

  // Save data
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  message.style.color = "green";
  message.innerText = "Registration Successful ✔";

  // Auto switch to login
  setTimeout(() => {
    showLogin();
  }, 1000);
}

// LOGIN FUNCTION

function login(){

  const username = document.getElementById("loginUsername").value.trim();

  const password = document.getElementById("loginPassword").value.trim();

  const message = document.getElementById("loginMessage");

  const storedUsername = localStorage.getItem("username");

  const storedPassword = localStorage.getItem("password");

  if(username === storedUsername && password === storedPassword){

    message.style.color = "green";
    message.innerText = "Login Successful ✔";

    setTimeout(() => {

      document.querySelector(".container").style.display = "none";

      document.getElementById("securePage").style.display = "flex";

    }, 800);

  }
  else{

    message.style.color = "red";
    message.innerText = "Invalid Username or Password!";
  }
}

// LOGOUT FUNCTION

function logout(){

  document.querySelector(".container").style.display = "flex";

  document.getElementById("securePage").style.display = "none";

  // Clear fields

  document.getElementById("loginUsername").value = "";

  document.getElementById("loginPassword").value = "";

  showLogin();
}