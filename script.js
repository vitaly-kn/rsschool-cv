const appParams = {
  classHighligthed: "highlighted",
  classShake: "shake",
  classUp: "up",
  classClicked: "clicked",
  classHoleSelector: ".hole",
  classMoleSelector: ".mole",
  idScore: "score",
  idHiScore: "hi-score",
  idLevel: "level",
  idTime: "time",
  idBonusTime: "bonus-time",
  idStart: "start",
  animationDelay: 500,
  timerStep: 100,
  playTime: 25000,
  baseMoleDelay: 2000,
};

const holes = document.querySelectorAll(appParams.classHoleSelector);
const scoreField = document.getElementById(appParams.idScore);
const hiScoreField = document.getElementById(appParams.idHiScore);
const levelField = document.getElementById(appParams.idLevel);
const timeField = document.getElementById(appParams.idTime);
const bonusTimeField = document.getElementById(appParams.idBonusTime);
const moles = document.querySelectorAll(appParams.classMoleSelector);
const startButton = document.getElementById(appParams.idStart);
let isGameInProgress = false;
let isRestarting = false;
let lastHole;
let timeLeft = 0;
let score = 0;
let moleDelay = appParams.baseMoleDelay;
let level = 0;
let hiScore = getHiScore();
hiScoreField.textContent = hiScore;
timeField.textContent = convertTimeToDisplay(timeLeft);

startButton.addEventListener("click", onStartClick);
moles.forEach((mole) => mole.addEventListener("click", hit));

function getRandomHole(holes) {
  let i, hole;
  do {
    i = Math.floor(Math.random() * holes.length);
    hole = holes[i];
  } while (hole === lastHole);
  lastHole = hole;
  return hole;
}

function showMole() {
  //if (isGameInProgress) {
  const hole = getRandomHole(holes);
  hole.classList.add(appParams.classUp);
  setTimeout(() => {
    hole.classList.remove(appParams.classUp);
    if (timeLeft) showMole();
  }, moleDelay);
  //}
}

function onStartClick() {
  if (!timeLeft) {
    startGame();
  } else if (!isRestarting) {
    console.log("restarting!!! " + moleDelay);
    isRestarting = true;
    setTimeout(startGame, moleDelay);
  }
}

function startGame() {
  //isGameInProgress = true;
  isRestarting = false;
  console.log("starting the game!!!");
  startButton.textContent = "Restart";
  animateButtonClick(startButton);
  resetScore();
  showMole();
  setTimeout(function run() {
    timeLeft -= appParams.timerStep;
    if (timeLeft <= 0) {
      timeLeft = 0;
      //isGameInProgress = false;
      startButton.textContent = "Start";
    } else {
      setTimeout(run, appParams.timerStep);
    }
    timeField.textContent = convertTimeToDisplay(timeLeft);
  }, appParams.timerStep);
}

function hit(event) {
  //console.log("hit!!!");
  const moleHole = event.currentTarget.parentNode;
  if (!moleHole.classList.contains(appParams.classShake)) {
    addBonusTime(appParams.animationDelay);
    hideMole(moleHole);
    updateScore();
  }
}

function hideMole(hole) {
  hole.classList.add(appParams.classShake);
  hole.classList.remove(appParams.classUp);
  setTimeout(() => {
    hole.classList.remove(appParams.classShake);
  }, appParams.animationDelay);
}

function updateScore() {
  score++;
  updateLevel();
  scoreField.textContent = score;
  if (hiScore < score) {
    hiScore = score;
    hiScoreField.textContent = hiScore;
    saveHiScore(hiScore);
  }
}

function resetScore() {
  score = 0;
  scoreField.textContent = score;
  moleDelay = appParams.baseMoleDelay;
  level = 0;
  levelField.textContent = level;
  timeLeft = appParams.playTime;
}

function updateLevel() {
  let currentLevel = Math.floor(score / 5);
  if (currentLevel > level) {
    level = currentLevel;
    updateField(levelField, level);
    addBonusTime(appParams.animationDelay * 2);
    moleDelay = appParams.baseMoleDelay - level * (appParams.animationDelay / 2);
  }
}

function updateField(field, data) {
  field.classList.add(appParams.classHighligthed);
  field.textContent = data;
  setTimeout(() => {
    field.classList.remove(appParams.classHighligthed);
  }, appParams.animationDelay);
}

function getHiScore() {
  return localStorage.getItem(appParams.idHiScore) === null ? 0 : localStorage.getItem(appParams.idHiScore);
}

function saveHiScore(hiScore) {
  localStorage.setItem(appParams.idHiScore, hiScore);
}

function formatToTwoDigits(number) {
  return number < 10 ? `0${number}` : number + "";
}

function convertTimeToDisplay(timeMs) {
  let time = timeMs / 1000;
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min}:${formatToTwoDigits(sec)}`;
}

function addBonusTime(timeMs) {
  timeLeft += timeMs;
  let time = `+${(timeMs / 1000).toFixed(1)}s!`;
  bonusTimeField.textContent = time;
  setTimeout(() => {
    bonusTimeField.textContent = "";
  }, appParams.animationDelay / 2);
}

function animateButtonClick(button) {
  button.classList.add(appParams.classClicked);
  setTimeout(() => {
    button.classList.remove(appParams.classClicked);
  }, appParams.animationDelay / 3);
}
