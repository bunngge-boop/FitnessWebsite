/* ================= TOGGLE UI ================= */

const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");
const container = document.getElementById("container");

signUpBtn.addEventListener("click", () => container.classList.add("right-panel-active"));
signInBtn.addEventListener("click", () => container.classList.remove("right-panel-active"));

/* ================= LOGIN ================= */

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !password) {
    alert("Please fill all fields");
    return;
  }

  fetch("https://fitnesswebsite-1nkt.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.name);

      alert("Login successful!");
      window.location.href = "main.html";
    })
    .catch(err => {
      console.log(err);
      alert("Server error");
    });
});

/* ================= SIGNUP ================= */

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  fetch("https://fitnesswebsite-1nkt.onrender.com/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Signup successful! Please login.");
      container.classList.remove("right-panel-active");
      document.getElementById("signupForm").reset();
    })
    .catch(err => {
      console.log(err);
      alert("Server error");
    });
});