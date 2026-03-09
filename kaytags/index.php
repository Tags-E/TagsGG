<?php

session_start();

$errors = [
    'login_error' => $_SESSION['login_error'] ?? '',
    'register_error' => $_SESSION['register_error'] ?? ''
];

$activeForm = $_SESSION['active_form'] ?? 'login';

session_unset();

function showError($error) {
    return !empty($error) ? "<p class='error-message'>$error</p>" : '';
}

function isActiveForm($formName, $activeForm) {
    return $formName === $activeForm ? 'active' : '';
}

?>

<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spork</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>

<div class="container">

    <!-- Logo -->
    <div class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">BlueLogin</span>
    </div>
    <div class="navigation">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Help</a>
    </div>
    

    <!-- Login Form -->
    <div class="form-box <?= isActiveForm('login', $activeForm) ?>" id="login-form">
        <form action="login_register.php" method="post">
            <h2>Sign In</h2>
            <?= showError($errors['login_error']); ?>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" name="login">LOGIN</button>
            <p>Don't have an account? <a href="#" onclick="showForm('register-form')">SignUp</a></p>
        </form>
    </div>

    <!-- Register Form -->
    <div class="form-box <?= isActiveForm('register', $activeForm) ?>" id="register-form">
        <form id="registerForm" action="login_register.php" method="post">
            <h2>Create an Account</h2>
            <?= showError($errors['register_error']); ?>
            <input type="text" name="name" placeholder="Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" id="password1" name="password" placeholder="Password" required>
            <p id="password-strength" class="password-strength"></p>
            <input type="password" id="password2" name="confirmpassword" placeholder="Confirm Password" required>
            <p id="password-match" class="password-match"></p>
            <button type="submit" name="register">SignUp</button>
            <p>Already have an account? <a href="#" id="show-login" onclick="showForm('login-form')">Login</a></p>
        </form>
    </div>
    

</div>

<script src="script.js"></script>

</body>
</html>