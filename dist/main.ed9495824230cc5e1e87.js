/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/js/Cadencer.js":
/*!***********************************!*\
  !*** ./components/js/Cadencer.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Cadencer; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cadencer = /*#__PURE__*/function () {
  function Cadencer(callback) {
    var cadence = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

    _classCallCheck(this, Cadencer);

    this.cadence = cadence;
    this.isPaused = true;
    this.callback = callback;
    this.timerID;
  }

  _createClass(Cadencer, [{
    key: "_run",
    value: function _run() {
      if (this.isPaused) return;
      this.callback();
      this.timerID = setTimeout(this._run.bind(this), this.cadence);
    }
  }, {
    key: "start",
    value: function start() {
      if (this.isPaused) {
        this.isPaused = false;

        this._run();
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.isPaused = true;
      clearTimeout(this.timerID);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isPaused) {
        this.start();
        return true;
      } else {
        this.stop();
        return false;
      }
    }
  }, {
    key: "setCadence",
    value: function setCadence(cadence) {
      this.cadence = cadence;
    }
  }, {
    key: "getCadence",
    value: function getCadence() {
      return this.cadence;
    }
  }]);

  return Cadencer;
}();



/***/ }),

/***/ "./components/js/geodata_osm.js":
/*!**************************************!*\
  !*** ./components/js/geodata_osm.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "searchLocation": function() { return /* binding */ searchLocation; },
/* harmony export */   "getLocation": function() { return /* binding */ getLocation; }
/* harmony export */ });
function searchLocation(location) {
  var api = "https://nominatim.openstreetmap.org/search?q=".concat(encodeURI(location), "&format=json&limit=1");
  return fetch(api).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.length) {
      return [+data[0].lon, +data[0].lat];
    } else {
      return false;
    }
  }).catch(function () {
    return false;
  });
}
function getLocation(coords, language) {
  var api = "https://nominatim.openstreetmap.org/reverse?lat=".concat(coords[1], "&lon=").concat(coords[0], "&format=json&zoom=10&accept-language=").concat(language.substring(0, 2));
  return fetch(api).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.address) {
      var area = "";
      var keys = ["city", "county", "state"];

      for (var i = 0; i < keys.length; i++) {
        if (data.address[keys[i]]) {
          area += "".concat(data.address[keys[i]], ", ");
          break;
        }
      }

      area += data.address.country;
      return area;
    } else {
      return false;
    }
  }).catch(function () {
    return false;
  });
}

/***/ }),

/***/ "./components/js/image_unsplash.js":
/*!*****************************************!*\
  !*** ./components/js/image_unsplash.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getImage": function() { return /* binding */ getImage; }
/* harmony export */ });
/* harmony import */ var unsplash_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! unsplash-js */ "../node_modules/unsplash-js/dist/unsplash-js.esm.js");

function getImage(request) {
  var unsplash = (0,unsplash_js__WEBPACK_IMPORTED_MODULE_0__.createApi)({
    accessKey: "clTdAjXwclkfRbFVJs3L_OF_eZhsu0t75DH7eerWIEM"
  });
  return unsplash.search.getPhotos({
    query: request,
    page: 1,
    perPage: 10,
    orientation: "landscape"
  }).then(function (result) {
    if (result.errors) {
      return false;
    } else {
      var _result$response$resu;

      var returnImageIndex = getRandomInt(0, result.response.results.length);
      var returnImage = (_result$response$resu = result.response.results[returnImageIndex]) === null || _result$response$resu === void 0 ? void 0 : _result$response$resu.urls.regular;
      return returnImage ? returnImage : false;
    }
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/***/ }),

/***/ "./components/js/lang.js":
/*!*******************************!*\
  !*** ./components/js/lang.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var lang = {
  "en-US": {
    units: {
      imperial: {
        wind: "mph"
      },
      metric: {
        wind: "m/s"
      }
    },
    searchPlaceholderInitial: "Search city or ZIP",
    searchPlaceholderMicOn: "Speak into the microphone...",
    searching: "Searching",
    searchFail: "Not found!",
    hemi: {
      N: "N",
      E: "E",
      S: "S",
      W: "W"
    },
    unavailable: "unavailable",
    unknown: "Unknown area",
    search: "search",
    "feels-like-tag": "feels like",
    "wind-tag": "wind",
    "humidity-tag": "humidity",
    "latitude-tag": "Latitude",
    "longitude-tag": "Longitude"
  },
  "ru-RU": {
    units: {
      imperial: {
        wind: "миль/ч"
      },
      metric: {
        wind: "м/с"
      }
    },
    searchPlaceholderInitial: "Найти город или ZIP-код",
    searchPlaceholderMicOn: "Говорите в микрофон...",
    searching: "Поиск",
    searchFail: "Не найдено!",
    hemi: {
      N: "с.ш.",
      E: "в.д.",
      S: "ю.ш.",
      W: "з.д."
    },
    unavailable: "недоступно",
    unknown: "Неизвестная территория",
    search: "Найти",
    "feels-like-tag": "ощущается как",
    "wind-tag": "ветер",
    "humidity-tag": "влажность",
    "latitude-tag": "Широта",
    "longitude-tag": "Долгота"
  }
};
/* harmony default export */ __webpack_exports__["default"] = (lang);

/***/ }),

