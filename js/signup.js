// ===============================
// BLOOM AI SIGNUP
// ===============================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const signupForm = document.getElementById("signupForm");

if (togglePassword && password) {
    togglePassword.addEventListener("click", function () {
        if (password.type === "password") {
            password.type = "text";
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");
        } else {
            password.type = "password";
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");
        }
    });
}

if (signupForm) {
    signupForm.addEventListener("submit", function(event){
        event.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const passwordValue = document.getElementById("password").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');

        if(fullname === ""){
            alert("Please enter your full name.");
            return;
        }

        if(email === ""){
            alert("Please enter your email.");
            return;
        }

        if(!email.includes("@")){
            alert("Please enter a valid email.");
            return;
        }

        if(passwordValue.length < 6){
            alert("Password must be at least 6 characters.");
            return;
        }

        if(!gender){
            alert("Please select your gender.");
            return;
        }

        const user = {
            fullname: fullname,
            email: email,
            password: passwordValue,
            gender: gender.value,
            theme: gender.value === "Female" ? "pink" : "blue"
        };

        fetch('backend/api/signup.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Incorporate theme/gender to the user object
                const fullUser = { ...data.user, gender: gender.value, theme: user.theme };
                
                // Initialize default local state
                localStorage.setItem('currentUser', JSON.stringify(fullUser));
                const userSuffix = `_${email.toLowerCase()}`;
                localStorage.setItem(`profileData${userSuffix}`, JSON.stringify({ fullname, email, gender: gender.value }));
                localStorage.setItem(`settings${userSuffix}`, JSON.stringify({ theme: user.theme, accent: user.theme === 'pink' ? 'pink' : 'blue' }));
                localStorage.setItem(`studyData${userSuffix}`, JSON.stringify({ completedTopics: 0, studyHours: 0, studyStreak: 0 }));
                localStorage.setItem(`fitnessData${userSuffix}`, JSON.stringify({ water: 0, exercise: 0, sleep: 0, calories: 0, notes: '' }));
                localStorage.setItem(`journalData${userSuffix}`, JSON.stringify({ entries: [] }));
                localStorage.setItem(`studyTasks${userSuffix}`, JSON.stringify([]));
                localStorage.setItem(`recentActivity${userSuffix}`, JSON.stringify([]));

                // Save all initialized data to DB
                const initialKeys = [
                    'profileData', 'settings', 'studyData', 'fitnessData', 
                    'journalData', 'studyTasks', 'recentActivity'
                ];
                // We'll sync them later in background or when they're first updated
                
                alert("Account Created Successfully! 🌸");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message || "Signup failed");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
    });
}