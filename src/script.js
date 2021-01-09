import "./style.css";

const appParams = {
  classApplicationSelector: ".application",
  classDropContainerSelector: ".drop-container",
  classScreenSelector: ".screen",
  classKeySelector: ".key",
  attrValue: "data-value",
  attrValueEnter: "enter",
  attrValueDelete: "delete",
  attrValueClear: "clear",
  attrKey: "key",
  attrKeyNumpad: "key-numpad",
  idFullscreen: "fullscreen",
  eventResult: "result",
};

const MAX_DIGITS = 3;
let isFullscreen = false;

const applicationDiv = document.querySelector(appParams.classApplicationSelector);
const dropContainer = document.querySelector(appParams.classDropContainerSelector);
const screen = document.querySelector(appParams.classScreenSelector);
const keypadKeys = document.querySelectorAll(appParams.classKeySelector);
const fullscreenButton = document.getElementById(appParams.idFullscreen);

dropContainer.addEventListener(appParams.eventResult, onResultReceived);

keypadKeys.forEach((key) => key.addEventListener("click", onKeyEntered));

window.addEventListener("keydown", onKeyDown);

fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", toggleFullscreenButton);

function toggleFullscreen() {
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
  /*console.log("clicked!");*/
  const input = event.currentTarget.getAttribute(appParams.attrValue);
  console.log("clicked! input = " + input);
  if (input === appParams.attrValueEnter) {
    let resultEvent = new CustomEvent(appParams.eventResult, { detail: { result: screen.textContent } });
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

function onKeyDown(event) {
  console.log(event.keyCode);
  let key = document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKey}="${event.keyCode}"]`);
  if (!key) key = document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKeyNumpad}="${event.keyCode}"]`);
  if (key) {
    /*console.log(key);*/
    console.log("emulating click!..");
    let emulatedClickEvent = new Event("click");
    key.dispatchEvent(emulatedClickEvent);
  }
}

function onResultReceived(event) {
  console.log(`Result received : ${event.detail.result}`);
}
