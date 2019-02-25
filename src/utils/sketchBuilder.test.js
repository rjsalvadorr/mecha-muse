import SketchBuilder from './sketchBuilder';

const numChords = 2;
const numBeatUnits = 32;
let testChordResults = [];

beforeEach(() => {
  testChordResults = [
    SketchBuilder.buildChords('A major', numChords, numBeatUnits),
    SketchBuilder.buildChords('A minor', numChords, numBeatUnits),
    SketchBuilder.buildChords('B major', numChords, numBeatUnits),
    SketchBuilder.buildChords('B minor', numChords, numBeatUnits),
    SketchBuilder.buildChords('C major', numChords, numBeatUnits),
    SketchBuilder.buildChords('C minor', numChords, numBeatUnits),
    SketchBuilder.buildChords('D major', numChords, numBeatUnits),
    SketchBuilder.buildChords('D minor', numChords, numBeatUnits),
    SketchBuilder.buildChords('E major', numChords, numBeatUnits),
    SketchBuilder.buildChords('E minor', numChords, numBeatUnits),
  ];
  console.log(JSON.stringify(testChordResults, null, 2));
});

test('builds the right number of chords', () => {
  for (let result of testChordResults) {
    expect(result.length).toBeLessThanOrEqual(numChords * 1.5);
    expect(result.length).toBeGreaterThanOrEqual(numChords);
  }
});
