/**
 * Utility functions for numerical/math calculations
 */
class CalcUtils {
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
}

export default CalcUtils;
