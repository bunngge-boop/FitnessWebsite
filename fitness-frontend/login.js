/* ================= TOGGLE UI ================= */

const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const container = document.getElementById('container');

signUpBtn.addEventListener('click', () => container.classList.add("right-panel-active"));
signInBtn.addEventListener('click', () => container.classList.remove("right-panel-active"));


/* ================= LOGIN ================= */

document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("username").value;
const password = document.getElementById("password").value;

fetch("http://localhost:5000/api/auth/login", {
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

if(data.error){
alert(data.error);
return;
}

/* SAVE LOGIN STATE */
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

document.querySelector(".sign-up-container form").addEventListener("submit", function(e){

e.preventDefault();

const name = document.querySelector(".sign-up-container input[placeholder='Name']").value;
const email = document.querySelector(".sign-up-container input[placeholder='Email']").value;
const password = document.querySelector(".sign-up-container input[placeholder='Password']").value;

if(!name || !email || !password){
alert("Please fill all fields");
return;
}

fetch("http://localhost:5000/api/auth/signup", {
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

if(data.error){
alert(data.error);
return;
}

alert("Signup successful! Please login.");

/* SWITCH TO LOGIN PANEL */
container.classList.remove("right-panel-active");

})
.catch(err => {
console.log(err);
alert("Server error");
});

});