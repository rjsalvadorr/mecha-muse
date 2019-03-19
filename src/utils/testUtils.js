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
   * Builds test sketches for the UI
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
          duration: 6,
          harmonicContext: '???',
          pitches: [],
        },
        {
          pitch: 'C4',
          duration: 6,
          harmonicContext: '???',
          pitches: [],
        },
        {
          pitch: 'C4',
          duration: 1,
          harmonicContext: '???',
          pitches: [],
        },
        {
          pitch: 'C4',
          duration: 3,
          harmonicContext: '???',
          pitches: [],
        },
        {
          pitch: 'C4',
          duration: 16,
          harmonicContext: '???',
          pitches: [],
        },
      ],
      accompaniment: [
        {
          pitch: '',
          duration: 6,
          harmonicContext: '???',
          pitches: [
            'E3',
            'G3',
            'B3',
            'D3',
          ],
        },
        {
          pitch: '',
          duration: 6,
          harmonicContext: '???',
          pitches: [
            'B3',
            'D3',
            'F#3',
            'A3',
          ],
        },
        {
          pitch: '',
          duration: 20,
          harmonicContext: '???',
          pitches: [
            'A3',
            'C3',
            'E3',
            'G3',
          ],
        },
      ],
      bassline: [
        {
          pitch: 'E1',
          duration: 6,
          harmonicContext: '???',
          pitches: [],
        },
        {
          pitch: 'B1',
          duration: 6,
          harmonicContext: '???',
          pitches: [],
        },
        {
          pitch: 'A1',
          duration: 20,
          harmonicContext: '???',
          pitches: [],
        },
      ],
      chords: [
        {
          name: 'Em7',
          duration: 6,
          harmonicContext: 'i',
        },
        {
          name: 'Bm7',
          duration: 6,
          harmonicContext: 'v',
        },
        {
          name: 'Am7',
          duration: 20,
          harmonicContext: 'iv',
        },
      ],
      key: '',
      tags: [],
    };
  }
}

export default TestUtils;
