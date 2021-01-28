/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./style.css?");

/***/ }),

/***/ "./components/Cadencer.js":
/*!********************************!*\
  !*** ./components/Cadencer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Cadencer\n/* harmony export */ });\nclass Cadencer {\r\n  constructor(callback, cadence = 3000) {\r\n    this.cadence = cadence;\r\n    this.isPaused = true;\r\n    this.callback = callback;\r\n    this.timerID;\r\n  }\r\n  _run() {\r\n    if (this.isPaused) return;\r\n    this.callback();\r\n    this.timerID = setTimeout(this._run.bind(this), this.cadence);\r\n  }\r\n  start() {\r\n    if (this.isPaused) {\r\n      this.isPaused = false;\r\n      this._run();\r\n    }\r\n  }\r\n  stop() {\r\n    this.isPaused = true;\r\n    clearTimeout(this.timerID);\r\n  }\r\n  toggle() {\r\n    if (this.isPaused) {\r\n      this.start();\r\n      return true;\r\n    } else {\r\n      this.stop();\r\n      return false;\r\n    }\r\n  }\r\n  setCadence(cadence) {\r\n    this.cadence = cadence;\r\n  }\r\n  getCadence() {\r\n    return this.cadence;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./components/Cadencer.js?");

/***/ }),

/***/ "./components/randoms.js":
/*!*******************************!*\
  !*** ./components/randoms.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getRandomInt\": () => /* binding */ getRandomInt,\n/* harmony export */   \"getRandomDropOffset\": () => /* binding */ getRandomDropOffset,\n/* harmony export */   \"getRandomExpression\": () => /* binding */ getRandomExpression\n/* harmony export */ });\nconst operators = [\r\n  { name: \"add\", operation: \"+\", display: \"+\" },\r\n  { name: \"sub\", operation: \"-\", display: \"-\" },\r\n  { name: \"mul\", operation: \"*\", display: \"x\" },\r\n  { name: \"div\", operation: \"/\", display: \"÷\" },\r\n];\r\n\r\nconst FIRST_TRACK_OFFSET = 5;\r\nconst TRACK_STEP = 10;\r\nconst MAX_TRACKS = 9;\r\nconst MAX_OPERAND_VALUE = 99;\r\n\r\nfunction getRandomInt(min, max) {\r\n  min = Math.ceil(min);\r\n  max = Math.floor(max);\r\n  return Math.floor(Math.random() * (max - min + 1)) + min;\r\n}\r\n\r\nfunction getRandomDropOffset() {\r\n  let track = getRandomInt(0, MAX_TRACKS - 1);\r\n  return `${FIRST_TRACK_OFFSET + track * TRACK_STEP}%`;\r\n}\r\n\r\nfunction getRandomExpression(difficulty = 1, maxOperand = MAX_OPERAND_VALUE, operationsMask = { add: true, sub: true, mul: true, div: true }) {\r\n  //1 is the higest difficulty, 2, 3 ... -- lower\r\n  let operator;\r\n  do {\r\n    operator = getRandomInt(0, operators.length - 1);\r\n  } while (!operationsMask[operators[operator].name]);\r\n  if (difficulty > maxOperand) difficulty = 1;\r\n  let [operand1, operand2] = getOperands(operator, difficulty, maxOperand);\r\n  let expression = `${operand1} ${operators[operator].operation} ${operand2}`;\r\n  let result = eval(expression);\r\n  return {\r\n    operand1,\r\n    operation: operators[operator].display,\r\n    operand2,\r\n    result,\r\n  };\r\n}\r\n\r\nfunction getOperands(operator, difficulty, maxOperand) {\r\n  let operand1 = getRandomInt(0, Math.round(maxOperand / difficulty));\r\n  let operand2;\r\n  if (operators[operator].operation === \"+\" || operators[operator].operation === \"*\") {\r\n    operand2 = getRandomInt(0, Math.round(maxOperand / difficulty));\r\n  } else if (operators[operator].operation === \"-\") {\r\n    operand2 = getRandomInt(0, Math.round(maxOperand / difficulty));\r\n    if (operand1 < operand2) [operand1, operand2] = [operand2, operand1];\r\n  } else if (operand1) {\r\n    let divisors = getDivisors(operand1);\r\n    operand2 = divisors[getRandomInt(0, divisors.length - 1)];\r\n  } else operand2 = getRandomInt(1, Math.round(maxOperand / difficulty));\r\n  return [operand1, operand2];\r\n}\r\n\r\nfunction getDivisors(int) {\r\n  let divisors = [];\r\n  for (let i = 1; i <= Math.floor(Math.sqrt(int)); i++) {\r\n    if (!(int % i)) {\r\n      divisors.push(i);\r\n      divisors.push(Math.trunc(int / i));\r\n    }\r\n  }\r\n  return divisors;\r\n}\r\n\n\n//# sourceURL=webpack:///./components/randoms.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./style.css\");\n/* harmony import */ var _components_Cadencer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Cadencer */ \"./components/Cadencer.js\");\n/* harmony import */ var _components_randoms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/randoms */ \"./components/randoms.js\");\n\r\n\r\n\r\n\r\nconst appParams = {\r\n  classApplicationSelector: \".application\",\r\n  classDropContainerSelector: \".drop-container\",\r\n  classListSeaLevels: [\"sea-level1\", \"sea-level2\", \"flood\"],\r\n  classRestart: \"restart\",\r\n  classDrop: \"drop\",\r\n  classBonus: \"bonus\",\r\n  classDropPause: \"drop-pause\",\r\n  animationDropFall: \"drop-fall\",\r\n  classBang: \"bang\",\r\n  classScoreSelector: \".score-amount\",\r\n  classTriesSelector: \".tries-amount\",\r\n  classScreenSelector: \".screen\",\r\n  classKeypadSelector: \".keypad\",\r\n  classMistake: \"mistake\",\r\n  classKeySelector: \".key\",\r\n  classKeyActive: \"key-active\",\r\n  classModalSelector: \".modal-container\",\r\n  classShowModal: \"show-modal\",\r\n  classShowSettings: \"show-settings\",\r\n  classShowGameOver: \"show-game-over\",\r\n  classShowHowto: \"show-howto\",\r\n  settingsOperationsCheckboxSelector: '.operations input[type=\"checkbox\"]',\r\n  classMaxOperandSelector: \".max-operand\",\r\n  idTotalDrops: \"total-drops\",\r\n  idResolvedDrops: \"resolved-drops\",\r\n  idResolutionRate: \"resolution-rate\",\r\n  idMistakes: \"mistakes\",\r\n  idAccuracy: \"accuracy\",\r\n  idCloseGameOver: \"close-gameover\",\r\n  idCloseSettings: \"close-settings\",\r\n  attrValue: \"data-value\",\r\n  attrValueEnter: \"enter\",\r\n  attrValueDelete: \"delete\",\r\n  attrValueClear: \"clear\",\r\n  attrKey: \"key\",\r\n  attrKeyNumpad: \"key-numpad\",\r\n  idFullscreen: \"fullscreen\",\r\n  idStart: \"start\",\r\n  idPause: \"pause\",\r\n  idEnd: \"end\",\r\n  idSettings: \"settings\",\r\n  idSound: \"sound\",\r\n  idHowTo: \"howto\",\r\n  eventResult: \"result\",\r\n  eventPause: \"pause\",\r\n  eventResume: \"resume\",\r\n  eventRiseSeaLevel: \"risesealevel\",\r\n};\r\n\r\nconst MAX_DIGITS = 3;\r\nconst BONUS_FREQUENCY = 5;\r\nconst NEXT_LEVEL_SCORE_STEP = 200;\r\nconst NEXT_LEVEL_CADENCE_STEP = 250;\r\nconst BASIC_CADENCE = 3000;\r\nconst BASIC_DIFFICULTY_LEVEL = 8;\r\nconst MAX_DIFFICULTY_LEVEL = 1;\r\nconst MIN_CADENCE = 500;\r\nconst SCORE_STEP = 10;\r\nconst AI_CADENCE = 4500;\r\nconst AI_INPUT_DELAY = 400;\r\n\r\nlet isFullscreen = false;\r\nlet isGamePaused = false;\r\nlet wasGamePaused = isGamePaused;\r\nlet isGameInProgress = false;\r\nlet chainBonus = 0;\r\nlet isBonusOnScreen = false;\r\nlet bonusResult;\r\nlet seaLevel = -1;\r\nlet maxOperand = 99;\r\nlet isKeyBoardLocked = true;\r\nlet isAIMode = false;\r\nlet cadencer = new _components_Cadencer__WEBPACK_IMPORTED_MODULE_1__.default(onCadence, BASIC_CADENCE);\r\nlet aiCadencer;\r\n\r\nconst applicationDiv = document.querySelector(appParams.classApplicationSelector);\r\nconst dropContainer = document.querySelector(appParams.classDropContainerSelector);\r\nconst score = document.querySelector(appParams.classScoreSelector);\r\nconst tries = document.querySelector(appParams.classTriesSelector);\r\nconst screen = document.querySelector(appParams.classScreenSelector);\r\nconst keypad = document.querySelector(appParams.classKeypadSelector);\r\nconst keypadKeys = document.querySelectorAll(appParams.classKeySelector);\r\nconst fullscreenButton = document.getElementById(appParams.idFullscreen);\r\nconst startButton = document.getElementById(appParams.idStart);\r\nconst pauseButton = document.getElementById(appParams.idPause);\r\nconst endButton = document.getElementById(appParams.idEnd);\r\nconst settingsButton = document.getElementById(appParams.idSettings);\r\nconst soundButton = document.getElementById(appParams.idSound);\r\nconst howToButton = document.getElementById(appParams.idHowTo);\r\nconst modalContainer = document.querySelector(appParams.classModalSelector);\r\nconst totalDrops = document.getElementById(appParams.idTotalDrops);\r\nconst resolvedDrops = document.getElementById(appParams.idResolvedDrops);\r\nconst resolutionRate = document.getElementById(appParams.idResolutionRate);\r\nconst mistakes = document.getElementById(appParams.idMistakes);\r\nconst accuracy = document.getElementById(appParams.idAccuracy);\r\nconst closeGameOver = document.getElementById(appParams.idCloseGameOver);\r\nconst operationsCheckboxes = document.querySelectorAll(appParams.settingsOperationsCheckboxSelector);\r\nconst maxOperandInput = document.querySelector(appParams.classMaxOperandSelector);\r\nconst closeSettings = document.getElementById(appParams.idCloseSettings);\r\n\r\nscore.textContent = 0;\r\n\r\ndropContainer.addEventListener(appParams.eventResult, onResultReceived);\r\ndropContainer.addEventListener(appParams.eventPause, onPauseGame);\r\ndropContainer.addEventListener(appParams.eventResume, onResumeGame);\r\ndropContainer.addEventListener(appParams.eventRiseSeaLevel, onRiseSeaLevel);\r\ndropContainer.addEventListener(\"animationend\", restartGame);\r\ndropContainer.addEventListener(\"transitionend\", onRiseSeaLevelEnd);\r\n\r\nkeypad.addEventListener(\"animationend\", onMistakeAnimationEnd);\r\n\r\nkeypadKeys.forEach((key) => key.addEventListener(\"click\", onKeyEntered));\r\n\r\nwindow.addEventListener(\"keydown\", onKeyDown);\r\nwindow.addEventListener(\"keyup\", onKeyUp);\r\n\r\nstartButton.addEventListener(\"click\", onStartButtonClick);\r\npauseButton.addEventListener(\"click\", onPauseButtonClick);\r\nendButton.addEventListener(\"click\", endGame);\r\nfullscreenButton.addEventListener(\"click\", toggleFullscreen);\r\nsettingsButton.addEventListener(\"click\", onSettingsClick);\r\nsoundButton.addEventListener(\"click\", onSoundClick);\r\nhowToButton.addEventListener(\"click\", onHowToClick);\r\ndocument.addEventListener(\"fullscreenchange\", toggleFullscreenButton);\r\ncloseGameOver.addEventListener(\"click\", onGameOverClose);\r\noperationsCheckboxes.forEach((checkbox) => checkbox.addEventListener(\"change\", onOperationCheckboxChange));\r\nmaxOperandInput.addEventListener(\"change\", onMaxOperandChange);\r\ncloseSettings.addEventListener(\"click\", onSettingsClose);\r\n\r\nlet operationsMask = { add: true, sub: true, mul: true, div: true };\r\n\r\n//Sounds\r\nlet isSoundEnabled = true;\r\n\r\nHTMLAudioElement.prototype.playGameSfx = function () {\r\n  if (isSoundEnabled) return this.play();\r\n};\r\n\r\nconst appSounds = {\r\n  idKey: \"sound-key\",\r\n  idBonus: \"sound-bonus\",\r\n  idDropStart: \"sound-drop-start\",\r\n  idDropFall: \"sound-drop-fall\",\r\n  idDropBang: \"sound-drop-bang\",\r\n  idGameOver: \"sound-game-over\",\r\n  idMistake: \"sound-mistake\",\r\n  idSeaRise: \"sound-sea-rise\",\r\n  idSoundTheme: \"sound-theme\",\r\n};\r\n\r\nconst soundKey = document.getElementById(appSounds.idKey);\r\nconst soundBonus = document.getElementById(appSounds.idBonus);\r\nconst soundDropStart = document.getElementById(appSounds.idDropStart);\r\nconst soundDropFall = document.getElementById(appSounds.idDropFall);\r\nconst soundDropBang = document.getElementById(appSounds.idDropBang);\r\nconst soundGameOver = document.getElementById(appSounds.idGameOver);\r\nconst soundMistake = document.getElementById(appSounds.idMistake);\r\nconst soundSeaRise = document.getElementById(appSounds.idSeaRise);\r\nconst soundTheme = document.getElementById(appSounds.idSoundTheme);\r\n\r\nlet level = {\r\n  upgrade() {\r\n    let estimatedDifficultyLevel = BASIC_DIFFICULTY_LEVEL - Math.trunc(+score.textContent / NEXT_LEVEL_SCORE_STEP);\r\n    this.difficulty = Math.max(estimatedDifficultyLevel, MAX_DIFFICULTY_LEVEL);\r\n    let estimatedCadence = BASIC_CADENCE - Math.trunc(+score.textContent / NEXT_LEVEL_SCORE_STEP) * NEXT_LEVEL_CADENCE_STEP;\r\n    cadencer.setCadence(Math.max(estimatedCadence, MIN_CADENCE));\r\n  },\r\n  reset() {\r\n    this.difficulty = BASIC_DIFFICULTY_LEVEL;\r\n    cadencer.setCadence(BASIC_CADENCE);\r\n  },\r\n};\r\n\r\nlet statistics = {\r\n  accuracy() {\r\n    let accuracy;\r\n    if (this.resolvedDrops) {\r\n      accuracy = `${Math.round((this.resolvedDrops / (this.resolvedDrops + this.mistakes)) * 100)}%`;\r\n    } else {\r\n      accuracy = \"0%\";\r\n    }\r\n    return accuracy;\r\n  },\r\n  resolutionRate() {\r\n    let resolutionRate = `${Math.round((this.resolvedDrops / this.totalDrops) * 100)}%`;\r\n    return resolutionRate;\r\n  },\r\n  reset() {\r\n    this.mistakes = 0;\r\n    this.totalDrops = 0;\r\n    this.resolvedDrops = 0;\r\n  },\r\n};\r\n\r\nfunction toggleFullscreen(event) {\r\n  event.currentTarget.blur();\r\n  if (!isFullscreen) {\r\n    applicationDiv.requestFullscreen();\r\n  } else {\r\n    document.exitFullscreen();\r\n  }\r\n}\r\n\r\nfunction toggleFullscreenButton() {\r\n  if (!isFullscreen) {\r\n    isFullscreen = true;\r\n    fullscreenButton.textContent = \"Window\";\r\n  } else {\r\n    isFullscreen = false;\r\n    fullscreenButton.textContent = \"Fullscreen\";\r\n  }\r\n}\r\n\r\nfunction onKeyEntered(event) {\r\n  event.currentTarget.blur();\r\n  soundKey.playGameSfx();\r\n  if ((!isGameInProgress || isGamePaused) && !isAIMode) return;\r\n  const input = event.currentTarget.getAttribute(appParams.attrValue);\r\n  if (input === appParams.attrValueEnter) {\r\n    let resultEvent = new CustomEvent(appParams.eventResult, { detail: { result: +screen.textContent } });\r\n    screen.textContent = \"\";\r\n    dropContainer.dispatchEvent(resultEvent);\r\n  } else if (input === appParams.attrValueClear) {\r\n    screen.textContent = \"\";\r\n  } else if (input === appParams.attrValueDelete) {\r\n    screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);\r\n  } else if (screen.textContent.length < MAX_DIGITS) {\r\n    screen.textContent += input;\r\n  }\r\n}\r\n\r\nfunction getActiveKeypadButton(event) {\r\n  let button = document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKey}=\"${event.keyCode}\"]`);\r\n  return button ? button : document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKeyNumpad}=\"${event.keyCode}\"]`);\r\n}\r\n\r\nfunction onKeyDown(event) {\r\n  if (isKeyBoardLocked) return;\r\n  let button = getActiveKeypadButton(event);\r\n  if (button) {\r\n    button.classList.add(appParams.classKeyActive);\r\n    button.click();\r\n  }\r\n}\r\n\r\nfunction onKeyUp(event) {\r\n  if (isKeyBoardLocked) return;\r\n  let button = getActiveKeypadButton(event);\r\n  if (button) button.classList.remove(appParams.classKeyActive);\r\n}\r\n\r\nfunction onResultReceived(event) {\r\n  let isCorrectAnswer = false;\r\n  for (let drop of dropContainer.children) {\r\n    if (event.detail.result === bonusResult || drop.result === event.detail.result) {\r\n      soundBonus.playGameSfx();\r\n      isCorrectAnswer = true;\r\n      score.textContent = +score.textContent + SCORE_STEP + chainBonus;\r\n      chainBonus++;\r\n      statistics.resolvedDrops++;\r\n      drop.bang();\r\n    }\r\n  }\r\n  level.upgrade();\r\n  if (event.detail.result === bonusResult) {\r\n    resetBonus();\r\n  }\r\n  if (!isCorrectAnswer) {\r\n    chainBonus = 0;\r\n    statistics.mistakes++;\r\n    keypad.classList.add(appParams.classMistake);\r\n    soundMistake.playGameSfx();\r\n  }\r\n}\r\n\r\nfunction onMistakeAnimationEnd() {\r\n  keypad.classList.remove(appParams.classMistake);\r\n}\r\n\r\nfunction createRandomDrop() {\r\n  const expr = (0,_components_randoms__WEBPACK_IMPORTED_MODULE_2__.getRandomExpression)(level.difficulty, maxOperand, operationsMask);\r\n  const drop = document.createElement(\"div\");\r\n  drop.style.left = (0,_components_randoms__WEBPACK_IMPORTED_MODULE_2__.getRandomDropOffset)();\r\n  drop.classList.add(appParams.classDrop);\r\n  drop.insertAdjacentHTML(\r\n    \"afterbegin\",\r\n    `<div class=\"operator\">${expr.operation}</div>\r\n     <div class=operands>\r\n     <div>${expr.operand1}</div>\r\n     <div>${expr.operand2}</div>\r\n     </div>`\r\n  );\r\n  drop.addEventListener(\r\n    \"animationend\",\r\n    (event) => {\r\n      event.stopPropagation();\r\n      if (event.animationName === appParams.animationDropFall) {\r\n        soundDropFall.playGameSfx();\r\n        seaLevel++;\r\n        tries.textContent--;\r\n        dropContainer.dispatchEvent(new CustomEvent(appParams.eventRiseSeaLevel));\r\n      }\r\n      event.currentTarget.parentNode?.removeChild(event.currentTarget);\r\n    },\r\n    { once: true }\r\n  );\r\n  drop.result = expr.result;\r\n  drop.bang = function () {\r\n    drop.classList.add(appParams.classBang);\r\n    soundDropBang.playGameSfx();\r\n  };\r\n  return drop;\r\n}\r\n\r\nfunction destroyAllDrops() {\r\n  dropContainer.innerHTML = \"\";\r\n}\r\n\r\nfunction onCadence() {\r\n  let drop = createRandomDrop();\r\n  if (!isBonusOnScreen && (0,_components_randoms__WEBPACK_IMPORTED_MODULE_2__.getRandomInt)(0, BONUS_FREQUENCY) === BONUS_FREQUENCY) {\r\n    drop.classList.add(appParams.classBonus);\r\n    bonusResult = drop.result;\r\n    isBonusOnScreen = true;\r\n  }\r\n  dropContainer.appendChild(drop);\r\n  statistics.totalDrops++;\r\n  soundDropStart.playGameSfx();\r\n}\r\n\r\nfunction onPauseButtonClick(event) {\r\n  event.currentTarget.blur();\r\n  if (!isGameInProgress) return;\r\n  if (cadencer.toggle()) {\r\n    event.currentTarget.textContent = \"Pause\";\r\n    resumeGameInterface();\r\n  } else {\r\n    event.currentTarget.textContent = \"Resume\";\r\n    pauseGameInterface();\r\n  }\r\n}\r\n\r\nfunction onPauseGame(event) {\r\n  event.currentTarget.classList.add(appParams.classDropPause);\r\n}\r\n\r\nfunction onResumeGame(event) {\r\n  event.currentTarget.classList.remove(appParams.classDropPause);\r\n}\r\n\r\nfunction onRiseSeaLevel(event) {\r\n  event.currentTarget.classList.add(appParams.classListSeaLevels[seaLevel]);\r\n  soundSeaRise.playGameSfx();\r\n  resetBonus();\r\n  destroyAllDrops();\r\n}\r\n\r\nfunction onRiseSeaLevelEnd() {\r\n  if (seaLevel === appParams.classListSeaLevels.length - 1) {\r\n    cadencer.stop();\r\n    soundGameOver.playGameSfx();\r\n    isKeyBoardLocked = true;\r\n    showStatistics();\r\n  }\r\n}\r\n\r\nfunction onStartButtonClick(event) {\r\n  event.currentTarget.blur();\r\n  if (!isGameInProgress) {\r\n    startGame();\r\n  } else {\r\n    cadencer.stop();\r\n    isKeyBoardLocked = true;\r\n    destroyAllDrops();\r\n    appParams.classListSeaLevels.forEach((seaLevel) => dropContainer.classList.remove(seaLevel));\r\n    dropContainer.classList.add(appParams.classRestart);\r\n  }\r\n}\r\n\r\nfunction resumeGameInterface() {\r\n  isGamePaused = false;\r\n  isKeyBoardLocked = false;\r\n  dropContainer.dispatchEvent(new CustomEvent(appParams.eventResume));\r\n}\r\n\r\nfunction pauseGameInterface() {\r\n  isGamePaused = true;\r\n  isKeyBoardLocked = true;\r\n  dropContainer.dispatchEvent(new CustomEvent(appParams.eventPause));\r\n}\r\n\r\nfunction startGame() {\r\n  isGameInProgress = true;\r\n  isKeyBoardLocked = false;\r\n  level.reset();\r\n  statistics.reset();\r\n  startButton.textContent = \"Restart\";\r\n  soundTheme.playGameSfx();\r\n  cadencer.start();\r\n}\r\n\r\nfunction resetBonus() {\r\n  bonusResult = undefined;\r\n  isBonusOnScreen = false;\r\n  chainBonus = 0;\r\n}\r\n\r\nfunction resetGame() {\r\n  destroyAllDrops();\r\n  soundTheme.pause();\r\n  score.textContent = 0;\r\n  screen.textContent = \"\";\r\n  isGameInProgress = false;\r\n  seaLevel = -1;\r\n  tries.textContent = appParams.classListSeaLevels.length;\r\n  dropContainer.classList.remove(appParams.classRestart);\r\n  resetBonus();\r\n  startButton.textContent = \"Start\";\r\n  pauseButton.textContent = \"Pause\";\r\n  resumeGameInterface();\r\n  isKeyBoardLocked = true;\r\n  cadencer.stop();\r\n}\r\n\r\nfunction restartGame() {\r\n  resetGame();\r\n  startGame();\r\n}\r\n\r\nfunction endGame() {\r\n  if (isGameInProgress) {\r\n    seaLevel = appParams.classListSeaLevels.length - 1;\r\n    dropContainer.dispatchEvent(new CustomEvent(appParams.eventRiseSeaLevel));\r\n  }\r\n}\r\n\r\nfunction showStatistics() {\r\n  modalContainer.classList.add(appParams.classShowModal);\r\n  modalContainer.classList.add(appParams.classShowGameOver);\r\n  totalDrops.textContent = statistics.totalDrops;\r\n  resolvedDrops.textContent = statistics.resolvedDrops;\r\n  resolutionRate.textContent = statistics.resolutionRate();\r\n  mistakes.textContent = statistics.mistakes;\r\n  accuracy.textContent = statistics.accuracy();\r\n}\r\n\r\nfunction onGameOverClose() {\r\n  modalContainer.classList.remove(appParams.classShowModal);\r\n  modalContainer.classList.remove(appParams.classShowGameOver);\r\n  appParams.classListSeaLevels.forEach((seaLevel) => dropContainer.classList.remove(seaLevel));\r\n  resetGame();\r\n}\r\n\r\nfunction onOperationCheckboxChange() {\r\n  let lastChecked;\r\n  let checkedCount = 0;\r\n  operationsCheckboxes.forEach((checkbox) => {\r\n    if (checkbox.checked) {\r\n      checkbox.disabled = false;\r\n      operationsMask[checkbox.value] = true;\r\n      lastChecked = checkbox;\r\n      checkedCount++;\r\n    } else {\r\n      operationsMask[checkbox.value] = false;\r\n    }\r\n  });\r\n  if (checkedCount === 1) lastChecked.disabled = true;\r\n}\r\n\r\nfunction onMaxOperandChange(event) {\r\n  let value = Math.floor(event.currentTarget.value);\r\n  if (value > 99) {\r\n    value = 99;\r\n  } else if (value < 1) {\r\n    value = 1;\r\n  }\r\n  event.currentTarget.value = value;\r\n  maxOperand = value;\r\n}\r\n\r\nfunction onSettingsClick(event) {\r\n  event.currentTarget.blur();\r\n  wasGamePaused = isGamePaused;\r\n  if (isGameInProgress) {\r\n    cadencer.stop();\r\n    pauseGameInterface();\r\n  } else {\r\n    isKeyBoardLocked = true;\r\n  }\r\n  modalContainer.classList.add(appParams.classShowModal);\r\n  modalContainer.classList.add(appParams.classShowSettings);\r\n}\r\n\r\nfunction onSettingsClose() {\r\n  modalContainer.classList.remove(appParams.classShowModal);\r\n  modalContainer.classList.remove(appParams.classShowSettings);\r\n  if (!wasGamePaused && isGameInProgress) {\r\n    resumeGameInterface();\r\n    cadencer.start();\r\n  } else {\r\n    isKeyBoardLocked = false;\r\n  }\r\n}\r\n\r\nfunction onSoundClick(event) {\r\n  event.currentTarget.blur();\r\n  isSoundEnabled = !isSoundEnabled;\r\n  if (isSoundEnabled) {\r\n    event.currentTarget.textContent = \"Sound : On\";\r\n    if (isGameInProgress) soundTheme.play();\r\n  } else {\r\n    event.currentTarget.textContent = \"Sound : Off\";\r\n    soundTheme.pause();\r\n  }\r\n}\r\n\r\nfunction onHowToClick() {\r\n  if (isGameInProgress) return;\r\n  isAIMode = true;\r\n  aiCadencer = new _components_Cadencer__WEBPACK_IMPORTED_MODULE_1__.default(onAICadence, AI_CADENCE);\r\n  modalContainer.classList.add(appParams.classShowModal);\r\n  modalContainer.classList.add(appParams.classShowHowto);\r\n  level.reset();\r\n  statistics.reset();\r\n  aiCadencer.start();\r\n  cadencer.start();\r\n  modalContainer.addEventListener(\"click\", onAIQuit, { once: true });\r\n}\r\n\r\nfunction onAIQuit(event) {\r\n  aiCadencer.stop();\r\n  aiCadencer = null;\r\n  cadencer.stop();\r\n  isAIMode = false;\r\n  destroyAllDrops();\r\n  event.currentTarget.classList.remove(appParams.classShowModal);\r\n  event.currentTarget.classList.remove(appParams.classShowHowto);\r\n  appParams.classListSeaLevels.forEach((seaLevel) => dropContainer.classList.remove(seaLevel));\r\n  if (event.currentTarget.classList.contains(appParams.classShowGameOver)) {\r\n    event.currentTarget.classList.remove(appParams.classShowGameOver);\r\n    resetGame();\r\n  } else {\r\n    dropContainer.classList.add(appParams.classRestart);\r\n  }\r\n}\r\n\r\nfunction onAICadence() {\r\n  if (dropContainer.children.length) {\r\n    let dropToResolve = dropContainer.children[(0,_components_randoms__WEBPACK_IMPORTED_MODULE_2__.getRandomInt)(0, dropContainer.children.length - 1)];\r\n    enterResult(dropToResolve.result);\r\n  }\r\n}\r\n\r\nfunction enterResult(result) {\r\n  let resultArray = (result + \"\").split(\"\");\r\n  resultArray.push(\"enter\");\r\n  let i = 0;\r\n  (function sendKeys() {\r\n    if (i) {\r\n      let prevKey = document.querySelector(`${appParams.classKeySelector}[${appParams.attrValue}=\"${resultArray[i - 1]}\"]`);\r\n      prevKey.classList.remove(appParams.classKeyActive);\r\n    }\r\n    if (i < resultArray.length) {\r\n      let button = document.querySelector(`${appParams.classKeySelector}[${appParams.attrValue}=\"${resultArray[i]}\"]`);\r\n      button.classList.add(appParams.classKeyActive);\r\n      i++;\r\n      button.click();\r\n      setTimeout(sendKeys, AI_INPUT_DELAY);\r\n    }\r\n  })();\r\n}\r\n\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;