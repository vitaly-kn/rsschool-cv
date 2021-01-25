import "./style.css";
import "./components/css/owfont-regular.css";
import lang from "./components/js/lang";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat, transform } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const appParams = {
  nameUnits: "units",
  nameUpcomingTemperature: "upcoming-temperature",
  nameUpcomingWeatherIcon: "upcoming-weather-icon",
  idTemperature: "temperature",
  idWeatherIcon: "weather-icon",
  idDescription: "description",
  idFeelsLike: "feels-like",
  idWind: "wind",
  idHumidity: "humidity",
  idSearchText: "search-text",
  idMic: "mic",
  idMap: "map",
  idWindUnits: "wind-units",
  idLatitude: "latitude",
  idLongitude: "longitude",
};

const OWM_API = "46a8d7bc7f3c4adccd8efc07bf1a0431";
const MAP_START_ZOOM = 10;
let currentLang = "en-US";
let coords = [-0.1277, 51.5073];

const unitsRadioButtons = document.getElementsByName(appParams.nameUnits);
const temperatureField = document.getElementById(appParams.idTemperature);
const weatherIconField = document.getElementById(appParams.idWeatherIcon);
const descriptionField = document.getElementById(appParams.idDescription);
const feelsLikeField = document.getElementById(appParams.idFeelsLike);
const windField = document.getElementById(appParams.idWind);
const humidityField = document.getElementById(appParams.idHumidity);
const windUnitsField = document.getElementById(appParams.idWindUnits);
const upcomingTemperatureFields = document.getElementsByName(appParams.nameUpcomingTemperature);
const upcomingWeatherIconFields = document.getElementsByName(appParams.nameUpcomingWeatherIcon);
const micButton = document.getElementById(appParams.idMic);
const searchTextInput = document.getElementById(appParams.idSearchText);
const latField = document.getElementById(appParams.idLatitude);
const longField = document.getElementById(appParams.idLongitude);

window.addEventListener("load", onWindowLoad);
unitsRadioButtons.forEach((radioButton) => radioButton.addEventListener("change", onUnitsRadioButtonChecked));
micButton.addEventListener("click", onMicButtonClick);

const view = new View({
  center: fromLonLat(coords),
  zoom: MAP_START_ZOOM,
});

const map = new Map({
  target: appParams.idMap,
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: view,
});

function onWindowLoad(event) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //getWeather();
      coords[0] = position.coords.longitude;
      coords[1] = position.coords.latitude;
      //console.log(`coordinates : ${coords}; fromLonLat: ${fromLonLat(coords)}; hdms : ${toStringHDMS(coords)}`);
      displayCoords(coords);
      view.setCenter(fromLonLat(coords));
      getWeather();
    });
  }
  //getWeather();
}

function displayCoords(coordsArray) {
  const coords = toStringHDMS(coordsArray);
  const parsedCoords = coords.match(/\b\d+(\u00b0|\u2032)/g);
  latField.textContent = `${parsedCoords[0]} ${parsedCoords[1]}`;
  longField.textContent = `${parsedCoords[2]} ${parsedCoords[3]}`;
  const parsedLat = coords.match(/(N|S)/g);
  const parsedLong = coords.match(/(E|W)/g);
  parsedLat && (latField.textContent += ` ${lang[currentLang].hemi[parsedLat[0]]}`);
  parsedLong && (longField.textContent += ` ${lang[currentLang].hemi[parsedLong[0]]}`);
}

function onUnitsRadioButtonChecked() {
  getWeather();
}

function onMicButtonClick(event) {
  if ("webkitSpeechRecognition" in window) {
    speechRecognize();
  }
}

function getWeather() {
  const units = document.querySelector(`input[name="${appParams.nameUnits}"]:checked`).value;
  const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${
    coords[0]
  }&exclude=hourly,minutely&units=${units}&appid=${OWM_API}&lang=${currentLang.substring(0, 2)}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      temperatureField.textContent = Math.round(data.current.temp);
      weatherIconField.classList.remove(...weatherIconField.classList);
      weatherIconField.classList.add("owf", `owf-${data.current.weather[0].id}`);
      descriptionField.textContent = data.current.weather[0].description;
      feelsLikeField.textContent = Math.round(data.current.feels_like);
      windField.textContent = data.current.wind_speed;
      windUnitsField.textContent = lang[currentLang].units[units].wind;
      humidityField.textContent = data.current.humidity;
      for (let i = 0; i < upcomingTemperatureFields.length; i++) {
        upcomingTemperatureFields[i].textContent = Math.round(data.daily[i].temp.day);
        upcomingWeatherIconFields[i].classList.remove(...upcomingWeatherIconFields[i].classList);
        upcomingWeatherIconFields[i].classList.add("owf", `owf-${data.daily[i].weather[0].id}`);
      }
      console.log(`${data.city}`);
    });
}

function speechRecognize() {
  let recognition = new webkitSpeechRecognition();
  recognition.lang = currentLang;
  recognition.start();
  searchTextInput.value = "";
  searchTextInput.placeholder = lang[currentLang].searchPlaceholderMicOn;
  recognition.onend = function () {
    //console.log(`recognition session ended!`);
    searchTextInput.placeholder = lang[currentLang].searchPlaceholderInitial;
  };
  recognition.onresult = function (event) {
    //console.log(`recognized: ${event.results.length}`);
    if (event.results.length > 0) {
      searchTextInput.value = event.results[0][0].transcript;
      /*searchField.form.submit();*/
    }
  };
}
