// ======================================
// BLOOM AI JOURNAL MODULE
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
// JOURNAL DATA
// ===============================

let journalData = loadData("journalData") || {

    mood: "",

    journal: "",

    gratitude: "",

    learning: "",

    achievement: "",

    improvement: "",

    goals: [],

    history: [],

    streak: 0

};

// ===============================
// HTML ELEMENTS
// ===============================

const journalText =
document.getElementById("journalText");

const gratitudeText =
document.getElementById("gratitudeText");

const learningText =
document.getElementById("learningText");

const achievementText =
document.getElementById("achievementText");

const improvementText =
document.getElementById("improvementText");

// ===============================
// LOAD SAVED DATA
// ===============================

journalText.value =
journalData.journal;

gratitudeText.value =
journalData.gratitude;

learningText.value =
journalData.learning;

achievementText.value =
journalData.achievement;

improvementText.value =
journalData.improvement;

// ===============================
// SAVE DATA
// ===============================

function saveJournalData(){

    saveData("journalData", journalData);

}

// ===============================
// MOOD SELECTION
// ===============================

const moodButtons =
document.querySelectorAll(".mood-btn");

moodButtons.forEach(function(button){

    // Restore saved mood
    if(button.dataset.mood === journalData.mood){

        button.classList.add("active");

    }

    button.addEventListener("click", function(){

        // Remove previous selection
        moodButtons.forEach(function(btn){

            btn.classList.remove("active");

        });

        // Highlight selected mood
        this.classList.add("active");

        // Save mood
        journalData.mood = this.dataset.mood;

        saveJournalData();

        // Update Dashboard
        document.getElementById("currentMood").textContent =
        journalData.mood;

        document.getElementById("summaryMood").textContent =
        journalData.mood;

    });

});

// ===============================
// SAVE JOURNAL
// ===============================

document.getElementById("saveJournal")
.addEventListener("click", function(){

    journalData.journal =
    journalText.value.trim();

    if(journalData.journal === ""){

        alert("Please write your journal first.");

        return;

    }

    // Add entry to history

    journalData.history.push({

        date:new Date().toLocaleString(),

        text:journalData.journal

    });

    saveJournalData();

    updateJournalHistory();

    document.getElementById("totalEntries").textContent =
    journalData.history.length;

    document.getElementById("summaryJournal").textContent =
    "Saved";

    alert("📖 Journal saved successfully!");

});

// ===============================
// SAVE GRATITUDE
// ===============================

document.getElementById("saveGratitude")
.addEventListener("click", function(){

    journalData.gratitude =
    gratitudeText.value.trim();

    saveJournalData();

    document.getElementById("summaryGratitude").textContent =
    "Saved";

    alert("🙏 Gratitude saved!");

});

// ===============================
// SAVE REFLECTION
// ===============================

document.getElementById("saveReflection")
.addEventListener("click", function(){

    journalData.learning =
    learningText.value.trim();

    journalData.achievement =
    achievementText.value.trim();

    journalData.improvement =
    improvementText.value.trim();

    saveJournalData();

    alert("💡 Reflection saved successfully!");

});

// ===============================
// JOURNAL HISTORY
// ===============================

function updateJournalHistory(){

    const history =
    document.getElementById("journalHistory");

    history.innerHTML = "";

    if(journalData.history.length === 0){

        history.innerHTML = `

        <p>

            No journal entries yet.

        </p>

        `;

        return;

    }

    journalData.history
    .slice()
    .reverse()
    .forEach(function(entry){

        history.innerHTML += `

        <div class="history-item">

            <div class="history-date">

                ${entry.date}

            </div>

            <div class="history-text">

                ${entry.text}

            </div>

        </div>

        `;

    });

}

updateJournalHistory();

document.getElementById("totalEntries").textContent =
journalData.history.length;

document.getElementById("currentMood").textContent =
journalData.mood || "Not Selected";

document.getElementById("summaryMood").textContent =
journalData.mood || "-";


// ===============================
// DAILY GOALS
// ===============================

const goalInput =
document.getElementById("goalInput");

const goalList =
document.getElementById("goalList");

// Load Goals

