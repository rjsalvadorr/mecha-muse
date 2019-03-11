<template>
  <div v-if="enabled" class="debug-panel">
    <div class="container">
      <h1 class="debug-panel--heading">Debug/test panel</h1>
      <div class="row">
        <div class="six columns">
          <Button label="Test MIDI playback (solo)" :clickHandler="handleNewPlayerTestSolo" /><br>
          <Button label="Test MIDI playback (group)" :clickHandler="handleNewPlayerTestGroup" /><br>
          <Button label="Stop MIDI playback" :clickHandler="handleMidiPlayerStop" /><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import EventBus from '../eventBus';
import Sketch from '../entities/sketch';
// import MidiPlayer from '../utils/midiPlayer';

function buildTestSketch() {
  const testSketch = new Sketch();

  testSketch.melody = [
    {
      pitch: 'E4',
      duration: 5,
      harmonicContext: 'do',
    },
    {
      pitch: 'G#4',
      duration: 3,
      harmonicContext: 'do',
    },
    {
      pitch: 'B4',
      duration: 4,
      harmonicContext: 'do',
    },
    {
      pitch: 'C#4',
      duration: 10,
      harmonicContext: 'do',
    },
    {
      pitch: 'B4',
      duration: 10,
      harmonicContext: 'do',
    },
  ];

  testSketch.accompaniment = [
    {
      pitches: ['E3', 'G#3', 'D#3'],
      duration: 12,
      harmonicContext: 'I',
    },
    {
      pitches: ['A3', 'C#3', 'G#3'],
      duration: 10,
      harmonicContext: 'IV',
    },
    {
      pitches: ['B3', 'D#3', 'A3'],
      duration: 10,
      harmonicContext: 'V',
    },
  ];

  testSketch.chords = [
    {
      name: 'EMaj7',
      duration: 12,
      harmonicContext: 'I',
    },
    {
      name: 'AMaj7',
      duration: 10,
      harmonicContext: 'IV',
    },
    {
      name: 'B7',
      duration: 10,
      harmonicContext: 'V',
    },
  ];

  testSketch.bassline = [
    {
      pitch: 'E1',
      duration: 12,
      harmonicContext: 'do',
    },
    {
      pitch: 'A1',
      duration: 10,
      harmonicContext: 'fa',
    },
    {
      pitch: 'B1',
      duration: 10,
      harmonicContext: 'sol',
    },
  ];

  return testSketch;
}

export default {
  name: 'DebugPanel',
  props: {
    enabled: Boolean,
  },
  components: {
    Button,
  },
  methods: {
    handleNewPlayerTestSolo() {
      const testSketch = buildTestSketch();

      // eslint-disable-next-line
      console.debug('DebugPanel.handleNewPlayerTestSolo()');
      EventBus.$emit('TEST_MELODY_SOLO', {
        melody: testSketch.melody,
      });
    },
    handleNewPlayerTestGroup() {
      const testSketch = buildTestSketch();

      // eslint-disable-next-line
      console.debug('DebugPanel.handleNewPlayerTestGroup()');
      EventBus.$emit('TEST_MELODY_ACCOMP', {
        melody: testSketch.melody,
        accompaniment: testSketch.accompaniment,
        bass: testSketch.bassline,
      });
    },
    handleMidiPlayerStop(evt) {
      // MidiPlayer.stopPlayback();

      let msg = `STUB TEST FROM:\n${this.$vnode.tag}`;
      if (evt) {
        msg += `\n\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      // eslint-disable-next-line
      console.debug(msg);

      EventBus.$emit('STOP_PLAYBACK', {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.debug-panel {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  padding: 50px;
}
</style>
