import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
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

  on(event, callback) {
    this.map.on(event, callback);
  }
}
