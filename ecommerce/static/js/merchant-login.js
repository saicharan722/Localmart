function togglePassword(inputId, iconId) {

    const passwordField = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);

    if (!passwordField || !eyeIcon) {
        return;
    }

    if (passwordField.type === "password") {

        passwordField.type = "text";

        eyeIcon.classList.remove("bi-eye");
        eyeIcon.classList.add("bi-eye-slash");

    } else {

        passwordField.type = "password";

        eyeIcon.classList.remove("bi-eye-slash");
        eyeIcon.classList.add("bi-eye");
    }
}


function toggleLoginPassword() {
    togglePassword("loginPassword", "loginEye");
}


function toggleRegisterPassword() {
    togglePassword("registerPassword", "registerEye");
}


function toggleConfirmPassword() {
    togglePassword("confirmPassword", "confirmEye");
}