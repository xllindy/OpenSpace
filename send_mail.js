window.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(contactForm);

            fetch("https://formspree.io/lindy.rutten@student.fontys.nl", {
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
    }
});