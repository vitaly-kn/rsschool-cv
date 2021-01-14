export default class Cadencer {
  constructor(callback, cadence = 3000) {
    this.cadence = cadence;
    this.isPaused = true;
    this.callback = callback;
    this.timerID;
  }
  _run() {
    if (this.isPaused) return;
    this.callback();
    this.timerID = setTimeout(this._run.bind(this), this.cadence);
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
    this.cadence = cadence;
  }
  getCadence() {
    return this.cadence;
  }
}
