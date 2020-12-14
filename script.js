const appParams = {
  classVideoContent: ".video-content",
  classHint: ".hint",
  classSpeed: ".speed",
  classSpeedBar: ".speed-bar",
};

const video = document.querySelector(appParams.classVideoContent);
const speed = document.querySelector(appParams.classSpeed);
const hint = document.querySelector(appParams.classHint);
const bar = document.querySelector(appParams.classSpeedBar);

speed.addEventListener("mousemove", changePlaybackRate);

function changePlaybackRate(event) {
  const y = event.currentTarget.offsetTop + event.currentTarget.offsetHeight - event.pageY;
  const percent = y / event.currentTarget.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + "%";
  const playbackRate = (percent * (max - min) + min).toFixed(1);
  bar.style.height = height;
  hint.textContent = `${playbackRate}x`;
  video.playbackRate = playbackRate;
}
