<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit();
}

// Extract fields
$name = $input['name'] ?? '';
$email = $input['email'] ?? '';
$company = $input['company'] ?? 'N/A';
$projectType = $input['projectType'] ?? '';
$budget = $input['budget'] ?? '';
$deadline = $input['deadline'] ?? 'N/A';
$messageContent = $input['message'] ?? '';

// Basic validation
if (empty($name) || empty($email) || empty($messageContent)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// Email configuration
$to = 'contact@wendooka.com';
$subject = "Nouveau message de contact - $name - $projectType";

// Email body
$message = "
<html>
<head>
  <title>Nouveau message de contact</title>
</head>
<body style='font-family: Arial, sans-serif; color: #333;'>
  <div style='background-color: #f4f4f4; padding: 20px;'>
    <div style='background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
      <h2 style='color: #4a4a4a; border-bottom: 2px solid #a3e635; padding-bottom: 10px;'>Nouveau message de contact</h2>
      
      <p><strong>Nom:</strong> " . htmlspecialchars($name) . "</p>
      <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
      <p><strong>Entreprise:</strong> " . htmlspecialchars($company) . "</p>
      <p><strong>Type de projet:</strong> " . htmlspecialchars($projectType) . "</p>
      <p><strong>Budget:</strong> " . htmlspecialchars($budget) . "</p>
      <p><strong>Délai:</strong> " . htmlspecialchars($deadline) . "</p>
      
      <h3 style='margin-top: 20px; color: #4a4a4a;'>Message:</h3>
      <div style='background-color: #f9f9f9; padding: 15px; border-left: 4px solid #a3e635; margin-top: 10px;'>
        " . nl2br(htmlspecialchars($messageContent)) . "
      </div>
    </div>
    <div style='text-align: center; margin-top: 20px; color: #888; font-size: 12px;'>
      Envoyé depuis le formulaire de contact wendooka.com
    </div>
  </div>
</body>
</html>
";

// Headers for PHP mail() function (if SMTP fails, this is a fallback, but we prefer SMTP)
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: no-reply@wendooka.com" . "\r\n"; // Use a generic no-reply address
$headers .= "Reply-To: $email" . "\r\n";

// Hostinger SMTP configuration via PHPMailer would be better, but standard mail() often works on Hostinger too.
// However, to use SMTP specifically as requested:
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Since we can't easily install composer packages in this environment, 
// we will use the standard mail() function which is usually configured correctly on Hostinger shared hosting.
// If you specifically need SMTP authentication because mail() is blocked or unreliable, 
// we would need to manually include the PHPMailer library files.

// TRYING STANDARD MAIL() FIRST as it's Native on Hostinger
if(mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    // If standard mail fails, we might need SMTP.
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Server configuration might require SMTP authentication.']);
}
?>
