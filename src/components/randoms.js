const operators = [
  { operation: "+", display: "+" },
  { operation: "-", display: "-" },
  { operation: "*", display: "x" },
  { operation: "/", display: "÷" },
];
const operatorsIndexes = {
  add: 0,
  sub: 1,
  mul: 2,
  div: 3,
};
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

export function getRandomExpression(difficulty = 1) {
  //1 is the higest difficulty, 2, 3 ... -- lower
  let operator = getRandomInt(0, operators.length - 1);
  let operand1 = getRandomInt(0, Math.round(MAX_OPERAND_VALUE / difficulty));
  let operand2;
  if (operator <= 1) {
    operand2 = getRandomInt(0, Math.round(MAX_OPERAND_VALUE / 10));
  } else {
    operand2 = getRandomInt(1, 10);
  }
  let expression;
  let result;
  if (operator === operatorsIndexes.add || operator === operatorsIndexes.mul) {
    expression = `${operand1} ${operators[operator].operation} ${operand2}`;
    result = eval(expression);
  } else {
    if (operator === operatorsIndexes.sub) {
      expression = `${operand1} ${operators[operatorsIndexes.add].operation} ${operand2}`;
    } else expression = `${operand1} ${operators[operatorsIndexes.mul].operation} ${operand2}`;
    result = eval(expression);
    [operand1, result] = [result, operand1];
  }
  return {
    operand1: operand1,
    operation: operators[operator].display,
    operand2: operand2,
    result: result,
  };
}
