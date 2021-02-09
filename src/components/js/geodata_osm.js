export function searchLocation(location) {
  const api = `https://nominatim.openstreetmap.org/search?q=${encodeURI(location)}&format=json&limit=1`;
  return fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.length) {
        return [Number(data[0].lon), Number(data[0].lat)];
      } else {
        return false;
      }
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
        let area = "";
        const keys = ["city", "county", "state"];
        for (let i = 0; i < keys.length; i++) {
          if (data.address[keys[i]]) {
            area += `${data.address[keys[i]]}, `;
            break;
          }
        }
        area += data.address.country;
        return area;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
}
