import "./style.css";
import "./components/css/weather-icons.css";
import lang from "./components/js/lang";
import * as uiElement from "./components/js/uielements";
import * as uiUtil from "./components/js/uiutils";
import Cadencer from "./components/js/Cadencer";
import { getWeather } from "./components/js/weather_osm";

let coords = [0, 51.51]; //London as default
const coordsStorageName = "coords";
let cadencer = new Cadencer(uiUtil.displayTime);

window.addEventListener("load", onWindowLoad);
uiElement.refreshButton.addEventListener("click", refreshContent);
uiElement.langSelect.addEventListener("change", onLanguageChange);
uiElement.unitsRadioButtons.forEach((radioButton) => radioButton.addEventListener("change", onUnitsRadioButtonChecked));
uiElement.locationsList.addEventListener("change", onLocationSelect);
uiElement.searchTextInput.addEventListener("keypress", onSearchTextInputKeypress);
uiElement.micButton.addEventListener("click", onMicButtonClick);
uiElement.searchButton.addEventListener("click", onSearchButtonClick);
uiElement.map.onPointSelect(onMapPointSelect);

function onWindowLoad() {
  if (localStorage.getItem(uiElement.appParams.idLang)) {
    uiElement.langSelect.value = localStorage.getItem(uiElement.appParams.idLang);
  }

  if (localStorage.getItem(uiElement.appParams.nameUnits)) {
    uiUtil.setUnits(localStorage.getItem(uiElement.appParams.nameUnits));
  }

  if (localStorage.getItem(coordsStorageName)) {
    coords = localStorage
      .getItem(coordsStorageName)
      .split(",")
      .map((x) => Number(x));
    initContent();
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords[0] = position.coords.longitude;
        coords[1] = position.coords.latitude;
        initContent();
      },
      (/*error*/) => {
        initContent();
      },
      { timeout: 1000 }
    );
  } else initContent();
}

function onUnitsRadioButtonChecked() {
  localStorage.setItem(uiElement.appParams.nameUnits, uiUtil.getUnits());
  getWeather(coords, uiElement.langSelect.value, uiUtil.getUnits()).then((data) => uiUtil.displayWeather(data));
}

function refreshContent() {
  uiUtil.displayCoords(coords);
  getWeather(coords, uiElement.langSelect.value, uiUtil.getUnits()).then((data) => {
    cadencer.start();
    uiUtil.displayWeather(data);
  });
  uiUtil.displayLocation(coords);
}

function initContent() {
  uiUtil.translateStaticLabels();
  uiElement.map.setCenter(coords);
  refreshContent();
}

function onLanguageChange() {
  localStorage.setItem(uiElement.appParams.idLang, uiElement.langSelect.value);
  uiUtil.translateStaticLabels();
  refreshContent();
}

function onLocationSelect() {
  coords = uiElement.locationsList.value.split(",").map((x) => Number(x));
  uiElement.locationsList.value = "";
  localStorage.setItem(coordsStorageName, coords);
  uiElement.map.setCenter(coords);
  refreshContent();
}

function onSearchTextInputKeypress(event) {
  if (event.keyCode === 13) {
    uiElement.searchTextInput.blur();
    uiElement.searchButton.click();
  }
}

function onMicButtonClick() {
  if ("webkitSpeechRecognition" in window) {
    speechRecognize();
  }
}

function onMapPointSelect(newCoords) {
  coords = newCoords;
  localStorage.setItem(coordsStorageName, coords);
  refreshContent();
}

async function onSearchButtonClick() {
  document.body.classList.add(uiElement.appParams.classSearchWaiting);
  let newCoords = await uiUtil.findLocation(uiElement.searchTextInput.value);
  if (newCoords) {
    coords = newCoords;
    localStorage.setItem(coordsStorageName, coords);
    uiElement.map.setCenter(coords);
    refreshContent();
  }
  document.body.classList.remove(uiElement.appParams.classSearchWaiting);
}

function speechRecognize() {
  /*global webkitSpeechRecognition*/
  let recognition = new webkitSpeechRecognition();
  recognition.lang = uiElement.langSelect.value;
  recognition.start();
  uiElement.searchTextInput.value = "";
  uiElement.searchTextInput.placeholder = lang[uiElement.langSelect.value].searchPlaceholderMicOn;
  recognition.onend = function () {
    uiElement.searchTextInput.placeholder = lang[uiElement.langSelect.value].searchPlaceholderInitial;
  };
  recognition.onresult = function (event) {
    if (event.results.length > 0) {
      uiElement.searchTextInput.value = event.results[0][0].transcript;
      uiElement.searchButton.click();
    }
  };
}
