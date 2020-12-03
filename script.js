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
  classProgressBar: ".progress-bar",
  classProgressBarOutline: ".svg-progress",
  classAudioPlayer: ".audio-player",
  classVideoPlayer: ".video-player",
  classSVGIcon: ".svg-icon",
  playerButtonIconPlay: "./assets/svg/play.svg",
  playerButtonIconPause: "./assets/svg/pause.svg",
  playerButtonStatePlay: "play",
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

let duration, timeLeft;
let outlineLength;
let progressBarOutline;

window.addEventListener("load", function () {
  progressBarOutline = document.querySelector(appParams.classProgressBar).contentDocument.querySelector(appParams.classProgressBarOutline);
  outlineLength = progressBarOutline.getTotalLength();
  progressBarOutline.style.strokeDashoffset = outlineLength;
  progressBarOutline.style.strokeDasharray = outlineLength;
});

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
    startPlayer();
  } else {
    stopPlayer();
  }
});

function startPlayer() {
  audioPlayer.play();
  videoPlayer.play();
  playerButtonIcon.setAttribute("data", appParams.playerButtonIconPause);
  playerButton.classList.remove(appParams.playerButtonStatePlay);
}

function stopPlayer() {
  audioPlayer.pause();
  videoPlayer.pause();
  playerButtonIcon.setAttribute("data", appParams.playerButtonIconPlay);
  playerButton.classList.add(appParams.playerButtonStatePlay);
}

audioPlayer.addEventListener("timeupdate", () => {
  if (timeLeft === 0) {
    stopPlayer();
    resetTimer();
  } else if (isCurrentTimeChanged(Math.floor(audioPlayer.currentTime))) {
    timer.textContent = convertTimeToDisplay(--timeLeft);
    let elapsed = duration - timeLeft;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    let progress = (timeLeft / duration) * outlineLength;
    progressBarOutline.style.strokeDashoffset = progress;
  }
});

audioPlayer.addEventListener("abort", (event) => {
  timeLeft = 0;
});

timeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    document.querySelector(selectedTimeButtonTemplate).classList.toggle(appParams.classSelectedToggler);
    event.target.classList.toggle(appParams.classSelectedToggler);
    resetTimer();
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!event.target.classList.contains(appParams.classSelectedToggler)) {
      document.querySelector(selectedThemeButtonTemplate).classList.toggle(appParams.classSelectedToggler);
      event.target.classList.toggle(appParams.classSelectedToggler);
      setMultimediaSources(event.target);
    }
  });
});

function getDuration() {
  return document.querySelector(selectedTimeButtonTemplate).getAttribute(appParams.attrDuration);
}

function resetTimer() {
  duration = getDuration();
  timeLeft = duration;
  timer.textContent = convertTimeToDisplay(timeLeft);
  progressBarOutline && (progressBarOutline.style.strokeDashoffset = outlineLength);
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
}

setMultimediaSources(document.querySelector(selectedThemeButtonTemplate));
resetTimer();
