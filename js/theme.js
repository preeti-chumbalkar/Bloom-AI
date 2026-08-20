function applySavedTheme() {
    const savedTheme = localStorage.getItem("preferredTheme") || "light";
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("preferredTheme", isDark ? "dark" : "light");
}

applySavedTheme();
