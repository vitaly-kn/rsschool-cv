const applicationParams = {
  classScreen: ".screen",
  classServices: ".service",
  classDigits: ".digit",
  classOperators: ".operator",
  idClearScreen: "clrscr",
  idClear: "clear",
  isSign: "sign",
  idDiv: "div",
  idMult: "mult",
  idPlus: "plus",
  idMinus: "minus",
  idDot: ".",
  idResult: "result",
  attrDigit: "data-dgt",
  maxPrecisionRange: 15,
  exponentialPrecision: 9,
};

var hasDot = false;
var memoryRegister = 0;
var savedOperator = "";
var isNewNumber = true;

const screen = document.querySelector(applicationParams.classScreen);

const services = document.querySelectorAll(applicationParams.classServices);
services.forEach((btnService) => btnService.addEventListener("click", onServiceClick));

const digits = document.querySelectorAll(applicationParams.classDigits);
digits.forEach((btnDigit) => btnDigit.addEventListener("click", onDigitClick));

const operators = document.querySelectorAll(applicationParams.classOperators);
operators.forEach((btnOperator) => btnOperator.addEventListener("click", onOperatorClick));

document.getElementById(applicationParams.idDot).addEventListener("click", () => {
  if (!hasDot) {
    if (isNewNumber) {
      screen.value = `0${applicationParams.idDot}`;
      isNewNumber = false;
    } else {
      screen.value += applicationParams.idDot;
    }
    hasDot = true;
  }
});

function onServiceClick(event) {
  screen.value = "0";
  hasDot = false;
  isNewNumber = true;
  if (event.target.getAttribute("id") === applicationParams.idClear) {
    memoryRegister = 0;
    savedOperator = "";
  }
}

function onDigitClick(event) {
  if (screen.value.length < applicationParams.maxPrecisionRange || isNewNumber) {
    const input = event.target.getAttribute(applicationParams.attrDigit);
    if (isNewNumber) {
      screen.value = input;
      isNewNumber = false;
    } else {
      screen.value += input;
    }
  }
}

function onOperatorClick(event) {
  let operator = event.target.getAttribute("id");
  if (operator === applicationParams.isSign) {
    screen.value *= -1;
  } else {
    hasDot = false;
    isNewNumber = true;
    if (savedOperator === "") {
      if (operator != applicationParams.idResult) {
        savedOperator = operator;
        memoryRegister = screen.value;
      }
    } else {
      screen.value = performOperation();
      if (operator === applicationParams.idResult) {
        memoryRegister = 0;
        savedOperator = "";
      } else {
        memoryRegister = screen.value;
      }
    }
  }
}

function performOperation() {
  let result;
  if (savedOperator === applicationParams.idDiv) {
    result = memoryRegister / screen.value;
    return String(result).length <= applicationParams.maxPrecisionRange ? result : result.toExponential(applicationParams.exponentialPrecision);
  }
  if (savedOperator === applicationParams.idMult) {
    result = memoryRegister * screen.value;
    return String(result).length <= applicationParams.maxPrecisionRange ? result : result.toExponential(applicationParams.exponentialPrecision);
  }
  if (savedOperator === applicationParams.idMinus) {
    result = +memoryRegister - +screen.value;
    return String(result).length <= applicationParams.maxPrecisionRange ? result : result.toExponential(applicationParams.exponentialPrecision);
  }
  if (savedOperator === applicationParams.idPlus) {
    result = +memoryRegister + +screen.value;
    return String(result).length <= applicationParams.maxPrecisionRange ? result : result.toExponential(applicationParams.exponentialPrecision);
  }
}
