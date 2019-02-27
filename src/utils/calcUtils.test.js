import CalcUtils from './calcUtils';

test('adds int arrays properly', () => {
  const testArray = [16, 8, 8];
  const resultSum = CalcUtils.getIntArraySum(testArray);
  expect(resultSum).toBe(32);
});

test('splits integers properly', () => {
  const num1 = 100;
  const num1Results = [
    CalcUtils.splitInteger(num1, 3),
    CalcUtils.splitInteger(num1, 5),
    CalcUtils.splitInteger(num1, 7),
  ];
  for(let res of num1Results) {
    const total = CalcUtils.getIntArraySum(res)
    expect(total).toBe(num1);
  }
  
  const num2 = 33;
  const num2Results = [
    CalcUtils.splitInteger(num2, 9),
    CalcUtils.splitInteger(num2, 8),
    CalcUtils.splitInteger(num2, 15),
  ];
  for(let res of num2Results) {
    const total = CalcUtils.getIntArraySum(res)
    expect(total).toBe(num2);
  }
});

test('handles negative and invalid numbers for integer splitting', () => {
  const num1 = 100;
  const num2 = 33;

  expect(() => {
    CalcUtils.splitInteger(num1, -5);
  }).toThrow();
  expect(() => {
    CalcUtils.splitInteger(num1, 0);
  }).toThrow();
  expect(() => {
    CalcUtils.splitInteger(num1, 101);
  }).toThrow();
  expect(() => {
    CalcUtils.splitInteger(0, 101);
  }).toThrow();
  expect(() => {
    CalcUtils.splitInteger(-5, 3);
  }).toThrow();
  expect(() => {
    CalcUtils.splitInteger(num2, num2);
  }).toThrow();
});

test('splits integer arrays properly', () => {
  const testArray = [16, 8, 8];
  const resultArray1 = CalcUtils.splitIntegerArray(testArray, 4);
  const resultArray2 = CalcUtils.splitIntegerArray(testArray, 5);
  const resultArray3 = CalcUtils.splitIntegerArray(testArray, 6);

  // Check that sums line up
  expect(CalcUtils.getIntArraySum(resultArray1)).toBe(CalcUtils.getIntArraySum(testArray));
  expect(CalcUtils.getIntArraySum(resultArray2)).toBe(CalcUtils.getIntArraySum(testArray));
  expect(CalcUtils.getIntArraySum(resultArray3)).toBe(CalcUtils.getIntArraySum(testArray));
});
