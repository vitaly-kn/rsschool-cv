const appParams = {
  attrDuration: "data-duration",
  attrAudioSource: "data-sound",
  attrVideoSource: "data-video",
  classButton: ".button",
  classSelected: ".selected",
  classSelectedToggler: "selected",
  classTimeControl: ".time-control",
  classTimer: ".timer",
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
const timer = document.querySelector(appParams.classTimer);
const themeButtons = document.querySelectorAll(`${appParams.classThemeControl} > ${appParams.classButton}`);
const selectedTimeButtonTemplate = `${appParams.classTimeControl} > ${appParams.classSelected}`;
const selectedThemeButtonTemplate = `${appParams.classThemeControl} > ${appParams.classSelected}`;

let duration;

let isCurrentTimeChanged = (function () {
  let previousTime = 0;
  return function (currentTime) {
    if (previousTime !== currentTime) {
      previousTime = currentTime;
      return true;
    }
    return false;
  };
})(0);

playerButton.addEventListener("click", (event) => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    videoPlayer.play();
    playerButtonIcon.setAttribute("data", appParams.playerButtonIconPause);
  } else {
    stopPlayer();
  }
  playerButton.classList.toggle(appParams.playerButtonStatePlay);
});

function stopPlayer() {
  audioPlayer.pause();
  videoPlayer.pause();
  playerButtonIcon.setAttribute("data", appParams.playerButtonIconPlay);
}

audioPlayer.addEventListener("timeupdate", () => {
  //console.log("start " + duration);
  if (duration === 0) {
    stopPlayer();
    refreshDuration();
    playerButton.classList.toggle(appParams.playerButtonStatePlay);
  } else if (isCurrentTimeChanged(Math.floor(audioPlayer.currentTime))) {
    timer.textContent = convertTimeToDisplay(--duration);
  }
  //console.log("end " + duration);
});

timeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    document.querySelector(selectedTimeButtonTemplate).classList.toggle(appParams.classSelectedToggler);
    event.target.classList.toggle(appParams.classSelectedToggler);
    refreshDuration();
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!event.target.classList.contains(appParams.classSelectedToggler)) {
      document.querySelector(selectedThemeButtonTemplate).classList.toggle(appParams.classSelectedToggler);
      event.target.classList.toggle(appParams.classSelectedToggler);
      stopPlayer();
      setMultimediaSources(event.target);
      playerButton.classList.add(appParams.playerButtonStatePlay);
    }
  });
});

function getDuration() {
  return document.querySelector(selectedTimeButtonTemplate).getAttribute(appParams.attrDuration);
}

function refreshDuration() {
  duration = getDuration();
  timer.textContent = convertTimeToDisplay(duration);
}

function convertTimeToDisplay(time) {
  formatToTwoDigits = (number) => (number < 10 ? `0${number}` : number + "");
  let min = Math.floor(time / 60);
  let sec = time % 60;
  return `${min}:${formatToTwoDigits(sec)}`;
}

function setMultimediaSources(selectedSource) {
  audioPlayer.src = selectedSource.getAttribute(appParams.attrAudioSource);
  videoPlayer.src = selectedSource.getAttribute(appParams.attrVideoSource);
  refreshDuration();
}
setMultimediaSources(document.querySelector(selectedThemeButtonTemplate));
