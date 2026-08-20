// ======================================
// BLOOM AI SETTINGS
// ======================================

// Load data
const settings = loadData("settings") || {};
const user = loadData("currentUser") || {};

// User Info
document.getElementById("userName").textContent =
user.fullname || "Student";

document.getElementById("userEmail").textContent =
user.email || "student@email.com";

// Live Clock
function updateClock(){

    const now = new Date();

    document.getElementById("currentTime").textContent =
    now.toLocaleTimeString([],{

        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"

    });

}

updateClock();

setInterval(updateClock,1000);

// Controls
const theme=document.getElementById("theme");
const accent=document.getElementById("accentColor");

const studyReminder=document.getElementById("studyReminder");
const fitnessReminder=document.getElementById("fitnessReminder");
const journalReminder=document.getElementById("journalReminder");

const language=document.getElementById("language");
const autoLogin=document.getElementById("autoLogin");
const rememberMe=document.getElementById("rememberMe");
const reminderTime=document.getElementById("reminderTime");

// Load Saved Settings
theme.value=settings.theme || "light";
accent.value=settings.accent || "pink";

studyReminder.checked=settings.studyReminder || false;
fitnessReminder.checked=settings.fitnessReminder || false;
journalReminder.checked=settings.journalReminder || false;

language.value=settings.language || "english";
autoLogin.checked=settings.autoLogin || false;
rememberMe.checked=settings.rememberMe || false;

reminderTime.value=settings.reminderTime || "20:00";

// ======================================
// APPLY THEME
// ======================================

function applyTheme(selectedTheme){

    if(selectedTheme === "dark"){

        document.body.classList.add("dark-mode");

    }

    else{

        document.body.classList.remove("dark-mode");

    }

}

applyTheme(theme.value);

// ======================================
// APPLY ACCENT COLOR
// ======================================

function applyAccent(color){

    const root = document.documentElement;

    switch(color){

        case "pink":

            root.style.setProperty("--primary","#ff69b4");
            root.style.setProperty("--secondary","#c084fc");
            break;

        case "purple":

            root.style.setProperty("--primary","#8b5cf6");
            root.style.setProperty("--secondary","#7c3aed");
            break;

        case "blue":

            root.style.setProperty("--primary","#3b82f6");
            root.style.setProperty("--secondary","#2563eb");
            break;

        case "green":

            root.style.setProperty("--primary","#22c55e");
            root.style.setProperty("--secondary","#16a34a");
            break;

    }

}

applyAccent(accent.value);

// ======================================
// SAVE SETTINGS
// ======================================

function saveSettings(){

    settings.theme = theme.value;
    settings.accent = accent.value;

    settings.studyReminder = studyReminder.checked;
    settings.fitnessReminder = fitnessReminder.checked;
    settings.journalReminder = journalReminder.checked;

    settings.language = language.value;

    settings.autoLogin = autoLogin.checked;
    settings.rememberMe = rememberMe.checked;

    settings.reminderTime = reminderTime.value;

    saveData("settings",settings);

}

// ======================================
// EVENTS
// ======================================

theme.addEventListener("change",function(){

    applyTheme(this.value);

    saveSettings();

});

accent.addEventListener("change",function(){

    applyAccent(this.value);

    saveSettings();

});

studyReminder.addEventListener("change",saveSettings);

fitnessReminder.addEventListener("change",saveSettings);

journalReminder.addEventListener("change",saveSettings);

language.addEventListener("change",saveSettings);

autoLogin.addEventListener("change",saveSettings);

rememberMe.addEventListener("change",saveSettings);

reminderTime.addEventListener("change",saveSettings);


// ======================================
// EXPORT ALL DATA
// ======================================

const exportBtn =
document.getElementById("exportData");

exportBtn.addEventListener("click",function(){

    const backup = {

        currentUser: loadData("currentUser"),

        profileData: loadData("profileData"),

        studyData: loadData("studyData"),

        fitnessData: loadData("fitnessData"),

        journalData: loadData("journalData"),

        analyticsData: loadData("analyticsData"),

        settings: loadData("settings")

    };

    const blob = new Blob(

        [JSON.stringify(backup,null,4)],

        {

            type:"application/json"

        }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "BloomAI_Backup.json";

    link.click();

    settings.lastBackup =

    new Date().toLocaleString();

    saveData("settings",settings);

    document.getElementById("lastBackup").textContent =

    settings.lastBackup;

});

// ======================================
// IMPORT BACKUP
// ======================================

const importBtn =
document.getElementById("importData");

importBtn.addEventListener("click",function(){

    const file =
    document.getElementById("importFile").files[0];

    if(!file){

        alert("Please select a backup file.");

        return;

    }

    const reader = new FileReader();

    reader.onload=function(event){

        try{

            const backup =
            JSON.parse(event.target.result);

            Object.keys(backup).forEach(function(key){

                saveData(key,backup[key]);

            });

            alert("Backup restored successfully.");

            location.reload();

        }

        catch(error){

            alert("Invalid backup file.");

        }

    };

    reader.readAsText(file);

});

// ======================================
// CLEAR ALL DATA
// ======================================

const clearBtn =
document.getElementById("clearData");

clearBtn.addEventListener("click",function(){

    const confirmDelete = confirm(

        "Delete all Bloom AI data permanently?"

    );

    if(!confirmDelete){

        return;

    }

    localStorage.clear();

    alert("All data cleared successfully.");

    window.location.href = "login.html";

});

// ======================================
// STORAGE USAGE
// ======================================

function updateStorageInfo(){

    let total = 0;

    for(let key in localStorage){

        if(localStorage.hasOwnProperty(key)){

            total +=

            localStorage[key].length;

        }

    }

    document.getElementById("storageUsed").textContent =

    (total/1024).toFixed(2) + " KB";

    document.getElementById("lastBackup").textContent =

    settings.lastBackup || "Never";

}

updateStorageInfo();


// ======================================
// LOGOUT
// ======================================

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

// ======================================
// AUTO REFRESH STORAGE INFO
// ======================================

setInterval(function(){

    updateStorageInfo();

},30000);

// ======================================
// PAGE INITIALIZATION
// ======================================

function initializeSettings(){

    updateClock();

    applyTheme(theme.value);

    applyAccent(accent.value);

    updateStorageInfo();

    console.log("⚙️ Settings Loaded");

    console.log("Theme:",settings.theme);

    console.log("Language:",settings.language);

}

initializeSettings();

// ======================================
// PAGE READY
// ======================================

window.addEventListener("load",function(){

    console.log("🌸 Bloom AI Settings Ready");

});

// ======================================
// OPTIONAL: RESET SETTINGS
// ======================================

function resetSettings(){

    if(!confirm("Reset all settings to default?")){

        return;

    }

    localStorage.removeItem("settings");

    alert("Settings reset successfully.");

    location.reload();

}

// ======================================
// OPTIONAL: KEYBOARD SHORTCUTS
// ======================================

document.addEventListener("keydown",function(e){

    // Ctrl + S = Save Settings
    if(e.ctrlKey && e.key==="s"){

        e.preventDefault();

        saveSettings();

        alert("Settings Saved");

    }

});

// ======================================
// END OF SETTINGS JS
// ======================================