const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const container = document.getElementById('container');

signUpBtn.addEventListener('click', () => container.classList.add("right-panel-active"));
signInBtn.addEventListener('click', () => container.classList.remove("right-panel-active"));


//login
document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault();

const email = document.getElementById("username").value;
const password = document.getElementById("password").value;

fetch("http://localhost:5000/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})
})
.then(res=>res.json())
.then(data=>{

if(data.userId){

sessionStorage.setItem("loggedIn","true");
localStorage.setItem("userId",data.userId);
localStorage.setItem("userName",data.name);

window.location.href="main.html";

}else{
alert(data.error);
}

});

});


// SIignup
document.querySelector(".sign-up-container form").addEventListener("submit", function(e){

e.preventDefault();

const name = document.querySelector(".sign-up-container input[placeholder='Name']").value;
const email = document.querySelector(".sign-up-container input[placeholder='Email']").value;
const pass = document.querySelector(".sign-up-container input[placeholder='Password']").value;

if(!name || !email || !pass){
alert("Please fill all fields");
return;
}

fetch("http://localhost:5000/api/auth/signup",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:name,
email:email,
password:pass
})
})
.then(res=>res.json())
.then(data=>{

if(data.message){
alert("Signup successful");
window.location.href="login.html";
}else{
alert(data.error);
}

});

});