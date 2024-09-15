let isDarkMode = false;

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    isDarkMode = !isDarkMode;
    document.querySelector(".dark-mode-toggle").textContent = isDarkMode ? "☀️" : "🌙";
}
