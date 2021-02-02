import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat, toLonLat } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const MAP_START_ZOOM = 10;

export default class MapContainer {
  constructor(container, zoom = MAP_START_ZOOM) {
    this.container = container;

    this.view = new View({
      center: fromLonLat([0, 0]),
      zoom: MAP_START_ZOOM,
    });

    this.map = new Map({
      target: this.container,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: this.view,
    });

    let zoomPanel = document.getElementById(this.container).querySelector(".ol-zoom");
    zoomPanel.style.top = "1.5em";
    zoomPanel.style.left = "1.5em";

    let contributionPanel = document.getElementById(this.container).querySelector(".ol-attribution");
    contributionPanel.style.bottom = "2.5em";
    contributionPanel.style.left = "1em";
    contributionPanel.style.right = "unset";
  }

  setCenter(coords, zoom = MAP_START_ZOOM) {
    this.view.setCenter(fromLonLat(coords));
    this.view.setZoom(zoom);
  }

  onPointSelect(callback) {
    this.map.on("singleclick", (event) => {
      callback(toLonLat(event.coordinate).slice());
    });
  }

  static convertToHDMS(coords) {
    const coordsHDMS = toStringHDMS(coords);
    const parsedCoords = coordsHDMS.match(/\b\d+(\u00b0|\u2032)/g);
    const latitude = `${parsedCoords[0]} ${parsedCoords[1]}`;
    const parsedLat = coordsHDMS.match(/(N|S)/g);
    const latitudeHemi = parsedLat ? parsedLat[0] : "";
    const longitude = `${parsedCoords[2]} ${parsedCoords[3]}`;
    const parsedLong = coordsHDMS.match(/(E|W)/g);
    const longitudeHemi = parsedLong ? parsedLong[0] : "";
    return { latitude, latitudeHemi, longitude, longitudeHemi };
  }
}
