const appParams = {
  idOpacity: "opacity",
  idBlur: "blur",
  idBorderRadius: "border-radius",
  idXScale: "x-scale",
  nameRadioButtons: "background-color",
  varPrefix: "--image-",
};

const opacityControl = document.getElementById(appParams.idOpacity);
const blurControl = document.getElementById(appParams.idBlur);
const borderRadiusControl = document.getElementById(appParams.idBorderRadius);
const xScaleControl = document.getElementById(appParams.idXScale);
const radioButtons = document.getElementsByName(appParams.nameRadioButtons);

opacityControl.addEventListener("change", onOpacityChange);
opacityControl.addEventListener("mousemove", onOpacityChange);

blurControl.addEventListener("change", onBlurChange);
blurControl.addEventListener("mousemove", onBlurChange);

borderRadiusControl.addEventListener("change", onBorderRadiusChange);

xScaleControl.addEventListener("change", onXScaleChange);

radioButtons.forEach((radioButton) => radioButton.addEventListener("change", onRadioButtonChecked));

function onOpacityChange(event) {
  const opacityValue = this.value / 10;
  document.documentElement.style.setProperty(`${appParams.varPrefix}${this.name}`, opacityValue);
}

function onBlurChange(event) {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(`${appParams.varPrefix}${this.name}`, this.value + suffix);
}

function onBorderRadiusChange(event) {
  const suffix = this.dataset.sizing || "";
  let borderRadius = Math.floor(this.value);
  if (borderRadius > 50) {
    borderRadius = 50;
  } else if (borderRadius < 0) {
    borderRadius = 0;
  }
  this.value = borderRadius;
  document.documentElement.style.setProperty(`${appParams.varPrefix}${this.name}`, this.value + suffix);
}

function onXScaleChange(event) {
  let xScale;
  if (this.checked) {
    xScale = "-1";
  } else {
    xScale = "1";
  }
  document.documentElement.style.setProperty(`${appParams.varPrefix}${this.name}`, xScale);
}

function onRadioButtonChecked(event) {
  document.documentElement.style.setProperty(`${appParams.varPrefix}${this.name}`, this.value);
}
