<?php
session_start();
require_once 'config.php';

/* REGISTER */

if (isset($_POST['register'])) {

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirmpassword = trim($_POST['confirmpassword']);

    if (empty($name) || empty($email) || empty($password) || empty($confirmpassword)) {
        $_SESSION['register_error'] = "All fields are required.";
        $_SESSION['active_form'] = 'register';
        header("Location: index.php");
        exit();
    }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $_SESSION['register_error'] = "Invalid email format.";
            $_SESSION['active_form'] = 'register';
            header("Location: index.php");
            exit();
        }

    // Check if email exist
    $stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $_SESSION['register_error'] = "Email already exists.";
        $_SESSION['active_form'] = 'register';
        header("Location: index.php");
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $role = "user";

    $stmt = $conn->prepare("INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)");
    $stmt->bind_param("ssss",$name,$email,$hashedPassword,$role);
    $stmt->execute();

    $_SESSION['login_success'] = "Registration successful! Please login.";
    header("Location: index.php");
    exit();
}

/* ================= LOGIN ================= */

if (isset($_POST['login'])) {

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($password)) {
        $_SESSION['login_error'] = "Email and password required.";
        $_SESSION['active_form'] = 'login';
        header("Location: index.php");
        exit();
    }

    $stmt = $conn->prepare("SELECT id,name,password FROM users WHERE email=?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {

        $user = $result->fetch_assoc();

        if (password_verify($password,$user['password'])) {

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];

            header("Location: user_page.php");
            exit();

        } else {

            $_SESSION['login_error'] = "Incorrect password.";
        }

    } else {

        $_SESSION['login_error'] = "Email not found.";

    }

    $_SESSION['active_form'] = 'login';
    header("Location: index.php");
    exit();
}