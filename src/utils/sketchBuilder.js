import shuffle from 'lodash/shuffle';
import map from 'lodash/map';

import * as Key from "tonal-key"
import * as RomanNumeral from "tonal-roman-numeral"

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
  static buildChords(key, numMeasures, beatUnits, shortestChordDuration = 1) {
    // we can use this shortestChordDuration for changing harmonic rhythm
    // 1 = 16th notes
    // 2 = 8th notes
    // 4 = quarter notes
    const calcBeatUnits = beatUnits / shortestChordDuration;
    const chordsUpperBound = Math.floor(numMeasures * 1.5) + 1;
    const numChords = CalcUtils.getRandomInt(numMeasures, chordsUpperBound);
    const durations = CalcUtils.splitInteger(beatUnits, numChords);
    const chords = [];
    const availableChords = [1, 4, 5];
    const chordDegrees = [1];

    let randomChordNum;
    for(let i = 1; i < numChords; i++) {
      randomChordNum = shuffle(availableChords)[0];
      chordDegrees.push(randomChordNum)
    }

    let randomChord;
    let harmonicContext;
    let recalcDuration;
    for(let j = 0; j < numChords; j++) {
      randomChord = Key.chords(key, [chordDegrees[j]]);
      harmonicContext = RomanNumeral.fromDegree(chordDegrees[j], key.includes('major'));
      recalcDuration = durations[j] * shortestChordDuration
      chords.push(new Chord(randomChord[0], recalcDuration, harmonicContext));
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
    const chordDurations = map(chords, (chord) => {
      return chord.duration;
    });
    const numNotes = Math.floor(chords.length * 1.5) + 1;
    const noteDurations = CalcUtils.splitIntegerArray(chordDurations, numNotes);
    const melodyNotes = [];
    
    for(let noteDuration of noteDurations) {
      melodyNotes.push(new Note('C4', noteDuration, 'do'));
    }

    return melodyNotes;
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
