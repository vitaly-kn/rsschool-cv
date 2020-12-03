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

let duration, timeLeft;

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
  //playerButton.classList.toggle(appParams.playerButtonStatePlay);
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
  console.log("timer stopped!");
}

audioPlayer.addEventListener("timeupdate", () => {
  console.log("start " + timeLeft);
  if (timeLeft === 0) {
    stopPlayer();
    resetTimer();
    //playerButton.classList.toggle(appParams.playerButtonStatePlay);
    console.log("stop block");
  } else if (isCurrentTimeChanged(Math.floor(audioPlayer.currentTime))) {
    timer.textContent = convertTimeToDisplay(--timeLeft);
    console.log("iterate block");
  }
  console.log("end " + timeLeft);
});

audioPlayer.addEventListener("pause", (event) => {
  console.log("paused!");
  console.log(event.target.paused);
});

audioPlayer.addEventListener("abort", (event) => {
  console.log("aborted!");
  console.log(event.target.paused);
  timeLeft = 0;
  //stopPlayer();
  //resetTimer();
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
      //stopPlayer();
      //timeLeft = 0;
      //console.log("time left is 0!");
      setMultimediaSources(event.target);
      //playerButton.classList.add(appParams.playerButtonStatePlay);
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
  //resetTimer();
}
setMultimediaSources(document.querySelector(selectedThemeButtonTemplate));
resetTimer();
