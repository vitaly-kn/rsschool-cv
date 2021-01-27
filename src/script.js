import "./style.css";
import "./components/css/owfont-regular.css";
import lang from "./components/js/lang";
import Cadencer from "./components/js/Cadencer";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat, toLonLat, transform } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const appParams = {
  nameUnits: "units",
  nameDayOfWeek: "day-of-week",
  nameUpcomingTemperature: "upcoming-temperature",
  nameUpcomingWeatherIcon: "upcoming-weather-icon",
  classTranslatable: "translatable",
  idRefresh: "refresh",
  idLang: "lang",
  idArea: "area",
  idDate: "date",
  idTemperature: "temperature",
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
};

const OWM_API = "46a8d7bc7f3c4adccd8efc07bf1a0431";
const MAP_START_ZOOM = 10;
const NOTIFICATION_DELAY = 2000;
let currentTimeZone = "";
let coords = [0.1277, 51.5073];
let cadencer = new Cadencer(getDate);

const staticTranslatableLabels = document.getElementsByClassName(appParams.classTranslatable);
const refreshButton = document.getElementById(appParams.idRefresh);
const langSelect = document.getElementById(appParams.idLang);
const unitsRadioButtons = document.getElementsByName(appParams.nameUnits);
const areaField = document.getElementById(appParams.idArea);
const dateField = document.getElementById(appParams.idDate);
const temperatureField = document.getElementById(appParams.idTemperature);
const weatherIconField = document.getElementById(appParams.idWeatherIcon);
const descriptionField = document.getElementById(appParams.idDescription);
const feelsLikeField = document.getElementById(appParams.idFeelsLike);
const windField = document.getElementById(appParams.idWind);
const humidityField = document.getElementById(appParams.idHumidity);
const windUnitsField = document.getElementById(appParams.idWindUnits);
const dayOfWeekFields = document.getElementsByName(appParams.nameDayOfWeek);
const upcomingTemperatureFields = document.getElementsByName(appParams.nameUpcomingTemperature);
const upcomingWeatherIconFields = document.getElementsByName(appParams.nameUpcomingWeatherIcon);
const searchButton = document.getElementById(appParams.idSearch);
const micButton = document.getElementById(appParams.idMic);
const searchTextInput = document.getElementById(appParams.idSearchText);
const latField = document.getElementById(appParams.idLatitude);
const longField = document.getElementById(appParams.idLongitude);

window.addEventListener("load", onWindowLoad);
refreshButton.addEventListener("click", refreshContent);
langSelect.addEventListener("change", onLanguageChange);
unitsRadioButtons.forEach((radioButton) => radioButton.addEventListener("change", onUnitsRadioButtonChecked));
searchTextInput.addEventListener("keypress", onSearchTextInputKeypress);
micButton.addEventListener("click", onMicButtonClick);
searchButton.addEventListener("click", onSearchButtonClick);

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
      coords[0] = position.coords.longitude;
      coords[1] = position.coords.latitude;
      view.setCenter(fromLonLat(coords));
      translateStaticLabels();
      refreshContent();
    });
  }
}

function onUnitsRadioButtonChecked() {
  getWeather();
}

function refreshContent() {
  displayCoords();
  getLocation();
  getWeather();
}

function onLanguageChange() {
  translateStaticLabels();
  refreshContent();
}

function translateStaticLabels() {
  searchTextInput.placeholder = lang[langSelect.value].searchPlaceholderInitial;
  for (let label of staticTranslatableLabels) {
    label.textContent = lang[langSelect.value][label.id];
  }
}

function onSearchTextInputKeypress(event) {
  if (event.keyCode === 13) {
    searchTextInput.blur();
    searchButton.click();
  }
}

function onMicButtonClick(event) {
  if ("webkitSpeechRecognition" in window) {
    speechRecognize();
  }
}

map.on("singleclick", (event) => {
  coords = toLonLat(event.coordinate).slice();
  refreshContent();
});

