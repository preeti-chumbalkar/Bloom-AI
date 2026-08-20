// ===============================
// BLOOM AI LOGIN
// ===============================


const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginForm = document.getElementById("loginForm");

if (togglePassword && password) {
    togglePassword.addEventListener("click", function(){

    if(password.type === "password"){

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    }
    else{

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});
}

if (localStorage.getItem("currentUser") && window.location.pathname.includes("login.html")) {
    window.location.href = "dashboard.html";
}

// ===============================
// LOGIN FUNCTION
// ===============================

if (loginForm) {
loginForm.addEventListener("submit", function(event){

    event.preventDefault();


    const email =
    document.getElementById("email").value.trim();


    const passwordValue =
    document.getElementById("password").value.trim();



    // Validation

    if(email === ""){

        alert("Please enter email");

        return;

    }


    if(passwordValue === ""){

        alert("Please enter password");

        return;

    }



    fetch('backend/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: passwordValue })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login Successful 🌸 Welcome " + data.user.fullname);
            localStorage.setItem("currentUser", JSON.stringify(data.user));

            // Sync user data from DB to localStorage
            const keysToSync = [
                'profileData', 'settings', 'studyData', 'fitnessData', 
                'journalData', 'studyTasks', 'recentActivity'
            ];
            
            Promise.all(keysToSync.map(key => 
                fetch(`backend/api/storage.php?user_id=${data.user.id}&key=${key}`)
                .then(res => res.json())
                .then(resData => {
                    if (resData.success && resData.data) {
                        const scopedKey = `${key}_${data.user.email.toLowerCase()}`;
                        localStorage.setItem(scopedKey, JSON.stringify(resData.data));
                    }
                })
            )).then(() => {
                window.location.href = "dashboard.html";
            });
        } else {
            alert(data.message || "Invalid Email or Password");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred during login. Please try again.");
    });
    });
}

