import { setTimeout } from "timers";

const kiosk = document.getElementById("kiosk");
const video = document.getElementById("kiosk-video");
const hamburger = document.getElementById("hamburger-menu");
const kioskVideoClose = document.getElementById("kiosk-video-close");
const videoContainer = document.getElementById("kiosk-video-container");

// Handle kiosk button click.
kiosk.addEventListener("click", (event) => {
  // Remove the open class from the hamburger menu.
  hamburger.classList.remove("open");

  // Set the video src.
  video.src = video.dataset.src;

  // Modify classes to show the video.
  videoContainer.classList.remove("dn");

  // Play the video.
  const playPromise = video.play();

  // Display close button after the video makes a pinky promise to us.
  if (playPromise !== undefined) {
    playPromise.then(() => {
      kioskVideoClose.classList.remove("o-0");
    });
  }

});

// Handle kiosk video close click.
kioskVideoClose.addEventListener("click", () => {
  // Stop the video.
  video.pause();

  // Hide the video.
  videoContainer.classList.add("dn");

  // Hide that close button again.
  kioskVideoClose.classList.add("o-0");
});
