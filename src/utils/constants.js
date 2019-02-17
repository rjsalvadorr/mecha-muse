/**
* Constants used by the application.
* @public
* @type {Object}
* @property {string} DEFAULT_NOTE_DURATION - Note duration for simple melodies
* @property {number} DEFAULT_NUM_INSTRUMENTS - Default number of instruments
* @property {string} DEFAULT_LOWER_LIMIT - Lower limit of main melody's range (pitch in scientific notation)
* @property {string} DEFAULT_UPPER_LIMIT - Upper limit of main melody's range (pitch in scientific notation)
* @property {string} ACCOMPANIMENT_LOWER_LIMIT - Lower limit of accompaniment range (pitch in scientific notation)
* @property {string} ACCOMPANIMENT_UPPER_LIMIT - Upper limit of accompaniment range (pitch in scientific notation)
* @property {string} BASS_LOWER_LIMIT - Lower limit of bassline's range (pitch in scientific notation)
* @property {string} BASS_UPPER_LIMIT - Upper limit of bassline's range (pitch in scientific notation)
* @property {number} NUM_GENERATIONS_LIMIT - Limit on number of melody generation attempts (unused)
* @property {number} NUM_MELODIES_LIMIT - Limit on number of returned melodies
* @property {Object} instrumentData - Data for the default instruments used by the app.
*/
const AcConstants = {
  DEFAULT_NOTE_DURATION: '1',
  DEFAULT_NUM_INSTRUMENTS: 3,

  DEFAULT_LOWER_LIMIT: 'Db4',
  DEFAULT_UPPER_LIMIT: 'G#5',

  ACCOMPANIMENT_LOWER_LIMIT: 'Gb2',
  ACCOMPANIMENT_UPPER_LIMIT: 'C#4',

  BASS_LOWER_LIMIT: 'E1',
  BASS_UPPER_LIMIT: 'F2',

  instrumentData: {
    melody: {
      role: 'melody',
      name: 'violin',
      gain: 1.7,
      midiInstrumentCode: 40,
    },
    accompaniment: {
      role: 'accompaniment',
      name: 'acoustic_guitar_steel',
      gain: 1.6,
      midiInstrumentCode: 25,
    },
    bass: {
      role: 'bass',
      name: 'acoustic_bass',
      gain: 1.65,
      midiInstrumentCode: 32,
    },
    getByName(instrName) {
      for (const instrumentRole in this) {
        if (instrName === this[instrumentRole].name) {
          return this[instrumentRole];
        }
      }
      return null;
    },
  },

  NUM_GENERATIONS_LIMIT: 100000, // Number of melody generation attempts that the program will make.
  NUM_MELODIES_LIMIT: 100, // Number of melodies that's returned'
};

AcConstants.instrumentData.melody.lowerLimit = AcConstants.DEFAULT_LOWER_LIMIT;
AcConstants.instrumentData.melody.upperLimit = AcConstants.DEFAULT_UPPER_LIMIT;

AcConstants.instrumentData.accompaniment.lowerLimit = AcConstants.ACCOMPANIMENT_LOWER_LIMIT;
AcConstants.instrumentData.accompaniment.upperLimit = AcConstants.ACCOMPANIMENT_UPPER_LIMIT;

AcConstants.instrumentData.bass.lowerLimit = AcConstants.BASS_LOWER_LIMIT;
AcConstants.instrumentData.bass.upperLimit = AcConstants.BASS_UPPER_LIMIT;

module.exports = AcConstants;
