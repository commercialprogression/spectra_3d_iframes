
// Import our stuffs.
import {auth} from "./app.js";
import maskInput from "vanilla-text-mask";
import serialNumberMask from "./serialNumberMask.js";
import validate from "../../node_modules/validate/dist/validate.polyfills.min";
import {setTimeout} from "timers";

// Initialize the above-imported validation module.
validate.init({});

// Store a few elements for later.
const form = document.getElementById("register-form");
const submit = document.getElementById("register-submit");
const message = document.getElementById("message");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const serialNumber = document.getElementById("serial-number");

// Set up an environment-specific path for lambda functions.
let lambdaPath = "/.netlify/functions/checkSerial";
if (window.location.hostname && window.location.hostname === "localhost") {
  lambdaPath = "http://localhost:9000/checkSerial";
}

// Validate password function.
const validatePassword = () => {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords don't match");
  }
  else {
    confirmPassword.setCustomValidity("");
  }
};

// Mask the serial number field for hinting and validity.
const numberMask = serialNumberMask({});
maskInput({
  inputElement: serialNumber,
  mask: numberMask,
  placeholderChar: "_"
});

// Validate password on change.
password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

// Add click event for submit button.
submit.addEventListener("click", (event) => {
  // If form validates make sure it doesn't submit yet.
  if (form.checkValidity()) {
    event.preventDefault();

    // Check our serial-number-checking API before proceeding.
    fetch(lambdaPath + "?q=" + encodeURIComponent(serialNumber.value), {
      method: "GET"
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        if (response.found) {
          // Create user account.
          const email = document.getElementById("email").value;
          const firstName = document.getElementById("first-name").value;
          const lastName = document.getElementById("last-name").value;
          auth.signup(email, password.value, {full_name: firstName + " " + lastName}).then(
            () => {
              // Login the user in if reg successful.
              auth.login(email, password.value, true).then(
                // Submit the form.
                () => form.submit(),
                (error) => {
                  // Display the error in the message area.
                  message.innerText = error.json.error_description;
                  // Show the message element.
                  message.classList.remove("dn");
                }
              );
            },
            // Display any error messages.
            (error) => {
              message.innerText = error.json.msg;
              message.classList.remove("dn");
            }
          );
        }
        else {
          // Serial number wasn't found. Freeze and indicate state to user.
          message.classList.remove("dn");
          message.classList.add("error-message", "f5", "bg-washed-red");
          message.innerText = "The serial number you entered could not be verified. Please wait 5 seconds and try again.";
          validate.showError(
            serialNumber,
            "Must be a serial number as it appears on the tablet/box."
          );
          serialNumber.setAttribute("disabled", "");
          submit.setAttribute("aria-disabled", "true");

          // Wait five seconds.
          setTimeout(() => {
            // Undo all the things we did above so they can proceed.
            message.classList.add("dn");
            message.innerText = "";
            validate.removeError(
              serialNumber
            );
            serialNumber.removeAttribute("disabled");
            submit.removeAttribute("aria-disabled");
          }, 5000);
        }
      });
  }
});
