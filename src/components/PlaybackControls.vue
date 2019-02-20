<template>
  <div class="playback-controls">
    <Button label="PLAY" :clickHandler="handlePlay" />
    <Button label="STOP" :clickHandler="handleStop" />
    <Button label="DOWNLOAD" :clickHandler="handleDownload" />

    <span class="slider-label">Volume</span>
    <input type="range" v-model="volume" id="sel-volume" name="sel-volume" min="0" max="100" />{{ volume }}

    <span class="slider-label">Tempo (BPM)</span>
    <input type="range" v-model="tempo" id="sel-tempo" name="sel-tempo" min="50" max="200" />{{ tempo }}
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'PlaybackControls',
  props: {
    minimized: Boolean,
  },
  components: {
    Button,
  },
  data: function() {
    return {
      volume: 80,
      tempo: 100,
    };
  },
  methods: {
    handlePlay(evt) {
      let msg = 'FROM:\nhandlePlay()';
      if (evt) {
        msg += `\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      console.debug(msg);
    },
    handleStop(evt) {
      let msg = 'FROM:\nhandleStop()';
      if (evt) {
        msg += `\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      console.debug(msg);
    },
    handleDownload(evt) {
      let msg = 'FROM:\nhandleDownload()';
      if (evt) {
        msg += `\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      console.debug(msg);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.playback-controls {
  padding: 20px;
}
</style>
