async function registerAccount(Name, Email_Adress, Phone_Number, Password,IBAN, License_Plate, isDisabled){
    try{ let response = await fetch("http://192.168.157.123:3000/customers", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Name: Name,
            Email_Adress: Email_Adress,
            Phone_Number: Phone_Number,
            Password: Password,
            IBAN: IBAN,
            License_Plate: License_Plate,
            Disabled: isDisabled,
        })
    })
    let json = await response.json();
    console.log(json);
    switch(json.message){
        case "Name is required":
            window.alert("Please enter a valid username");
            break;
        case "Email is required":
            window.alert("Please enter a valid email adress");
            break;
        case "Password is required":
            window.alert("Please enter a valid password");
            break;
        case "IBAN is invaled":
            window.alert("Please enter a valid IBAN");
            break;
        case "License plate is invalid":
            window.alert("Please enter a valid license plate");
            break;
        case "Phone number is invalid":
            window.alert("Please enter a valid phone number");
        case "Customer already exists":
            window.alert("A account with this username and email already exists");
            break;
        case "Customer created successfully":
            window.alert("Signup Succesful!");
            break;
        default:
            window.alert("Something went wrong, please try again later")
            break;
    }
    } catch (error) {
        console.log(error);
        window.alert("Error", "An error has occurred" + error);
    }
}

function submitRegistrationForm() {
    var Name = document.getElementById("name").value;
    var Email_Adress = document.getElementById("email").value;
    var Password = document.getElementById("password").value;
    var Phone_Number = document.getElementById("phone").value;
    var IBAN = document.getElementById("iban").value;
    var License_Plate = document.getElementById("license_plate").value;
    var legalTermsCheckbox = document.getElementById("legal_terms");
    var isDisabled = document.getElementById("isDisabled");

    registerAccount(Name,Email_Adress, Phone_Number, Password, IBAN, License_Plate,legalTermsCheckbox, isDisabled);
}

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    submitRegistrationForm();
});
