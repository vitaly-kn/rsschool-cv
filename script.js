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
  classActive_: "active",
  idButtonPlay: "button-play",
  idButtonPause: "button-pause",
};

const audioPlayer = document.querySelector(appParams.classAudioPlayer);
const videoPlayer = document.querySelector(appParams.classVideoPlayer);
const timeButtons = document.querySelectorAll(`${appParams.classTimeControl} > ${appParams.classButton}`);
const playerButtons = document.querySelectorAll(appParams.classPlayerButton);
const buttonPlay = document.getElementById(appParams.idButtonPlay);
const buttonPause = document.getElementById(appParams.idButtonPause);
const timer = document.querySelector(appParams.classTimer);
const themeButtons = document.querySelectorAll(`${appParams.classThemeControl} > ${appParams.classButton}`);
const selectedTimeButtonTemplate = `${appParams.classTimeControl} > ${appParams.classSelected}`;
const selectedThemeButtonTemplate = `${appParams.classThemeControl} > ${appParams.classSelected}`;

let duration, timeLeft;
let progressBarOutline = document.querySelector(appParams.classProgressBarOutline);
let outlineLength = progressBarOutline.getTotalLength();
progressBarOutline.style.strokeDashoffset = outlineLength;
progressBarOutline.style.strokeDasharray = outlineLength;

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

playerButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    if (audioPlayer.paused) {
      startPlayer();
    } else {
      stopPlayer();
    }
  })
);

function startPlayer() {
  audioPlayer.play();
  videoPlayer.play();
  buttonPlay.classList.remove(appParams.classActive_);
  buttonPause.classList.add(appParams.classActive_);
}

function stopPlayer() {
  audioPlayer.pause();
  videoPlayer.pause();
  buttonPause.classList.remove(appParams.classActive_);
  buttonPlay.classList.add(appParams.classActive_);
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

function formatToTwoDigits(number) {
  return number < 10 ? `0${number}` : number + "";
}

function convertTimeToDisplay(time) {
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
