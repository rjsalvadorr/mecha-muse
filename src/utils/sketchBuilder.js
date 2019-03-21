import shuffle from 'lodash/shuffle';
import sample from 'lodash/sample';
import map from 'lodash/map';
import * as Key from 'tonal-key';
import * as Chord from 'tonal-chord';
import * as RomanNumeral from 'tonal-roman-numeral';
import getRandomWords from 'random-words';

import Note from '../entities/note';
import MmChord from '../entities/chord';
import Sketch from '../entities/sketch';
import CalcUtils from './calcUtils';
import TestUtils from './testUtils';

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

    TestUtils.printVariables([
      { name: 'key', value: key },
      { name: 'measures', value: measures },
      { name: 'beatUnits', value: beatUnits },
    ]);

    const sketches = [];
    let sketch;
    let randomWords;

    for (let i = 0; i < numSketches; i++) {
      sketch = new Sketch();
      sketch.chords = this.buildChords(
        key,
        measures,
        beatUnits,
        2, // shortestChordDuration
      );
      sketch.melody = this.buildMelody(key, sketch.chords);
      sketch.accompaniment = this.buildAccompaniment(key, sketch.chords);
      sketch.bassline = this.buildBassline(key, sketch.chords);

      sketch.id = CalcUtils.getRandomInt(1, 2147483647);
      randomWords = getRandomWords(12);
      sketch.name = `${sample(randomWords)} ${sample(randomWords)}`;
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
      chords.push(new MmChord(randomChord[0], recalcDuration, harmonicContext));
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

    let durationCounter = 0;
    let calcCounter;
    let currentChord;
    let newNote;
    for (const noteDuration of noteDurations) {
      calcCounter = 0;
      for (const chord of chords) {
        if (durationCounter <= calcCounter) {
          currentChord = chord;
        }
        calcCounter += chord.duration;
      }
      newNote = `${sample(Chord.notes(currentChord.name))}4`;

      melodyNotes.push(new Note(newNote, noteDuration, '???'));

      durationCounter += noteDuration;
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
    const accompNotes = [];

    let chordNotes;
    let newAccompNotes;
    for (const chord of chords) {
      chordNotes = Chord.notes(chord.name);
      newAccompNotes = chordNotes.map(noteName => `${noteName}3`);
      accompNotes.push(new Note('', chord.duration, '???', newAccompNotes));
    }

    return accompNotes;
  }

  /**
   * Builds basslines
   * @static
   * @private
   * @param {string} key - key
   * @param {string} chords - chord progression, from buildChords()
   * @returns array of notes
   */
  static buildBassline(key, chords) {
    const basslineNotes = [];

    let currentRoot;
    let newBassNote;
    for (const chord of chords) {
      currentRoot = Chord.notes(chord.name)[0];
      newBassNote = `${currentRoot}1`;
      basslineNotes.push(new Note(newBassNote, chord.duration, '???'));
    }

    return basslineNotes;
  }
}

export default SketchBuilder;
