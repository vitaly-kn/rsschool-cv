import "./style.css";
import Cadencer from "./components/Cadencer";
import { getRandomInt, getRandomDropOffset, getRandomExpression } from "./components/randoms";

const appParams = {
  classApplicationSelector: ".application",
  classDropContainerSelector: ".drop-container",
  classListSeaLevels: ["sea-level1", "sea-level2", "flood"],
  classRestart: "restart",
  classDrop: "drop",
  classBonus: "bonus",
  classDropPause: "drop-pause",
  animationDropFall: "drop-fall",
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
  eventRiseSeaLevel: "risesealevel",
};

const MAX_DIGITS = 3;
const BONUS_FREQUENCY = 5;
const NEXT_LEVEL_SCORE_STEP = 100;
const NEXT_LEVEL_CADENCE_STEP = 250;
const BASIC_CADENCE = 3000;
const BASIC_DIFFICULTY_LEVEL = 8;
const MIN_CADENCE = 500;
let difficultyLevel = BASIC_DIFFICULTY_LEVEL;
let isFullscreen = false;
let isGamePaused = false;
let isGameInProgress = false;
let chainBonus = 1;
let isBonusOnScreen = false;
let bonusResult;
let seaLevel = -1;
let cadencer = new Cadencer(onCadence, BASIC_CADENCE);

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
dropContainer.addEventListener(appParams.eventRiseSeaLevel, onRiseSeaLevel);
dropContainer.addEventListener("animationend", resetGame);

keypadKeys.forEach((key) => key.addEventListener("click", onKeyEntered));

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

startButton.addEventListener("click", onStartButtonClick);
pauseButton.addEventListener("click", onPauseButtonClick);
fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", toggleFullscreenButton);

let level = {
  //previousScore: 0,
  upgrade() {
    let difference = +score.textContent - this.previousScore;
    if (difference / NEXT_LEVEL_SCORE_STEP >= 1) {
      if (difficultyLevel > 1) difficultyLevel -= Math.floor(difference / NEXT_LEVEL_SCORE_STEP);
      if (cadencer.getCadence() > MIN_CADENCE) cadencer.setCadence(cadencer.getCadence() - NEXT_LEVEL_CADENCE_STEP);
      //console.log(`new level : ${difficultyLevel}, new cadence ${cadencer.getCadence()}`);
      this.previousScore = +score.textContent;
    }
  },
  reset() {
    this.previousScore = 0;
    difficultyLevel = BASIC_DIFFICULTY_LEVEL;
    cadencer.setCadence(BASIC_CADENCE);
  },
};

let statistics = {
  accuracy() {
    return this.resolvedDrops ? `${Math.round((this.resolvedDrops / (this.resolvedDrops + this.mistakes)) * 100)}%` : "0%";
  },
  resolved() {
    return this.resolvedDrops ? `${Math.round((this.resolvedDrops / this.totalDrops) * 100)}%` : "0%";
  },
  reset() {
    this.mistakes = 0;
    this.totalDrops = 0;
    //this.missedDrops = 0;
    this.resolvedDrops = 0;
  },
};

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
    let resultEvent = new CustomEvent(appParams.eventResult, { detail: { result: +screen.textContent } });
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
  let isCorrectAnswer = false;
  for (let drop of dropContainer.children) {
    if (event.detail.result === bonusResult || drop.result === event.detail.result) {
      isCorrectAnswer = true;
      score.textContent = +score.textContent + chainBonus;
      chainBonus++;
      statistics.resolvedDrops++;
      drop.bang();
    }
  }
  level.upgrade();
  if (event.detail.result === bonusResult) {
    resetBonus();
  }
  if (!isCorrectAnswer) {
    chainBonus = 1;
    statistics.mistakes++;
  }
}

function createRandomDrop(difficultyLevel) {
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
      event.stopPropagation();
      if (event.animationName === appParams.animationDropFall) {
        dropContainer.dispatchEvent(new CustomEvent(appParams.eventRiseSeaLevel));
      }
      //if (event.currentTarget.parentNode) event.currentTarget.parentNode.removeChild(event.currentTarget);
      event.currentTarget.parentNode?.removeChild(event.currentTarget);
    },
    { once: true }
  );
  drop.result = expr.result;
  drop.bang = function () {
    drop.classList.add(appParams.classBang);
  };
  return drop;
}

function destroyAllDrops() {
  dropContainer.innerHTML = "";
}

function onCadence() {
  let drop = createRandomDrop(difficultyLevel);
  if (!isBonusOnScreen && getRandomInt(0, BONUS_FREQUENCY) === BONUS_FREQUENCY) {
    drop.classList.add(appParams.classBonus);
    bonusResult = drop.result;
    isBonusOnScreen = true;
  }
  dropContainer.appendChild(drop);
  statistics.totalDrops++;
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
  //console.log("onPause!");
  event.currentTarget.classList.add(appParams.classDropPause);
  console.log("game paused!");
}

function onResumeGame(event) {
  event.currentTarget.classList.remove(appParams.classDropPause);
}

function onRiseSeaLevel(event) {
  seaLevel++;
  event.currentTarget.classList.add(appParams.classListSeaLevels[seaLevel]);
  resetBonus();
  destroyAllDrops();
  chainBonus = 1;
  if (seaLevel === appParams.classListSeaLevels.length - 1) {
    cadencer.stop(); //temp!!! to be revised!!!
    showStatistics();
    setTimeout(resetGame, 3000);
  }
}

function onStartButtonClick(event) {
  event.currentTarget.blur();
  if (!isGameInProgress) {
    startGame();
  } else {
    cadencer.stop();
    destroyAllDrops();
    dropContainer.classList.add(appParams.classRestart);
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
  level.reset();
  statistics.reset();
  startButton.textContent = "Restart";
  cadencer.start();
}

function resetBonus() {
  bonusResult = undefined;
  isBonusOnScreen = false;
}

function resetGame() {
  destroyAllDrops();
  score.textContent = 0;
  screen.textContent = "";
  isGameInProgress = false;
  chainBonus = 1;
  seaLevel = -1;
  appParams.classListSeaLevels.forEach((seaLevel) => dropContainer.classList.remove(seaLevel));
  dropContainer.classList.remove(appParams.classRestart);
  resetBonus();
  startButton.textContent = "Start";
  pauseButton.textContent = "Pause";
  //level.reset();
  resumeGame();
  cadencer.stop();
}

function showStatistics() {
  console.log("****************************");
  console.log("GAME OVER!");
  console.log(`Total drops : ${statistics.totalDrops}, resolved : ${statistics.resolvedDrops} (${statistics.resolved()})`);
  console.log(`mistakes : ${statistics.mistakes}, accuracy : ${statistics.accuracy()}`);
  console.log("****************************");
}
