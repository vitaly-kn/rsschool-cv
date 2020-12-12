const appParams = {
  classDrumSelector: ".drum",
  classKeypressed: "keypressed",
};

const drums = document.querySelectorAll(appParams.classDrumSelector);
drums.forEach((key) => {
  key.addEventListener("animationend", removeAnimationStyle);
  key.addEventListener("click", playSample);
});
window.addEventListener("keydown", playSample);

function playSample(event) {
  let drum;
  if (event.type === "keydown") {
    drum = document.querySelector(`${appParams.classDrumSelector}[data-key="${event.keyCode}"]`);
  } else {
    drum = this;
  }
  const sample = drum.querySelector("audio");
  if (!sample) return;
  drum.classList.add(appParams.classKeypressed);
  sample.currentTime = 0;
  sample.play();
}

function removeAnimationStyle(event) {
  event.target.classList.remove(appParams.classKeypressed);
}
