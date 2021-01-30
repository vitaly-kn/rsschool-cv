import lang from "./lang";
import getTime from "./time";
import { searchLocation, getLocation } from "./geodata_osm";
import { currentTimeZone } from "./weather_osm";
import MapContainer from "./map_osm";

export const appParams = {
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

const NOTIFICATION_DELAY = 2000;

export const staticTranslatableLabels = document.getElementsByClassName(appParams.classTranslatable);
export const refreshButton = document.getElementById(appParams.idRefresh);
export const langSelect = document.getElementById(appParams.idLang);
export const unitsRadioButtons = document.getElementsByName(appParams.nameUnits);
export const areaField = document.getElementById(appParams.idArea);
export const dateField = document.getElementById(appParams.idDate);
export const temperatureField = document.getElementById(appParams.idTemperature);
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

export function getUnits() {
  return document.querySelector(`input[name="${appParams.nameUnits}"]:checked`).value;
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
  setWeatherIcon(weatherIconField, weather.id);
  descriptionField.textContent = weather.description;
  feelsLikeField.textContent = weather.feelsLike;
  windField.textContent = weather.wind;
  windUnitsField.textContent = lang[language].units[units].wind;
  humidityField.textContent = weather.humidity;
  for (let i = 0; i < maxForecastDays; i++) {
    upcomingTemperatureFields[i].textContent = weather.forecast[i].temperature;
    setWeatherIcon(upcomingWeatherIconFields[i], weather.forecast[i].id);
  }
}

function setWeatherIcon(field, id) {
  field.classList.remove(...field.classList);
  if (id !== "-") field.classList.add("owf", `owf-${id}`);
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
}
