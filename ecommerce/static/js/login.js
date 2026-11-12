document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("togglePasswordBtn");
    const eyeIcon = document.getElementById("eyeIcon");
    const loginButton = document.getElementById("loginButton");

    if (toggleButton && passwordInput && eyeIcon) {
        toggleButton.addEventListener("click", () => {
            const showPassword = passwordInput.type === "password";
            passwordInput.type = showPassword ? "text" : "password";
            eyeIcon.classList.toggle("bi-eye", !showPassword);
            eyeIcon.classList.toggle("bi-eye-slash", showPassword);
        });
    }

    // Submit through Django's normal session-authenticated form endpoint.
    // The browser sends the CSRF token and receives the authenticated session cookie.
    if (form && loginButton) {
        form.addEventListener("submit", () => {
            loginButton.disabled = true;
            loginButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
        });
    }
});
