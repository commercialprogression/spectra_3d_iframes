
// Import the things we need.
import {user} from "./app.js";

// Store some vars.
const landingPage = document.getElementById("landing-page");
const hamburger = document.getElementById("hamburger");
const hamburgerMenu = document.getElementById("hamburger-menu");
const hamburgerClose = document.getElementById("hamburger-close");
const logout = document.getElementById("logout");

// Create promise for user status.
const userStatus = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(user);
  }, 250);
});

// React after the promise.
userStatus.then((user) => {
  // Fade in content or redirect to register screen.
  if (user || window.location.pathname === "/terms/") {
    landingPage.classList.remove("o-0");
  }
  else {
    window.location.href = "/register";
  }
});

// Handle hamburger click.
hamburger.addEventListener("click", () => {
  hamburgerMenu.classList.add("open");
});

hamburgerClose.addEventListener("click", () => {
  hamburgerMenu.classList.remove("open");
});

// Handle logout click.
logout.addEventListener("click", () => {
  user.logout().then(() => window.location.href = "/");
});