/***/ "./components/js/map_osm.js":
/*!**********************************!*\
  !*** ./components/js/map_osm.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MapContainer; }
/* harmony export */ });
/* harmony import */ var ol_ol_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/ol.css */ "../node_modules/ol/ol.css");
/* harmony import */ var ol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol */ "../node_modules/ol/View.js");
/* harmony import */ var ol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol */ "../node_modules/ol/Map.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/proj */ "../node_modules/ol/proj.js");
/* harmony import */ var ol_coordinate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/coordinate */ "../node_modules/ol/coordinate.js");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Tile */ "../node_modules/ol/layer/Tile.js");
/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/OSM */ "../node_modules/ol/source/OSM.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var MAP_START_ZOOM = 10;

var MapContainer = /*#__PURE__*/function () {
  function MapContainer(container) {
    var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAP_START_ZOOM;

    _classCallCheck(this, MapContainer);

    this.container = container;
    this.view = new ol__WEBPACK_IMPORTED_MODULE_2__.default({
      center: (0,ol_proj__WEBPACK_IMPORTED_MODULE_1__.fromLonLat)([0, 0]),
      zoom: zoom
    });
    this.map = new ol__WEBPACK_IMPORTED_MODULE_3__.default({
      target: this.container,
      layers: [new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_4__.default({
        source: new ol_source_OSM__WEBPACK_IMPORTED_MODULE_5__.default()
      })],
      view: this.view
    });
    var zoomPanel = document.getElementById(this.container).querySelector(".ol-zoom");
    zoomPanel.style.top = "1.5em";
    zoomPanel.style.left = "1.5em";
    var contributionPanel = document.getElementById(this.container).querySelector(".ol-attribution");
    contributionPanel.style.bottom = "2.5em";
    contributionPanel.style.left = "1em";
    contributionPanel.style.right = "unset";
  }

  _createClass(MapContainer, [{
    key: "setCenter",
    value: function setCenter(coords) {
      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAP_START_ZOOM;
      this.view.setCenter((0,ol_proj__WEBPACK_IMPORTED_MODULE_1__.fromLonLat)(coords));
      this.view.setZoom(zoom);
    }
  }, {
    key: "onPointSelect",
    value: function onPointSelect(callback) {
      this.map.on("singleclick", function (event) {
        callback((0,ol_proj__WEBPACK_IMPORTED_MODULE_1__.toLonLat)(event.coordinate).slice());
      });
    }
  }], [{
    key: "convertToHDMS",
    value: function convertToHDMS(coords) {
      var coordsHDMS = (0,ol_coordinate__WEBPACK_IMPORTED_MODULE_6__.toStringHDMS)(coords);
      var parsedCoords = coordsHDMS.match(/\b\d+(\u00b0|\u2032)/g);
      var latitude = "".concat(parsedCoords[0], " ").concat(parsedCoords[1]);
      var parsedLat = coordsHDMS.match(/(N|S)/g);
      var latitudeHemi = parsedLat ? parsedLat[0] : "";
      var longitude = "".concat(parsedCoords[2], " ").concat(parsedCoords[3]);
      var parsedLong = coordsHDMS.match(/(E|W)/g);
      var longitudeHemi = parsedLong ? parsedLong[0] : "";
      return {
        latitude: latitude,
        latitudeHemi: latitudeHemi,
        longitude: longitude,
        longitudeHemi: longitudeHemi
      };
    }
  }]);

  return MapContainer;
}();



