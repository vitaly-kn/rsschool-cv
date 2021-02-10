import { createApi } from "unsplash-js";

export function getImage(request) {
  const unsplash = createApi({ accessKey: "clTdAjXwclkfRbFVJs3L_OF_eZhsu0t75DH7eerWIEM" });
  return unsplash.search
    .getPhotos({
      query: request,
      page: 1,
      perPage: 10,
      orientation: "landscape",
    })
    .then((result) => {
      let returnImage;
      if (!result.errors) {
        const returnImageIndex = getRandomInt(0, result.response.results.length);
        returnImage = result.response.results[returnImageIndex]?.urls.regular;
      }
      return returnImage ? returnImage : false;
    });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
