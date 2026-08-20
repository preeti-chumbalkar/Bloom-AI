// ======================================
// BLOOM AI SIDEBAR
// ======================================

window.__bloomSidebarLoaded = true;

const currentUser = getCurrentUser();

if (currentUser) {
    const nameElement = document.getElementById("userName");
    const emailElement = document.getElementById("userEmail");

    if (nameElement) {
        nameElement.innerText = currentUser.fullname;
    }

    if (emailElement) {
        emailElement.innerText = currentUser.email;
    }
}

const studyTasks = loadData("studyTasks", currentUser) || [];
const fitnessData = loadData("fitnessData", currentUser) || {};
const journalData = loadData("journalData", currentUser) || {};

let completed = Array.isArray(studyTasks)
    ? studyTasks.filter(task => task.completed).length
    : 0;

let bloomScore = 0;

if (Array.isArray(studyTasks) && studyTasks.length > 0) {
    bloomScore += (completed / studyTasks.length) * 40;
}

if (fitnessData && Object.keys(fitnessData).length > 0) {
    bloomScore += 30;
}

const journalHasEntries = Array.isArray(journalData.entries)
    ? journalData.entries.length > 0
    : Array.isArray(journalData.history)
        ? journalData.history.length > 0
        : Object.keys(journalData).length > 0;

if (journalHasEntries) {
    bloomScore += 30;
}

bloomScore = Math.round(bloomScore);

const score = document.getElementById("sidebarScore");
if (score) {
    score.innerText = bloomScore + "%";
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        if (confirm("Do you want to logout?")) {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        }
    });
}