/***/ }),

/***/ "./components/js/time.js":
/*!*******************************!*\
  !*** ./components/js/time.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getTime; }
/* harmony export */ });
function getTime(language, currentTimeZone, maxForecastDays) {
  var date = new Date();
  var options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: currentTimeZone
  };
  var now = date.toLocaleString(language, options).replaceAll(/(,|\.)/g, "");
  var nextDays = [];

  for (var i = 0; i < maxForecastDays; i++) {
    date.setDate(date.getDate() + 1);
    nextDays.push(date.toLocaleString(language, {
      weekday: "long",
      timeZone: currentTimeZone
    }));
  }

  return {
    now: now,
    nextDays: nextDays
  };
}

/***/ }),

/***/ "./components/js/ui.js":
/*!*****************************!*\
  !*** ./components/js/ui.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appParams": function() { return /* binding */ appParams; },
/* harmony export */   "staticTranslatableLabels": function() { return /* binding */ staticTranslatableLabels; },
/* harmony export */   "refreshButton": function() { return /* binding */ refreshButton; },
/* harmony export */   "langSelect": function() { return /* binding */ langSelect; },
/* harmony export */   "unitsRadioButtons": function() { return /* binding */ unitsRadioButtons; },
/* harmony export */   "areaField": function() { return /* binding */ areaField; },
/* harmony export */   "dateField": function() { return /* binding */ dateField; },
/* harmony export */   "wallpaperContainer": function() { return /* binding */ wallpaperContainer; },
/* harmony export */   "temperatureField": function() { return /* binding */ temperatureField; },
/* harmony export */   "weatherIconContainer": function() { return /* binding */ weatherIconContainer; },
/* harmony export */   "weatherIconField": function() { return /* binding */ weatherIconField; },
/* harmony export */   "descriptionField": function() { return /* binding */ descriptionField; },
/* harmony export */   "feelsLikeField": function() { return /* binding */ feelsLikeField; },
/* harmony export */   "windField": function() { return /* binding */ windField; },
/* harmony export */   "humidityField": function() { return /* binding */ humidityField; },
/* harmony export */   "windUnitsField": function() { return /* binding */ windUnitsField; },
/* harmony export */   "dayOfWeekFields": function() { return /* binding */ dayOfWeekFields; },
/* harmony export */   "upcomingTemperatureFields": function() { return /* binding */ upcomingTemperatureFields; },
/* harmony export */   "upcomingWeatherIconFields": function() { return /* binding */ upcomingWeatherIconFields; },
/* harmony export */   "searchButton": function() { return /* binding */ searchButton; },
/* harmony export */   "micButton": function() { return /* binding */ micButton; },
/* harmony export */   "searchTextInput": function() { return /* binding */ searchTextInput; },
/* harmony export */   "map": function() { return /* binding */ map; },
/* harmony export */   "latField": function() { return /* binding */ latField; },
/* harmony export */   "longField": function() { return /* binding */ longField; },
/* harmony export */   "maxForecastDays": function() { return /* binding */ maxForecastDays; },
/* harmony export */   "getUnits": function() { return /* binding */ getUnits; },
/* harmony export */   "setUnits": function() { return /* binding */ setUnits; },
/* harmony export */   "translateStaticLabels": function() { return /* binding */ translateStaticLabels; },
/* harmony export */   "displayWeather": function() { return /* binding */ displayWeather; },
/* harmony export */   "displayCoords": function() { return /* binding */ displayCoords; },
/* harmony export */   "displayTime": function() { return /* binding */ displayTime; },
/* harmony export */   "findLocation": function() { return /* binding */ findLocation; },
/* harmony export */   "displayLocation": function() { return /* binding */ displayLocation; },
/* harmony export */   "displayImage": function() { return /* binding */ displayImage; }
/* harmony export */ });
/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang */ "./components/js/lang.js");
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time */ "./components/js/time.js");
/* harmony import */ var _geodata_osm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./geodata_osm */ "./components/js/geodata_osm.js");
/* harmony import */ var _weather_osm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./weather_osm */ "./components/js/weather_osm.js");
/* harmony import */ var _map_osm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map_osm */ "./components/js/map_osm.js");
/* harmony import */ var _image_unsplash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./image_unsplash */ "./components/js/image_unsplash.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var appParams = {
  nameUnits: "units",
  nameDayOfWeek: "day-of-week",
  nameUpcomingTemperature: "upcoming-temperature",
  nameUpcomingWeatherIcon: "upcoming-weather-icon",
  classTranslatable: "translatable",
  idRefresh: "refresh",
  idLang: "lang",
  idWallpaper: "wallpaper",
  idArea: "area",
  idDate: "date",
  idTemperature: "temperature",
  idWeatherIconContainer: "weather-icon-container",
  idWeatherIcon: "weather-icon",
  idDescription: "description",
  idFeelsLike: "feels-like",
  idWind: "wind",
  idHumidity: "humidity",
  idSearchText: "search-text",
  idSearch: "search",
  idMic: "mic",
  idMap: "map",
  idWindUnits: "wind-units",
  idLatitude: "latitude",
  idLongitude: "longitude",
  animationRotateInFrames: "rotate-in-frames",
  animationRotateOutFrames: "rotate-out-frames",
  classLanding: "landing",
  classRotateIn: "rotate-in",
  classRotateOut: "rotate-out",
  animationFadeInFrames: "fade-in-frames",
  animationFadeOutFrames: "fade-out-frames",
  classFadeIn: "fade-in",
  classFadeOut: "fade-out"
};
var NOTIFICATION_DELAY = 2000;
var staticTranslatableLabels = document.getElementsByClassName(appParams.classTranslatable);
var refreshButton = document.getElementById(appParams.idRefresh);
var langSelect = document.getElementById(appParams.idLang);
var unitsRadioButtons = document.getElementsByName(appParams.nameUnits);
var areaField = document.getElementById(appParams.idArea);
var dateField = document.getElementById(appParams.idDate);
var wallpaperContainer = document.getElementById(appParams.idWallpaper);
var temperatureField = document.getElementById(appParams.idTemperature);
var weatherIconContainer = document.getElementById(appParams.idWeatherIconContainer);
var weatherIconField = document.getElementById(appParams.idWeatherIcon);
var descriptionField = document.getElementById(appParams.idDescription);
var feelsLikeField = document.getElementById(appParams.idFeelsLike);
var windField = document.getElementById(appParams.idWind);
var humidityField = document.getElementById(appParams.idHumidity);
var windUnitsField = document.getElementById(appParams.idWindUnits);
var dayOfWeekFields = document.getElementsByName(appParams.nameDayOfWeek);
var upcomingTemperatureFields = document.getElementsByName(appParams.nameUpcomingTemperature);
var upcomingWeatherIconFields = document.getElementsByName(appParams.nameUpcomingWeatherIcon);
var searchButton = document.getElementById(appParams.idSearch);
var micButton = document.getElementById(appParams.idMic);
var searchTextInput = document.getElementById(appParams.idSearchText);
var map = new _map_osm__WEBPACK_IMPORTED_MODULE_4__.default(appParams.idMap);
var latField = document.getElementById(appParams.idLatitude);
var longField = document.getElementById(appParams.idLongitude);
var maxForecastDays = upcomingTemperatureFields.length;
wallpaperContainer.addEventListener("animationend", onWallpaperContainerAnimationEnd);
weatherIconContainer.addEventListener("animationend", onWeatherIconContainerAnimationEnd);
function getUnits() {
  return document.querySelector("input[name=\"".concat(appParams.nameUnits, "\"]:checked")).value;
}
function setUnits(value) {
  document.querySelector("input[name=\"".concat(appParams.nameUnits, "\"][value=\"").concat(value, "\"]")).checked = true;
}
function translateStaticLabels() {
  searchTextInput.placeholder = _lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value].searchPlaceholderInitial;

  var _iterator = _createForOfIteratorHelper(staticTranslatableLabels),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var label = _step.value;
      label.textContent = _lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value][label.id];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function displayWeather(_ref) {
  var weather = _ref.weather,
      language = _ref.language,
      units = _ref.units;
  //console.log(weather);
  temperatureField.textContent = weather.temperature;
  setMainWeatherIcon(weather.icon);
  descriptionField.textContent = weather.description;
  feelsLikeField.textContent = weather.feelsLike;
  windField.textContent = weather.wind;
  windUnitsField.textContent = _lang__WEBPACK_IMPORTED_MODULE_0__.default[language].units[units].wind;
  humidityField.textContent = weather.humidity;
  updateUpcomingWeatherInformation(weather.forecast);
}