function loadGoals() {

    goalList.innerHTML = "";

    let completed = 0;

    journalData.goals.forEach(function(goal, index) {

        if (goal.completed) {

            completed++;

        }

        goalList.innerHTML += `

        <li>

            <label>

                <input
                    type="checkbox"
                    onchange="toggleGoal(${index})"
                    ${goal.completed ? "checked" : ""}>

                ${goal.text}

            </label>

            <button onclick="deleteGoal(${index})">

                Delete

            </button>

        </li>

        `;

    });

    document.getElementById("completedGoals").textContent =
        completed;

    document.getElementById("summaryGoals").textContent =
        completed + " / " + journalData.goals.length;

}

loadGoals();

// ===============================
// ADD GOAL
// ===============================

document.getElementById("addGoal")
.addEventListener("click", function() {

    const text = goalInput.value.trim();

    if (text === "") {

        alert("Please enter a goal.");

        return;

    }

    journalData.goals.push({

        text: text,

        completed: false

    });

    goalInput.value = "";

    saveJournalData();

    loadGoals();

});

// ===============================
// TOGGLE GOAL
// ===============================

function toggleGoal(index) {

    journalData.goals[index].completed =
        !journalData.goals[index].completed;

    saveJournalData();

    loadGoals();

}

// ===============================
// DELETE GOAL
// ===============================

function deleteGoal(index) {

    journalData.goals.splice(index, 1);

    saveJournalData();

    loadGoals();

}

// ===============================
// AI MOTIVATION
// ===============================

const motivationQuotes = [

    "🌸 Small progress every day leads to big success.",

    "🚀 Stay focused on your goals.",

    "📚 Learning never stops.",

    "💪 Believe in yourself and keep improving.",

    "✨ Success comes from consistent effort.",

    "🎯 Every day is another chance to grow.",

    "🌱 Your future is created by what you do today."

];

const randomQuote =

motivationQuotes[
Math.floor(Math.random() * motivationQuotes.length)
];

document.getElementById("motivationText").textContent =
randomQuote;

// ===============================
// JOURNAL STREAK
// ===============================

function updateJournalStreak() {

    const today =
        new Date().toDateString();

    if (journalData.lastJournalDate !== today) {

        journalData.streak++;

        journalData.lastJournalDate = today;

        saveJournalData();

    }

    document.getElementById("journalStreak").textContent =
        journalData.streak + " Days";

}

updateJournalStreak();

// ===============================
// DASHBOARD SYNC
// ===============================

function syncDashboard() {

    let dashboardData =
        loadData("dashboardData") || {};

    dashboardData.mood =
        journalData.mood;

    dashboardData.journalEntries =
        journalData.history.length;

    dashboardData.completedGoals =
        journalData.goals.filter(goal => goal.completed).length;

    dashboardData.journalStreak =
        journalData.streak;

    dashboardData.lastUpdated =
        new Date().toLocaleString();

    saveData("dashboardData", dashboardData);

}

syncDashboard();


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
// DAILY RESET
// ===============================

function checkDailyReset() {

    const today = new Date().toDateString();

    const lastDate = journalData.lastResetDate || "";

    if (today !== lastDate) {

        // Reset only daily fields

        journalData.mood = "";

        journalData.goals = [];

        journalData.lastResetDate = today;

        saveJournalData();

    }

}

checkDailyReset();

// ===============================
// AUTO SAVE
// ===============================

journalText.addEventListener("input", function () {

    journalData.journal = this.value;

    saveJournalData();

});

gratitudeText.addEventListener("input", function () {

    journalData.gratitude = this.value;

    saveJournalData();

});

learningText.addEventListener("input", function () {

    journalData.learning = this.value;

    saveJournalData();

});

achievementText.addEventListener("input", function () {

    journalData.achievement = this.value;

    saveJournalData();

});

improvementText.addEventListener("input", function () {

    journalData.improvement = this.value;

    saveJournalData();

});

// ===============================
// PAGE INITIALIZATION
// ===============================

function initializeJournal() {

    updateJournalHistory();

    loadGoals();

    syncDashboard();

    document.getElementById("currentMood").textContent =
        journalData.mood || "Not Selected";

    document.getElementById("summaryMood").textContent =
        journalData.mood || "-";

    document.getElementById("summaryJournal").textContent =
        journalData.journal ? "Saved" : "Not Saved";

    document.getElementById("summaryGratitude").textContent =
        journalData.gratitude ? "Saved" : "Not Saved";

    document.getElementById("totalEntries").textContent =
        journalData.history.length;

    document.getElementById("journalStreak").textContent =
        journalData.streak + " Days";

}

initializeJournal();

// ===============================
// PAGE LOADED
// ===============================

console.log("📝 Bloom AI Journal Module Loaded Successfully");