import CalcUtils from './calcUtils';

test('splits integers properly', () => {
  const num1 = 100;
  const num1Results = [
    CalcUtils.splitInteger(num1, 3),
    CalcUtils.splitInteger(num1, 5),
    CalcUtils.splitInteger(num1, 7),
  ];
  for(let res of num1Results) {
    const total = res.reduce((a, b) => a + b, 0);
    expect(total).toBe(num1);
  }
  
  const num2 = 33;
  const num2Results = [
    CalcUtils.splitInteger(num2, 9),
    CalcUtils.splitInteger(num2, 8),
    CalcUtils.splitInteger(num2, 15),
  ];
  for(let res of num2Results) {
    const total = res.reduce((a, b) => a + b, 0);
    expect(total).toBe(num2);
  }
});

test('handles negative and invalid numbers', () => {
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
