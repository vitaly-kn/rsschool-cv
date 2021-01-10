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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Cadencer\n/* harmony export */ });\nclass Cadencer {\r\n  constructor(callback) {\r\n    this.CADENCE = 1000;\r\n    this.isPaused = true;\r\n    this.callback = callback;\r\n  }\r\n  _tick() {\r\n    this.callback();\r\n  }\r\n  _run() {\r\n    if (this.isPaused) return;\r\n    this._tick();\r\n    setTimeout(this._run.bind(this), this.CADENCE);\r\n  }\r\n  start() {\r\n    if (this.isPaused) {\r\n      this.isPaused = false;\r\n      this._run();\r\n    }\r\n  }\r\n  stop() {\r\n    this.isPaused = true;\r\n  }\r\n  toggle() {\r\n    if (this.isPaused) {\r\n      this.start();\r\n      return true;\r\n    } else {\r\n      this.stop();\r\n      return false;\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./components/Cadencer.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./style.css\");\n/* harmony import */ var _components_Cadencer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Cadencer */ \"./components/Cadencer.js\");\n\r\n\r\n\r\nconst appParams = {\r\n  classApplicationSelector: \".application\",\r\n  classDropContainerSelector: \".drop-container\",\r\n  classDropPause: \"drop-pause\",\r\n  classScreenSelector: \".screen\",\r\n  classKeySelector: \".key\",\r\n  classKeyActive: \"key-active\",\r\n  attrValue: \"data-value\",\r\n  attrValueEnter: \"enter\",\r\n  attrValueDelete: \"delete\",\r\n  attrValueClear: \"clear\",\r\n  attrKey: \"key\",\r\n  attrKeyNumpad: \"key-numpad\",\r\n  idFullscreen: \"fullscreen\",\r\n  idStop: \"stop\",\r\n  idPause: \"pause\",\r\n  eventResult: \"result\",\r\n  eventPause: \"pause\",\r\n  eventResume: \"resume\",\r\n};\r\n\r\nconst MAX_DIGITS = 3;\r\nlet isFullscreen = false;\r\n\r\nconst applicationDiv = document.querySelector(appParams.classApplicationSelector);\r\nconst dropContainer = document.querySelector(appParams.classDropContainerSelector);\r\nconst screen = document.querySelector(appParams.classScreenSelector);\r\nconst keypadKeys = document.querySelectorAll(appParams.classKeySelector);\r\nconst fullscreenButton = document.getElementById(appParams.idFullscreen);\r\nconst stopButton = document.getElementById(appParams.idStop);\r\nconst pauseButton = document.getElementById(appParams.idPause);\r\n\r\ndropContainer.addEventListener(appParams.eventResult, onResultReceived);\r\ndropContainer.addEventListener(appParams.eventPause, onPauseGame);\r\ndropContainer.addEventListener(appParams.eventResume, onResumeGame);\r\n\r\nkeypadKeys.forEach((key) => key.addEventListener(\"click\", onKeyEntered));\r\n\r\nwindow.addEventListener(\"keydown\", onKeyDown);\r\nwindow.addEventListener(\"keyup\", onKeyUp);\r\n\r\nfullscreenButton.addEventListener(\"click\", toggleFullscreen);\r\ndocument.addEventListener(\"fullscreenchange\", toggleFullscreenButton);\r\n\r\nfunction toggleFullscreen(event) {\r\n  event.currentTarget.blur();\r\n  if (!isFullscreen) {\r\n    applicationDiv.requestFullscreen();\r\n  } else {\r\n    document.exitFullscreen();\r\n  }\r\n}\r\n\r\nfunction toggleFullscreenButton() {\r\n  if (!isFullscreen) {\r\n    isFullscreen = true;\r\n    fullscreenButton.textContent = \"Window\";\r\n  } else {\r\n    isFullscreen = false;\r\n    fullscreenButton.textContent = \"Fullscreen\";\r\n  }\r\n}\r\n\r\nfunction onKeyEntered(event) {\r\n  event.currentTarget.blur();\r\n  const input = event.currentTarget.getAttribute(appParams.attrValue);\r\n  if (input === appParams.attrValueEnter) {\r\n    let resultEvent = new CustomEvent(appParams.eventResult, { detail: { result: screen.textContent } });\r\n    screen.textContent = \"\";\r\n    dropContainer.dispatchEvent(resultEvent);\r\n  } else if (input === appParams.attrValueClear) {\r\n    screen.textContent = \"\";\r\n  } else if (input === appParams.attrValueDelete) {\r\n    screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);\r\n  } else if (screen.textContent.length < MAX_DIGITS) {\r\n    screen.textContent += input;\r\n  }\r\n}\r\n\r\nfunction getActiveKeypadKey(event) {\r\n  let key = document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKey}=\"${event.keyCode}\"]`);\r\n  return key ? key : document.querySelector(`${appParams.classKeySelector}[data-${appParams.attrKeyNumpad}=\"${event.keyCode}\"]`);\r\n}\r\n\r\nfunction onKeyDown(event) {\r\n  let key = getActiveKeypadKey(event);\r\n  if (key) {\r\n    key.classList.add(appParams.classKeyActive);\r\n    key.click();\r\n  }\r\n}\r\n\r\nfunction onKeyUp(event) {\r\n  let key = getActiveKeypadKey(event);\r\n  if (key) key.classList.remove(appParams.classKeyActive);\r\n}\r\n\r\nfunction onResultReceived(event) {\r\n  console.log(`Result received : ${event.detail.result}`);\r\n}\r\n\r\n//let bonusDrop = document.querySelector(\".bonus\");\r\n\r\nlet cadencer = new _components_Cadencer__WEBPACK_IMPORTED_MODULE_1__.default(onCadence);\r\ncadencer.start();\r\n\r\nfunction onCadence() {\r\n  console.log(\"tick!\");\r\n}\r\n\r\npauseButton.addEventListener(\"click\", onPauseButtonClick);\r\n\r\nfunction onPauseButtonClick(event) {\r\n  event.currentTarget.blur();\r\n  let dropEvent;\r\n  if (cadencer.toggle()) {\r\n    event.currentTarget.textContent = \"Pause\";\r\n    dropEvent = new CustomEvent(appParams.eventResume);\r\n  } else {\r\n    event.currentTarget.textContent = \"Resume\";\r\n    dropEvent = new CustomEvent(appParams.eventPause);\r\n  }\r\n  dropContainer.dispatchEvent(dropEvent);\r\n}\r\n\r\nfunction onPauseGame(event) {\r\n  event.currentTarget.classList.add(appParams.classDropPause);\r\n}\r\n\r\nfunction onResumeGame(event) {\r\n  event.currentTarget.classList.remove(appParams.classDropPause);\r\n}\r\n\r\nstopButton.addEventListener(\"click\", () => {\r\n  cadencer.start();\r\n});\r\n\n\n//# sourceURL=webpack:///./script.js?");

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