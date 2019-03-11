class mmNote {
  constructor(pitch, duration, harmonicContext, pitches) {
    this.pitch = pitch || '';
    this.duration = duration || 0;
    this.harmonicContext = harmonicContext || '';
    this.pitches = pitches || [];
  }
}

export default mmNote;
