function submitRegistrationForm() {
    var Name = document.getElementById("name").value;
    var Email_Adress = document.getElementById("email").value;
    var Password = document.getElementById("password").value;
    var Phone_Number = document.getElementById("phone").value;
    var IBAN = document.getElementById("iban").value;
    var License_Plate = document.getElementById("license_plate").value;
    var legalTermsCheckbox = document.getElementById("legal_terms");

    if (Name === "" || Email_Adress === "" || Password === "" || Phone_Number === "" || IBAN === "" || License_Plate === "" || !legalTermsCheckbox.checked) {
        alert("Please fill in all the required fields and agree to the legal terms.");
        return;
    }

    var data = {
        Name: Name,
        Email_Adress: Email_Adress,
        Phone_Number: Phone_Number,
        Password: Password,
        IBAN: IBAN,
        License_Plate: License_Plate,
    };

    fetch("http://192.168.157.221:3000/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        else {
            alert("Signup successful!");
            window.location.href = "";
        }
    })
    
    .catch(error => {
        console.error("Error during signup:", error);
        alert("An error occurred during signup. Please try again later.");
    });
}
document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    submitRegistrationForm();
});
