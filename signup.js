form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = validatesignupform();
    if (!isValid) {
        event.preventDefault();
    }
    else{
        form.submit();
    }
});
function validatesignupform() {
    let firstnameValue = firstname.value.trim();
    let lastnameValue = lastname.value.trim();
    let usernameValue = username.value.trim();
    let MobileNumberValue = MobileNumber.value;
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let confirmpasswordValue = confirmpassword.value.trim();

    let isValid = true;

    if (!firstnameValue) {
        document.querySelector(".e_first").innerHTML = "PLEASE ENTER YOUR FIRST NAME";
        isValid = false;
    } 
    if (!lastnameValue) {
        document.querySelector(".e_last").innerHTML = "PLEASE ENTER YOUR LAST NAME";
        isValid = false;
    }
    if (!usernameValue) {
        document.querySelector(".e_user").innerHTML = "PLEASE ENTER YOUR USERNAME";
        isValid = false;
    } else if (usernameValue.length < 6 || usernameValue.length > 20) {
        document.querySelector(".e_user").innerHTML = "USERNAME MUST BE BETWEEN 6 TO 20 CHARACTERS";
        isValid = false;
    } else {
        document.querySelector(".s_user").innerHTML = "VALID USERNAME";
    }
    if (!MobileNumberValue) {
        document.querySelector(".e_mobile").innerHTML = "PLEASE ENTER YOUR MOBILE NUMBER";
        isValid = false;
    } else if (MobileNumberValue.length !== 10) {
        document.querySelector(".e_mobile").innerHTML = "INVALID MOBILE NUMBER (Must be 10 digits)";
        isValid = false;
    } else {
        document.querySelector(".s_mobile").innerHTML = "VALID MOBILE NUMBER";
    }
    if (!emailValue) {
        document.querySelector(".e_email").innerHTML = "PLEASE ENTER YOUR EMAIL";
        isValid = false;
    } else if (!emailValue.includes("@")) {
        document.querySelector(".e_email").innerHTML = "PLEASE ENTER A VALID EMAIL";
        isValid = false;
    } else {
        document.querySelector(".s_email").innerHTML = "VALID EMAIL";
        isValid = true;
    }
    if (!passwordValue) {
        document.querySelector(".e_pass").innerHTML = "PLEASE ENTER PASSWORD";
        isValid = false;
    } else if (passwordValue.length < 8) {
        document.querySelector(".e_pass").innerHTML = "PASSWORD MUST BE AT LEAST 8 CHARACTERS";
        isValid = false;
    } else if (!/[A-Z]/.test(passwordValue)) {
        document.querySelector(".e_pass").innerHTML = "PASSWORD MUST CONTAIN AT LEAST ONE UPPERCASE LETTER";
        isValid = false;
    } else if (!/[a-z]/.test(passwordValue)) {
        document.querySelector(".e_pass").innerHTML = "PASSWORD MUST CONTAIN AT LEAST ONE LOWERCASE LETTER";
        isValid = false;
    } else if (!/\d/.test(passwordValue)) {
        document.querySelector(".e_pass").innerHTML = "PASSWORD MUST CONTAIN AT LEAST ONE NUMBER";
        isValid = false;
    } else if (!/[!@#$%^&*]/.test(passwordValue)) {
        document.querySelector(".e_pass").innerHTML = "PASSWORD MUST CONTAIN AT LEAST ONE SPECIAL CHARACTER";
        isValid = false;
    }
    else{
        document.querySelector(".s_pass").innerHTML="STRONG PASSWORD";
    }
    if (!confirmpasswordValue) {
        document.querySelector(".e_con_pass").innerHTML = "PLEASE ENTER YOUR PASSWORD AGAIN";
        isValid = false;
    } else if (confirmpasswordValue.trim() !== passwordValue.trim()) { 
        document.querySelector(".e_con_pass").innerHTML = "PASSWORDS DO NOT MATCH";
        isValid = false;
    }
    if (!isValid) {
        event.preventDefault();
    } else {
        form.submit();
        
    }
    if (!isValid) {
        document.querySelector(".fi1 .fas.fa-exclamation-circle").style.visibility = "visible";
        document.querySelector(".fi1 .fas.fa-check-circle").style.visibility = "hidden";
    } else {
        document.querySelector(".fi1 .fas.fa-exclamation-circle").style.visibility = "hidden";
        document.querySelector(".fi1 .fas.fa-check-circle").style.visibility = "visible";
    }

    return isValid;
   
}