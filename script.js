const appParams = {
  idGreeting: "greeting",
  idName: "name",
  idFocus: "focus",
  idTime: "time",
  backgroundMorning: "./assets/img/morning.png",
  backgroundAfternoon: "./assets/img/afternoon.png",
  backgroundEvening: "./assets/img/evening.png",
  backgroundNight: "./assets/img/night.png",
  greetingMorning: "morning",
  greetingAfternoon: "afternoon",
  greetingEvening: "evening",
  classMain: ".main",
};

const timeField = document.getElementById(appParams.idTime);
const greetingField = document.getElementById(appParams.idGreeting);
const nameField = document.getElementById(appParams.idName);
const focusField = document.getElementById(appParams.idFocus);
const main = document.querySelector(appParams.classMain);

let savedHour = new Date().getHours();
let isNewHour = true;

function getBackground() {
  const currentHour = new Date(),
    hour = currentHour.getHours();
  switch (true) {
    case hour < 6:
      return `url("${appParams.backgroundNight}")`;
    case hour >= 6 && hour < 12:
      return `url("${appParams.backgroundMorning}")`;
    case hour >= 12 && hour < 18:
      return `url("${appParams.backgroundAfternoon}")`;
    case hour >= 18:
      return `url("${appParams.backgroundEvening}")`;
  }
}

function getGreeting() {
  const currentHour = new Date(),
    hour = currentHour.getHours();
  switch (true) {
    case hour < 12:
      return appParams.greetingMorning;
    case hour >= 12 && hour < 18:
      return appParams.greetingAfternoon;
    case hour >= 18:
      return appParams.greetingEvening;
  }
}

function setBackgroundAndGreeting() {
  main.style.backgroundImage = getBackground();
  greetingField.textContent = getGreeting();
}

function getTime() {
  formatToTwoDigits = (number) => (number < 10 ? `0${number}` : number + "");

  let currentTime = new Date(),
    hour = currentTime.getHours(),
    min = currentTime.getMinutes(),
    sec = currentTime.getSeconds();

  if (hour !== savedHour) {
    savedHour = hour;
    isNewHour = true;
  }

  const timeAbbreviation = hour < 12 ? "AM" : "PM";
  hour = hour % 12 || 12;

  return `${hour}:${formatToTwoDigits(min)}:${formatToTwoDigits(sec)} ${timeAbbreviation}`;
}

function showName() {
  nameField.textContent = localStorage.getItem(appParams.idName) === null ? "[Enter Name]" : localStorage.getItem(appParams.idName);
}

function showFocus() {
  focusField.textContent = localStorage.getItem(appParams.idFocus) === null ? "[Enter Focus]" : localStorage.getItem(appParams.idFocus);
}

function onFieldPressButton(event) {
  if (event.which == 13 || event.keyCode == 13) {
    event.target.blur();
  }
}

function saveName(event) {
  localStorage.setItem(appParams.idName, event.target.innerText);
}

function saveFocus(event) {
  localStorage.setItem(appParams.idFocus, event.target.innerText);
}

nameField.addEventListener("keypress", onFieldPressButton);
nameField.addEventListener("blur", saveName);

focusField.addEventListener("keypress", onFieldPressButton);
focusField.addEventListener("blur", saveFocus);

function showTimeContent() {
  timeField.innerHTML = getTime();
  if (isNewHour) {
    setBackgroundAndGreeting();
    isNewHour = false;
  }
  setTimeout(showTimeContent, 1000);
}

showTimeContent();
showName();
showFocus();
