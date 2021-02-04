import { maxForecastDays } from "./ui";
const OWM_API = "46a8d7bc7f3c4adccd8efc07bf1a0431";

export let currentTimeZone = "UTC";

export function getWeather(coords, language, units) {
  const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${coords[0]}&exclude=hourly,minutely&units=${units}&appid=${OWM_API}&lang=${language.substring(
    0,
    2
  )}`;
  return fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data); //weather data
      currentTimeZone = data.timezone;
      let forecast = [];
      for (let i = 0; i < maxForecastDays; i++) {
        const avgTemp = Math.round((data.daily[i].temp.min + data.daily[i].temp.max) / 2);
        forecast.push({ temperature: avgTemp, id: data.daily[i].weather[0].id, icon: data.daily[i].weather[0].icon });
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
          forecast,
        },
        language,
        units,
      };
    })
    .catch((err) => {
      //console.log(`getWeather() catch! - ${err}`);
      let forecast = [];
      for (let i = 0; i < maxForecastDays; i++) {
        forecast.push({ temperature: "-", id: "-", icon: "-" });
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
          forecast,
        },
        language,
        units,
      };
    });
}
