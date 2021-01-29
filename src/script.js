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
  classTriesSelector: ".tries-amount",
  classScreenSelector: ".screen",
  classKeypadSelector: ".keypad",
  classMistake: "mistake",
  classKeySelector: ".key",
  classKeyActive: "key-active",
  classModalSelector: ".modal-container",
  classShowModal: "show-modal",
  classShowSettings: "show-settings",
  classShowGameOver: "show-game-over",
  classShowHowto: "show-howto",
  settingsOperationsCheckboxSelector: '.operations input[type="checkbox"]',
  classMaxOperandSelector: ".max-operand",
  idTotalDrops: "total-drops",
  idResolvedDrops: "resolved-drops",
  idResolutionRate: "resolution-rate",
  idMistakes: "mistakes",
  idAccuracy: "accuracy",
  idCloseGameOver: "close-gameover",
  idCloseSettings: "close-settings",
  attrValue: "data-value",
  attrValueEnter: "enter",
  attrValueDelete: "delete",
  attrValueClear: "clear",
  attrKey: "key",
  attrKeyNumpad: "key-numpad",
  idFullscreen: "fullscreen",
  idStart: "start",
  idPause: "pause",
  idEnd: "end",
  idSettings: "settings",
  idSound: "sound",
  idHowTo: "howto",
  eventResult: "result",
  eventPause: "pause",
  eventResume: "resume",
  eventRiseSeaLevel: "risesealevel",
};

const MAX_DIGITS = 3;
const BONUS_FREQUENCY = 5;
const NEXT_LEVEL_SCORE_STEP = 200;
const NEXT_LEVEL_CADENCE_STEP = 250;
const BASIC_CADENCE = 3000;
const BASIC_DIFFICULTY_LEVEL = 8;
const MAX_DIFFICULTY_LEVEL = 1;
const MIN_CADENCE = 500;
const SCORE_STEP = 10;
const AI_CADENCE = 4500;
const AI_INPUT_DELAY = 400;

let isFullscreen = false;
let isGamePaused = false;
let wasGamePaused = isGamePaused;
let isGameInProgress = false;
let chainBonus = 0;
let isBonusOnScreen = false;
let bonusResult;
let seaLevel = -1;
let maxOperand = 99;
let isKeyBoardLocked = true;
let isAIMode = false;
let cadencer = new Cadencer(onCadence, BASIC_CADENCE);
let aiCadencer;

const applicationDiv = document.querySelector(appParams.classApplicationSelector);
const dropContainer = document.querySelector(appParams.classDropContainerSelector);
const score = document.querySelector(appParams.classScoreSelector);
const tries = document.querySelector(appParams.classTriesSelector);
const screen = document.querySelector(appParams.classScreenSelector);
const keypad = document.querySelector(appParams.classKeypadSelector);
const keypadKeys = document.querySelectorAll(appParams.classKeySelector);
const fullscreenButton = document.getElementById(appParams.idFullscreen);
const startButton = document.getElementById(appParams.idStart);
const pauseButton = document.getElementById(appParams.idPause);
const endButton = document.getElementById(appParams.idEnd);
const settingsButton = document.getElementById(appParams.idSettings);
const soundButton = document.getElementById(appParams.idSound);
const howToButton = document.getElementById(appParams.idHowTo);
const modalContainer = document.querySelector(appParams.classModalSelector);
const totalDrops = document.getElementById(appParams.idTotalDrops);
const resolvedDrops = document.getElementById(appParams.idResolvedDrops);
const resolutionRate = document.getElementById(appParams.idResolutionRate);
const mistakes = document.getElementById(appParams.idMistakes);
const accuracy = document.getElementById(appParams.idAccuracy);
const closeGameOver = document.getElementById(appParams.idCloseGameOver);
const operationsCheckboxes = document.querySelectorAll(appParams.settingsOperationsCheckboxSelector);
const maxOperandInput = document.querySelector(appParams.classMaxOperandSelector);
const closeSettings = document.getElementById(appParams.idCloseSettings);

score.textContent = 0;

dropContainer.addEventListener(appParams.eventResult, onResultReceived);
dropContainer.addEventListener(appParams.eventPause, onPauseGame);
dropContainer.addEventListener(appParams.eventResume, onResumeGame);
dropContainer.addEventListener(appParams.eventRiseSeaLevel, onRiseSeaLevel);
dropContainer.addEventListener("animationend", restartGame);
dropContainer.addEventListener("transitionend", onRiseSeaLevelEnd);

