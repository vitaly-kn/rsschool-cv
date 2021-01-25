import "./style.css";
import "./components/css/owfont-regular.css";
import lang from "./components/js/lang";
import "ol/ol.css";
import { Map, View } from "ol";
import { transform } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const appParams = {
  idSearchText: "search-text",
  idMic: "mic",
  idMap: "map",
};

const MAP_START_ZOOM = 11;
let currentLang = "en-US";

const micButton = document.getElementById(appParams.idMic);
const searchTextField = document.getElementById(appParams.idSearchText);

micButton.addEventListener("click", onMicButtonClick);

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

function onMicButtonClick(event) {
  if ("webkitSpeechRecognition" in window) {
    speechRecognize();
  }
}

function speechRecognize() {
  let recognition = new webkitSpeechRecognition();
  recognition.lang = currentLang;
  recognition.start();
  searchTextField.value = "";
  searchTextField.placeholder = lang[currentLang].searchPlaceholderMicOn;
  recognition.onend = function () {
    //console.log(`recognition session ended!`);
    searchTextField.placeholder = lang[currentLang].searchPlaceholderInitial;
  };
  recognition.onresult = function (event) {
    //console.log(`recognized: ${event.results.length}`);
    if (event.results.length > 0) {
      searchTextField.value = event.results[0][0].transcript;
      /*searchField.form.submit();*/
    }
  };
}
