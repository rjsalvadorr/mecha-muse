import Note from '../entities/note';
import Chord from '../entities/chord';
import Sketch from '../entities/sketch';
import CalcUtils from './calcUtils';

/**
 * Builds mecha-muse sketches
 */
class SketchBuilder {
  /**
     * Builds randomly-generated music sketches
     * @static
     * @param {string} key - thing
     * @param {number} numSketches - thing
     * @returns array of sketches
     */
  static buildSketches(key, numSketches, numMeasures) {
    const beatUnitsPerMeasure = 16; // Using 16th notes in 4/4 for now
    const measures = numMeasures || 2;
    const beatUnits = measures * beatUnitsPerMeasure;

    const sketch = new Sketch();
    sketch.chords = this.buildChords;
    return sketch;
  }

  /**
     * Things
     * @static
     * @private
     * @param {string} key - thing
     * @returns array of chords
     */
  static buildChords(key, numMeasures, beatUnits) {
    const chordsUpperBound = Math.floor(numMeasures * 1.5);
    const numChords = CalcUtils.getRandomInt(numMeasures, chordsUpperBound);

    const durations = splitInteger(beatUnits, numChords);
    const chords = [];
    for (const chordDuration of durations) {
      chords.push(new Chord('test', chordDuration, 'testy'));
    }
    return chords;
  }

  /**
     * Things
     * @static
     * @private
     * @param {string} key - thing
     * @returns array of chords
     */
  static buildMelody(key, chords) {
    const dummySketch = new Sketch();
    return dummySketch;
  }

  /**
     * Things
     * @static
     * @private
     * @param {string} key - thing
     * @returns array of chords
     */
  static buildAccompaniment(key, chords) {
    const dummySketch = new Sketch();
    return dummySketch;
  }

  /**
     * Things
     * @static
     * @private
     * @param {string} key - thing
     * @returns array of chords
     */
  static buildBassline(key, chords) {
    const dummySketch = new Sketch();
    return dummySketch;
  }
}

export default SketchBuilder;
