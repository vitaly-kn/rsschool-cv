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
