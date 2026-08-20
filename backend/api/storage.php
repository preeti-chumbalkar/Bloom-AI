<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../db.php';

// A simple authentication mechanism for demonstration. In production, use tokens (JWT/Session).
// Here we expect user_id in the request.

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['user_id'], $data['key'], $data['value'])) {
        echo json_encode(["success" => false, "message" => "Missing fields"]);
        exit;
    }
    
    $user_id = $data['user_id'];
    $key = $data['key'];
    $value = json_encode($data['value']); // store as json string
    
    $stmt = $pdo->prepare("INSERT INTO user_data (user_id, data_key, data_value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE data_value = ?");
    $stmt->execute([$user_id, $key, $value, $value]);
    echo json_encode(["success" => true]);
} 
elseif ($method === 'GET') {
    if (!isset($_GET['user_id'], $_GET['key'])) {
        echo json_encode(["success" => false, "message" => "Missing fields"]);
        exit;
    }
    
    $user_id = $_GET['user_id'];
    $key = $_GET['key'];
    
    $stmt = $pdo->prepare("SELECT data_value FROM user_data WHERE user_id = ? AND data_key = ?");
    $stmt->execute([$user_id, $key]);
    $result = $stmt->fetch();
    
    if ($result) {
        echo json_encode(["success" => true, "data" => json_decode($result['data_value'], true)]);
    } else {
        echo json_encode(["success" => true, "data" => null]);
    }
}
elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['user_id'], $data['key'])) {
        echo json_encode(["success" => false, "message" => "Missing fields"]);
        exit;
    }
    
    $user_id = $data['user_id'];
    $key = $data['key'];
    
    $stmt = $pdo->prepare("DELETE FROM user_data WHERE user_id = ? AND data_key = ?");
    $stmt->execute([$user_id, $key]);
    echo json_encode(["success" => true]);
}
?>
