/**
 * Utility functions for numerical/math calculations
 */
class CalcUtils {
  /**
   * Returns the sum of an integer array's values
   * @static
   * @param {number[]} integerArray - array of integers
   * @returns {number} sum of integerArray's values
   */
  static getIntArraySum(integerArray) {
    return integerArray.reduce((a, b) => a + b, 0);
  }

  /**
   * Returns a random integer between the two given numbers
   * @static
   * @param {number} minimum - minimum number (inclusive)
   * @param {number} maximum - maximum number (exclusive)
   * @returns {number} random integer between the two parameters
   */
  static getRandomInt(minimum, maximum) {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min)) + min;
    // The maximum is exclusive and the minimum is inclusive
  }

  /**
   * Splits an integer into several random parts
   * @static
   * @param {number} numToSplit - integer to split
   * @param {number} numSections - # of sections
   * @returns {number[]} addends
   */
  static splitInteger(numToSplit, numSections) {
    if (numSections >= numToSplit) {
      let errorMsg = '# of sections must be smaller than # to split!';
      errorMsg += ` (${numToSplit}, ${numSections})`;
      throw Error(errorMsg);
    }
    if (numSections <= 0 || numToSplit <= 0) {
      throw Error('# of sections and # to split must be larger than 0!');
    }

    const splitValues = [];
    let remaining = numToSplit;
    let nextNumber;
    for (let i = numSections; i > 1; i--) {
      nextNumber = this.getRandomInt(1, remaining - i);
      splitValues.push(nextNumber);
      remaining -= nextNumber;
    }
    splitValues.push(remaining);
    return splitValues;
  }

  /**
   * Splits an integer array into more parts
   * @static
   * @param {number} arrayToSplit - integer array to split
   * @param {number} numSections - # of sections
   * @returns {number[]} larger integer array
   */
  static splitIntegerArray(arrayToSplit, numSections) {
    if (!numSections || numSections <= 0) {
      throw Error('# to split must be larger than 0!');
    }
    if (!arrayToSplit || arrayToSplit.length === 0) {
      throw Error('arrayToSplit must have values!');
    }
    if (numSections <= arrayToSplit.length) {
      throw Error('# of sections must be larger than array length!');
    }
    const arrayTotal = this.getIntArraySum(arrayToSplit);
    if (arrayTotal <= numSections) {
      throw Error('Integer array total must be larger than number of sections!');
    }

    const numSplits = numSections - arrayToSplit.length;
    let currentArray = arrayToSplit.slice(0);
    let randomIndex;
    let arraySlice1;
    let arraySlice2;
    let elementToSplit;
    let splitVals;

    for (let i = 0; i < numSplits; i++) {
      randomIndex = this.getRandomInt(0, currentArray.length);
      arraySlice1 = currentArray.slice(0, randomIndex + 1);
      arraySlice2 = currentArray.slice(randomIndex + 1, currentArray.length);
      elementToSplit = arraySlice1.pop();
      if (elementToSplit <= 2) {
        // we want to skip this iteration of the loop,
        // and make the loop go for another time.
        i -= 1;
        continue;
      }
      splitVals = this.splitInteger(elementToSplit, 2);
      arraySlice1.push(splitVals[0]);
      arraySlice1.push(splitVals[1]);
      currentArray = arraySlice1.concat(arraySlice2);
    }

    return currentArray;
  }

  /**
   * Converts duration numbers
   * @static
   * @param {number} duration - duration generated by mecha-muse system
   * @returns {string[]} converted duration to match MidiWriterJS system.
   */
  static convertDuration(duration) {
    const outDuration = [];
    for (let i = 0; i < duration; i++) {
      outDuration.push('16');
    }
    return outDuration;
  }
}

export default CalcUtils;
