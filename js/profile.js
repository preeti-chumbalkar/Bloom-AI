// ======================================
// BLOOM AI PROFILE
// ======================================

// ===============================
// USER DATA
// ===============================

const user = loadData("currentUser") || {};

const profileData = loadData("profileData") || {};

const analyticsData = loadData("analyticsData") || {};

const studyData = loadData("studyData") || {};

const fitnessData = loadData("fitnessData") || {};

const journalData = loadData("journalData") || {};

// ===============================
// USER DETAILS
// ===============================

document.getElementById("userName").textContent =
    user.fullname || "Student";

document.getElementById("userEmail").textContent =
    user.email || "student@email.com";

document.getElementById("profileName").textContent =
    user.fullname || "Student";

document.getElementById("profileEmail").textContent =
    user.email || "student@email.com";

// ===============================
// THEME TOGGLE
// ===============================

const themeToggle = document.getElementById("themeToggle");

function applyThemePreference() {
    const savedTheme = loadData("settings")?.theme || localStorage.getItem("preferredTheme") || "light";
    const isDark = savedTheme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    if (themeToggle) {
        const icon = themeToggle.querySelector("i");
        if (icon) {
            icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
        }
        themeToggle.innerHTML = `${isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'} ${isDark ? "Light Mode" : "Dark Mode"}`;
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const isDark = document.body.classList.toggle("dark-mode");
        const savedTheme = isDark ? "dark" : "light";
        localStorage.setItem("preferredTheme", savedTheme);
        const settings = loadData("settings") || {};
        settings.theme = savedTheme;
        saveData("settings", settings);
        applyThemePreference();
    });
}

applyThemePreference();

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
// LOAD PROFILE IMAGE
// ===============================

const profileImage =
document.getElementById("profileImage");

function applyProfileImage(src) {
    if (profileImage) {
        profileImage.src = src;
    }
}

if(profileData.image){

    applyProfileImage(profileData.image);

}

// ===============================
// IMAGE UPLOAD
// ===============================

const imageUpload =
document.getElementById("imageUpload");

if (imageUpload) {
imageUpload.addEventListener("change", function(event){

    const file = event.target.files[0];

    if(!file){

        return;

    }

    const reader = new FileReader();

    reader.onload = function(e){

        applyProfileImage(e.target.result);

        profileData.image = e.target.result;

        saveData("profileData", profileData);

    };

    reader.readAsDataURL(file);

});
}

// ===============================
// LOAD PROFILE FIELDS
// ===============================

const fields = [

"college",

"branch",

"year",

"rollNo",

"skills",

"bio",

"careerGoals",

"interests",

"subjects",

"phone",

"email",

"city",

"country",

"github",

"linkedin",

"portfolio",

"instagram"

];

fields.forEach(function(field){

    const element = document.getElementById(field);

    if(element){

        element.value = profileData[field] || "";

    }

});


// ===============================
// SAVE PROFILE
// ===============================

const saveProfileBtn =
document.getElementById("saveProfile");

function saveProfile() {

    fields.forEach(function(field){

        const element = document.getElementById(field);

        if(element){

            profileData[field] = element.value.trim();

        }

    });

    saveData("profileData", profileData);

    document.getElementById("profileName").textContent =
        (user.fullname || "Student").trim();

    document.getElementById("profileEmail").textContent =
        (user.email || "student@email.com").trim();

    document.getElementById("profileCompletionValue")?.remove();

    alert("✅ Profile saved successfully!");

}

saveProfileBtn.addEventListener("click", saveProfile);

// ===============================
// BLOOM STATISTICS
// ===============================

document.getElementById("bloomScore").textContent =
(analyticsData.bloomScore || 0) + "%";

// ===============================
// STUDY STATISTICS
// ===============================

document.getElementById("studyStreak").textContent =
(studyData.studyStreak || 0) + " Days";

document.getElementById("topicsCompleted").textContent =
studyData.completedTopics || 0;

document.getElementById("studyHours").textContent =
(studyData.studyHours || 0) + " hrs";

// ===============================
// FITNESS STATISTICS
// ===============================

document.getElementById("exerciseTime").textContent =
(fitnessData.exercise || 0) + " min";

document.getElementById("waterIntake").textContent =
(fitnessData.water || 0) + " / 8";

// ===============================
// JOURNAL STATISTICS
// ===============================

document.getElementById("journalEntries").textContent =
journalData.history
? journalData.history.length
: 0;

document.getElementById("currentMood").textContent =
journalData.mood || "-";


// ===============================
// EDIT PROFILE MODE
// ===============================

const editProfileBtn =
document.getElementById("editProfile");

let editing = false;

function updateProfileCompletion() {

    const completionValue = document.getElementById("profileCompletionValue");

    if (!completionValue) {
        return;
    }

    let completed = 0;

    fields.forEach(function(field){

        const element = document.getElementById(field);

        if(element && element.value && element.value.trim() !== ""){
            completed++;
        }

    });

    const profileCompletion = Math.round((completed / fields.length) * 100);
    completionValue.textContent = `Profile completion: ${profileCompletion}%`;

}

