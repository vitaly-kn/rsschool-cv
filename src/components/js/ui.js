import lang from "./lang";
import getTime from "./time";
import { searchLocation, getLocation } from "./geodata_osm";
import { currentTimeZone } from "./weather_osm";
import MapContainer from "./map_osm";
import { getImage } from "./image_unsplash";

export const appParams = {
  nameUnits: "units",
  nameDayOfWeek: "day-of-week",
  nameUpcomingTemperature: "upcoming-temperature",
  nameUpcomingWeatherIcon: "upcoming-weather-icon",
  classTranslatable: "translatable",
  idRefresh: "refresh",
  idLang: "lang",
  //idWallpaper: "wallpaper",
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
};

const NOTIFICATION_DELAY = 2000;

export const staticTranslatableLabels = document.getElementsByClassName(appParams.classTranslatable);
export const refreshButton = document.getElementById(appParams.idRefresh);
export const langSelect = document.getElementById(appParams.idLang);
export const unitsRadioButtons = document.getElementsByName(appParams.nameUnits);
export const areaField = document.getElementById(appParams.idArea);
export const dateField = document.getElementById(appParams.idDate);
//export const wallpaperContainer = document.getElementById(appParams.idWallpaper);
export const temperatureField = document.getElementById(appParams.idTemperature);
export const weatherIconContainer = document.getElementById(appParams.idWeatherIconContainer);
export const weatherIconField = document.getElementById(appParams.idWeatherIcon);
export const descriptionField = document.getElementById(appParams.idDescription);
export const feelsLikeField = document.getElementById(appParams.idFeelsLike);
export const windField = document.getElementById(appParams.idWind);
export const humidityField = document.getElementById(appParams.idHumidity);
export const windUnitsField = document.getElementById(appParams.idWindUnits);
export const dayOfWeekFields = document.getElementsByName(appParams.nameDayOfWeek);
export const upcomingTemperatureFields = document.getElementsByName(appParams.nameUpcomingTemperature);
export const upcomingWeatherIconFields = document.getElementsByName(appParams.nameUpcomingWeatherIcon);
export const searchButton = document.getElementById(appParams.idSearch);
export const micButton = document.getElementById(appParams.idMic);
export const searchTextInput = document.getElementById(appParams.idSearchText);
export const map = new MapContainer(appParams.idMap);
export const latField = document.getElementById(appParams.idLatitude);
export const longField = document.getElementById(appParams.idLongitude);

export const maxForecastDays = upcomingTemperatureFields.length;

weatherIconContainer.addEventListener("animationend", onWeatherIconContainerAnimationEnd);

export function getUnits() {
  return document.querySelector(`input[name="${appParams.nameUnits}"]:checked`).value;
}

export function setUnits(value) {
  document.querySelector(`input[name="${appParams.nameUnits}"][value="${value}"]`).checked = true;
}

export function translateStaticLabels() {
  searchTextInput.placeholder = lang[langSelect.value].searchPlaceholderInitial;
  for (let label of staticTranslatableLabels) {
    label.textContent = lang[langSelect.value][label.id];
  }
}

export function displayWeather({ weather, language, units }) {
  //console.log(weather);
  temperatureField.textContent = weather.temperature;
  setMainWeatherIcon(weather.icon);
  descriptionField.textContent = weather.description;
  feelsLikeField.textContent = weather.feelsLike;
  windField.textContent = weather.wind;
  windUnitsField.textContent = lang[language].units[units].wind;
  humidityField.textContent = weather.humidity;
  updateUpcomingWeatherInformation(weather.forecast);
}

function setMainWeatherIcon(icon) {
  weatherIconField.classList.remove(...weatherIconField.classList);
  if (icon !== "-") {
    weatherIconContainer.classList.add(appParams.classLanding);
    weatherIconField.classList.add("wi", `wi-${icon}`);
  }
}

function onWeatherIconContainerAnimationEnd(event) {
  event.currentTarget.classList.remove(appParams.classLanding);
}

function updateUpcomingWeatherInformation(forecast) {
  let i = 0;
  (function loop() {
    if (i < maxForecastDays) {
      upcomingWeatherIconFields[i].classList.add("wi", `wi-${forecast.icon}`, appParams.classRotateIn);
      upcomingTemperatureFields[i].textContent = forecast[i].temperature;
      upcomingWeatherIconFields[i].addEventListener("animationend", function onUpcomingAnimationEnd(event) {
        if (event.animationName === appParams.animationRotateInFrames) {
          event.currentTarget.classList.remove(...event.currentTarget.classList);
          if (forecast.icon !== "-") event.currentTarget.classList.add("wi", `wi-${forecast[i].icon}`, appParams.classRotateOut);
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

export function displayCoords(coords) {
  const coordsHDMS = MapContainer.convertToHDMS(coords);
  latField.textContent = coordsHDMS.latitude;
  longField.textContent = coordsHDMS.longitude;
  coordsHDMS.latitudeHemi && (latField.textContent += ` ${lang[langSelect.value].hemi[coordsHDMS.latitudeHemi]}`);
  coordsHDMS.longitudeHemi && (longField.textContent += ` ${lang[langSelect.value].hemi[coordsHDMS.longitudeHemi]}`);
}

export function displayTime() {
  let time = getTime(langSelect.value, currentTimeZone, maxForecastDays);
  dateField.textContent = time.now;
  for (let i = 0; i < maxForecastDays; i++) {
    dayOfWeekFields[i].textContent = time.nextDays[i];
  }
}

export function findLocation(location) {
  searchTextInput.placeholder = `${lang[langSelect.value].searching} "${location}"...`;
  searchTextInput.value = "";
  return searchLocation(location).then((coords) => {
    if (coords) {
      searchTextInput.placeholder = lang[langSelect.value].searchPlaceholderInitial;
      return coords;
    } else {
      searchTextInput.placeholder = lang[langSelect.value].searchFail;
      setTimeout(() => {
        searchTextInput.placeholder = lang[langSelect.value].searchPlaceholderInitial;
      }, NOTIFICATION_DELAY);
      return false;
    }
  });
}

export async function displayLocation(coords) {
  let area = await getLocation(coords, langSelect.value);
  areaField.textContent = area ? area : lang[langSelect.value].unknown;
  displayImage();
}

export async function displayImage() {
  let image = await getImage(areaField.textContent);
  //console.log(`image : ${image}`);
  if (image) document.body.style.backgroundImage = `url(${image})`;
}
