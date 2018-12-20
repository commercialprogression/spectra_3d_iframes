/** Modal and fullscreen support **/

if (document.getElementById("instruct-overlay")) {
  var overlay = document.getElementById("instruct-overlay");
  var closeout = document.getElementById("closeout")
  closeout.addEventListener("click", function(){ overlay.classList.add('dn'); });
}

if (document.getElementById("full-screen-button")) {
  var model = document.getElementById("model");
  var fullscreen = document.getElementById("full-screen-button");
  fullscreen.addEventListener("click", function(){
    model.classList.add('full-screen');
    modelclose.classList.add('full-screen');
    modelclose.addEventListener("click", function() {
      model.classList.remove("full-screen");
      modelclose.classList.remove("full-screen");
    });
  });
}
