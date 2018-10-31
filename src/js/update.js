
// Imports.
import {user} from "./app.js";

// Check to see if we are logged in.
if (user) {
  // Store a few elements for later.
  const form = document.getElementById("update-form");
  const submit = document.getElementById("update-submit");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  // Add click event for submit button.
  submit.addEventListener("click", (event) => {
    // If form validates make sure it doesn't submit yet.
    if (form.checkValidity()) {
      event.preventDefault();

      const passwordValue = password.value;

      user.update({passwordValue}).then(
        () => window.location.href = "/"
      );
    }
  });

  const validatePassword = () => {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords don't match");
    }
    else {
      confirmPassword.setCustomValidity("");
    }
  };

  password.onchange = validatePassword;
  confirmPassword.onkeyup = validatePassword;
}
else {
  // Send the user to front page if they are not logged in.
  window.location.href = "/";
}


