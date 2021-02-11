export function searchLocation(location) {
  const api = `https://nominatim.openstreetmap.org/search?q=${encodeURI(location)}&format=json&limit=1`;
  return fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.length) {
        return [Number(data[0].lon), Number(data[0].lat)];
      }
      return false;
    })
    .catch(() => {
      return false;
    });
}

export function getLocation(coords, language) {
  const api = `https://nominatim.openstreetmap.org/reverse?lat=${coords[1]}&lon=${coords[0]}&format=json&zoom=10&accept-language=${language.substring(0, 2)}`;
  return fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.address) {
        const keys = ["city", "county", "state"];
        const localityType = keys.find((key) => data.address[key]);
        let area = localityType ? `${data.address[localityType]}, ` : "";
        area += data.address.country;
        return area;
      }
      return false;
    })
    .catch(() => {
      return false;
    });
}
