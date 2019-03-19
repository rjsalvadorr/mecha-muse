import CalcUtils from './calcUtils';

/**
 * Utility functions for testing
 */
class TestUtils {
  /**
   * Prints variables to the console.
   * @static
   * @param {Object[]}} nameValuePairs - name/value of variable to print
   */
  static printVariables(nameValuePairs) {
    let msg = '';
    for (const nameValuePair of nameValuePairs) {
      msg += `${nameValuePair.name} = ${JSON.stringify(nameValuePair.value, null, 2)}\n`;
    }
    console.log(msg);
  }

  /**
   * Prints variables to the console.
   * @static
   */
  static buildTestSketch() {
    const randomId = CalcUtils.getRandomInt(1, 65535);
    const randomName = `test-${randomId}-${CalcUtils.getRandomInt(1, 65535)}`
    return {
      id: randomId,
      name: randomName,
      melody: [
        {
          pitch: 'C4',
          duration: 15,
          harmonicContext: '???',
          pitches: []
        },
        {
          pitch: 'C4',
          duration: 11,
          harmonicContext: '???',
          pitches: []
        },
        {
          pitch: 'C4',
          duration: 2,
          harmonicContext: '???',
          pitches: []
        },
        {
          pitch: 'C4',
          duration: 4,
          harmonicContext: '???',
          pitches: []
        }
      ],
      accompaniment: [],
      bassline: [
        {
          pitch: 'E1',
          duration: 26,
          harmonicContext: '???',
          pitches: []
        },
        {
          pitch: 'B1',
          duration: 6,
          harmonicContext: '???',
          pitches: []
        }
      ],
      chords: [
        {
          name: 'Em7',
          duration: 26,
          harmonicContext: 'i'
        },
        {
          name: 'Bm7',
          duration: 6,
          harmonicContext: 'v'
        }
      ],
      key: '',
      tags: [],
    };
  }
}

export default TestUtils;
