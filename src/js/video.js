const videoWrapper = document.querySelectorAll(".video-wrapper");

videoWrapper.forEach((video) => {
  const videoPlay = video.querySelector(".video-play");
  const player = video.querySelector(".youtube");

  if (player) {
    videoPlay.addEventListener("click", (event) => {
      event.preventDefault();

      // Manipulate classes and add iframe src.
      video.firstElementChild.classList.add("dn");
      player.classList.remove("dn");
      player.src = player.dataset.src;
    });
  }
});

