const appParams = {
  idBrushSize: "brush-size",
  idBrushColor: "brush-color",
  idClear: "clear",
  classCanvas: ".canvas",
  classCanvasContainer: ".canvas-container",
};

const brushSizeControl = document.getElementById(appParams.idBrushSize);
const brushColorControl = document.getElementById(appParams.idBrushColor);
const canvas = document.querySelector(appParams.classCanvas);
const canvasContainer = document.querySelector(appParams.classCanvasContainer);
const canvasContext = canvas.getContext("2d");

initCanvas();

var isDrawing = false;
var startX, startY;

brushSizeControl.addEventListener("change", onBrushSizeChange);
brushSizeControl.addEventListener("mousemove", onBrushSizeChange);

brushColorControl.addEventListener("change", onBrushColorChange);

document.getElementById(appParams.idClear).addEventListener("click", () => canvasContext.clearRect(0, 0, canvas.width, canvas.height));

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  [startX, startY] = [event.offsetX, event.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
canvas.addEventListener("mousemove", draw);

function onBrushSizeChange(event) {
  canvasContext.lineWidth = brushSizeControl.value;
}

function onBrushColorChange(event) {
  canvasContext.strokeStyle = brushColorControl.value;
}

function draw(event) {
  if (!isDrawing) return;
  canvasContext.beginPath();
  canvasContext.moveTo(startX, startY);
  canvasContext.lineTo(event.offsetX, event.offsetY);
  canvasContext.stroke();
  [startX, startY] = [event.offsetX, event.offsetY];
}

function initCanvas() {
  canvas.width =
    canvasContainer.clientWidth - parseInt(getComputedStyle(canvasContainer).paddingLeft) - parseInt(getComputedStyle(canvasContainer).paddingRight);
  canvas.height =
    canvasContainer.clientHeight - parseInt(getComputedStyle(canvasContainer).paddingTop) - parseInt(getComputedStyle(canvasContainer).paddingBottom);
  canvasContext.strokeStyle = brushColorControl.value;
  canvasContext.lineJoin = "round";
  canvasContext.lineCap = "round";
  canvasContext.lineWidth = brushSizeControl.value;
}
