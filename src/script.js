import "./style.css";
import Cadencer from "./components/Cadencer";
import { getRandomDropOffset, getRandomExpression } from "./components/randoms";

const appParams = {
  classApplicationSelector: ".application",
  classDropContainerSelector: ".drop-container",
  classDrop: "drop",
  classDropPause: "drop-pause",
  classBang: "bang",
  classScoreSelector: ".score-amount",
  classScreenSelector: ".screen",
  classKeySelector: ".key",
  classKeyActive: "key-active",
  attrValue: "data-value",
  attrValueEnter: "enter",
  attrValueDelete: "delete",
  attrValueClear: "clear",
  attrKey: "key",
  attrKeyNumpad: "key-numpad",
  idFullscreen: "fullscreen",
  idStart: "start",
  idPause: "pause",
  eventResult: "result",
  eventPause: "pause",
  eventResume: "resume",
};

const MAX_DIGITS = 3;
let difficultyLevel = 6;
let isFullscreen = false;
let isGamePaused = false;
let isGameInProgress = false;
let cadencer = new Cadencer(onCadence);

const applicationDiv = document.querySelector(appParams.classApplicationSelector);
const dropContainer = document.querySelector(appParams.classDropContainerSelector);
const score = document.querySelector(appParams.classScoreSelector);
const screen = document.querySelector(appParams.classScreenSelector);
const keypadKeys = document.querySelectorAll(appParams.classKeySelector);
const fullscreenButton = document.getElementById(appParams.idFullscreen);
const startButton = document.getElementById(appParams.idStart);
const pauseButton = document.getElementById(appParams.idPause);

score.textContent = 0;

dropContainer.addEventListener(appParams.eventResult, onResultReceived);
dropContainer.addEventListener(appParams.eventPause, onPauseGame);
dropContainer.addEventListener(appParams.eventResume, onResumeGame);

keypadKeys.forEach((key) => key.addEventListener("click", onKeyEntered));

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

startButton.addEventListener("click", onStartButtonClick);
pauseButton.addEventListener("click", onPauseButtonClick);
fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", toggleFullscreenButton);

function toggleFullscreen(event) {
  event.currentTarget.blur();
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

function onKeyEntered(event) {
  event.currentTarget.blur();
  if (!isGameInProgress || isGamePaused) return;
  const input = event.currentTarget.getAttribute(appParams.attrValue);
  if (input === appParams.attrValueEnter) {
    let resultEvent = new CustomEvent(appParams.eventResult, { detail: { result: screen.textContent * 1 } });
    screen.textContent = "";
    dropContainer.dispatchEvent(resultEvent);
  } else if (input === appParams.attrValueClear) {
    screen.textContent = "";
  } else if (input === appParams.attrValueDelete) {
    screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);
  } else if (screen.textContent.length < MAX_DIGITS) {
    screen.textContent += input;
  }
}

function getActiveKeypadKey(event) {
  let key = document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKey}="${event.keyCode}"]`);
  return key ? key : document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKeyNumpad}="${event.keyCode}"]`);
}

function onKeyDown(event) {
  let key = getActiveKeypadKey(event);
  if (key) {
    key.classList.add(appParams.classKeyActive);
    key.click();
  }
}

function onKeyUp(event) {
  let key = getActiveKeypadKey(event);
  if (key) key.classList.remove(appParams.classKeyActive);
}

function onResultReceived(event) {
  //console.log(`Result received : ${event.detail.result}`);
  for (let drop of dropContainer.children) {
    if (drop.result === event.detail.result) {
      score.textContent++;
      drop.bang();
    }
  }
}

function createRandomDrop() {
  const expr = getRandomExpression(difficultyLevel);
  const drop = document.createElement("div");
  drop.style.left = getRandomDropOffset();
  drop.classList.add(appParams.classDrop);
  drop.insertAdjacentHTML(
    "afterbegin",
    `<div class="operator">${expr.operation}</div>
     <div class=operands>
     <div>${expr.operand1}</div>
     <div>${expr.operand2}</div>
     </div>`
  );

  drop.addEventListener(
    "animationend",
    (event) => {
      event.currentTarget.parentNode.removeChild(event.currentTarget);
    },
    { once: true }
  );

  drop.result = expr.result;

  drop.bang = function () {
    drop.classList.add(appParams.classBang);
  };

  return drop;
}

function onCadence() {
  let drop = createRandomDrop();
  dropContainer.appendChild(drop);
  //let expr = getRandomExpression(difficultyLevel);
  //console.log(`tick! operation : ${expr.operand1} ${expr.operation} ${expr.operand2} = ${expr.result}, offset : ${getDropOffset()}`);
  console.log(`tick! drop.result = ${drop.result}`);
}

function onPauseButtonClick(event) {
  event.currentTarget.blur();
  if (!isGameInProgress) return;
  if (cadencer.toggle()) {
    event.currentTarget.textContent = "Pause";
    resumeGame();
  } else {
    event.currentTarget.textContent = "Resume";
    pauseGame();
  }
}

function onPauseGame(event) {
  event.currentTarget.classList.add(appParams.classDropPause);
}

function onResumeGame(event) {
  event.currentTarget.classList.remove(appParams.classDropPause);
}

function onStartButtonClick(event) {
  event.currentTarget.blur();
  if (!isGameInProgress) {
    startGame();
  } else if (confirm("Are you sure you want to restart the game?")) {
    restartGame();
  }
}

function resumeGame() {
  isGamePaused = false;
  dropContainer.dispatchEvent(new CustomEvent(appParams.eventResume));
}

function pauseGame() {
  isGamePaused = true;
  dropContainer.dispatchEvent(new CustomEvent(appParams.eventPause));
}

function startGame() {
  isGameInProgress = true;
  startButton.textContent = "Restart";
  cadencer.start();
}

function restartGame() {
  dropContainer.innerHTML = "";
  score.textContent = 0;
  screen.textContent = "";
  isGameInProgress = false;
  startButton.textContent = "Start";
  pauseButton.textContent = "Pause";
  resumeGame();
  cadencer.stop();
}
