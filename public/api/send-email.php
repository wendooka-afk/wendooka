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
$name        = $input['name'] ?? '';
$email       = $input['email'] ?? '';
$company     = $input['company'] ?? 'N/A';
$projectType = $input['projectType'] ?? '';
$budget      = $input['budget'] ?? '';
$deadline    = $input['deadline'] ?? 'N/A';
$messageContent = $input['message'] ?? '';

// Basic validation
if (empty($name) || empty($email) || empty($messageContent)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// Load SMTP credentials from config file (must exist on server, not in git)
$configFile = __DIR__ . '/email-config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Email configuration file missing. Create api/email-config.php on the server.']);
    exit();
}
require $configFile;
// $SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS must be defined in email-config.php

// Build email content
$to      = 'contact@wendooka.com';
$subject = "Nouveau message de contact - $name - $projectType";

$body = "
<html>
<head><title>Nouveau message de contact</title></head>
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

// Send via SMTP (SSL, port 465)
header('Content-Type: application/json');

$result = sendSMTP($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS, $to, $subject, $body, $email, $name);

if ($result === true) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email: ' . $result]);
}

/**
 * Send an email via SMTP with SSL authentication.
 * Returns true on success, or an error string on failure.
 */
function sendSMTP($host, $port, $username, $password, $to, $subject, $body, $replyTo = '', $replyToName = '') {
    $socket = @fsockopen("ssl://$host", $port, $errno, $errstr, 15);
    if (!$socket) {
        return "Cannot connect to SMTP server ($host:$port): $errstr ($errno)";
    }

    $read = function() use ($socket) {
        $response = '';
        while ($line = fgets($socket, 512)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    };

    $send = function($cmd) use ($socket) {
        fputs($socket, $cmd . "\r\n");
    };

    // Greeting
    $resp = $read();
    if (substr($resp, 0, 3) !== '220') {
        fclose($socket);
        return "SMTP greeting failed: $resp";
    }

    // EHLO
    $send("EHLO " . (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost'));
    $resp = $read();
    if (substr($resp, 0, 3) !== '250') {
        fclose($socket);
        return "EHLO failed: $resp";
    }

    // AUTH LOGIN
    $send("AUTH LOGIN");
    $resp = $read();
    if (substr($resp, 0, 3) !== '334') {
        fclose($socket);
        return "AUTH LOGIN not supported: $resp";
    }

    $send(base64_encode($username));
    $resp = $read();
    if (substr($resp, 0, 3) !== '334') {
        fclose($socket);
        return "SMTP username rejected: $resp";
    }

    $send(base64_encode($password));
    $resp = $read();
    if (substr($resp, 0, 3) !== '235') {
        fclose($socket);
        return "SMTP authentication failed: $resp";
    }

    // MAIL FROM
    $send("MAIL FROM: <$username>");
    $resp = $read();
    if (substr($resp, 0, 3) !== '250') {
        fclose($socket);
        return "MAIL FROM failed: $resp";
    }

    // RCPT TO
    $send("RCPT TO: <$to>");
    $resp = $read();
    if (substr($resp, 0, 3) !== '250') {
        fclose($socket);
        return "RCPT TO failed: $resp";
    }

    // DATA
    $send("DATA");
    $resp = $read();
    if (substr($resp, 0, 3) !== '354') {
        fclose($socket);
        return "DATA command failed: $resp";
    }

    // Build raw message
    $replyToHeader = '';
    if (!empty($replyTo)) {
        $replyToName = !empty($replyToName) ? "=?UTF-8?B?" . base64_encode($replyToName) . "?=" : $replyTo;
        $replyToHeader = "Reply-To: $replyToName <$replyTo>\r\n";
    }

    $encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
    $fromName = "=?UTF-8?B?" . base64_encode("Wendooka Contact") . "?=";

    $message  = "MIME-Version: 1.0\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "From: $fromName <$username>\r\n";
    $message .= "To: <$to>\r\n";
    $message .= $replyToHeader;
    $message .= "Subject: $encodedSubject\r\n";
    $message .= "\r\n";
    $message .= $body;
    $message .= "\r\n.";

    $send($message);
    $resp = $read();
    if (substr($resp, 0, 3) !== '250') {
        fclose($socket);
        return "Message delivery failed: $resp";
    }

    $send("QUIT");
    fclose($socket);
    return true;
}
?>
