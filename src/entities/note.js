
class mmNote {
  constructor(pitch, duration, harmonicContext) {
    this.pitch = pitch || '';
    this.duration = duration || 0;
    this.harmonicContext = harmonicContext || '';
  }
}

export default mmNote;
