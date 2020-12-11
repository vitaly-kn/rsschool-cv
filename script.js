const appParams = {
  idBrushSize: "brush-size",
  idBrushColor: "brush-color",
  idClear: "clear",
  classCanvas: ".canvas",
};

const brushSizeControl = document.getElementById(appParams.idBrushSize);
const brushColorControl = document.getElementById(appParams.idBrushColor);
let canvas, canvasContainer;
let isDrawing = false;
let startX, startY;

function initCanvas() {
  canvas = document.querySelector(appParams.classCanvas);
  canvasContext = canvas.getContext("2d");

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
  canvas.addEventListener("mousemove", draw);

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  canvasContext.strokeStyle = brushColorControl.value;
  canvasContext.lineJoin = "round";
  canvasContext.lineCap = "round";
  canvasContext.lineWidth = brushSizeControl.value;
}

brushSizeControl.addEventListener("change", onBrushSizeChange);
brushSizeControl.addEventListener("mousemove", onBrushSizeChange);

brushColorControl.addEventListener("change", onBrushColorChange);

document.getElementById(appParams.idClear).addEventListener("click", clearCanvas);

function startDrawing(event) {
  isDrawing = true;
  [startX, startY] = [event.offsetX, event.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

function draw(event) {
  if (!isDrawing) return;
  canvasContext.beginPath();
  canvasContext.moveTo(startX, startY);
  canvasContext.lineTo(event.offsetX, event.offsetY);
  canvasContext.stroke();
  [startX, startY] = [event.offsetX, event.offsetY];
}

function onBrushSizeChange(event) {
  canvasContext.lineWidth = brushSizeControl.value;
}

function onBrushColorChange(event) {
  canvasContext.strokeStyle = brushColorControl.value;
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

initCanvas();
