
class mmSketch {
  constructor(
    melody,
    accompaniment,
    bassline,
    chords,
    key,
    tags,
  ) {
    this.melody = melody || [];
    this.accompaniment = accompaniment || [];
    this.bassline = bassline || [];
    this.chords = chords || [];
    this.key = key || '';
    this.tags = tags || [];
  }
}

export default mmSketch;
