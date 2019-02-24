import SketchBuilder from './sketchBuilder';

const numChords = 2;
const numBeatUnits = 32;
let testChordResults = [];

beforeEach(() => {
  testChordResults = [
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
    SketchBuilder.buildChords('nope', numChords, numBeatUnits),
  ];
});

test('builds the right number of chords', () => {
  for (let result of testChordResults) {
    expect(result.length).toBeLessThanOrEqual(numChords * 1.5);
    expect(result.length).toBeGreaterThanOrEqual(numChords);
  }
});
