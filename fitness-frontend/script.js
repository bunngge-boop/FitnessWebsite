// login 
if(sessionStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}
//logout
function logout(){
    sessionStorage.removeItem("loggedIn");
    window.location.href="login.html";
}

//welcome name
document.addEventListener("DOMContentLoaded", function () {
    const name = localStorage.getItem("userName");

    if (name) {
        document.getElementById("welcome").innerText = "Welcome " + name;
    }
});




//navigation
const list = document.querySelectorAll('.navigation ul li');

list.forEach((item)=>{
    item.addEventListener('click', function(){
        list.forEach((li)=> li.classList.remove('active'));
        this.classList.add('active');
    });
});

//water intake
let water=0;
const WATER_GOAL=8;

function addWater(){
    if(water < WATER_GOAL){
        water++;
        updateWater();
    }
}

function resetWater(){
    water=0;
    updateWater();
}

function updateWater(){

document.getElementById("waterText").innerText =
water+" / "+WATER_GOAL+" glasses";

let percent=(water/WATER_GOAL)*100;
document.getElementById("waterBar").style.width=percent+"%";
}
// show burned calories on dashboard
const burnedDisplay = document.getElementById("burned");

if(burnedDisplay){
    const saved = localStorage.getItem("burnedCalories") || 0;
    burnedDisplay.innerText = saved + " kcal";
}

//steps

let steps = parseInt(localStorage.getItem("steps")) || 0;
let tracking=false;
let lastMagnitude=0;
let lastStepTime=0;

updateSteps();

function updateSteps(){
    const el=document.getElementById("steps");
    if(el) el.innerText=steps;
}

function startTracking(){

    if(tracking) return;

    function begin(){
        tracking=true;

    window.addEventListener("devicemotion",function(e){

const acc=e.accelerationIncludingGravity;
if(!acc) return;

const mag=Math.sqrt(
acc.x*acc.x + acc.y*acc.y + acc.z*acc.z
);

const now = Date.now();

// better step detection (less sensitive + time gap)
if(Math.abs(mag-lastMagnitude) > 4 && (now-lastStepTime) > 500){

steps++;
localStorage.setItem("steps",steps);
updateSteps();

lastStepTime = now;
}

lastMagnitude=mag;

});

        alert("Step tracking started. Walk with phone.");
    }

    // request permission if browser supports it
    if(typeof DeviceMotionEvent !== "undefined" &&
       typeof DeviceMotionEvent.requestPermission === "function"){

        DeviceMotionEvent.requestPermission()
        .then(res=>{
            if(res==="granted") begin();
            else alert("Motion permission denied");
        })
        .catch(()=>alert("Permission error"));

    } else {
        begin();   // Android Chrome usually here
    }
}

function stopTracking(){
    tracking=false;
    window.removeEventListener("devicemotion",()=>{});
}

function resetSteps(){
    steps=0;
    localStorage.setItem("steps",steps);
    updateSteps();
}

