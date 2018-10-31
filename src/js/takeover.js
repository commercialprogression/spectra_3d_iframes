
const takeover = document.getElementById("takeover");
const takeoverClose = document.getElementById("takeover-close");

if (takeoverClose) {
  takeoverClose.addEventListener("click", (event) => {
    event.preventDefault();

    takeover.classList.add("dn");
  });
}
