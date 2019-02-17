<template>
  <div v-if="enabled" class="debug-panel">
    <div class="container">
      <h1 class="debug-panel--heading">Debug/test panel</h1>
      <div class="row">
        <div class="six columns">
          <Button label="Test MIDI playback (solo)" :clickHandler="handleMidiPlayerTestSolo" /><br>
          <Button label="Test MIDI playback (solo + accopmaniment)" :clickHandler="handleMidiPlayerTestGroup" /><br>
          <Button label="Stop MIDI playback" :clickHandler="handleMidiPlayerStop" /><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import MidiPlayer from '../utils/midiPlayer';

export default {
  name: 'DebugPanel',
  props: {
    enabled: Boolean,
  },
  components: {
    Button,
  },
  methods: {
    handleMidiPlayerTestSolo(evt) {
      const testMelody = ['Bb4', 'B4', 'C5', 'D5'];
      MidiPlayer.playMelodySolo(testMelody);

      let msg = `STUB TEST FROM:\n${this.$vnode.tag}`;
      if (evt) {
        msg += `\n\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      msg += `\nMELODY:\n${JSON.stringify(testMelody, null, 2)}`;
      // eslint-disable-next-line
      console.debug(msg);
    },
    handleMidiPlayerTestGroup(evt) {
      const testMelody = ['Bb4', 'B4', 'C5', 'D5'];
      const testMelodies = [];
      testMelodies.push(testMelody);
      testMelodies.push(['G2 D3', 'E3 Ab2', 'E3 G2', 'Gb2 A2']);
      testMelodies.push(['G1', 'E1', 'C2', 'D2']);

      MidiPlayer.playMelodyWithAccompaniment(testMelodies[0], testMelodies[1], testMelodies[2]);
      let msg = `STUB TEST FROM:\n${this.$vnode.tag}`;
      if (evt) {
        msg += `\n\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      msg += `\nMELODIES:\n${JSON.stringify(testMelodies, null, 2)}`;
      // eslint-disable-next-line
      console.debug(msg);
    },
    handleMidiPlayerStop(evt) {
      MidiPlayer.stopPlayback();

      let msg = `STUB TEST FROM:\n${this.$vnode.tag}`;
      if (evt) {
        msg += `\n\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      // eslint-disable-next-line
      console.debug(msg);
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