keypad.addEventListener("animationend", onMistakeAnimationEnd);

keypadKeys.forEach((key) => key.addEventListener("click", onKeyEntered));

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

startButton.addEventListener("click", onStartButtonClick);
pauseButton.addEventListener("click", onPauseButtonClick);
endButton.addEventListener("click", endGame);
fullscreenButton.addEventListener("click", toggleFullscreen);
settingsButton.addEventListener("click", onSettingsClick);
soundButton.addEventListener("click", onSoundClick);
howToButton.addEventListener("click", onHowToClick);
document.addEventListener("fullscreenchange", toggleFullscreenButton);
closeGameOver.addEventListener("click", onGameOverClose);
operationsCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", onOperationCheckboxChange));
maxOperandInput.addEventListener("change", onMaxOperandChange);
closeSettings.addEventListener("click", onSettingsClose);

let operationsMask = { add: true, sub: true, mul: true, div: true };

//Sounds
let isSoundEnabled = true;

HTMLAudioElement.prototype.playGameSfx = function () {
  if (isSoundEnabled) return this.play();
};

const appSounds = {
  idKey: "sound-key",
  idBonus: "sound-bonus",
  idDropStart: "sound-drop-start",
  idDropFall: "sound-drop-fall",
  idDropBang: "sound-drop-bang",
  idGameOver: "sound-game-over",
  idMistake: "sound-mistake",
  idSeaRise: "sound-sea-rise",
  idSoundTheme: "sound-theme",
};

const soundKey = document.getElementById(appSounds.idKey);
const soundBonus = document.getElementById(appSounds.idBonus);
const soundDropStart = document.getElementById(appSounds.idDropStart);
const soundDropFall = document.getElementById(appSounds.idDropFall);
const soundDropBang = document.getElementById(appSounds.idDropBang);
const soundGameOver = document.getElementById(appSounds.idGameOver);
const soundMistake = document.getElementById(appSounds.idMistake);
const soundSeaRise = document.getElementById(appSounds.idSeaRise);
const soundTheme = document.getElementById(appSounds.idSoundTheme);

let level = {
  upgrade() {
    let estimatedDifficultyLevel = BASIC_DIFFICULTY_LEVEL - Math.trunc(Number(score.textContent) / NEXT_LEVEL_SCORE_STEP);
    this.difficulty = Math.max(estimatedDifficultyLevel, MAX_DIFFICULTY_LEVEL);
    let estimatedCadence = BASIC_CADENCE - Math.trunc(Number(score.textContent) / NEXT_LEVEL_SCORE_STEP) * NEXT_LEVEL_CADENCE_STEP;
    cadencer.setCadence(Math.max(estimatedCadence, MIN_CADENCE));
  },
  reset() {
    this.difficulty = BASIC_DIFFICULTY_LEVEL;
    cadencer.setCadence(BASIC_CADENCE);
  },
};

let statistics = {
  accuracy() {
    let accuracy = "0%";
    if (this.resolvedDrops) {
      accuracy = `${Math.round((this.resolvedDrops / (this.resolvedDrops + this.mistakes)) * 100)}%`;
    }
    return accuracy;
  },
  resolutionRate() {
    let resolutionRate = `${Math.round((this.resolvedDrops / this.totalDrops) * 100)}%`;
    return resolutionRate;
  },
  reset() {
    this.mistakes = 0;
    this.totalDrops = 0;
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
  isFullscreen = !isFullscreen;
  fullscreenButton.textContent = isFullscreen ? "Window" : "Fullscreen";
}

function onKeyEntered(event) {
  event.currentTarget.blur();
  soundKey.playGameSfx();
  if ((!isGameInProgress || isGamePaused) && !isAIMode) return;
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

function getActiveKeypadButton(event) {
  let button = document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKey}="${event.keyCode}"]`);
  if (!button) {
    button = document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKeyNumpad}="${event.keyCode}"]`);
  }
  return button;
}

function onKeyDown(event) {
  if (isKeyBoardLocked) return;
  let button = getActiveKeypadButton(event);
  if (button) {
    button.classList.add(appParams.classKeyActive);
    button.click();
  }
}

function onKeyUp(event) {
  if (isKeyBoardLocked) return;
  let button = getActiveKeypadButton(event);
  if (button) button.classList.remove(appParams.classKeyActive);
}

