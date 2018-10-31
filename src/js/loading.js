
// Import our stuffs.
import {auth, user} from "./app.js";
import {setTimeout} from "timers";

// Store hash.
const hash = window.location.hash;

// Create a promise to give the loading screen a little time.
const userStatus = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(user);
  }, 2000);
});

// React on promise completion.
userStatus.then((user) => {
  if (hash < 1) {
    // Send the user along if there isn't anything for netlify identity to do.
    user ? window.location.href = "/page1" : window.location.href = "/register";
  }
});
