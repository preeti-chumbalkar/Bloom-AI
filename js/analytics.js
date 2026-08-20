// ======================================
// BLOOM AI ANALYTICS
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
// LOAD DATA
// ===============================

const studyData =
loadData("studyData") || {};

const fitnessData =
loadData("fitnessData") || {};

const journalData =
loadData("journalData") || {};

const dashboardData =
loadData("dashboardData") || {};

// ===============================
// HTML ELEMENTS
// ===============================

const bloomScore =
document.getElementById("bloomScore");

const studyProgress =
document.getElementById("studyProgress");

const fitnessScore =
document.getElementById("fitnessScore");

const currentMood =
document.getElementById("currentMood");

// ===============================
// STUDY DATA
// ===============================

document.getElementById("topicsCompleted").textContent =
studyData.completedTopics || 0;

document.getElementById("studyHours").textContent =
(studyData.studyHours || 0) + " hrs";

document.getElementById("studyStreak").textContent =
(studyData.studyStreak || 0) + " Days";

// ===============================
// FITNESS DATA
// ===============================

document.getElementById("waterAnalytics").textContent =
fitnessData.water || "0 / 8";

document.getElementById("exerciseAnalytics").textContent =
(fitnessData.exercise || 0) + " Min";

document.getElementById("calorieAnalytics").textContent =
(fitnessData.calories || 0) + " kcal";

document.getElementById("sleepAnalytics").textContent =
(fitnessData.sleep || 0) + " Hours";

// ===============================
// JOURNAL DATA
// ===============================

document.getElementById("journalEntries").textContent =
journalData.history ?
journalData.history.length : 0;

document.getElementById("journalMood").textContent =
journalData.mood || "-";

document.getElementById("journalStreak").textContent =
(journalData.streak || 0) + " Days";

document.getElementById("completedGoals").textContent =
journalData.goals
? journalData.goals.filter(goal => goal.completed).length
: 0;


// ===============================
// BLOOM SCORE CALCULATION
// ===============================

// Study Score (0-100)

const studyScore = Math.min(

    ((studyData.completedTopics || 0) * 10),

    100

);

// Fitness Score (0-100)

const fitnessScoreValue = Math.min(

    ((fitnessData.water || 0) * 10) +
    ((fitnessData.exercise || 0) / 3),

    100

);

// Journal Score (0-100)

const journalScore = Math.min(

    (journalData.history
        ? journalData.history.length * 10
        : 0),

    100

);

// Goal Score (0-100)

const completedGoals =

journalData.goals
? journalData.goals.filter(goal => goal.completed).length
: 0;

const totalGoals =

journalData.goals
? journalData.goals.length
: 0;

let goalScore = 0;

if(totalGoals > 0){

    goalScore = Math.round(

        (completedGoals / totalGoals) * 100

    );

}

// ===============================
// FINAL BLOOM SCORE
// ===============================

const finalBloomScore = Math.round(

    (

        studyScore +

        fitnessScoreValue +

        journalScore +

        goalScore

    ) / 4

);

// ===============================
// UPDATE OVERVIEW
// ===============================

bloomScore.textContent =
finalBloomScore + "%";

studyProgress.textContent =
studyScore + "%";

fitnessScore.textContent =
fitnessScoreValue + "%";

currentMood.textContent =
journalData.mood || "-";

// ===============================
// SCORE BREAKDOWN
// ===============================

document.getElementById("studyScore").textContent =
studyScore + "%";

document.getElementById("fitnessBreakdown").textContent =
fitnessScoreValue + "%";

document.getElementById("journalScore").textContent =
journalScore + "%";

document.getElementById("goalScore").textContent =
goalScore + "%";

document.getElementById("overallProgress").textContent =
finalBloomScore + "%";

// ===============================
// WEEKLY PROGRESS
// ===============================

const weeklyProgress =

dashboardData.weeklyProgress ||

[

65,

72,

80,

76,

88,

92,

85

];

const days = [

"monday",

"tuesday",

"wednesday",

"thursday",

"friday",

"saturday",

"sunday"

];

days.forEach(function(day, index){

    const progress = weeklyProgress[index];

    document.getElementById(day + "Progress").style.width =
    progress + "%";

    document.getElementById(day + "Value").textContent =
    progress + "%";

});


// ===============================
// ACHIEVEMENT SYSTEM
// ===============================

const achievementCards =
document.querySelectorAll(".achievement-card");

