const Keyboard = {
  elements: {
    main: null,
    keys: [],
  },

  onInputHandler: null,

  isCapsLockPressed: false,

  init() {
    this.elements.main = document.createElement("div");
    this.elements.main.classList.add("keyboard", "keyboard_hidden");
    this.elements.main.appendChild(this._createKeys());
    this.elements.keys = this.elements.main.querySelectorAll(".keyboard__key");
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
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

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.textContent = key.toLowerCase();
      this._addKeyEventListener(key, keyElement);
      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },

  _addKeyEventListener(key, keyElement) {
    switch (key) {
      case "backspace":
        keyElement.classList.add("keyboard__key_wide");
        keyElement.addEventListener("click", () => {
          this.onInputHandler("\b");
        });
        break;

      case "caps lock":
        keyElement.classList.add("keyboard__key_wide", "keyboard__key_activable");
        keyElement.addEventListener("click", () => {
          this._toggleCapsLock();
          keyElement.classList.toggle("keyboard__key_active", this.isCapsLockPressed);
        });
        break;

      case "enter":
        keyElement.classList.add("keyboard__key_wide");
        keyElement.addEventListener("click", () => {
          this.onInputHandler("\n");
        });
        break;

      case "space":
        keyElement.classList.add("keyboard__key_extra-wide");
        keyElement.addEventListener("click", () => {
          this.onInputHandler(" ");
        });
        break;

      case "hide":
        keyElement.classList.add("keyboard__key_wide");
        keyElement.addEventListener("click", () => {
          this.close();
        });
        break;

      default:
        keyElement.addEventListener("click", () => {
          const character = this.isCapsLockPressed ? key.toUpperCase() : key.toLowerCase();
          this.onInputHandler(character);
        });
        break;
    }
  },

  _toggleCapsLock() {
    this.isCapsLockPressed = !this.isCapsLockPressed;

    for (const key of this.elements.keys) {
      if (key.textContent.length === 1) {
        key.textContent = this.isCapsLockPressed ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(handler) {
    this.onInputHandler = handler;
    this.elements.main.classList.remove("keyboard_hidden");
  },

  close() {
    this.elements.main.classList.add("keyboard_hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
