/* ================= LOGIN CHECK ================= */

if (
  localStorage.getItem("loggedIn") !== "true" ||
  !localStorage.getItem("userId")
) {
  window.location.href = "login.html";
}

const userId = localStorage.getItem("userId");
const today = new Date().toISOString().split("T")[0];

/* ================= LOGOUT ================= */

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  window.location.href = "login.html";
}

/* ================= WELCOME NAME ================= */

document.addEventListener("DOMContentLoaded", function () {
  const name = localStorage.getItem("userName");

  if (name) {
    const el = document.getElementById("welcome");
    if (el) el.innerText = "Welcome " + name;
  }

  loadDailyProgress();
  loadBurnedCalories();
});

/* ================= NAV ACTIVE ================= */

const list = document.querySelectorAll(".navigation ul li");

if (list.length) {
  list.forEach((item) => {
    item.addEventListener("click", function () {
      list.forEach((li) => li.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

/* ================= WATER + STEPS ================= */

let water = 0;
let steps = 0;

const WATER_GOAL = 8;

let tracking = false;
let lastMagnitude = 0;
let lastStepTime = 0;
let motionHandler = null;

/* ================= LOAD DAILY DATA ================= */

function loadDailyProgress() {
  if (!userId) return;

  fetch(`http://localhost:5000/api/daily-progress/${userId}/${today}`)
    .then(res => res.json())
    .then(data => {
      water = data.water || 0;
      steps = data.steps || 0;

      updateWater();
      updateSteps();
    })
    .catch(err => console.log(err));
}

/* ================= SAVE DAILY DATA ================= */

function saveDailyProgress() {
  if (!userId) return;

  fetch("http://localhost:5000/api/daily-progress/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId,
      date: today,
      steps,
      water
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) console.log(data.error);
    })
    .catch(err => console.log(err));
}

/* ================= WATER ================= */

function addWater() {
  if (water < WATER_GOAL) {
    water++;
    updateWater();
    saveDailyProgress();
  }
}

function resetWater() {
  water = 0;
  updateWater();
  saveDailyProgress();
}

function updateWater() {
  const text = document.getElementById("waterText");

  if (text) {
    text.innerText = water + " / " + WATER_GOAL + " glasses";
  }

  let percent = (water / WATER_GOAL) * 100;

  const bar = document.getElementById("waterBar");

  if (bar) {
    bar.style.width = percent + "%";
  }
}

/* ================= CALORIES (FROM BACKEND) ================= */

function loadBurnedCalories() {
  const el = document.getElementById("burned");

  if (!el || !userId) return;

  fetch(`http://localhost:5000/api/workout/${userId}`)
    .then(res => res.json())
    .then(data => {
      const total = data.reduce((sum, item) => sum + (item.calories || 0), 0);
      el.innerText = total + " kcal";
    })
    .catch(err => console.log(err));
}

/* ================= STEPS ================= */

function updateSteps() {
  const el = document.getElementById("steps");
  if (el) el.innerText = steps;
}

/* ================= START STEP TRACKING ================= */

function startTracking() {
  if (tracking) return;

  function begin() {
    tracking = true;

    motionHandler = function (e) {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const mag = Math.sqrt(
        acc.x * acc.x +
        acc.y * acc.y +
        acc.z * acc.z
      );

      const now = Date.now();

      if (Math.abs(mag - lastMagnitude) > 4 && (now - lastStepTime) > 500) {
        steps++;
        updateSteps();
        saveDailyProgress();
        lastStepTime = now;
      }

      lastMagnitude = mag;
    };

    window.addEventListener("devicemotion", motionHandler);

    alert("Step tracking started. Walk with phone.");
  }

  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission()
      .then(res => {
        if (res === "granted") begin();
        else alert("Motion permission denied");
      })
      .catch(() => alert("Permission error"));
  } else {
    begin();
  }
}

/* ================= STOP TRACKING ================= */

function stopTracking() {
  tracking = false;

  if (motionHandler) {
    window.removeEventListener("devicemotion", motionHandler);
    motionHandler = null;
  }
}

/* ================= RESET STEPS ================= */

function resetSteps() {
  steps = 0;
  updateSteps();
  saveDailyProgress();
}