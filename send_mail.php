<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "lindy.rutten@student.fontys.nl";
    $subject = "New Contact Form Submission from $name";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Mail sent successfully!";
    } else {
        http_response_code(500);
        echo "Sorry, something went wrong. Please try again later.";
    }
}
?>