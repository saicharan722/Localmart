// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

function togglePassword(inputId, eyeId) {

    const input = document.getElementById(inputId);
    const eye = document.getElementById(eyeId);

    if (!input || !eye) {
        console.error("Password field not found:", inputId);
        return;
    }

    if (input.type === "password") {

        input.type = "text";

        eye.classList.remove("bi-eye");
        eye.classList.add("bi-eye-slash");

    } else {

        input.type = "password";

        eye.classList.remove("bi-eye-slash");
        eye.classList.add("bi-eye");

    }
}


// ==========================================
// SIGNUP
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");

    if (!signupForm) {
        console.error("signupForm not found");
        return;
    }

    const fullNameField = document.getElementById("full_name");
    const mobileField = document.getElementById("mobile");

    fullNameField?.addEventListener("input", function () {
        this.value = this.value.replace(/[^\p{L} ]/gu, "");
    });

    mobileField?.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });


    // ==========================================
    // PASSWORD STRENGTH
    // ==========================================

    const passwordInput =
        document.getElementById("password");

    const strengthBar =
        document.getElementById("strengthBar");

    const strengthText =
        document.getElementById("strengthText");


    if (passwordInput) {

        passwordInput.addEventListener("input", function () {

            const password = passwordInput.value;

            let strength = 0;


            if (password.length >= 8) {
                strength++;
            }

            if (/[A-Z]/.test(password)) {
                strength++;
            }

            if (/[a-z]/.test(password)) {
                strength++;
            }

            if (/[0-9]/.test(password)) {
                strength++;
            }

            if (/[^A-Za-z0-9]/.test(password)) {
                strength++;
            }


            if (strength === 0) {

                strengthBar.style.width = "0%";
                strengthBar.className =
                    "progress-bar bg-danger";

                strengthText.textContent = "";

            }

            else if (strength <= 1) {

                strengthBar.style.width = "20%";
                strengthBar.className =
                    "progress-bar bg-danger";

                strengthText.textContent =
                    "Weak Password";

            }

            else if (strength === 2) {

                strengthBar.style.width = "40%";
                strengthBar.className =
                    "progress-bar bg-warning";

                strengthText.textContent =
                    "Fair Password";

            }

            else if (strength === 3) {

                strengthBar.style.width = "60%";
                strengthBar.className =
                    "progress-bar bg-info";

                strengthText.textContent =
                    "Good Password";

            }

            else if (strength === 4) {

                strengthBar.style.width = "80%";
                strengthBar.className =
                    "progress-bar bg-primary";

                strengthText.textContent =
                    "Strong Password";

            }

            else {

                strengthBar.style.width = "100%";
                strengthBar.className =
                    "progress-bar bg-success";

                strengthText.textContent =
                    "Very Strong Password";

            }

        });

    }


    // ==========================================
    // SIGNUP FORM SUBMIT
    // ==========================================

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        // ==========================================
        // GET FORM ELEMENTS
        // ==========================================

        const fullNameInput =
            document.getElementById("full_name");

        const emailInput =
            document.getElementById("email");

        const mobileInput =
            document.getElementById("mobile");

        const passwordInput =
            document.getElementById("password");

        const confirmPasswordInput =
            document.getElementById("confirm_password");

        const termsInput =
            document.getElementById("terms");


        // ==========================================
        // CHECK ELEMENTS
        // ==========================================

        if (
            !fullNameInput ||
            !emailInput ||
            !mobileInput ||
            !passwordInput ||
            !confirmPasswordInput ||
            !termsInput
        ) {

            console.error("One or more signup fields are missing.");

            alert(
                "Signup form configuration error. Please check the field IDs."
            );

            return;

        }


        // ==========================================
        // GET VALUES
        // ==========================================

        const fullName =
            fullNameInput.value.trim();

        const email =
            emailInput.value.trim();

        const mobile =
            mobileInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;

        const terms =
            termsInput.checked;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (fullName.length < 3) {

            alert(
                "Please enter a valid full name."
            );

            fullNameInput.focus();

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            alert(
                "Please enter a valid email address."
            );

            emailInput.focus();

            return;

        }


        const mobilePattern =
            /^[6-9]\d{9}$/;


        if (!mobilePattern.test(mobile)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            mobileInput.focus();

            return;

        }


        if (password.length < 8) {

            alert(
                "Password must contain at least 8 characters."
            );

            passwordInput.focus();

            return;

        }


        if (password !== confirmPassword) {

            alert(
                "Passwords do not match."
            );

            confirmPasswordInput.focus();

            return;

        }


        if (!terms) {

            alert(
                "Please accept the Terms & Conditions."
            );

            return;

        }


        // ==========================================
        // BUTTON
        // ==========================================

        const button =
            signupForm.querySelector(
                "button[type='submit']"
            );


        const originalText =
            button.innerHTML;


        button.disabled = true;


        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Creating Account...
        `;


        // ==========================================
        // SEND REQUEST TO DJANGO
        // ==========================================

        try {

            const response = await fetch(
                "/api/auth/signup/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        full_name: fullName,

                        email: email,

                        mobile: mobile,

                        password: password,

                        confirm_password:
                            confirmPassword

                    })

                }
            );


            const data =
                await response.json();


            console.log(
                "Signup Response:",
                data
            );


            // ==========================================
            // SUCCESS
            // ==========================================

            if (response.ok) {

                if (data.access) {

                    localStorage.setItem(
                        "access_token",
                        data.access
                    );

                }


                if (data.refresh) {

                    localStorage.setItem(
                        "refresh_token",
                        data.refresh
                    );

                }


                if (data.user) {

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                }


                alert(
                    "🎉 Account created successfully!"
                );


                // Redirect to Django login page

                window.location.href =
                    "/login/";

                return;

            }


            // ==========================================
            // API ERROR
            // ==========================================

            let errorMessage =
                "Signup failed. Please check your details.";


            if (data.error) {

                errorMessage =
                    data.error;

            }

            else if (data.detail) {

                errorMessage =
                    data.detail;

            }

            else if (data.full_name) {

                errorMessage =
                    data.full_name[0];

            }

            else if (data.email) {

                errorMessage =
                    data.email[0];

            }

            else if (data.mobile) {

                errorMessage =
                    data.mobile[0];

            }

            else if (data.password) {

                errorMessage =
                    data.password[0];

            }


            alert(errorMessage);


        }

        catch (error) {

            console.error(
                "Signup Error:",
                error
            );


            alert(
                "Unable to connect to the Django server. Please try again."
            );

        }


        finally {

            button.disabled = false;

            button.innerHTML =
                originalText;

        }

    });

});
