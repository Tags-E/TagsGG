// --- Form Toggle (Login / Sign Up) ---
function showForm(formId) {
    document.querySelectorAll(".form-box").forEach(form => {
        form.classList.remove("active");
    });

    const target = document.getElementById(formId);
    if (target) target.classList.add("active");
}

// Elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

// --- Toggle Forms ---
function showSignUp() {
    if (!loginForm || !signupForm) return;

    loginForm.classList.add("fade-out");
    loginForm.classList.remove("fade-in");

    setTimeout(() => {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        signupForm.classList.add("fade-in");
        signupForm.classList.remove("fade-out");
    }, 400);
}

function showLogin() {
    if (!loginForm || !signupForm) return;

    signupForm.classList.add("fade-out");
    signupForm.classList.remove("fade-in");

    setTimeout(() => {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        loginForm.classList.add("fade-in");
        loginForm.classList.remove("fade-out");
    }, 400);
}

// --- Modal ---
function showModal(title, message) {
    if (!modal) return;

    modalTitle.innerText = title;
    modalMessage.innerText = message;
    modal.style.display = "flex";
}

function closeModal() {
    if (modal) modal.style.display = "none";
}

// --- Password Toggle Helper ---
function togglePassword(inputId, iconId) {
    const pwd = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (!pwd || !icon) return;

    icon.addEventListener("click", () => {
        pwd.type = pwd.type === "password" ? "text" : "password";
        icon.innerText = icon.innerText === "visibility_off"
            ? "visibility"
            : "visibility_off";
    });
}

// Apply toggle
togglePassword("loginPassword", "toggleLoginPassword");
togglePassword("password1", "togglePass1");
togglePassword("password2", "togglePass2");

// --- Password Strength Checker ---
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");

    const strengthMessage = document.getElementById("password-strength");
    const matchMessage = document.getElementById("password-match");

    if (!form || !password1 || !password2) return;

    function validatePasswords() {

        const password = password1.value;

        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        let strong = false;
        let match = false;

        // Strength check
        if (password.length < 8) {
            strengthMessage.textContent = "❌ Too short (min 8 characters)";
            strengthMessage.style.color = "red";
        } 
        else if (hasUpper && hasLower && hasNumber && hasSpecial) {
            strengthMessage.textContent = "✅ Strong password!";
            strengthMessage.style.color = "green";
            strong = true;
        } 
        else {
            strengthMessage.textContent =
            "⚠️ Weak: add uppercase, lowercase, number, and special character";
            strengthMessage.style.color = "orange";
        }

        // Match check
        if (password2.value !== "") {

            if (password === password2.value) {
                matchMessage.textContent = "✅ Passwords match!";
                matchMessage.style.color = "green";
                match = true;
            } else {
                matchMessage.textContent = "❌ Passwords do not match!";
                matchMessage.style.color = "red";
            }

        }

        // 🚀 REMOVE listeners when valid
        if (strong && match) {

            password1.removeEventListener("input", validatePasswords);
            password2.removeEventListener("input", validatePasswords);

        }

    }

    // Initial listeners
    password1.addEventListener("input", validatePasswords);
    password2.addEventListener("input", validatePasswords);

    // 🔁 Re-enable validation when user clicks again
    password1.addEventListener("focus", () => {
        password1.addEventListener("input", validatePasswords);
    });

    password2.addEventListener("focus", () => {
        password2.addEventListener("input", validatePasswords);
    });

    // 🚨 Block submit if invalid
    form.addEventListener("submit", function(e) {

        const password = password1.value;

        const strong =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);

        const match = password === password2.value;

        if (!strong || !match) {

            e.preventDefault();
            alert("Please complete password requirements.");

        }

    });

}); 