function onSearchButtonClick() {
  const api = `https://nominatim.openstreetmap.org/search?q=${encodeURI(searchTextInput.value)}&format=json&limit=1`;
  searchTextInput.placeholder = `${lang[langSelect.value].searching} "${searchTextInput.value}"...`;
  searchTextInput.value = "";
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      if (data.length) {
        searchTextInput.placeholder = lang[langSelect.value].searchPlaceholderInitial;
        coords[0] = +data[0].lon;
        coords[1] = +data[0].lat;
        view.setCenter(fromLonLat(coords));
        view.setZoom(MAP_START_ZOOM);
        refreshContent();
      } else {
        searchTextInput.placeholder = lang[langSelect.value].searchFail;
        setTimeout(() => {
          searchTextInput.placeholder = lang[langSelect.value].searchPlaceholderInitial;
        }, NOTIFICATION_DELAY);
      }
    });
}

function displayCoords() {
  const coordsHDMS = toStringHDMS(coords);
  const parsedCoords = coordsHDMS.match(/\b\d+(\u00b0|\u2032)/g);
  latField.textContent = `${parsedCoords[0]} ${parsedCoords[1]}`;
  longField.textContent = `${parsedCoords[2]} ${parsedCoords[3]}`;
  const parsedLat = coordsHDMS.match(/(N|S)/g);
  const parsedLong = coordsHDMS.match(/(E|W)/g);
  parsedLat && (latField.textContent += ` ${lang[langSelect.value].hemi[parsedLat[0]]}`);
  parsedLong && (longField.textContent += ` ${lang[langSelect.value].hemi[parsedLong[0]]}`);
}

function getWeather() {
  const units = document.querySelector(`input[name="${appParams.nameUnits}"]:checked`).value;
  const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${
    coords[0]
  }&exclude=hourly,minutely&units=${units}&appid=${OWM_API}&lang=${langSelect.value.substring(0, 2)}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data); //weather data
      currentTimeZone = data.timezone;
      cadencer.start();
      temperatureField.textContent = Math.round(data.current.temp);
      weatherIconField.classList.remove(...weatherIconField.classList);
      weatherIconField.classList.add("owf", `owf-${data.current.weather[0].id}`);
      descriptionField.textContent = data.current.weather[0].description;
      feelsLikeField.textContent = Math.round(data.current.feels_like);
      windField.textContent = data.current.wind_speed;
      windUnitsField.textContent = lang[langSelect.value].units[units].wind;
      humidityField.textContent = data.current.humidity;
      for (let i = 0; i < upcomingTemperatureFields.length; i++) {
        upcomingTemperatureFields[i].textContent = Math.round(data.daily[i].temp.day);
        upcomingWeatherIconFields[i].classList.remove(...upcomingWeatherIconFields[i].classList);
        upcomingWeatherIconFields[i].classList.add("owf", `owf-${data.daily[i].weather[0].id}`);
      }
    });
}

function getLocation() {
  const api = `https://nominatim.openstreetmap.org/reverse?lat=${coords[1]}&lon=${coords[0]}&format=json&zoom=10&accept-language=${langSelect.value.substring(0, 2)}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let area = "";
      if (data.address) {
        const keys = ["city", "county", "state"];
        for (let i = 0; i < keys.length; i++) {
          if (data.address[keys[i]]) {
            area += `${data.address[keys[i]]}, `;
            break;
          }
        }
        area += data.address.country;
      } else {
        area = lang[langSelect.value].unknown;
      }
      areaField.textContent = area;
    });
}

function getDate() {
  const date = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: currentTimeZone,
  };
  dateField.textContent = date.toLocaleString(langSelect.value, options).replaceAll(/(,|\.)/g, "");
  for (let i = 0; i < dayOfWeekFields.length; i++) {
    date.setDate(date.getDate() + 1);
    dayOfWeekFields[i].textContent = date.toLocaleString(langSelect.value, { weekday: "long", timeZone: currentTimeZone });
  }
}

function speechRecognize() {
  let recognition = new webkitSpeechRecognition();
  recognition.lang = langSelect.value;
  recognition.start();
  searchTextInput.value = "";
  searchTextInput.placeholder = lang[langSelect.value].searchPlaceholderMicOn;
  recognition.onend = function () {
    searchTextInput.placeholder = lang[langSelect.value].searchPlaceholderInitial;
  };
  recognition.onresult = function (event) {
    if (event.results.length > 0) {
      searchTextInput.value = event.results[0][0].transcript;
      searchButton.click();
    }
  };
}
