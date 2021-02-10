import MapContainer from "./map_osm";

export const appParams = {
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
  idSearchFail: "search-fail",
  idLocations: "locations",
  idSearch: "search",
  idMic: "mic",
  idMap: "map",
  idWindUnits: "wind-units",
  idLatitude: "latitude",
  idLongitude: "longitude",
  classSearchWaiting: "search-waiting",
  classHintShow: "hint-show",
  classHintHide: "hint-hide",
  animationRotateInFrames: "rotate-in-frames",
  animationRotateOutFrames: "rotate-out-frames",
  classLanding: "landing",
  classRotateIn: "rotate-in",
  classRotateOut: "rotate-out",
  animationFadeInFrames: "fade-in-frames",
  animationFadeOutFrames: "fade-out-frames",
  classFadeIn: "fade-in",
  classFadeOut: "fade-out",
};

export const staticTranslatableLabels = document.getElementsByClassName(appParams.classTranslatable);
export const refreshButton = document.getElementById(appParams.idRefresh);
export const langSelect = document.getElementById(appParams.idLang);
export const unitsRadioButtons = document.getElementsByName(appParams.nameUnits);
export const areaField = document.getElementById(appParams.idArea);
export const dateField = document.getElementById(appParams.idDate);
export const wallpaperContainer = document.getElementById(appParams.idWallpaper);
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
export const locationsList = document.getElementById(appParams.idLocations);
export const searchFailHint = document.getElementById(appParams.idSearchFail);
export const searchButton = document.getElementById(appParams.idSearch);
export const micButton = document.getElementById(appParams.idMic);
export const searchTextInput = document.getElementById(appParams.idSearchText);
export const map = new MapContainer(appParams.idMap);
export const latField = document.getElementById(appParams.idLatitude);
export const longField = document.getElementById(appParams.idLongitude);

export const maxForecastDays = upcomingTemperatureFields.length;
