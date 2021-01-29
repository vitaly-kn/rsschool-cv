export default function getTime(language, currentTimeZone, maxForecastDays) {
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
  let now = date.toLocaleString(language, options).replaceAll(/(,|\.)/g, "");
  let nextDays = [];
  for (let i = 0; i < maxForecastDays; i++) {
    date.setDate(date.getDate() + 1);
    nextDays.push(date.toLocaleString(language, { weekday: "long", timeZone: currentTimeZone }));
  }
  return {
    now,
    nextDays,
  };
}
