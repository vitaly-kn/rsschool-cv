const appParams = {
  classVideoContent: ".video-content",
  argSkip: "[data-skip]",
  classActive: "active",
  idPlay: "play",
  idPause: "pause",
  classTimerSelector: ".timer",
  classSliderSelector: ".slider",
  classProgressContainerSelector: ".progress",
  classProgressFilledSelector: ".progress-filled",
};

const video = document.querySelector(appParams.classVideoContent);
const timer = document.querySelector(appParams.classTimerSelector);
const skipButtons = document.querySelectorAll(appParams.argSkip);
const buttonPlay = document.getElementById(appParams.idPlay);
const buttonPause = document.getElementById(appParams.idPause);
const progressContainer = document.querySelector(appParams.classProgressContainerSelector);
const progressBar = document.querySelector(appParams.classProgressFilledSelector);
const sliders = document.querySelectorAll(appParams.classSliderSelector);

video.addEventListener("click", togglePlay);
video.addEventListener("play", togglePlayButton);
video.addEventListener("pause", togglePlayButton);
video.addEventListener("timeupdate", onVideoProgress);

buttonPlay.addEventListener("click", playVideo);
buttonPause.addEventListener("click", pauseVideo);

skipButtons.forEach((button) => button.addEventListener("click", fastMove));

sliders.forEach((slider) => slider.addEventListener("click", onRangeChange));
sliders.forEach((slider) => slider.addEventListener("mousemove", onRangeChange));

let isNavigating = false;
progressContainer.addEventListener("click", navigateVideo);
progressContainer.addEventListener("mousemove", onNavigationSlide);
progressContainer.addEventListener("mousedown", startNavigation);
progressContainer.addEventListener("mouseup", stopNavigation);

function togglePlay() {
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
}

function togglePlayButton() {
  if (video.paused) {
    buttonPause.classList.remove(appParams.classActive);
    buttonPlay.classList.add(appParams.classActive);
  } else {
    buttonPlay.classList.remove(appParams.classActive);
    buttonPause.classList.add(appParams.classActive);
  }
}

function startNavigation() {
  isNavigating = true;
}

function stopNavigation() {
  isNavigating = false;
}

function onNavigationSlide(event) {
  if (isNavigating) navigateVideo(event);
}

function navigateVideo(event) {
  const newTime = (event.offsetX / progressContainer.offsetWidth) * video.duration;
  video.currentTime = newTime;
}

function onRangeChange() {
  video[this.name] = this.value;
}

function onVideoProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
  timer.textContent = convertTimeToDisplay(video.currentTime);
}

function fastMove() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function playVideo() {
  video.play();
}

function pauseVideo() {
  video.pause();
}

function formatToTwoDigits(number) {
  return number < 10 ? `0${number}` : number + "";
}

function convertTimeToDisplay(time) {
  let hours = Math.floor(time / 3600);
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${hours}:${formatToTwoDigits(min)}:${formatToTwoDigits(sec)}`;
}
