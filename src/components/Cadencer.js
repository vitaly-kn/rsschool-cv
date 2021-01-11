export default class Cadencer {
  constructor(callback) {
    this.CADENCE = 3000;
    this.isPaused = true;
    this.callback = callback;
  }
  _tick() {
    this.callback();
  }
  _run() {
    if (this.isPaused) return;
    this._tick();
    setTimeout(this._run.bind(this), this.CADENCE);
  }
  start() {
    if (this.isPaused) {
      this.isPaused = false;
      this._run();
    }
  }
  stop() {
    this.isPaused = true;
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
}