function setMainWeatherIcon(icon) {
  var _weatherIconField$cla;

  (_weatherIconField$cla = weatherIconField.classList).remove.apply(_weatherIconField$cla, _toConsumableArray(weatherIconField.classList));

  if (icon !== "-") {
    weatherIconContainer.classList.add(appParams.classLanding);
    weatherIconField.classList.add("wi", "wi-".concat(icon));
  }
}

function onWeatherIconContainerAnimationEnd(event) {
  event.currentTarget.classList.remove(appParams.classLanding);
}

function updateUpcomingWeatherInformation(forecast) {
  var i = 0;

  (function loop() {
    if (i < maxForecastDays) {
      upcomingWeatherIconFields[i].classList.add("wi", "wi-".concat(forecast.icon), appParams.classRotateIn);
      upcomingTemperatureFields[i].textContent = forecast[i].temperature;
      upcomingWeatherIconFields[i].addEventListener("animationend", function onUpcomingAnimationEnd(event) {
        if (event.animationName === appParams.animationRotateInFrames) {
          var _event$currentTarget$;

          (_event$currentTarget$ = event.currentTarget.classList).remove.apply(_event$currentTarget$, _toConsumableArray(event.currentTarget.classList));

          if (forecast.icon !== "-") event.currentTarget.classList.add("wi", "wi-".concat(forecast[i].icon), appParams.classRotateOut);
        } else {
          event.currentTarget.removeEventListener("animationend", onUpcomingAnimationEnd);
          event.currentTarget.classList.remove(appParams.classRotateOut);
          i++;
          loop();
        }
      });
    }
  })();
}

