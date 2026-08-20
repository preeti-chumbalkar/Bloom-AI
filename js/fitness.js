// ======================================
// BLOOM AI FITNESS MODULE
// ======================================

// ===============================
// USER INFORMATION
// ===============================

const user = loadData("currentUser");

if (user) {

    document.getElementById("userName").textContent =
        user.fullname;

    document.getElementById("userEmail").textContent =
        user.email;

}

// ===============================
// LIVE CLOCK
// ===============================

function updateClock() {

    const now = new Date();

    document.getElementById("currentTime").textContent =
        now.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        });

}

updateClock();

setInterval(updateClock, 1000);

// ===============================
// FITNESS DATA
// ===============================

let fitnessData = loadData("fitnessData") || {

    water: 0,

    exercise: 0,

    sleep: 0,

    calories: 0,

    notes: "",

    history: []

};

// ===============================
// HTML ELEMENTS
// ===============================

const waterCount =
document.getElementById("waterCount");

const exerciseMinutes =
document.getElementById("exerciseMinutes");

const sleepHours =
document.getElementById("sleepHours");

const caloriesBurned =
document.getElementById("caloriesBurned");

const notes =
document.getElementById("fitnessNotes");
// ===============================
// UPDATE FITNESS UI
// ===============================

function updateFitnessUI() {

    waterCount.textContent =
        fitnessData.water + " / 8";

    exerciseMinutes.textContent =
        fitnessData.exercise + " Min";

    sleepHours.textContent =
        fitnessData.sleep + " Hours";

    caloriesBurned.textContent =
        fitnessData.calories;

    notes.value =
        fitnessData.notes;

    // Progress Bars

    document.getElementById("waterProgress").value =
        fitnessData.water;

    document.getElementById("exerciseProgress").value =
        fitnessData.exercise;

    document.getElementById("sleepProgress").value =
        fitnessData.sleep;

    document.getElementById("calorieProgress").value =
        fitnessData.calories;

    // Daily Summary

    document.getElementById("summaryWater").textContent =
        fitnessData.water + " / 8 Glasses";

    document.getElementById("summaryExercise").textContent =
        fitnessData.exercise + " Minutes";

    document.getElementById("summarySleep").textContent =
        fitnessData.sleep + " Hours";

    document.getElementById("summaryCalories").textContent =
        fitnessData.calories + " kcal";

}

// ===============================
// SAVE FITNESS DATA
// ===============================

function saveFitnessData() {

    saveData("fitnessData", fitnessData);

}

// ===============================
// WATER TRACKER
// ===============================

document.getElementById("addWater")
.addEventListener("click", function () {

    if (fitnessData.water < 8) {

        fitnessData.water++;

        fitnessData.history.push(
            "💧 Drank one glass of water"
        );

        saveFitnessData();

        updateFitnessUI();

    }

});

// ===============================
// EXERCISE TRACKER
// ===============================

document.getElementById("addExercise")
.addEventListener("click", function () {

    fitnessData.exercise += 10;

    fitnessData.history.push(
        "🏃 Exercised for 10 minutes"
    );

    saveFitnessData();

    updateFitnessUI();

});

// ===============================
// SLEEP TRACKER
// ===============================

document.getElementById("addSleep")
.addEventListener("click", function () {

    if (fitnessData.sleep < 24) {

        fitnessData.sleep++;

        fitnessData.history.push(
            "😴 Added 1 hour of sleep"
        );

        saveFitnessData();

        updateFitnessUI();

    }

});

// ===============================
// CALORIE TRACKER
// ===============================

document.getElementById("addCalories")
.addEventListener("click", function () {

    fitnessData.calories += 50;

    fitnessData.history.push(
        "🔥 Burned 50 calories"
    );

    saveFitnessData();

updateFitnessUI();

updateWorkoutHistory();

checkAchievements();

});

// ===============================
// INITIAL LOAD
// ===============================

updateFitnessUI();
// ===============================
// FITNESS NOTES
// ===============================

