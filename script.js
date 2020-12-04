const appParams = {
  classDrumSelector: ".drum",
  classKeypressed: "keypressed",
};

const drums = document.querySelectorAll(appParams.classDrumSelector);
drums.forEach((key) => key.addEventListener("animationend", removeAnimationStyle));
window.addEventListener("keydown", playSample);

function playSample(event) {
  const sample = document.querySelector(`${appParams.classDrumSelector}[data-key="${event.keyCode}"]>audio`);
  const drum = document.querySelector(`${appParams.classDrumSelector}[data-key="${event.keyCode}"]`);
  if (!sample) return;
  drum.classList.add(appParams.classKeypressed);
  sample.currentTime = 0;
  sample.play();
}

function removeAnimationStyle(event) {
  event.target.classList.remove(appParams.classKeypressed);
  console.log(event);
}