function displayCoords(coords) {
  var coordsHDMS = _map_osm__WEBPACK_IMPORTED_MODULE_4__.default.convertToHDMS(coords);
  latField.textContent = coordsHDMS.latitude;
  longField.textContent = coordsHDMS.longitude;
  coordsHDMS.latitudeHemi && (latField.textContent += " ".concat(_lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value].hemi[coordsHDMS.latitudeHemi]));
  coordsHDMS.longitudeHemi && (longField.textContent += " ".concat(_lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value].hemi[coordsHDMS.longitudeHemi]));
}
function displayTime() {
  var time = (0,_time__WEBPACK_IMPORTED_MODULE_1__.default)(langSelect.value, _weather_osm__WEBPACK_IMPORTED_MODULE_3__.currentTimeZone, maxForecastDays);
  dateField.textContent = time.now;

  for (var i = 0; i < maxForecastDays; i++) {
    dayOfWeekFields[i].textContent = time.nextDays[i];
  }
}
function findLocation(location) {
  searchTextInput.placeholder = "".concat(_lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value].searching, " \"").concat(location, "\"...");
  searchTextInput.value = "";
  return (0,_geodata_osm__WEBPACK_IMPORTED_MODULE_2__.searchLocation)(location).then(function (coords) {
    if (coords) {
      searchTextInput.placeholder = _lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value].searchPlaceholderInitial;
      return coords;
    } else {
      searchTextInput.placeholder = _lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value].searchFail;
      setTimeout(function () {
        searchTextInput.placeholder = _lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value].searchPlaceholderInitial;
      }, NOTIFICATION_DELAY);
      return false;
    }
  });
}
function displayLocation(_x) {
  return _displayLocation.apply(this, arguments);
}

function _displayLocation() {
  _displayLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(coords) {
    var area;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,_geodata_osm__WEBPACK_IMPORTED_MODULE_2__.getLocation)(coords, langSelect.value);

          case 2:
            area = _context.sent;
            areaField.textContent = area ? area : _lang__WEBPACK_IMPORTED_MODULE_0__.default[langSelect.value].unknown;
            displayImage();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _displayLocation.apply(this, arguments);
}

