import lang from "./lang";
import locations from "./locations";
import * as uiElement from "./uielements";
import getTime from "./time";
import { searchLocation, getLocation } from "./geodata_osm";
import { currentTimeZone } from "./weather_osm";
import { getImage } from "./image_unsplash";
import MapContainer from "./map_osm";

const NOTIFICATION_DELAY = 1000;

uiElement.wallpaperContainer.addEventListener("animationend", onWallpaperContainerAnimationEnd);
uiElement.weatherIconContainer.addEventListener("animationend", onWeatherIconContainerAnimationEnd);
uiElement.searchFailHint.addEventListener("transitionend", onSearchFailHintTransitionEnd);

export function getUnits() {
  return document.querySelector(`input[name="${uiElement.appParams.nameUnits}"]:checked`).value;
}

export function setUnits(value) {
  document.querySelector(`input[name="${uiElement.appParams.nameUnits}"][value="${value}"]`).checked = true;
}

export function translateStaticLabels() {
  uiElement.searchTextInput.placeholder = lang[uiElement.langSelect.value].searchPlaceholderInitial;
  for (let label of uiElement.staticTranslatableLabels) {
    label.textContent = lang[uiElement.langSelect.value][label.id];
  }
  fillLocationsList();
}

function fillLocationsList() {
  let list = locations.map((entry) => {
    let option = document.createElement("option");
    option.setAttribute("value", entry.coords);
    option.textContent = entry[uiElement.langSelect.value];
    return option;
  });
  let emptyLine = document.createElement("option");
  emptyLine.setAttribute("value", "");
  list.unshift(emptyLine);
  uiElement.locationsList.innerHTML = "";
  uiElement.locationsList.append(...list);
}

export function displayWeather({ weather, language, units }) {
  uiElement.temperatureField.textContent = weather.temperature;
  setMainWeatherIcon(weather.icon);
  uiElement.descriptionField.textContent = weather.description;
  uiElement.feelsLikeField.textContent = weather.feelsLike;
  uiElement.windField.textContent = weather.wind;
  uiElement.windUnitsField.textContent = lang[language].units[units].wind;
  uiElement.humidityField.textContent = weather.humidity;
  updateUpcomingWeatherInformation(weather.forecast);
}

function setMainWeatherIcon(icon) {
  uiElement.weatherIconField.classList.remove(...uiElement.weatherIconField.classList);
  if (icon !== "-") {
    uiElement.weatherIconContainer.classList.add(uiElement.appParams.classLanding);
    uiElement.weatherIconField.classList.add("wi", `wi-${icon}`);
  }
}

function onWeatherIconContainerAnimationEnd(event) {
  event.currentTarget.classList.remove(uiElement.appParams.classLanding);
}

function updateUpcomingWeatherInformation(forecast) {
  let i = 0;
  (function loop() {
    if (i < uiElement.maxForecastDays) {
      uiElement.upcomingWeatherIconFields[i].classList.add("wi", `wi-${forecast.icon}`, uiElement.appParams.classRotateIn);
      uiElement.upcomingTemperatureFields[i].textContent = forecast[i].temperature;
      uiElement.upcomingWeatherIconFields[i].addEventListener("animationend", function onUpcomingAnimationEnd(event) {
        if (event.animationName === uiElement.appParams.animationRotateInFrames) {
          event.currentTarget.classList.remove(...event.currentTarget.classList);
          if (forecast.icon !== "-") event.currentTarget.classList.add("wi", `wi-${forecast[i].icon}`, uiElement.appParams.classRotateOut);
        } else {
          event.currentTarget.removeEventListener("animationend", onUpcomingAnimationEnd);
          event.currentTarget.classList.remove(uiElement.appParams.classRotateOut);
          i++;
          loop();
        }
      });
    }
  })();
}

export function displayCoords(coords) {
  const coordsHDMS = MapContainer.convertToHDMS(coords);
  uiElement.latField.textContent = coordsHDMS.latitude;
  uiElement.longField.textContent = coordsHDMS.longitude;
  coordsHDMS.latitudeHemi && (uiElement.latField.textContent += ` ${lang[uiElement.langSelect.value].hemi[coordsHDMS.latitudeHemi]}`);
  coordsHDMS.longitudeHemi && (uiElement.longField.textContent += ` ${lang[uiElement.langSelect.value].hemi[coordsHDMS.longitudeHemi]}`);
}

export function displayTime() {
  let time = getTime(uiElement.langSelect.value, currentTimeZone, uiElement.maxForecastDays);
  uiElement.dateField.textContent = time.now;
  for (let i = 0; i < uiElement.maxForecastDays; i++) {
    uiElement.dayOfWeekFields[i].textContent = time.nextDays[i];
  }
}

export function findLocation(location) {
  uiElement.searchTextInput.placeholder = `${lang[uiElement.langSelect.value].searching} "${location}"...`;
  uiElement.searchTextInput.value = "";
  return searchLocation(location).then((coords) => {
    uiElement.searchTextInput.placeholder = lang[uiElement.langSelect.value].searchPlaceholderInitial;
    if (coords) {
      return coords;
    } else {
      uiElement.searchFailHint.classList.add(uiElement.appParams.classHintShow);
      return false;
    }
  });
}

function onSearchFailHintTransitionEnd(event) {
  if (event.currentTarget.classList.contains(uiElement.appParams.classHintHide)) {
    event.currentTarget.classList.remove(uiElement.appParams.classHintShow, uiElement.appParams.classHintHide);
  } else {
    setTimeout(() => {
      uiElement.searchFailHint.classList.add(uiElement.appParams.classHintHide);
    }, NOTIFICATION_DELAY);
  }
}

export async function displayLocation(coords) {
  let area = await getLocation(coords, uiElement.langSelect.value);
  uiElement.areaField.textContent = area ? area : lang[uiElement.langSelect.value].unknown;
  displayImage();
}

export async function displayImage() {
  let image = await getImage(uiElement.areaField.textContent);
  if (image) {
    uiElement.wallpaperContainer.nextImage = `url(${image})`;
    uiElement.wallpaperContainer.classList.add(uiElement.appParams.classFadeIn);
  }
}

function onWallpaperContainerAnimationEnd(event) {
  if (event.animationName === uiElement.appParams.animationFadeInFrames) {
    event.currentTarget.classList.remove(uiElement.appParams.classFadeIn);
    event.currentTarget.classList.add(uiElement.appParams.classFadeOut);
    event.currentTarget.style.backgroundImage = event.currentTarget.nextImage;
  } else {
    event.currentTarget.classList.remove(uiElement.appParams.classFadeOut);
  }
}