const saveNotesBtn =
document.getElementById("saveNotes");

saveNotesBtn.addEventListener("click", function () {

    fitnessData.notes = notes.value;

    saveFitnessData();

    alert("📝 Fitness notes saved successfully!");

});

// ===============================
// WORKOUT HISTORY
// ===============================

function updateWorkoutHistory() {

    const historyList =
    document.getElementById("workoutHistory");

    historyList.innerHTML = "";

    if (fitnessData.history.length === 0) {

        historyList.innerHTML = `

        <li>

            No workouts recorded yet.

        </li>

        `;

        return;

    }

    fitnessData.history
        .slice(-10)
        .reverse()
        .forEach(function(item){

            historyList.innerHTML += `

            <li>

                ${item}

            </li>

            `;

        });

}

updateWorkoutHistory();

// ===============================
// ACHIEVEMENT BADGES
// ===============================

function checkAchievements() {

    const badges =
    document.querySelectorAll(".badge-card");

    badges.forEach(function(badge){

        badge.style.opacity = ".4";

    });

    if(fitnessData.water >= 8){

        badges[0].style.opacity = "1";

    }

    if(fitnessData.exercise >= 30){

        badges[1].style.opacity = "1";

    }

    if(fitnessData.calories >= 500){

        badges[2].style.opacity = "1";

    }

    if(fitnessData.sleep >= 8){

        badges[3].style.opacity = "1";

    }

}

checkAchievements();

// ===============================
// AI FITNESS TIPS
// ===============================

const tips = [

    "💧 Drink water before and after exercise.",

    "🏃 A 30-minute walk every day improves health.",

    "😴 Sleep at least 8 hours for better recovery.",

    "🥗 Eat healthy food along with regular exercise.",

    "🧘 Stretch for 5 minutes before every workout.",

    "🚴 Consistency is more important than intensity."

];

const randomTip =
tips[Math.floor(Math.random() * tips.length)];

document.getElementById("fitnessTip").textContent =
randomTip;

// ===============================
// DAILY GOALS
// ===============================

const goalIds = [

    "goalWater",

    "goalExercise",

    "goalSleep",

    "goalCalories"

];

goalIds.forEach(function(id){

    const checkbox =
    document.getElementById(id);

    checkbox.checked =
    loadData(id) || false;

    checkbox.addEventListener("change", function(){

        saveData(id, checkbox.checked);

    });

});
// ===============================
// DASHBOARD SYNCHRONIZATION
// ===============================

function updateDashboardData() {

    let dashboardData = loadData("dashboardData") || {};

    dashboardData.waterProgress =
        fitnessData.water + " / 8 Glasses";

    dashboardData.exerciseMinutes =
        fitnessData.exercise + " Minutes";

    dashboardData.sleepHours =
        fitnessData.sleep + " Hours";

    dashboardData.caloriesBurned =
        fitnessData.calories + " kcal";

    dashboardData.lastUpdated =
        new Date().toLocaleString();

    saveData("dashboardData", dashboardData);

}

updateDashboardData();

// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (confirmLogout) {

            deleteData("currentUser");

            window.location.href = "login.html";

        }

    });

}

// ===============================
// DAILY RESET (OPTIONAL)
// ===============================

function checkDailyReset() {

    const today =
        new Date().toDateString();

    const lastDate =
        loadData("fitnessDate");

    if (lastDate !== today) {

        fitnessData.water = 0;
        fitnessData.exercise = 0;
        fitnessData.sleep = 0;
        fitnessData.calories = 0;

        saveData("fitnessDate", today);

        saveFitnessData();

    }

}

checkDailyReset();

// ===============================
// FINAL UI UPDATE
// ===============================

updateFitnessUI();

updateWorkoutHistory();

checkAchievements();

updateDashboardData();

// ===============================
// PAGE LOADED
// ===============================

console.log("💪 Bloom AI Fitness Module Loaded Successfully");