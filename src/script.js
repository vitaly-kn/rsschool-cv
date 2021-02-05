import "./style.css";
import "./components/css/weather-icons.css";
import lang from "./components/js/lang";
import * as ui from "./components/js/ui";
import Cadencer from "./components/js/Cadencer";
import { getWeather } from "./components/js/weather_osm";

let coords = [0, 51.51]; //London as default
let cadencer = new Cadencer(ui.displayTime);

window.addEventListener("load", onWindowLoad);
ui.refreshButton.addEventListener("click", refreshContent);
ui.langSelect.addEventListener("change", onLanguageChange);
ui.unitsRadioButtons.forEach((radioButton) => radioButton.addEventListener("change", onUnitsRadioButtonChecked));
ui.searchTextInput.addEventListener("keypress", onSearchTextInputKeypress);
ui.micButton.addEventListener("click", onMicButtonClick);
ui.searchButton.addEventListener("click", onSearchButtonClick);
ui.map.onPointSelect(onMapPointSelect);

function onWindowLoad() {
  if (localStorage.getItem(ui.appParams.idLang)) {
    ui.langSelect.value = localStorage.getItem(ui.appParams.idLang);
  }

  if (localStorage.getItem(ui.appParams.nameUnits)) {
    ui.setUnits(localStorage.getItem(ui.appParams.nameUnits));
  }
  if (navigator.geolocation) {
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
  localStorage.setItem(ui.appParams.nameUnits, ui.getUnits());
  getWeather(coords, ui.langSelect.value, ui.getUnits()).then((data) => ui.displayWeather(data));
}

function refreshContent() {
  ui.displayCoords(coords);
  getWeather(coords, ui.langSelect.value, ui.getUnits()).then((data) => {
    cadencer.start();
    ui.displayWeather(data);
  });
  ui.displayLocation(coords);
}

function initContent() {
  ui.translateStaticLabels();
  ui.map.setCenter(coords);
  refreshContent();
}

function onLanguageChange() {
  localStorage.setItem(ui.appParams.idLang, ui.langSelect.value);
  ui.translateStaticLabels();
  refreshContent();
}

function onSearchTextInputKeypress(event) {
  if (event.keyCode === 13) {
    ui.searchTextInput.blur();
    ui.searchButton.click();
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

async function onSearchButtonClick() {
  let newCoords = await ui.findLocation(ui.searchTextInput.value);
  if (newCoords) {
    coords = newCoords;
    ui.map.setCenter(coords);
    refreshContent();
  }
}

function speechRecognize() {
  /*global webkitSpeechRecognition*/
  let recognition = new webkitSpeechRecognition();
  recognition.lang = ui.langSelect.value;
  recognition.start();
  ui.searchTextInput.value = "";
  ui.searchTextInput.placeholder = lang[ui.langSelect.value].searchPlaceholderMicOn;
  recognition.onend = function () {
    ui.searchTextInput.placeholder = lang[ui.langSelect.value].searchPlaceholderInitial;
  };
  recognition.onresult = function (event) {
    if (event.results.length > 0) {
      ui.searchTextInput.value = event.results[0][0].transcript;
      ui.searchButton.click();
    }
  };
}
