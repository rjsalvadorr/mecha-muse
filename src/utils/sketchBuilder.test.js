import SketchBuilder from './sketchBuilder';

const numChords = 2;
const shortestChordDuration = 2;
const numMeasures = 2;
const beatUnitsPerMeasure = 16;
const numBeatUnits = numMeasures * beatUnitsPerMeasure;
const keys = [
  'A major',
  'A minor',
  'B major',
  'B minor',
  'C major',
  'C minor',
  'D major',
  'D minor',
  'E major',
  'E minor',
];
let generatedChords = [];
let generatedMelodies = [];

beforeAll(() => {
  let key;

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    const chordProgs = SketchBuilder.buildChords(key, numChords, numBeatUnits, shortestChordDuration);
    generatedChords.push(chordProgs);
    generatedMelodies.push(SketchBuilder.buildMelody(key, chordProgs));
  }
});

afterAll(() => {
  generatedChords = [];
  generatedMelodies = [];
});

test('builds chords', () => {
  for (const result of generatedChords) {
    expect(result.length).toBeLessThanOrEqual(numChords * 1.5);
    expect(result.length).toBeGreaterThanOrEqual(numChords);
  }
});

test('builds melodies', () => {
  for (const result of generatedMelodies) {
    expect(result).toBeTruthy();
  }
});