const achievements = [

    {
        title: "Study Master",
        unlocked: (studyData.completedTopics || 0) >= 50
    },

    {
        title: "Hydration Hero",
        unlocked: (fitnessData.water || 0) >= 8
    },

    {
        title: "Journal Champion",
        unlocked: (journalData.history
            ? journalData.history.length
            : 0) >= 30
    },

    {
        title: "Consistency King",
        unlocked: (
            Math.max(
                studyData.studyStreak || 0,
                journalData.streak || 0
            )
        ) >= 30
    }

];

// Update Achievement Cards

achievementCards.forEach(function(card, index){

    if(achievements[index].unlocked){

        card.style.border =
        "3px solid #22c55e";

        card.style.background =
        "#f0fdf4";

        card.innerHTML += `

            <p style="color:#22c55e;
                      font-weight:bold;
                      margin-top:15px;">

                ✅ Unlocked

            </p>

        `;

    }

    else{

        card.style.opacity = ".7";

        card.innerHTML += `

            <p style="color:#ef4444;
                      font-weight:bold;
                      margin-top:15px;">

                🔒 Locked

            </p>

        `;

    }

});

// ===============================
// AI INSIGHTS
// ===============================

const aiInsight =
document.getElementById("aiInsight");

let insight = "";

// Overall Performance

if(finalBloomScore >= 90){

    insight =
    "🌟 Outstanding! You're maintaining an excellent balance between study, fitness and personal growth.";

}

else if(finalBloomScore >= 75){

    insight =
    "🚀 Great progress! Continue your current routine and you'll reach your goals.";

}

else if(finalBloomScore >= 60){

    insight =
    "📈 You're improving steadily. Focus on completing more goals and staying consistent.";

}

else{

    insight =
    "🌱 Every small step matters. Start by completing today's study and fitness goals.";

}

// Extra Suggestions

if((fitnessData.water || 0) < 8){

    insight +=
    "\n\n💧 Drink more water today.";

}

if((studyData.studyHours || 0) < 2){

    insight +=
    "\n📚 Try studying for at least 2 hours today.";

}

if(!journalData.mood){

    insight +=
    "\n😊 Record your mood in the Journal module.";

}

aiInsight.textContent = insight;

// ===============================
// PRODUCTIVITY LEVEL
// ===============================

let productivityLevel = "";

if(finalBloomScore >= 90){

    productivityLevel = "Excellent";

}

else if(finalBloomScore >= 75){

    productivityLevel = "Very Good";

}

else if(finalBloomScore >= 60){

    productivityLevel = "Good";

}

else if(finalBloomScore >= 40){

    productivityLevel = "Average";

}

else{

    productivityLevel = "Needs Improvement";

}

console.log(
    "Productivity Level:",
    productivityLevel
);

// ===============================
// SAVE ANALYTICS
// ===============================

const analyticsData = {

    bloomScore: finalBloomScore,

    productivity: productivityLevel,

    lastUpdated: new Date().toLocaleString()

};

saveData("analyticsData", analyticsData);


// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {

            return;

        }

        deleteData("currentUser");

        window.location.href = "login.html";

    });

}

// ===============================
// AUTO REFRESH
// ===============================

function refreshAnalytics() {

    // Refresh Bloom Score

    bloomScore.textContent =
        finalBloomScore + "%";

    studyProgress.textContent =
        studyScore + "%";

    fitnessScore.textContent =
        fitnessScoreValue + "%";

    currentMood.textContent =
        journalData.mood || "-";

}

// Refresh every minute

setInterval(refreshAnalytics, 60000);

// ===============================
// DAILY UPDATE
// ===============================

function dailyUpdate() {

    const today = new Date().toDateString();

    if (dashboardData.lastAnalyticsDate !== today) {

        dashboardData.lastAnalyticsDate = today;

        dashboardData.lastBloomScore = finalBloomScore;

        saveData("dashboardData", dashboardData);

    }

}

dailyUpdate();

// ===============================
// PAGE INITIALIZATION
// ===============================

function initializeAnalytics() {

    refreshAnalytics();

    console.log("📊 Loading Analytics...");

    console.log("Study Score:", studyScore);

    console.log("Fitness Score:", fitnessScoreValue);

    console.log("Journal Score:", journalScore);

    console.log("Goal Score:", goalScore);

    console.log("Bloom Score:", finalBloomScore);

}

initializeAnalytics();

// ===============================
// PAGE LOADED
// ===============================

window.addEventListener("load", function () {

    console.log("🌸 Bloom AI Analytics Loaded Successfully");

});