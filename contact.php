<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Send email using EmailJS
    $service_id = "service_7jbizim"; // Replace with your EmailJS service ID
    $template_id = "template_op60u2h"; // Replace with your EmailJS template ID
    $user_id = "ousKG8gZgvQHMGkSn"; // Replace with your EmailJS user ID

    // Prepare data to be sent to EmailJS
    $emailjs_data = array(
        'service_id' => $service_id,
        'template_id' => $template_id,
        'user_id' => $user_id,
        'template_params' => array(
            'name' => $name,
            'email' => $email,
            'message' => $message
        )
    );

    // Send request to EmailJS API
    $ch = curl_init('https://api.emailjs.com/api/v1.0/email/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailjs_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    // Check if email was sent successfully
    $result = json_decode($response, true);
    if ($result['status'] == 'success') {
        // Email sent successfully
        echo '<div class="alert alert-success">Your message has been sent!</div>';
    } else {
        // Failed to send email
        echo '<div class="alert alert-danger">Sorry, there was an error sending your message. Please try again later.</div>';
    }
}
?>