function onResultReceived(event) {
  let isCorrectAnswer = false;
  for (let drop of dropContainer.children) {
    if (event.detail.result === bonusResult || drop.result === event.detail.result) {
      soundBonus.playGameSfx();
      isCorrectAnswer = true;
      score.textContent = +score.textContent + SCORE_STEP + chainBonus;
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
    chainBonus = 0;
    statistics.mistakes++;
    keypad.classList.add(appParams.classMistake);
    soundMistake.playGameSfx();
  }
}

function onMistakeAnimationEnd() {
  keypad.classList.remove(appParams.classMistake);
}

function createRandomDrop() {
  const expr = getRandomExpression(level.difficulty, maxOperand, operationsMask);
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
        soundDropFall.playGameSfx();
        seaLevel++;
        tries.textContent--;
        dropContainer.dispatchEvent(new CustomEvent(appParams.eventRiseSeaLevel));
      }
      event.currentTarget.parentNode?.removeChild(event.currentTarget);
    },
    { once: true }
  );
  drop.result = expr.result;
  drop.bang = function () {
    drop.classList.add(appParams.classBang);
    soundDropBang.playGameSfx();
  };
  return drop;
}

function destroyAllDrops() {
  dropContainer.innerHTML = "";
}

function onCadence() {
  let drop = createRandomDrop();
  if (!isBonusOnScreen && getRandomInt(0, BONUS_FREQUENCY) === BONUS_FREQUENCY) {
    drop.classList.add(appParams.classBonus);
    bonusResult = drop.result;
    isBonusOnScreen = true;
  }
  dropContainer.appendChild(drop);
  statistics.totalDrops++;
  soundDropStart.playGameSfx();
}

function onPauseButtonClick(event) {
  event.currentTarget.blur();
  if (!isGameInProgress) return;
  if (cadencer.toggle()) {
    event.currentTarget.textContent = "Pause";
    resumeGameInterface();
  } else {
    event.currentTarget.textContent = "Resume";
    pauseGameInterface();
  }
}

function onPauseGame(event) {
  event.currentTarget.classList.add(appParams.classDropPause);
}

function onResumeGame(event) {
  event.currentTarget.classList.remove(appParams.classDropPause);
}

function onRiseSeaLevel(event) {
  event.currentTarget.classList.add(appParams.classListSeaLevels[seaLevel]);
  soundSeaRise.playGameSfx();
  resetBonus();
  destroyAllDrops();
}

function onRiseSeaLevelEnd() {
  if (seaLevel === appParams.classListSeaLevels.length - 1) {
    cadencer.stop();
    soundGameOver.playGameSfx();
    isKeyBoardLocked = true;
    showStatistics();
  }
}

function onStartButtonClick(event) {
  event.currentTarget.blur();
  if (!isGameInProgress) {
    startGame();
  } else {
    cadencer.stop();
    isKeyBoardLocked = true;
    destroyAllDrops();
    appParams.classListSeaLevels.forEach((seaLevel) => dropContainer.classList.remove(seaLevel));
    dropContainer.classList.add(appParams.classRestart);
  }
}

function resumeGameInterface() {
  isGamePaused = false;
  isKeyBoardLocked = false;
  dropContainer.dispatchEvent(new CustomEvent(appParams.eventResume));
}

function pauseGameInterface() {
  isGamePaused = true;
  isKeyBoardLocked = true;
  dropContainer.dispatchEvent(new CustomEvent(appParams.eventPause));
}

function startGame() {
  isGameInProgress = true;
  isKeyBoardLocked = false;
  level.reset();
  statistics.reset();
  startButton.textContent = "Restart";
  soundTheme.playGameSfx();
  cadencer.start();
}

function resetBonus() {
  bonusResult = undefined;
  isBonusOnScreen = false;
  chainBonus = 0;
}

function resetGame() {
  destroyAllDrops();
  soundTheme.pause();
  score.textContent = 0;
  screen.textContent = "";
  isGameInProgress = false;
  seaLevel = -1;
  tries.textContent = appParams.classListSeaLevels.length;
  dropContainer.classList.remove(appParams.classRestart);
  resetBonus();
  startButton.textContent = "Start";
  pauseButton.textContent = "Pause";
  resumeGameInterface();
  isKeyBoardLocked = true;
  cadencer.stop();
}

function restartGame() {
  resetGame();
  startGame();
}

function endGame() {
  if (isGameInProgress) {
    seaLevel = appParams.classListSeaLevels.length - 1;
    dropContainer.dispatchEvent(new CustomEvent(appParams.eventRiseSeaLevel));
  }
}

