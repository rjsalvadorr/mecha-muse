class mmSketch {
  constructor(melody, accompaniment, bassline, chords, key, tags, id, name) {
    this.melody = melody || [];
    this.accompaniment = accompaniment || [];
    this.bassline = bassline || [];
    this.chords = chords || [];
    this.key = key || '';
    this.tags = tags || [];
    this.id = id || [];
    this.name = name || [];
  }
}

export default mmSketch;
