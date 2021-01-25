import "./style.css";
import "./owfont-regular.css";
import "ol/ol.css";
import { Map, View } from "ol";
import { transform } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const appParams = {
  idSearch: "search",
  idMic: "mic",
  idMap: "map",
};

const MAP_START_ZOOM = 11;

const micButton = document.getElementById(appParams.idMic);
const searchField = document.getElementById(appParams.idSearch);

micButton.addEventListener("click", onMicButtonclick);

const map = new Map({
  target: appParams.idMap,
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: transform([27.57, 53.9], "EPSG:4326", "EPSG:3857"),
    zoom: MAP_START_ZOOM,
  }),
});

function onMicButtonclick(event) {
  if ("webkitSpeechRecognition" in window) {
    speechRecognize();
  }
}

function speechRecognize() {
  let recognition = new webkitSpeechRecognition();
  recognition.onresult = function (event) {
    if (event.results.length > 0) {
      searchField.value = event.results[0][0].transcript;
      /*searchField.form.submit();*/
    }
  };
}
