
// Import our stuffs.
import {auth} from "./auth.js";

// Store a few elements for later.
const form = document.getElementById("reset-form");
const submit = document.getElementById("reset-submit");
const message = document.getElementById("message");

// Add click event for submit button.
submit.addEventListener("click", (event) => {
  // If form validates make sure it doesn't submit yet.
  if (form.checkValidity()) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    auth.requestPasswordRecovery(email).then(
      // Great success.
      () => {
        // Send the user along on their merry way.
        window.location.href = "/";
      },
      // Terrible failure.
      (error) => {
        // Display the error in the message area.
        message.innerText = error.json.error_description;

        // Show the message element.
        message.classList.remove("dn");
      }
    );
  }
});
