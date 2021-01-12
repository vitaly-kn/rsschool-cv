export default class Cadencer {
  constructor(callback, cadence = 3000) {
    this.CADENCE = cadence;
    this.isPaused = true;
    this.callback = callback;
    this.timerID;
  }
  _tick() {
    this.callback();
  }
  _run() {
    if (this.isPaused) return;
    this._tick();
    this.timerID = setTimeout(this._run.bind(this), this.CADENCE);
  }
  start() {
    if (this.isPaused) {
      this.isPaused = false;
      this._run();
    }
  }
  stop() {
    this.isPaused = true;
    clearTimeout(this.timerID);
  }
  toggle() {
    if (this.isPaused) {
      this.start();
      return true;
    } else {
      this.stop();
      return false;
    }
  }
  setCadence(cadence) {
    this.CADENCE = cadence;
  }
  getCadence(cadence) {
    return this.CADENCE;
  }
}
