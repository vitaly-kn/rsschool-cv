const appParams = {
  attrDuration: "data-duration",
  attrAudioSource: "data-sound",
  attrVideoSource: "data-video",
  classButton: ".button",
  classSelected: ".selected",
  classSelectedToggler: "selected",
  classTimeControl: ".time-control",
  classThemeControl: ".theme-control",
  classPlayerButton: ".player-button",
  classAudioPlayer: ".audio-player",
  classVideoPlayer: ".video-player",
  classSVGIcon: ".svg-icon",
  playerButtonIconPlay: "./assets/svg/play.svg",
  playerButtonIconPause: "./assets/svg/pause.svg",
  playerButtonStatePlay: "play",
  playerButtonStatePause: "pause",
};

const audioPlayer = document.querySelector(appParams.classAudioPlayer);
const videoPlayer = document.querySelector(appParams.classVideoPlayer);
const timeButtons = document.querySelectorAll(`${appParams.classTimeControl} > ${appParams.classButton}`);
const playerButton = document.querySelector(appParams.classPlayerButton);
const playerButtonIcon = document.querySelector(`${appParams.classPlayerButton} > ${appParams.classSVGIcon}`);
const themeButtons = document.querySelectorAll(`${appParams.classThemeControl} > ${appParams.classButton}`);
const selectedTimeButtonTemplate = `${appParams.classTimeControl} > ${appParams.classSelected}`;
const selectedThemeButtonTemplate = `${appParams.classThemeControl} > ${appParams.classSelected}`;

var duration = getDuration();

playerButton.addEventListener("click", (event) => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    videoPlayer.play();
    playerButtonIcon.setAttribute("data", appParams.playerButtonIconPause);
  } else {
    audioPlayer.pause();
    videoPlayer.pause();
    playerButtonIcon.setAttribute("data", appParams.playerButtonIconPlay);
  }
  playerButton.classList.toggle(appParams.playerButtonStatePlay);
});

timeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    document.querySelector(selectedTimeButtonTemplate).classList.toggle(appParams.classSelectedToggler);
    event.target.classList.toggle(appParams.classSelectedToggler);
    duration = getDuration();
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!event.target.classList.contains(appParams.classSelectedToggler)) {
      document.querySelector(selectedThemeButtonTemplate).classList.toggle(appParams.classSelectedToggler);
      event.target.classList.toggle(appParams.classSelectedToggler);
      setMultimediaSources(event.target);
      playerButtonIcon.setAttribute("data", appParams.playerButtonIconPlay);
      playerButton.classList.add(appParams.playerButtonStatePlay);
    }
  });
});

function getDuration() {
  return document.querySelector(selectedTimeButtonTemplate).getAttribute(appParams.attrDuration);
}

function setMultimediaSources(selectedSource) {
  audioPlayer.src = selectedSource.getAttribute(appParams.attrAudioSource);
  videoPlayer.src = selectedSource.getAttribute(appParams.attrVideoSource);
}

console.log(duration);
setMultimediaSources(document.querySelector(selectedThemeButtonTemplate));
