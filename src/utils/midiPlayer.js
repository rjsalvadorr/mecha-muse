// Plays MIDI files on the browser!

import midiPlayer from 'midi-player-js';
import { Note } from 'tonal';
import * as Soundfont from 'soundfont-player';
import AcMidiWriter from './midiWriter';
import AcConstants from './constants';

const INSTRUMENT_DATA = AcConstants.instrumentData;
const GMidiPlayer = midiPlayer || {};
const tonalNote = Note || {};

/**
 * Submodule responsible for playing audio on the browser.
 * @emits {statusUpdate} - Emits this event when the audio player loads.
 */
class MidiPlayer {
  constructor() {
    this.instruments = {};
    this.numInstrumentsInit = 0;

    this.player = null;
    this.audioContext = new AudioContext();
    this.tempo = 120;
    this.volume = 100;

    this.initialized = false;
    // Added this flag to fix an issue where notes randomly play again after the track ends.
    // It only works for tracks that are all the same length. If we ever have to play tracks that have
    // different lengths, we'll need a different solution.
    this.playbackLocked = true;

    // is this kind of scope hackery necessary?!
    const haxThis = this;
    let currentInstrument;
    let sfOptions;
    let numLowerLimit = 0;
    let numUpperLimit = 0;
    let instrNotes;

    const instrumentRoles = Object.keys(INSTRUMENT_DATA);
    for (let i = 0; i < instrumentRoles.length; i++) {
      const instrumentRole = instrumentRoles[i];
      // initialize each instrument
      if (typeof INSTRUMENT_DATA[instrumentRole] !== 'function') {
        instrNotes = [];
        numLowerLimit = tonalNote.midi(INSTRUMENT_DATA[instrumentRole].lowerLimit);
        numUpperLimit = tonalNote.midi(INSTRUMENT_DATA[instrumentRole].upperLimit);

        for (let midiCode = numLowerLimit; midiCode <= numUpperLimit; midiCode++) {
          // Specifies available notes for playback on this instrument.
          // There's no sense loading notes that this instrument would never play!
          instrNotes.push(midiCode);
        }

        sfOptions = {
          soundfont: 'FluidR3_GM',
          // TODO - find a way to limit the notes. This approach doesn't work for some reason...
          // notes: instrNotes
        };

        Soundfont.instrument(
          this.audioContext,
          INSTRUMENT_DATA[instrumentRole].name,
          sfOptions,
        ).then((sfInstrument) => {
          currentInstrument = INSTRUMENT_DATA.getByName(sfInstrument.name);
          sfInstrument.gain = currentInstrument.gain;

          haxThis.instruments[currentInstrument.role] = sfInstrument;

          haxThis.numInstrumentsInit++;

          console.info('Instrument loaded!');

          if (haxThis.numInstrumentsInit === AcConstants.DEFAULT_NUM_INSTRUMENTS) {
            haxThis._finishLoad();
          }
        });
      }
    }
  }

  /**
   * Triggers the note playing for all instruments. Called for every MIDI event in the app.
   * @private
   * @param {number} event - MIDI event
   */
  _midiCallback(event) {
    // callback for MIDI events
    const instr1 = this.instruments.melody;
    const instr2 = this.instruments.accompaniment;
    const instr3 = this.instruments.bass;
    const volumePct = this.volume / 100;

    if (!this.playbackLocked && event.name === 'Note on' && event.velocity > 0) {
      switch (event.track) {
        case 1:
          instr1.play(event.noteName, this.audioContext.currentTime, {
            gain: instr1.gain * volumePct,
          });
          break;
        case 2:
          instr2.play(event.noteName, this.audioContext.currentTime, {
            gain: instr2.gain * volumePct,
          });
          break;
        case 3:
          instr3.play(event.noteName, this.audioContext.currentTime, {
            gain: instr3.gain * volumePct,
          });
          break;
        default:
        // nothing!
      }
    }

    if (event.name === 'Note off') {
      switch (event.track) {
        case 1:
          instr1.stop();
          break;
        case 2:
          instr2.stop();
          break;
        case 3:
          instr3.stop();
          break;
        default:
        // nothing!
      }
    }

    if (event.name === 'End of Track') {
      this.playbackLocked = true;
    }
  }

  /**
   * Completes the loading of this class. The "midiPlayerReady" eve
   * @private
   * @emits {statusUpdate} - Emits this event when the audio player successfully loads
   */
  _finishLoad() {
    const haxThis = this;
    this.player = new GMidiPlayer.Player((event) => {
      haxThis._midiCallback(event);
    });
    this.initialized = true;
    this.playbackLocked = false;

    const updateEvent = new CustomEvent('statusUpdate', {
      detail: 'MIDI player is loaded!',
    });
    document.body.dispatchEvent(updateEvent);
  }

  /**
   * Plays the given melody.
   * @param {string[]} melodySolo - solo melody (violin)
   */
  playMelodySolo(melodySolo) {
    const strMidi = AcMidiWriter.buildMelodyMidi(melodySolo);
    this._playMelody(strMidi);
  }

  /**
   * Plays the given melodies.
   * @param {string[]} melodySolo - solo melody (violin)
   * @param {string[]} melodyAccomp - accompaniment melody (piano)
   * @param {string[]} melodyBass - bass melody (bass)
   */
  playMelodyWithAccompaniment(melodySolo, melodyAccomp, melodyBass) {
    const strMidi = AcMidiWriter.buildMelodyMidiWithAccompaniment(
      melodySolo,
      melodyAccomp,
      melodyBass,
    );
    this._playMelody(strMidi);
  }

  /**
   * Actually plays the given melody
   * @private
   * @param {string} strMidi - MIDI data, as a DataURI string.
   */
  _playMelody(strMidi) {
    if (this.initialized) {
      this.stopPlayback();
      this.playbackLocked = false;
      this.player.loadDataUri(strMidi);
      this.player.setTempo(this.tempo);
      this.player.play();
    } else {
      console.warn("[AutoComposerMidi._playMelody()] Player isn't initialized yet...");
    }
  }

  /**
   * Stops all playback
   */
  stopPlayback() {
    this.instruments.melody.stop();
    this.instruments.accompaniment.stop();
    this.instruments.bass.stop();
    this.player.stop();
  }

  /**
   * Sets tempo for player
   */
  setTempo(tempoInput) {
    this.tempo = tempoInput;
    this.player.setTempo(tempoInput);
  }

  /**
   * Sets volume for player
   */
  setVolume(volumeInput) {
    this.volume = volumeInput;
  }
}

export default new MidiPlayer();
