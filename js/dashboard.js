// ======================================
// BLOOM AI DASHBOARD
// ======================================

const user = getCurrentUser();

if (!user) {
    window.location.href = "login.html";
}

if (user) {
    const usernameEl = document.getElementById("username");
    const userNameEl = document.getElementById("userName");
    const userEmailEl = document.getElementById("userEmail");

    if (usernameEl) usernameEl.textContent = user.fullname;
    if (userNameEl) userNameEl.textContent = user.fullname;
    if (userEmailEl) userEmailEl.textContent = user.email;
}

const today = new Date();
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

const currentDateEl = document.getElementById("currentDate");
if (currentDateEl) currentDateEl.textContent = today.toLocaleDateString("en-US", options);

const greeting = today.getHours() < 12 ? "Good Morning" : today.getHours() < 18 ? "Good Afternoon" : "Good Evening";
const welcomeEl = document.getElementById("username");
if (welcomeEl && user) {
    welcomeEl.textContent = `${user.fullname} 🌸`;
    const headingText = document.querySelector(".welcome h1");
    if (headingText) {
        headingText.innerHTML = `${greeting}, <span id=\"username\">${user.fullname}</span> 🌸`;
    }
}

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    const currentTimeEl = document.getElementById("currentTime");
    if (currentTimeEl) currentTimeEl.textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

const calendarDateEl = document.getElementById("calendarDate");
if (calendarDateEl) calendarDateEl.valueAsDate = new Date();

let bloomScore = 85;
let studyProgress = "12 / 18";
let waterProgress = "6 / 8";
let studyStreak = "15 Days";

const bloomScoreEl = document.getElementById("bloomScore");
const sidebarScoreEl = document.getElementById("sidebarScore");
const studyProgressEl = document.getElementById("studyProgress");
const waterProgressEl = document.getElementById("waterProgress");
const studyStreakEl = document.getElementById("studyStreak");

if (bloomScoreEl) bloomScoreEl.textContent = bloomScore + "%";
if (sidebarScoreEl) sidebarScoreEl.textContent = bloomScore + "%";
if (studyProgressEl) studyProgressEl.textContent = studyProgress;
if (waterProgressEl) waterProgressEl.textContent = waterProgress;
if (studyStreakEl) studyStreakEl.textContent = studyStreak;

const todayTasks = document.getElementById("todayTasks");
const tasks = loadData("studyTasks", user) || [];

if (todayTasks) {
    todayTasks.innerHTML = "";
    if(tasks.length === 0){
        todayTasks.innerHTML = `<li>📚 No tasks added yet.</li>`;
    }
    else{
        tasks.slice(0,5).forEach(task=>{
            const title = task.subject || task.title || task.topic || "Study task";
            todayTasks.innerHTML += `<li>${task.completed ? "✅" : "⬜"} ${title}</li>`;
        });
    }
}

const recentActivity = document.getElementById("recentActivity");
const activity = loadData("recentActivity", user) || [];

if (recentActivity) {
    recentActivity.innerHTML = "";
    if(activity.length===0){
        recentActivity.innerHTML = `<li>🌸 Welcome to Bloom AI!</li>`;
    }
    else{
        activity.slice(-5).reverse().forEach(item=>{
            recentActivity.innerHTML += `<li>${item}</li>`;
        });
    }
}

const quotes = [
    "🌸 Success is the sum of small efforts repeated every day.",
    "📚 Learn something new every day.",
    "💪 Discipline beats motivation.",
    "🚀 Small progress is still progress.",
    "🌟 Believe in yourself and keep growing.",
    "🎯 Focus on your goals, not your obstacles.",
    "😊 Every day is a chance to become better."
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
const dailyQuoteEl = document.getElementById("dailyQuote");
if (dailyQuoteEl) dailyQuoteEl.textContent = randomQuote;

let suggestion = "";
if(tasks.length === 0){
    suggestion = "📚 Start by adding your first study task today.";
}
else if(tasks.length < 5){
    suggestion = "🌸 Great start! Try adding a few more study tasks to stay organized.";
}
else{
    suggestion = "🎯 Excellent! Keep completing your daily tasks to increase your Bloom Score.";
}

const aiSuggestionEl = document.getElementById("aiSuggestion");
if (aiSuggestionEl) aiSuggestionEl.textContent = suggestion;

const notificationCount = document.querySelector(".notification-count");
let notifications = 0;

if(tasks.length > 0) notifications++;
if(activity.length > 0) notifications++;

if (notificationCount) notificationCount.textContent = notifications;

// ===============================
// LOGOUT
// ===============================

const logoutBtn =
document.getElementById("logoutBtn");

if (logoutBtn) {
logoutBtn.addEventListener("click", function(){

    const confirmLogout =
    confirm("Are you sure you want to logout?");

    if(confirmLogout){

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    }

});
}

// ===============================
// CALENDAR
// ===============================

const calendar =
document.getElementById("calendarDate");

if (calendar) {
calendar.addEventListener("change", function(){

    alert("Selected Date: " + calendar.value);

});
}

// ===============================
// SAVE DASHBOARD DATA
// ===============================

function saveDashboardData() {

    const dashboardData = {

        bloomScore: bloomScore,
        studyProgress: studyProgress,
        waterProgress: waterProgress,
        studyStreak: studyStreak,
        lastUpdated: new Date().toLocaleString()

    };

    saveData("dashboardData", dashboardData, user);

}

saveDashboardData();

// ===============================
// LOAD DASHBOARD DATA
// ===============================

function loadDashboardData() {

    const data = loadData("dashboardData", user);

    if (!data) return;

    bloomScore = data.bloomScore;
    studyProgress = data.studyProgress;
    waterProgress = data.waterProgress;
    studyStreak = data.studyStreak;

    document.getElementById("bloomScore").textContent =
        bloomScore + "%";

    document.getElementById("sidebarScore").textContent =
        bloomScore + "%";

    document.getElementById("studyProgress").textContent =
        studyProgress;

    document.getElementById("waterProgress").textContent =
        waterProgress;

    document.getElementById("studyStreak").textContent =
        studyStreak;

}

loadDashboardData();

// ===============================
// AUTO REFRESH DASHBOARD
// ===============================

setInterval(function () {

    loadDashboardData();

}, 5000);

// ===============================
// WELCOME MESSAGE
// ===============================

if (!loadData("dashboardVisited", user)) {

    setTimeout(function () {

        alert(
            "🌸 Welcome to Bloom AI Dashboard!\n\nHave a productive day!"
        );

    }, 800);

    saveData("dashboardVisited", "true", user);

}

// ===============================
// UPDATE RECENT ACTIVITY
// ===============================

function addRecentActivity(message) {

    let activity = loadData("recentActivity", user) || [];

    activity.push(message);

    if (activity.length > 20) {

        activity.shift();

    }

    saveData("recentActivity", activity, user);

}

// Example (remove later if you don't want demo data)
// addRecentActivity("🌸 Dashboard opened");

// ===============================
// DASHBOARD READY
// ===============================

console.log("🌸 Bloom AI Dashboard Loaded Successfully");


// ===============================
// BLOOM AI DASHBOARD
// ===============================


