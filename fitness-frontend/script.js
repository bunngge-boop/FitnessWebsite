/* 
LOGIN SESSION CHECK*/

if(sessionStorage.getItem("loggedIn") !== "true"){
window.location.href = "login.html";
}


/* LOGOUT*/

function logout(){
sessionStorage.removeItem("loggedIn");
window.location.href="login.html";
}


/* WELCOME USER NAME*/

document.addEventListener("DOMContentLoaded", function () {

const name = localStorage.getItem("userName");

if (name) {
const el = document.getElementById("welcome");
if(el) el.innerText = "Welcome " + name;
}

});


/*NAVIGATION ACTIVE STATE */

const list = document.querySelectorAll('.navigation ul li');

list.forEach((item)=>{
item.addEventListener('click', function(){

list.forEach((li)=> li.classList.remove('active'));

this.classList.add('active');

});
});


/*WATER INTAKE */

let water = parseInt(localStorage.getItem("water")) || 0;

const WATER_GOAL = 8;

updateWater();

function addWater(){

if(water < WATER_GOAL){

water++;

localStorage.setItem("water", water);

updateWater();

}

}

function resetWater(){

water = 0;

localStorage.setItem("water", water);

updateWater();

}

function updateWater(){

const text = document.getElementById("waterText");

if(text){
text.innerText = water + " / " + WATER_GOAL + " glasses";
}

let percent = (water / WATER_GOAL) * 100;

const bar = document.getElementById("waterBar");

if(bar){
bar.style.width = percent + "%";
}

}


/*SHOW BURNED CALORIES*/

const burnedDisplay = document.getElementById("burned");

if(burnedDisplay){

const saved = localStorage.getItem("burnedCalories") || 0;

burnedDisplay.innerText = saved + " kcal";

}


/*STEP TRACKING */

let steps = parseInt(localStorage.getItem("steps")) || 0;

let tracking = false;

let lastMagnitude = 0;

let lastStepTime = 0;

let motionHandler = null;

updateSteps();


function updateSteps(){

const el = document.getElementById("steps");

if(el) el.innerText = steps;

}


/* START STEP TRACKING */

function startTracking(){

if(tracking) return;

function begin(){

tracking = true;

motionHandler = function(e){

const acc = e.accelerationIncludingGravity;

if(!acc) return;

const mag = Math.sqrt(

acc.x * acc.x +

acc.y * acc.y +

acc.z * acc.z

);

const now = Date.now();


/* STEP DETECTION */

if(Math.abs(mag - lastMagnitude) > 4 && (now - lastStepTime) > 500){

steps++;

localStorage.setItem("steps", steps);

updateSteps();

lastStepTime = now;

}

lastMagnitude = mag;

};

window.addEventListener("devicemotion", motionHandler);

alert("Step tracking started. Walk with phone.");

}


/* IOS PERMISSION */

if(typeof DeviceMotionEvent !== "undefined" &&
typeof DeviceMotionEvent.requestPermission === "function"){

DeviceMotionEvent.requestPermission()

.then(res=>{

if(res==="granted") begin();

else alert("Motion permission denied");

})

.catch(()=>alert("Permission error"));

}

else{

begin();

}

}


/* STOP TRACKING */

function stopTracking(){

tracking = false;

if(motionHandler){

window.removeEventListener("devicemotion", motionHandler);

}

}


/* RESET STEPS */

function resetSteps(){

steps = 0;

localStorage.setItem("steps", steps);

updateSteps();

}