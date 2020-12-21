const Keyboard = {
  elements: {
    main: null,
    //keysContainer: null,
    keys: [],
  },

  /*eventHandlers: {
    oninput: null,
    onclose: null,
  },*/
  onInputHandler: null,

  /*properties: {
    value: "",
    capsLock: false,
  },*/
  isCapsLockPressed: false,

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    //this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard_hidden");
    //this.elements.keysContainer.classList.add("keyboard__keys");
    //this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.main.appendChild(this._createKeys());

    this.elements.keys = this.elements.main.querySelectorAll(".keyboard__key");

    // Add to DOM
    //this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        //console.log(`${element} focused!`);
        /*this.open(element.value, function (currentValue) {
          element.value = currentValue;
        });*/
        this.open(function (character) {
          if (character !== "\b") {
            element.value += character;
          } else {
            element.value = element.value.substring(0, element.value.length - 1);
          }
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    //prettier-ignore
    const keyLayout = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "hide", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
    ];

    // Creates HTML for an icon
    /*const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };*/

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.textContent = key.toLowerCase();
      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key_wide");
          /*eyElement.innerHTML = createIconHTML("backspace");*/

          keyElement.addEventListener("click", () => {
            //this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            //this._triggerEvent("oninput");
            //this.properties.value += "\b";
            //this.onInputHandler(this.properties.value);
            this.onInputHandler("\b");
          });

          break;

        case "caps lock":
          keyElement.classList.add("keyboard__key_wide", "keyboard__key_activable");
          /*keyElement.innerHTML = createIconHTML("keyboard_capslock");*/

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key_active", this.isCapsLockPressed);
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key_wide");
          /*keyElement.innerHTML = createIconHTML("keyboard_return");*/

          keyElement.addEventListener("click", () => {
            //this.properties.value += "\n";
            //this._triggerEvent("oninput");
            //this.onInputHandler(this.properties.value);
            this.onInputHandler("\n");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key_extra-wide");
          /*keyElement.innerHTML = createIconHTML("space_bar");*/

          keyElement.addEventListener("click", () => {
            //this.properties.value += " ";
            //this._triggerEvent("oninput");
            //this.onInputHandler(this.properties.value);
            this.onInputHandler(" ");
          });

          break;

        case "hide":
          keyElement.classList.add("keyboard__key_wide");

          /*keyElement.innerHTML = createIconHTML("check_circle");*/

          keyElement.addEventListener("click", () => {
            this.close();
            //this._triggerEvent("onclose");
          });

          break;

        default:
          //keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            //this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            //const character = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            const character = this.isCapsLockPressed ? key.toUpperCase() : key.toLowerCase();
            //this._triggerEvent("oninput");
            this.onInputHandler(character);
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },
  /*_onInputHandler(element)*/
  /*_triggerEvent(handlerName) {
    //if (typeof this.eventHandlers[handlerName] == "function") {
    //Is this check really needed?
    this.eventHandlers[handlerName](this.properties.value);
    //}
  },*/

  _toggleCapsLock() {
    //this.properties.capsLock = !this.properties.capsLock;
    this.isCapsLockPressed = !this.isCapsLockPressed;

    for (const key of this.elements.keys) {
      //if (key.childElementCount === 0) {
      if (key.textContent.length === 1) {
        //key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        key.textContent = this.isCapsLockPressed ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  //open(initialValue, oninput, onclose) {
  open(handler) {
    /*this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;*/
    this.onInputHandler = handler;
    this.elements.main.classList.remove("keyboard_hidden");
  },

  close() {
    /*this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;*/
    this.elements.main.classList.add("keyboard_hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
