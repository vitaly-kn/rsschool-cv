const operators = [
  { name: "add", operation: "+", display: "+" },
  { name: "sub", operation: "-", display: "-" },
  { name: "mul", operation: "*", display: "x" },
  { name: "div", operation: "/", display: "÷" },
];

const FIRST_TRACK_OFFSET = 5;
const TRACK_STEP = 10;
const MAX_TRACKS = 9;
const MAX_OPERAND_VALUE = 99;

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomDropOffset() {
  let track = getRandomInt(0, MAX_TRACKS - 1);
  return `${FIRST_TRACK_OFFSET + track * TRACK_STEP}%`;
}

export function getRandomExpression(difficulty = 1, maxOperand = MAX_OPERAND_VALUE, operationsMask = { add: true, sub: true, mul: true, div: true }) {
  //1 is the higest difficulty, 2, 3 ... -- lower
  let operator;
  do {
    operator = getRandomInt(0, operators.length - 1);
  } while (!operationsMask[operators[operator].name]);
  if (difficulty > maxOperand) difficulty = 1;
  let [operand1, operand2] = getOperands(operator, difficulty, maxOperand);
  let expression = `${operand1} ${operators[operator].operation} ${operand2}`;
  let result = eval(expression);
  return {
    operand1,
    operation: operators[operator].display,
    operand2,
    result,
  };
}

function getOperands(operator, difficulty, maxOperand) {
  let operand1 = getRandomInt(0, Math.round(maxOperand / difficulty));
  let operand2;
  if (operators[operator].operation === "+" || operators[operator].operation === "*") {
    operand2 = getRandomInt(0, Math.round(maxOperand / difficulty));
  } else if (operators[operator].operation === "-") {
    operand2 = getRandomInt(0, Math.round(maxOperand / difficulty));
    if (operand1 < operand2) [operand1, operand2] = [operand2, operand1];
  } else if (operand1) {
    let divisors = getDivisors(operand1);
    operand2 = divisors[getRandomInt(0, divisors.length - 1)];
  } else operand2 = getRandomInt(1, Math.round(maxOperand / difficulty));
  return [operand1, operand2];
}

function getDivisors(int) {
  let divisors = [];
  for (let i = 1; i <= Math.floor(Math.sqrt(int)); i++) {
    if (!(int % i)) {
      divisors.push(i);
      divisors.push(Math.trunc(int / i));
    }
  }
  return divisors;
}
