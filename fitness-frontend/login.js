const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const container = document.getElementById('container');

signUpBtn.addEventListener('click', () => container.classList.add("right-panel-active"));
signInBtn.addEventListener('click', () => container.classList.remove("right-panel-active"));


// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault();

const user = document.getElementById("username").value;
const pass = document.getElementById("password").value;

const savedUser = localStorage.getItem("userName");
const savedPass = localStorage.getItem("userPass");

if(user === savedUser && pass === savedPass){

sessionStorage.setItem("loggedIn","true");
localStorage.setItem("userName", savedUser);

window.location.href="main.html";

}else{
alert("Invalid login");
}

});


// SIGNUP
document.querySelector(".sign-up-container form").addEventListener("submit", function(e){

e.preventDefault();

const name = document.querySelector(".sign-up-container input[placeholder='Name']").value;
const email = document.querySelector(".sign-up-container input[placeholder='Email']").value;
const pass = document.querySelector(".sign-up-container input[placeholder='Password']").value;

if(!name || !email || !pass){
alert("Please fill all fields");
return;
}

localStorage.setItem("userName", name);
localStorage.setItem("userEmail", email);
localStorage.setItem("userPass", pass);

alert("Signup successful! Please login.");

container.classList.remove("right-panel-active");

});