document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector(".contact-form");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch("send_mail.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to send email");
            }
            return response.text();
        })
        .then(responseText => {
            alert(responseText);
        })
        .catch(error => {
            console.error(error);
            alert("Sorry, something went wrong. Please try again later.");
        });
    });
});