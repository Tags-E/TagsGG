// Authentication JavaScript

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setupAuthEventListeners();
});

// Check authentication status
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    
    // If on login/signup page and already logged in, redirect to dashboard
    if (currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
        window.location.href = 'index.html';
    }
}

// Setup event listeners
function setupAuthEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        
        // Password strength checker
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', checkPasswordStrength);
        }
    }

    // Password toggle buttons
    setupPasswordToggles();
}

// Setup password visibility toggles
function setupPasswordToggles() {
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const icon = this.querySelector('i');
            
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                confirmPasswordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Get all registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Set current user
        const currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            membershipTier: user.membershipTier,
            reportsThisMonth: user.reportsThisMonth || 0,
            joinDate: user.joinDate,
            role: user.role || 'user'
        };
        
        localStorage.setItem('currentUser', email);
        localStorage.setItem('floodUser', JSON.stringify(currentUser));
        
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        showToast('Welcome back!', 'Redirecting to dashboard...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showToast('Login failed', 'Invalid email or password', 'error');
    }
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    const membershipTier = document.querySelector('input[name="membership"]:checked').value;
    
    // Validation
    if (!terms) {
        showToast('Error', 'Please accept the terms and conditions', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Error', 'Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Error', 'Password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (users.some(u => u.email === email)) {
        showToast('Error', 'An account with this email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: fullName,
        email: email,
        password: password,
        membershipTier: membershipTier,
        reportsThisMonth: 0,
        joinDate: new Date().toISOString(),
        role: 'user'
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    // Set current user
    const currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        membershipTier: newUser.membershipTier,
        reportsThisMonth: 0,
        joinDate: newUser.joinDate,
        role: 'user'
    };
    
    localStorage.setItem('currentUser', email);
    localStorage.setItem('floodUser', JSON.stringify(currentUser));
    
    showToast('Account created!', 'Welcome to FloodWatch. Redirecting...', 'success');
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthFill.style.width = '0%';
        strengthFill.className = 'strength-fill';
        strengthText.textContent = 'Password strength';
        strengthText.className = 'strength-text';
        return;
    }
    
    let strength = 0;
    
    // Check password criteria
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    // Update UI
    if (strength <= 2) {
        strengthFill.className = 'strength-fill weak';
        strengthText.textContent = 'Weak password';
        strengthText.className = 'strength-text weak';
    } else if (strength <= 3) {
        strengthFill.className = 'strength-fill medium';
        strengthText.textContent = 'Medium password';
        strengthText.className = 'strength-text medium';
    } else {
        strengthFill.className = 'strength-fill strong';
        strengthText.textContent = 'Strong password';
        strengthText.className = 'strength-text strong';
    }
}

// Fill demo credentials
function fillDemoCredentials(type) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (type === 'free') {
        emailInput.value = 'demo@floodwatch.com';
        passwordInput.value = 'demo123';
        showToast('Demo Credentials Filled', 'Click Sign In to login with free account', 'info');
    } else if (type === 'premium') {
        emailInput.value = 'premium@floodwatch.com';
        passwordInput.value = 'premium123';
        showToast('Demo Credentials Filled', 'Click Sign In to login with premium account', 'info');
    } else if (type === 'admin') {
        emailInput.value = 'admin@floodwatch.com';
        passwordInput.value = 'admin123';
        showToast('Demo Credentials Filled', 'Click Sign In to manage user reports and add locations to the map', 'info');
    }
}

// Initialize demo accounts if they don't exist
function initializeDemoAccounts() {
    let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Ensure demo accounts have role field
    users = users.map(u => {
        if (!u.role) u.role = u.email === 'admin@floodwatch.com' ? 'admin' : 'user';
        return u;
    });
    
    // Demo free account
    if (!users.some(u => u.email === 'demo@floodwatch.com')) {
        users.push({
            id: 'demo-free',
            name: 'Demo User',
            email: 'demo@floodwatch.com',
            password: 'demo123',
            membershipTier: 'free',
            reportsThisMonth: 2,
            joinDate: new Date('2025-01-15').toISOString(),
            role: 'user'
        });
    }
    
    // Demo premium account
    if (!users.some(u => u.email === 'premium@floodwatch.com')) {
        users.push({
            id: 'demo-premium',
            name: 'Premium User',
            email: 'premium@floodwatch.com',
            password: 'premium123',
            membershipTier: 'premium',
            reportsThisMonth: 15,
            joinDate: new Date('2024-06-10').toISOString(),
            role: 'user'
        });
    }

    // Demo admin account
    if (!users.some(u => u.email === 'admin@floodwatch.com')) {
        users.push({
            id: 'demo-admin',
            name: 'Admin User',
            email: 'admin@floodwatch.com',
            password: 'admin123',
            membershipTier: 'premium',
            reportsThisMonth: 0,
            joinDate: new Date('2024-01-01').toISOString(),
            role: 'admin'
        });
    }
    
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Initialize demo accounts on page load
initializeDemoAccounts();

// Toast notification function
function showToast(title, description, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-check-circle';
    let borderColor = '#10b981';
    
    if (type === 'error') {
        icon = 'fa-times-circle';
        borderColor = '#ef4444';
    } else if (type === 'info') {
        icon = 'fa-info-circle';
        borderColor = '#3b82f6';
    }
    
    toast.style.borderLeft = `4px solid ${borderColor}`;
    toast.innerHTML = `
        <div style="display: flex; gap: 0.75rem;">
            <i class="fas ${icon}" style="color: ${borderColor}; font-size: 1.25rem; margin-top: 0.125rem;"></i>
            <div>
                <div class="toast-title">${title}</div>
                ${description ? `<div class="toast-description">${description}</div>` : ''}
            </div>
        </div>
    `;

    const container = document.getElementById('toast-container');
    if (!container) {
        const newContainer = document.createElement('div');
        newContainer.id = 'toast-container';
        document.body.appendChild(newContainer);
    }
    
    document.getElementById('toast-container').appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Make function globally accessible
window.fillDemoCredentials = fillDemoCredentials;
