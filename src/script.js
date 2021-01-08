import "./style.css";

const appParams = {
  classApplicationSelector: ".application",
  idFullscreen: "fullscreen",
};

let isFullscreen = false;

let applicationDiv = document.querySelector(appParams.classApplicationSelector);
let fullscreenButton = document.getElementById(appParams.idFullscreen);

fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", toggleFullscreenButton);

function toggleFullscreen() {
  if (!isFullscreen) {
    applicationDiv.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function toggleFullscreenButton() {
  if (!isFullscreen) {
    isFullscreen = true;
    fullscreenButton.textContent = "Window";
  } else {
    isFullscreen = false;
    fullscreenButton.textContent = "Fullscreen";
  }
}