function displayImage() {
  return _displayImage.apply(this, arguments);
}

function _displayImage() {
  _displayImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var image;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0,_image_unsplash__WEBPACK_IMPORTED_MODULE_5__.getImage)(areaField.textContent);

          case 2:
            image = _context2.sent;

            if (image) {
              wallpaperContainer.nextImage = "url(".concat(image, ")");
              wallpaperContainer.classList.add(appParams.classFadeIn);
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _displayImage.apply(this, arguments);
}

function onWallpaperContainerAnimationEnd(event) {
  if (event.animationName === appParams.animationFadeInFrames) {
    event.currentTarget.classList.remove(appParams.classFadeIn);
    event.currentTarget.classList.add(appParams.classFadeOut);
    event.currentTarget.style.backgroundImage = event.currentTarget.nextImage;
  } else {
    event.currentTarget.classList.remove(appParams.classFadeOut);
  }
}

/***/ }),

/***/ "./components/js/weather_osm.js":
/*!**************************************!*\
  !*** ./components/js/weather_osm.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentTimeZone": function() { return /* binding */ currentTimeZone; },
/* harmony export */   "getWeather": function() { return /* binding */ getWeather; }
/* harmony export */ });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./components/js/ui.js");

var OWM_API = "46a8d7bc7f3c4adccd8efc07bf1a0431";
var currentTimeZone = "UTC";
function getWeather(coords, language, units) {
  var api = "http://api.openweathermap.org/data/2.5/onecall?lat=".concat(coords[1], "&lon=").concat(coords[0], "&exclude=hourly,minutely&units=").concat(units, "&appid=").concat(OWM_API, "&lang=").concat(language.substring(0, 2));
  return fetch(api).then(function (response) {
    return response.json();
  }).then(function (data) {
    //console.log(data); //weather data
    currentTimeZone = data.timezone;
    var forecast = [];

    for (var i = 0; i < _ui__WEBPACK_IMPORTED_MODULE_0__.maxForecastDays; i++) {
      var avgTemp = Math.round((data.daily[i].temp.min + data.daily[i].temp.max) / 2);
      forecast.push({
        temperature: avgTemp,
        id: data.daily[i].weather[0].id,
        icon: data.daily[i].weather[0].icon
      });
    }

    return {
      weather: {
        temperature: Math.round(data.current.temp),
        id: data.current.weather[0].id,
        icon: data.current.weather[0].icon,
        description: data.current.weather[0].description,
        feelsLike: Math.round(data.current.feels_like),
        wind: data.current.wind_speed,
        humidity: data.current.humidity,
        forecast: forecast
      },
      language: language,
      units: units
    };
  }).catch(function () {
    //console.log(`getWeather() catch! - ${err}`);
    var forecast = [];

    for (var i = 0; i < _ui__WEBPACK_IMPORTED_MODULE_0__.maxForecastDays; i++) {
      forecast.push({
        temperature: "-",
        id: "-",
        icon: "-"
      });
    }

    return {
      weather: {
        temperature: "-",
        id: "-",
        icon: "-",
        description: "-",
        feelsLike: "-",
        wind: "-",
        humidity: "-",
        forecast: forecast
      },
      language: language,
      units: units
    };
  });
}

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./style.css");
/* harmony import */ var _components_css_weather_icons_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/css/weather-icons.css */ "./components/css/weather-icons.css");
/* harmony import */ var _components_js_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/js/lang */ "./components/js/lang.js");
/* harmony import */ var _components_js_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/js/ui */ "./components/js/ui.js");
/* harmony import */ var _components_js_Cadencer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/js/Cadencer */ "./components/js/Cadencer.js");
/* harmony import */ var _components_js_weather_osm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/js/weather_osm */ "./components/js/weather_osm.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







var coords = [0, 51.51]; //London as default

var cadencer = new _components_js_Cadencer__WEBPACK_IMPORTED_MODULE_4__.default(_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.displayTime);
window.addEventListener("load", onWindowLoad);
_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.refreshButton.addEventListener("click", refreshContent);
_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.langSelect.addEventListener("change", onLanguageChange);
_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.unitsRadioButtons.forEach(function (radioButton) {
  return radioButton.addEventListener("change", onUnitsRadioButtonChecked);
});
_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchTextInput.addEventListener("keypress", onSearchTextInputKeypress);
_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.micButton.addEventListener("click", onMicButtonClick);
_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchButton.addEventListener("click", onSearchButtonClick);
_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.map.onPointSelect(onMapPointSelect);

