<?php
$host = '127.0.0.1';
$db   = 'bloom_ai';
$user = 'root';
$pass = ''; // Default XAMPP/WAMP password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // In production, do not output the raw error message.
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}
?>
