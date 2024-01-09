if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "your-email@example.com"; // Replace with your email address
    $subject = "New Contact Form Submission from $name";
    $headers = "From: $email";

    mail($to, $subject, $message, $headers);
}
?>