function onWindowLoad() {
  if (localStorage.getItem(_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.appParams.idLang)) {
    _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.langSelect.value = localStorage.getItem(_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.appParams.idLang);
  }

  if (localStorage.getItem(_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.appParams.nameUnits)) {
    _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.setUnits(localStorage.getItem(_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.appParams.nameUnits));
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      coords[0] = position.coords.longitude;
      coords[1] = position.coords.latitude;
      initContent();
    }, function ()
    /*error*/
    {
      initContent();
    }, {
      timeout: 1000
    });
  } else initContent();
}

function onUnitsRadioButtonChecked() {
  localStorage.setItem(_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.appParams.nameUnits, _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.getUnits());
  (0,_components_js_weather_osm__WEBPACK_IMPORTED_MODULE_5__.getWeather)(coords, _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.langSelect.value, _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.getUnits()).then(function (data) {
    return _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.displayWeather(data);
  });
}

function refreshContent() {
  _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.displayCoords(coords);
  (0,_components_js_weather_osm__WEBPACK_IMPORTED_MODULE_5__.getWeather)(coords, _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.langSelect.value, _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.getUnits()).then(function (data) {
    cadencer.start();
    _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.displayWeather(data);
  });
  _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.displayLocation(coords);
}

function initContent() {
  _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.translateStaticLabels();
  _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.map.setCenter(coords);
  refreshContent();
}

function onLanguageChange() {
  localStorage.setItem(_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.appParams.idLang, _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.langSelect.value);
  _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.translateStaticLabels();
  refreshContent();
}

function onSearchTextInputKeypress(event) {
  if (event.keyCode === 13) {
    _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchTextInput.blur();
    _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchButton.click();
  }
}

function onMicButtonClick() {
  if ("webkitSpeechRecognition" in window) {
    speechRecognize();
  }
}

function onMapPointSelect(newCoords) {
  coords = newCoords;
  refreshContent();
}

function onSearchButtonClick() {
  return _onSearchButtonClick.apply(this, arguments);
}

function _onSearchButtonClick() {
  _onSearchButtonClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var newCoords;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.findLocation(_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchTextInput.value);

          case 2:
            newCoords = _context.sent;

            if (newCoords) {
              coords = newCoords;
              _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.map.setCenter(coords);
              refreshContent();
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _onSearchButtonClick.apply(this, arguments);
}

function speechRecognize() {
  /*global webkitSpeechRecognition*/
  var recognition = new webkitSpeechRecognition();
  recognition.lang = _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.langSelect.value;
  recognition.start();
  _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchTextInput.value = "";
  _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchTextInput.placeholder = _components_js_lang__WEBPACK_IMPORTED_MODULE_2__.default[_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.langSelect.value].searchPlaceholderMicOn;

  recognition.onend = function () {
    _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchTextInput.placeholder = _components_js_lang__WEBPACK_IMPORTED_MODULE_2__.default[_components_js_ui__WEBPACK_IMPORTED_MODULE_3__.langSelect.value].searchPlaceholderInitial;
  };

  recognition.onresult = function (event) {
    if (event.results.length > 0) {
      _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchTextInput.value = event.results[0][0].transcript;
      _components_js_ui__WEBPACK_IMPORTED_MODULE_3__.searchButton.click();
    }
  };
}

/***/ }),

/***/ "./components/css/weather-icons.css":
/*!******************************************!*\
  !*** ./components/css/weather-icons.css ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = function() {}
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["../node_modules/@babel/polyfill/lib/index.js","vendors-node_modules_ol_ol_css-node_modules_babel_polyfill_lib_index_js-node_modules_ol_Map_j-24e6fd"],
/******/ 			["./script.js","vendors-node_modules_ol_ol_css-node_modules_babel_polyfill_lib_index_js-node_modules_ol_Map_j-24e6fd"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = function() {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			var executeModules = data[3];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = function() {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (function() {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	__webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=main.ed9495824230cc5e1e87.js.map