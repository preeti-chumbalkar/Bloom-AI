<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['fullname'], $data['email'], $data['password'])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

$fullname = trim($data['fullname']);
$email = strtolower(trim($data['email']));
$password = $data['password'];

if (empty($fullname) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(["success" => false, "message" => "Email already registered"]);
        exit;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (fullname, email, password_hash) VALUES (?, ?, ?)");
    $stmt->execute([$fullname, $email, $password_hash]);
    
    $user_id = $pdo->lastInsertId();

    echo json_encode([
        "success" => true, 
        "message" => "Signup successful",
        "user" => [
            "id" => $user_id,
            "fullname" => $fullname,
            "email" => $email
        ]
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "An error occurred during signup"]);
}
?>
