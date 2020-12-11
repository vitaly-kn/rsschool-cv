const appParams = {
  idGreeting: "greeting",
  idName: "name",
  idFocus: "focus",
  idTime: "time",
  classMorning: "morning",
  classAfternoon: "afternoon",
  classEvening: "evening",
  classNight: "night",
  greetingMorning: "morning",
  greetingAfternoon: "afternoon",
  greetingEvening: "evening",
  classMainSelector: ".main",
};

const timeField = document.getElementById(appParams.idTime);
const greetingField = document.getElementById(appParams.idGreeting);
const nameField = document.getElementById(appParams.idName);
const focusField = document.getElementById(appParams.idFocus);
const main = document.querySelector(appParams.classMainSelector);

let savedHour = new Date().getHours();
let isNewHour = true;

function getBackgroundClass() {
  const currentHour = new Date(),
    hour = currentHour.getHours();
  if (hour < 6) {
    return appParams.classNight;
  } else if (hour < 12) {
    return appParams.classMorning;
  } else if (hour < 18) {
    return appParams.classAfternoon;
  } else {
    return appParams.classEvening;
  }
}

function getGreeting() {
  const currentHour = new Date(),
    hour = currentHour.getHours();
  if (hour < 12) {
    return appParams.greetingMorning;
  } else if (hour < 18) {
    return appParams.greetingAfternoon;
  } else {
    return appParams.greetingEvening;
  }
}

function setBackgroundAndGreeting() {
  main.classList.remove(appParams.classMorning, appParams.classAfternoon, appParams.classEvening, appParams.classNight);
  main.classList.add(getBackgroundClass());
  greetingField.textContent = getGreeting();
}

function formatToTwoDigits(number) {
  return number < 10 ? `0${number}` : number + "";
}

function getTime() {
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
