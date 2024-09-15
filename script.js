let isDarkMode = false;

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    isDarkMode = !isDarkMode;
    document.querySelector(".dark-mode-toggle").textContent = isDarkMode ? "☀️" : "🌙";
}

function showSignupForm() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.signup-container').style.display = 'block';
}

function showLoginForm() {
    document.querySelector('.signup-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if username already exists
    if (localStorage.getItem(username)) {
        document.getElementById('signupError').style.display = 'block';
    } else {
        // Store user credentials in localStorage
        localStorage.setItem(username, password);
        alert("Account created successfully!");
        showLoginForm(); // Switch to login form after successful signup
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the username exists and the password matches
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        alert("Login successful!");
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.main').style.display = 'block';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});

function forgotPassword() {
    const username = prompt("Enter your username:");
    if (!username) {
        return;
    }

    const storedPassword = localStorage.getItem(username);
    if (storedPassword) {
        const newPassword = prompt("Enter your new password:");
        if (newPassword) {
            localStorage.setItem(username, newPassword);
            alert("Password reset successful. You can now log in with your new password.");
        }
    } else {
        alert("Username not found.");
    }
}

async function shortenURL() {
    const urlInput = document.getElementById('urlInput').value;

    if (!urlInput) {
        alert("Please enter a valid URL.");
        return;
    }

    try {
        // Use TinyURL API to shorten the URL
        const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(urlInput)}`;
        const response = await fetch(apiUrl);
        const shortenedURL = await response.text();

        // Update the result
        document.getElementById('shortenedURL').textContent = shortenedURL;
        document.getElementById('shortenedURL').href = shortenedURL;
        document.getElementById('result').style.display = 'block';

        // Generate QR Code using QuickChart API
        const qrCodeImage = document.getElementById('qrCodeImage');
        qrCodeImage.src = `https://quickchart.io/qr?text=${encodeURIComponent(shortenedURL)}&size=150`;

    } catch (error) {
        console.error("Error shortening the URL:", error);
        alert("Failed to shorten the URL. Please try again.");
    }
}

function copyToClipboard() {
    const copyText = document.getElementById('shortenedURL').textContent;
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Copied to clipboard: " + copyText);
    });
}
