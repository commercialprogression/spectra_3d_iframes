/** Modal and fullscreen support **/

if (document.getElementById("instruct-overlay")) {
  var overlay = document.getElementById("instruct-overlay");
  var closeout = document.getElementById("closeout")
  closeout.addEventListener("click", function(){ overlay.classList.add('dn'); });
}

if (document.getElementById("full-screen-button")) {
  var modal = document.getElementById("modal");
  var fullscreen = document.getElementById("full-screen-button");
  fullscreen.addEventListener("click", function(){
    modal.classList.add('full-screen');
    modalclose.classList.add('full-screen');
    modalclose.addEventListener("click", function() {
      modal.classList.remove("full-screen");
      modalclose.classList.remove("full-screen");
    });
  });
}
