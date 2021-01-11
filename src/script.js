import "./style.css";
import Cadencer from "./components/Cadencer";

const appParams = {
  classApplicationSelector: ".application",
  classDropContainerSelector: ".drop-container",
  classDrop: "drop",
  classDropPause: "drop-pause",
  classBang: "bang",
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
  idStop: "stop",
  idPause: "pause",
  eventResult: "result",
  eventPause: "pause",
  eventResume: "resume",
};

const operators = [
  { operation: "+", display: "+" },
  { operation: "-", display: "-" },
  { operation: "*", display: "x" },
  { operation: "/", display: "÷" },
];
const operatorsIndexes = {
  add: 0,
  sub: 1,
  mul: 2,
  div: 3,
};
const FIRST_TRACK_OFFSET = 5;
const TRACK_STEP = 10;
const MAX_TRACKS = 9;
const MAX_OPERAND_VALUE = 99;
const MAX_DIGITS = 3;
let difficultyLevel = 6;
let isFullscreen = false;
let isKeypadLocked = false;
let cadencer = new Cadencer(onCadence);

const applicationDiv = document.querySelector(appParams.classApplicationSelector);
const dropContainer = document.querySelector(appParams.classDropContainerSelector);
const screen = document.querySelector(appParams.classScreenSelector);
const keypadKeys = document.querySelectorAll(appParams.classKeySelector);
const fullscreenButton = document.getElementById(appParams.idFullscreen);
const stopButton = document.getElementById(appParams.idStop);
const pauseButton = document.getElementById(appParams.idPause);

dropContainer.addEventListener(appParams.eventResult, onResultReceived);
dropContainer.addEventListener(appParams.eventPause, onPauseGame);
dropContainer.addEventListener(appParams.eventResume, onResumeGame);

keypadKeys.forEach((key) => key.addEventListener("click", onKeyEntered));

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

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
  if (isKeypadLocked) return;
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
      drop.bang();
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDropOffset() {
  let track = getRandomInt(0, MAX_TRACKS - 1);
  return `${FIRST_TRACK_OFFSET + track * TRACK_STEP}%`;
}

function getRandomExpression(difficulty = 1) {
  //1 is the higest difficulty, 2, 3 ... -- lower
  let operator = getRandomInt(0, operators.length - 1);
  let operand1 = getRandomInt(0, Math.round(MAX_OPERAND_VALUE / difficulty));
  let operand2;
  if (operator <= 1) {
    operand2 = getRandomInt(0, Math.round(MAX_OPERAND_VALUE / 10));
  } else {
    operand2 = getRandomInt(1, 10);
  }
  let expression;
  let result;
  if (operator === operatorsIndexes.add || operator === operatorsIndexes.mul) {
    expression = `${operand1} ${operators[operator].operation} ${operand2}`;
    result = eval(expression);
  } else {
    if (operator === operatorsIndexes.sub) {
      expression = `${operand1} ${operators[operatorsIndexes.add].operation} ${operand2}`;
    } else expression = `${operand1} ${operators[operatorsIndexes.mul].operation} ${operand2}`;
    result = eval(expression);
    [operand1, result] = [result, operand1];
  }
  return {
    operand1: operand1,
    operation: operators[operator].display,
    operand2: operand2,
    result: result,
  };
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
  let dropEvent;
  if (cadencer.toggle()) {
    event.currentTarget.textContent = "Pause";
    isKeypadLocked = false;
    dropEvent = new CustomEvent(appParams.eventResume);
  } else {
    event.currentTarget.textContent = "Resume";
    isKeypadLocked = true;
    dropEvent = new CustomEvent(appParams.eventPause);
  }
  dropContainer.dispatchEvent(dropEvent);
}

function onPauseGame(event) {
  event.currentTarget.classList.add(appParams.classDropPause);
}

function onResumeGame(event) {
  event.currentTarget.classList.remove(appParams.classDropPause);
}

stopButton.addEventListener("click", () => {
  for (let drop of dropContainer.children) {
    drop.bang();
  }
});

//entry point of the program
cadencer.start();