function showStatistics() {
  modalContainer.classList.add(appParams.classShowModal);
  modalContainer.classList.add(appParams.classShowGameOver);
  totalDrops.textContent = statistics.totalDrops;
  resolvedDrops.textContent = statistics.resolvedDrops;
  resolutionRate.textContent = statistics.resolutionRate();
  mistakes.textContent = statistics.mistakes;
  accuracy.textContent = statistics.accuracy();
}

function onGameOverClose() {
  modalContainer.classList.remove(appParams.classShowModal);
  modalContainer.classList.remove(appParams.classShowGameOver);
  appParams.classListSeaLevels.forEach((seaLevel) => dropContainer.classList.remove(seaLevel));
  resetGame();
}

function onOperationCheckboxChange() {
  let lastChecked;
  let checkedCount = 0;
  operationsCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.disabled = false;
      operationsMask[checkbox.value] = true;
      lastChecked = checkbox;
      checkedCount++;
    } else {
      operationsMask[checkbox.value] = false;
    }
  });
  if (checkedCount === 1) lastChecked.disabled = true;
}

function onMaxOperandChange(event) {
  let value = Math.floor(event.currentTarget.value);
  if (value > 99) {
    value = 99;
  } else if (value < 1) {
    value = 1;
  }
  event.currentTarget.value = value;
  maxOperand = value;
}

function onSettingsClick(event) {
  event.currentTarget.blur();
  wasGamePaused = isGamePaused;
  if (isGameInProgress) {
    cadencer.stop();
    pauseGameInterface();
  } else {
    isKeyBoardLocked = true;
  }
  modalContainer.classList.add(appParams.classShowModal);
  modalContainer.classList.add(appParams.classShowSettings);
}

function onSettingsClose() {
  modalContainer.classList.remove(appParams.classShowModal);
  modalContainer.classList.remove(appParams.classShowSettings);
  if (!wasGamePaused && isGameInProgress) {
    resumeGameInterface();
    cadencer.start();
  } else {
    isKeyBoardLocked = false;
  }
}

function onSoundClick(event) {
  event.currentTarget.blur();
  isSoundEnabled = !isSoundEnabled;
  if (isSoundEnabled) {
    event.currentTarget.textContent = "Sound : On";
    if (isGameInProgress) soundTheme.play();
  } else {
    event.currentTarget.textContent = "Sound : Off";
    soundTheme.pause();
  }
}

function onHowToClick() {
  if (isGameInProgress) return;
  isAIMode = true;
  aiCadencer = new Cadencer(onAICadence, AI_CADENCE);
  modalContainer.classList.add(appParams.classShowModal);
  modalContainer.classList.add(appParams.classShowHowto);
  level.reset();
  statistics.reset();
  aiCadencer.start();
  cadencer.start();
  modalContainer.addEventListener("click", onAIQuit, { once: true });
}

function onAIQuit(event) {
  aiCadencer.stop();
  aiCadencer = null;
  cadencer.stop();
  isAIMode = false;
  destroyAllDrops();
  event.currentTarget.classList.remove(appParams.classShowModal);
  event.currentTarget.classList.remove(appParams.classShowHowto);
  appParams.classListSeaLevels.forEach((seaLevel) => dropContainer.classList.remove(seaLevel));
  if (event.currentTarget.classList.contains(appParams.classShowGameOver)) {
    event.currentTarget.classList.remove(appParams.classShowGameOver);
    resetGame();
  } else {
    dropContainer.classList.add(appParams.classRestart);
  }
}

function onAICadence() {
  if (dropContainer.children.length) {
    let dropToResolve = dropContainer.children[getRandomInt(0, dropContainer.children.length - 1)];
    enterResult(dropToResolve.result);
  }
}

function enterResult(result) {
  let resultArray = (result + "").split("");
  resultArray.push("enter");
  let i = 0;
  (function sendKeys() {
    if (i) {
      let prevKey = document.querySelector(`${appParams.classKeySelector}[${appParams.attrValue}="${resultArray[i - 1]}"]`);
      prevKey.classList.remove(appParams.classKeyActive);
    }
    if (i < resultArray.length) {
      let button = document.querySelector(`${appParams.classKeySelector}[${appParams.attrValue}="${resultArray[i]}"]`);
      button.classList.add(appParams.classKeyActive);
      i++;
      button.click();
      setTimeout(sendKeys, AI_INPUT_DELAY);
    }
  })();
}