if (editProfileBtn) {

editProfileBtn.addEventListener("click", function(){

    editing = !editing;

    fields.forEach(function(field){

        const element = document.getElementById(field);

        if(element){

            element.disabled = !editing;

        }

    });

    imageUpload.disabled = !editing;

    if(editing){

        editProfileBtn.textContent =
        "💾 Editing...";

    }

    else{

        editProfileBtn.textContent =
        "✏️ Edit Profile";

    }

});

}

// ===============================
// ACHIEVEMENT SYSTEM
// ===============================

const achievementCards =
document.querySelectorAll(".achievement-card");

const unlockedAchievements = [

    (studyData.completedTopics || 0) >= 50,

    (studyData.studyStreak || 0) >= 30,

    (journalData.history
        ? journalData.history.length
        : 0) >= 100,

    (fitnessData.water || 0) >= 8

];

achievementCards.forEach(function(card,index){

    if(unlockedAchievements[index]){

        card.style.border =
        "3px solid #22c55e";

        card.style.background =
        "#f0fdf4";

        card.innerHTML +=
        `<p style="color:#22c55e;
        margin-top:15px;
        font-weight:bold;">

        ✅ Unlocked

        </p>`;

    }

    else{

        card.style.opacity=".7";

        card.innerHTML +=
        `<p style="color:#ef4444;
        margin-top:15px;
        font-weight:bold;">

        🔒 Locked

        </p>`;

    }

});

// ===============================
// PROFILE COMPLETION
// ===============================

updateProfileCompletion();

fields.forEach(function(field){

    const element = document.getElementById(field);

    if (element) {

        element.addEventListener("input", updateProfileCompletion);

    }

});

// ===============================
// SOCIAL LINK VALIDATION
// ===============================

const socialFields = [

"github",

"linkedin",

"portfolio",

"instagram"

];

socialFields.forEach(function(field){

    const input =
    document.getElementById(field);

    if (!input) {
        return;
    }

    input.addEventListener("blur", function(){

        const value = input.value.trim();

        if(value === ""){

            return;

        }

        if(!value.startsWith("http")){

            alert(

                field +

                " link should start with https://"

            );

            input.focus();

        }

    });

});

// ===============================
// PROFILE SUGGESTIONS
// ===============================

let suggestion = "";

if(profileCompletion < 50){

    suggestion +=
    "Complete your profile information.\n";

}

if((studyData.studyHours || 0) < 2){

    suggestion +=
    "Study at least 2 hours daily.\n";

}

if((fitnessData.water || 0) < 8){

    suggestion +=
    "Increase your daily water intake.\n";

}

if(!journalData.mood){

    suggestion +=
    "Record your mood in the Journal page.\n";

}

if(suggestion !== ""){

    console.log(

        "Bloom AI Suggestions:\n" +

        suggestion

    );

}


// ===============================
// LOGOUT
// ===============================

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",function(){

        const confirmLogout = confirm(

            "Are you sure you want to logout?"

        );

        if(!confirmLogout){

            return;

        }

        deleteData("currentUser");

        window.location.href = "login.html";

    });

}

// ===============================
// AUTO SAVE
// ===============================

fields.forEach(function(field){

    const element = document.getElementById(field);

    if(!element){

        return;

    }

    element.addEventListener("input",function(){

        profileData[field] = element.value;

        saveData("profileData",profileData);

    });

});

// ===============================
// AUTO REFRESH STATISTICS
// ===============================

function refreshProfileStats(){

    document.getElementById("bloomScore").textContent =
        (loadData("analyticsData")?.bloomScore || 0) + "%";

    document.getElementById("studyStreak").textContent =
        (loadData("studyData")?.studyStreak || 0) + " Days";

    document.getElementById("topicsCompleted").textContent =
        loadData("studyData")?.completedTopics || 0;

    document.getElementById("studyHours").textContent =
        (loadData("studyData")?.studyHours || 0) + " hrs";

    document.getElementById("exerciseTime").textContent =
        (loadData("fitnessData")?.exercise || 0) + " min";

    document.getElementById("waterIntake").textContent =
        (loadData("fitnessData")?.water || 0) + " / 8";

    const latestJournal = loadData("journalData") || {};

    document.getElementById("journalEntries").textContent =
        latestJournal.history
            ? latestJournal.history.length
            : 0;

    document.getElementById("currentMood").textContent =
        latestJournal.mood || "-";

}

// Refresh every 30 seconds

setInterval(refreshProfileStats,30000);

// ===============================
// PAGE INITIALIZATION
// ===============================

function initializeProfile(){

    refreshProfileStats();

    console.log("👤 Profile Loaded");

    console.log("User:",user.fullname);

    console.log("Profile Completion:",profileCompletion + "%");

}

initializeProfile();

// ===============================
// PAGE LOADED
// ===============================

window.addEventListener("load",function(){

    console.log("🌸 Bloom AI Profile Ready");

});