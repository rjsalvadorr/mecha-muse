import GMidiWriter from 'midi-writer-js';
import { Note as tonalNote } from 'tonal';
import AcConstants from './constants';

const INSTRUMENT_DATA = AcConstants.instrumentData;

/**
 * Submodule responsible for generating MIDI files for future playback.
 */

class MidiWriter {
  /**
   * Builds MIDI info for a note or chord
   * @private
   * @param {number[]} arrNumMidi - MIDI numbers for a set of pitches
   * @param {number} duration - MIDI number for a pitch
   * @param {number} wait
   * @return {MidiWriter.NoteEvent} - ???
   */
  _buildMidi(arrNumMidi, duration, wait) {
    let waitTime = wait;
    if (!waitTime) {
      waitTime = '0';
    }
    return new GMidiWriter.NoteEvent({
      pitch: arrNumMidi,
      duration,
      waitTime,
      velocity: 100,
    });
  }

  /**
   * Builds a Track from a given chord.
   * @private
   * @param {string[]} arrChordNotes - chordNotes
   * @param {Object} instrData - instrument data for track
   * @return {Track} - a MidiWriter Track
   */
  _buildTrack(arrChordNotes, instrData) {
    let notes;
    let midiNumbers;
    const returnTrack = new GMidiWriter.Track();
    returnTrack.addEvent(
      new GMidiWriter.ProgramChangeEvent({
        instrument: instrData.midiInstrumentCode,
      }),
    );
    returnTrack.addInstrumentName(instrData.name);

    for (let i = 0; i < arrChordNotes.length; i++) {
      midiNumbers = [];
      notes = arrChordNotes[i].split(' ');

      for (let j = 0; j < notes.length; j++) {
        const note = notes[j];
        midiNumbers.push(tonalNote.midi(note));
      }

      returnTrack.addEvent(this._buildMidi(midiNumbers, AcConstants.DEFAULT_NOTE_DURATION));
    }

    return returnTrack;
  }

  /**
   * Gets the MIDI data for a given melody.
   * @param {string[]} arrMelody - our melody
   * @return {string} - MIDI data, as a DataURI string
   */
  buildMelodyMidi(arrMelody) {
    const tracks = [];
    tracks[0] = this._buildTrack(arrMelody, INSTRUMENT_DATA.melody);

    const write = new GMidiWriter.Writer(tracks);

    return write.dataUri();
  }

  /**
   * Gets the MIDI data for a given melody, with accompaniment.
   * @param {string[]} arrMelody - main melody
   * @param {string[]} arrAcompanimentLine - accompaniment line
   * @param {string[]} arrBassLine - bass line
   * @return {string} - MIDI data, as a DataURI string.
   */
  buildMelodyMidiWithAccompaniment(arrMelody, arrAcompanimentLine, arrBassLine) {
    const melodyTrack = this._buildTrack(arrMelody, INSTRUMENT_DATA.melody);
    const accompanimentTrack = this._buildTrack(arrAcompanimentLine, INSTRUMENT_DATA.accompaniment);
    const bassTrack = this._buildTrack(arrBassLine, INSTRUMENT_DATA.bass);

    const tracks = [melodyTrack, accompanimentTrack, bassTrack];

    const write = new GMidiWriter.Writer(tracks);

    return write.dataUri();
  }
}

export default new MidiWriter();
