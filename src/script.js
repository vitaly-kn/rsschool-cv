import "./style.css";
import "./components/css/owfont-regular.css";
import lang from "./components/js/lang";
import * as ui from "./components/js/ui";
import Cadencer from "./components/js/Cadencer";
import { getWeather } from "./components/js/weather_osm";

let coords = [0.1277, 51.5073];
let cadencer = new Cadencer(ui.displayTime);

window.addEventListener("load", onWindowLoad);
ui.refreshButton.addEventListener("click", refreshContent);
ui.langSelect.addEventListener("change", onLanguageChange);
ui.unitsRadioButtons.forEach((radioButton) => radioButton.addEventListener("change", onUnitsRadioButtonChecked));
ui.searchTextInput.addEventListener("keypress", onSearchTextInputKeypress);
ui.micButton.addEventListener("click", onMicButtonClick);
ui.searchButton.addEventListener("click", onSearchButtonClick);
ui.map.onPointSelect(onMapPointSelect);

function onWindowLoad(event) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      coords[0] = position.coords.longitude;
      coords[1] = position.coords.latitude;
      ui.map.setCenter(coords);
      ui.translateStaticLabels();
      refreshContent();
    });
  }
}

function onUnitsRadioButtonChecked() {
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

function onLanguageChange() {
  ui.translateStaticLabels();
  refreshContent();
}

function onSearchTextInputKeypress(event) {
  if (event.keyCode === 13) {
    ui.searchTextInput.blur();
    ui.searchButton.click();
  }
}

function onMicButtonClick(event) {
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
    //console.log(newCoords);
    coords = newCoords;
    ui.map.setCenter(coords);
    refreshContent();
  }
}

function speechRecognize() {
  let recognition = new webkitSpeechRecognition();
  recognition.lang = langSelect.value;
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
