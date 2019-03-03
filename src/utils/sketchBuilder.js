import shuffle from 'lodash/shuffle';
import map from 'lodash/map';

import * as Key from 'tonal-key';
import * as RomanNumeral from 'tonal-roman-numeral';

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
     * @param {string} key - musical key
     * @param {number} numSketches - number of sketches to return
     * @param {number} numMeasures - number of measures for each sketch
     * @returns array of sketches
     */
  static buildSketches(key, numSketches, numMeasures) {
    const beatUnitsPerMeasure = 16; // Using 16th notes in 4/4 for now
    const measures = numMeasures || 2;
    const beatUnits = measures * beatUnitsPerMeasure;

    CalcUtils.printVariables([
      { name: 'key', value: key },
      { name: 'measures', value: measures },
      { name: 'beatUnits', value: beatUnits },
    ]);

    const sketches = [];
    let sketch;
    for(let i = 0; i < numSketches; i++) {
      sketch = new Sketch();
      sketch.chords = this.buildChords(
        key,
        measures,
        beatUnits,
        2, //shortestChordDuration
      );
      sketch.melody = this.buildMelody(key, sketch.chords);
      sketches.push(sketch);
    }

    return sketches;
  }

  /**
     * Builds chord progressions
     * @static
     * @private
     * @param {string} key - musical key, like "A major"
     * @param {string} numMeasures - duration of music, in measures
     * @param {string} beatUnits - total beat units
     * @param {string} shortestChordDuration - shortest chord duration (in beat units)
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
    const durations = CalcUtils.splitInteger(calcBeatUnits, numChords);
    const chords = [];
    const availableChords = [1, 4, 5];
    const chordDegrees = [1];

    let randomChordNum;
    for (let i = 1; i < numChords; i++) {
      randomChordNum = shuffle(availableChords)[0];
      chordDegrees.push(randomChordNum);
    }

    let randomChord;
    let harmonicContext;
    let recalcDuration;
    for (let j = 0; j < numChords; j++) {
      randomChord = Key.chords(key, [chordDegrees[j]]);
      harmonicContext = RomanNumeral.fromDegree(chordDegrees[j], key.includes('major'));
      recalcDuration = durations[j] * shortestChordDuration;
      chords.push(new Chord(randomChord[0], recalcDuration, harmonicContext));
    }

    return chords;
  }

  /**
     * Builds melodies
     * @static
     * @private
     * @param {string} key - key
     * @param {string} chords - chord progression, from buildChords()
     * @returns array of notes
     */
  static buildMelody(key, chords) {
    const chordDurations = map(chords, chord => chord.duration);
    const numNotes = Math.floor(chords.length * 1.5) + 1;
    const noteDurations = CalcUtils.splitIntegerArray(chordDurations, numNotes);
    const melodyNotes = [];

    for (const noteDuration of noteDurations) {
      melodyNotes.push(new Note('C4', noteDuration, 'do'));
    }

    return melodyNotes;
  }

  /**
     * Things
     * @static
     * @private
     * @param {string} thing - thing
     * @returns array of chords
     */
  static buildAccompaniment(key, chords) {
    const dummySketch = new Sketch();

    CalcUtils.printVariables([
      { name: 'key', value: key },
      { name: 'chords', value: chords },
    ]);

    return dummySketch;
  }

  /**
     * Things
     * @static
     * @private
     * @param {string} thing - thing
     * @returns array of chords
     */
  static buildBassline(key, chords) {
    const dummySketch = new Sketch();

    CalcUtils.printVariables([
      { name: 'key', value: key },
      { name: 'chords', value: chords },
    ]);

    return dummySketch;
  }
}

export default SketchBuilder;
