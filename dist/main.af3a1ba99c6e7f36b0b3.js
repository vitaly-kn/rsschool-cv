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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Cadencer\n/* harmony export */ });\nclass Cadencer {\r\n  constructor(callback) {\r\n    this.CADENCE = 3000;\r\n    this.isPaused = true;\r\n    this.callback = callback;\r\n  }\r\n  _tick() {\r\n    this.callback();\r\n  }\r\n  _run() {\r\n    if (this.isPaused) return;\r\n    this._tick();\r\n    setTimeout(this._run.bind(this), this.CADENCE);\r\n  }\r\n  start() {\r\n    if (this.isPaused) {\r\n      this.isPaused = false;\r\n      this._run();\r\n    }\r\n  }\r\n  stop() {\r\n    this.isPaused = true;\r\n  }\r\n  toggle() {\r\n    if (this.isPaused) {\r\n      this.start();\r\n      return true;\r\n    } else {\r\n      this.stop();\r\n      return false;\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./components/Cadencer.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./style.css\");\n/* harmony import */ var _components_Cadencer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Cadencer */ \"./components/Cadencer.js\");\n\r\n\r\n\r\nconst appParams = {\r\n  classApplicationSelector: \".application\",\r\n  classDropContainerSelector: \".drop-container\",\r\n  classDrop: \"drop\",\r\n  classDropPause: \"drop-pause\",\r\n  classBang: \"bang\",\r\n  classScreenSelector: \".screen\",\r\n  classKeySelector: \".key\",\r\n  classKeyActive: \"key-active\",\r\n  attrValue: \"data-value\",\r\n  attrValueEnter: \"enter\",\r\n  attrValueDelete: \"delete\",\r\n  attrValueClear: \"clear\",\r\n  attrKey: \"key\",\r\n  attrKeyNumpad: \"key-numpad\",\r\n  idFullscreen: \"fullscreen\",\r\n  idStop: \"stop\",\r\n  idPause: \"pause\",\r\n  eventResult: \"result\",\r\n  eventPause: \"pause\",\r\n  eventResume: \"resume\",\r\n};\r\n\r\nconst operators = [\r\n  { operation: \"+\", display: \"+\" },\r\n  { operation: \"-\", display: \"-\" },\r\n  { operation: \"*\", display: \"x\" },\r\n  { operation: \"/\", display: \"÷\" },\r\n];\r\nconst operatorsIndexes = {\r\n  add: 0,\r\n  sub: 1,\r\n  mul: 2,\r\n  div: 3,\r\n};\r\nconst FIRST_TRACK_OFFSET = 5;\r\nconst TRACK_STEP = 10;\r\nconst MAX_TRACKS = 9;\r\nconst MAX_OPERAND_VALUE = 99;\r\nconst MAX_DIGITS = 3;\r\nlet difficultyLevel = 6;\r\nlet isFullscreen = false;\r\nlet isKeypadLocked = false;\r\nlet cadencer = new _components_Cadencer__WEBPACK_IMPORTED_MODULE_1__.default(onCadence);\r\n\r\nconst applicationDiv = document.querySelector(appParams.classApplicationSelector);\r\nconst dropContainer = document.querySelector(appParams.classDropContainerSelector);\r\nconst screen = document.querySelector(appParams.classScreenSelector);\r\nconst keypadKeys = document.querySelectorAll(appParams.classKeySelector);\r\nconst fullscreenButton = document.getElementById(appParams.idFullscreen);\r\nconst stopButton = document.getElementById(appParams.idStop);\r\nconst pauseButton = document.getElementById(appParams.idPause);\r\n\r\ndropContainer.addEventListener(appParams.eventResult, onResultReceived);\r\ndropContainer.addEventListener(appParams.eventPause, onPauseGame);\r\ndropContainer.addEventListener(appParams.eventResume, onResumeGame);\r\n\r\nkeypadKeys.forEach((key) => key.addEventListener(\"click\", onKeyEntered));\r\n\r\nwindow.addEventListener(\"keydown\", onKeyDown);\r\nwindow.addEventListener(\"keyup\", onKeyUp);\r\n\r\npauseButton.addEventListener(\"click\", onPauseButtonClick);\r\nfullscreenButton.addEventListener(\"click\", toggleFullscreen);\r\ndocument.addEventListener(\"fullscreenchange\", toggleFullscreenButton);\r\n\r\nfunction toggleFullscreen(event) {\r\n  event.currentTarget.blur();\r\n  if (!isFullscreen) {\r\n    applicationDiv.requestFullscreen();\r\n  } else {\r\n    document.exitFullscreen();\r\n  }\r\n}\r\n\r\nfunction toggleFullscreenButton() {\r\n  if (!isFullscreen) {\r\n    isFullscreen = true;\r\n    fullscreenButton.textContent = \"Window\";\r\n  } else {\r\n    isFullscreen = false;\r\n    fullscreenButton.textContent = \"Fullscreen\";\r\n  }\r\n}\r\n\r\nfunction onKeyEntered(event) {\r\n  event.currentTarget.blur();\r\n  if (isKeypadLocked) return;\r\n  const input = event.currentTarget.getAttribute(appParams.attrValue);\r\n  if (input === appParams.attrValueEnter) {\r\n    let resultEvent = new CustomEvent(appParams.eventResult, { detail: { result: screen.textContent * 1 } });\r\n    screen.textContent = \"\";\r\n    dropContainer.dispatchEvent(resultEvent);\r\n  } else if (input === appParams.attrValueClear) {\r\n    screen.textContent = \"\";\r\n  } else if (input === appParams.attrValueDelete) {\r\n    screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);\r\n  } else if (screen.textContent.length < MAX_DIGITS) {\r\n    screen.textContent += input;\r\n  }\r\n}\r\n\r\nfunction getActiveKeypadKey(event) {\r\n  let key = document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKey}=\"${event.keyCode}\"]`);\r\n  return key ? key : document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKeyNumpad}=\"${event.keyCode}\"]`);\r\n}\r\n\r\nfunction onKeyDown(event) {\r\n  let key = getActiveKeypadKey(event);\r\n  if (key) {\r\n    key.classList.add(appParams.classKeyActive);\r\n    key.click();\r\n  }\r\n}\r\n\r\nfunction onKeyUp(event) {\r\n  let key = getActiveKeypadKey(event);\r\n  if (key) key.classList.remove(appParams.classKeyActive);\r\n}\r\n\r\nfunction onResultReceived(event) {\r\n  //console.log(`Result received : ${event.detail.result}`);\r\n  for (let drop of dropContainer.children) {\r\n    if (drop.result === event.detail.result) {\r\n      drop.bang();\r\n    }\r\n  }\r\n}\r\n\r\nfunction getRandomInt(min, max) {\r\n  min = Math.ceil(min);\r\n  max = Math.floor(max);\r\n  return Math.floor(Math.random() * (max - min + 1)) + min;\r\n}\r\n\r\nfunction getRandomDropOffset() {\r\n  let track = getRandomInt(0, MAX_TRACKS - 1);\r\n  return `${FIRST_TRACK_OFFSET + track * TRACK_STEP}%`;\r\n}\r\n\r\nfunction getRandomExpression(difficulty = 1) {\r\n  //1 is the higest difficulty, 2, 3 ... -- lower\r\n  let operator = getRandomInt(0, operators.length - 1);\r\n  let operand1 = getRandomInt(0, Math.round(MAX_OPERAND_VALUE / difficulty));\r\n  let operand2;\r\n  if (operator <= 1) {\r\n    operand2 = getRandomInt(0, Math.round(MAX_OPERAND_VALUE / 10));\r\n  } else {\r\n    operand2 = getRandomInt(1, 10);\r\n  }\r\n  let expression;\r\n  let result;\r\n  if (operator === operatorsIndexes.add || operator === operatorsIndexes.mul) {\r\n    expression = `${operand1} ${operators[operator].operation} ${operand2}`;\r\n    result = eval(expression);\r\n  } else {\r\n    if (operator === operatorsIndexes.sub) {\r\n      expression = `${operand1} ${operators[operatorsIndexes.add].operation} ${operand2}`;\r\n    } else expression = `${operand1} ${operators[operatorsIndexes.mul].operation} ${operand2}`;\r\n    result = eval(expression);\r\n    [operand1, result] = [result, operand1];\r\n  }\r\n  return {\r\n    operand1: operand1,\r\n    operation: operators[operator].display,\r\n    operand2: operand2,\r\n    result: result,\r\n  };\r\n}\r\n\r\nfunction createRandomDrop() {\r\n  const expr = getRandomExpression(difficultyLevel);\r\n  const drop = document.createElement(\"div\");\r\n  drop.style.left = getRandomDropOffset();\r\n  drop.classList.add(appParams.classDrop);\r\n  drop.insertAdjacentHTML(\r\n    \"afterbegin\",\r\n    `<div class=\"operator\">${expr.operation}</div>\r\n     <div class=operands>\r\n     <div>${expr.operand1}</div>\r\n     <div>${expr.operand2}</div>\r\n     </div>`\r\n  );\r\n\r\n  drop.addEventListener(\r\n    \"animationend\",\r\n    (event) => {\r\n      event.currentTarget.parentNode.removeChild(event.currentTarget);\r\n    },\r\n    { once: true }\r\n  );\r\n\r\n  drop.result = expr.result;\r\n\r\n  drop.bang = function () {\r\n    drop.classList.add(appParams.classBang);\r\n  };\r\n\r\n  return drop;\r\n}\r\n\r\nfunction onCadence() {\r\n  let drop = createRandomDrop();\r\n  dropContainer.appendChild(drop);\r\n  //let expr = getRandomExpression(difficultyLevel);\r\n  //console.log(`tick! operation : ${expr.operand1} ${expr.operation} ${expr.operand2} = ${expr.result}, offset : ${getDropOffset()}`);\r\n  console.log(`tick! drop.result = ${drop.result}`);\r\n}\r\n\r\nfunction onPauseButtonClick(event) {\r\n  event.currentTarget.blur();\r\n  let dropEvent;\r\n  if (cadencer.toggle()) {\r\n    event.currentTarget.textContent = \"Pause\";\r\n    isKeypadLocked = false;\r\n    dropEvent = new CustomEvent(appParams.eventResume);\r\n  } else {\r\n    event.currentTarget.textContent = \"Resume\";\r\n    isKeypadLocked = true;\r\n    dropEvent = new CustomEvent(appParams.eventPause);\r\n  }\r\n  dropContainer.dispatchEvent(dropEvent);\r\n}\r\n\r\nfunction onPauseGame(event) {\r\n  event.currentTarget.classList.add(appParams.classDropPause);\r\n}\r\n\r\nfunction onResumeGame(event) {\r\n  event.currentTarget.classList.remove(appParams.classDropPause);\r\n}\r\n\r\nstopButton.addEventListener(\"click\", () => {\r\n  for (let drop of dropContainer.children) {\r\n    drop.bang();\r\n  }\r\n});\r\n\r\n//entry point of the program\r\ncadencer.start();\r\n\n\n//# sourceURL=webpack:///./script.js?");

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