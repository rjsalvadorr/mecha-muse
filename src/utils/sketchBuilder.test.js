import SketchBuilder from './sketchBuilder';

test('builds chords properly', () => {
  const numChords = 2;
  const numBeatUnits = 2;
  const testChordResults = [
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
    buildChords('nope', numChords, numBeatUnits),
  ];

  console.log(`chords = ${testChordResults}`);

  for (result in testChordResults) {
    expect(result.length).toBeLessThanOrEqual(numChords * 1.5);
    expect(result.length).toBeGreaterThanOrEqual(numChords);
  }
});
