const appParams = {
  classPanelsSelector: ".panel",
  classActivated: "activated",
  classShowHidden: "show-hidden",
};

const panels = document.querySelectorAll(appParams.classPanelsSelector);
const upperTextBlocks = document.querySelectorAll(`${appParams.classPanelsSelector} :first-child`);

panels.forEach((panel) => panel.addEventListener("click", toggleActivated));
panels.forEach((panel) => panel.addEventListener("transitionend", onPanelTransitionEnd));
upperTextBlocks.forEach((panel) => panel.addEventListener("transitionend", onTextBlockTransitionEnd));

function toggleActivated(event) {
  if (!this.classList.contains(appParams.classActivated)) {
    this.classList.add(appParams.classActivated);
  } else {
    this.classList.remove(appParams.classShowHidden);
  }
}

function onPanelTransitionEnd(event) {
  if (event.propertyName === "flex-grow" && this.classList.contains(appParams.classActivated)) {
    this.classList.add(appParams.classShowHidden);
  }
}

function onTextBlockTransitionEnd(event) {
  if (!this.parentElement.classList.contains(appParams.classShowHidden)) {
    this.parentElement.classList.remove(appParams.classActivated);
  }
}
