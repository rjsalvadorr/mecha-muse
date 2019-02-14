const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  //The maximum is exclusive and the minimum is inclusive
};

// function tested here:
// https://codepen.io/rjsalvadorr/pen/qgyyVq?editors=1010#0
export const splitInteger = (numToSplit, numSections) => {
  const splitValues = [];
  let remaining = numToSplit;
  let nextNumber;
  for(var i = numSections; i > 1; i--) {
    nextNumber = getRandomInt(1, remaining - i);
    splitValues.push(nextNumber);
    remaining = remaining - nextNumber;
  }
  splitValues.push(remaining);
  return splitValues;
};
