<template>
  <div class="playback-controls">
    <div class="control-group control-group--buttons">
      <Button class="playback-button" label="PLAY" :clickHandler="handlePlay" />
      <Button class="playback-button" label="STOP" :clickHandler="handleStop" />
      <Button class="playback-button" label="D/l" :clickHandler="handleDownload" />
    </div>
    <div class="control-group control-group--slider">
      <span class="slider-label">Volume</span>
      <input type="range" v-model="volume" id="sel-volume" class="slider-control sel-volume" name="sel-volume" min="0" max="100" />
      <span class="slider-value">{{ volume }}</span>
    </div>
    <div class="control-group control-group--slider">
      <span class="slider-label">Tempo</span>
      <input type="range" v-model="tempo" id="sel-tempo" class="slider-control sel-tempo" name="sel-tempo" min="50" max="200" />
      <span class="slider-value">{{ tempo }}</span>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus';
import Button from './Button.vue';

export default {
  name: 'PlaybackControls',
  props: {
    minimized: Boolean,
  },
  components: {
    Button,
  },
  data() {
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
      EventBus.$emit('CLICK_PLAY', {
        volume: parseInt(this.volume, 10),
        tempo: parseInt(this.tempo, 10),
      });
    },
    handleStop(evt) {
      let msg = 'FROM:\nhandleStop()';
      if (evt) {
        msg += `\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      console.debug(msg);
      EventBus.$emit('CLICK_STOP', {});
    },
    handleDownload(evt) {
      let msg = 'FROM:\nhandleDownload()';
      if (evt) {
        msg += `\nEVENT:\n${JSON.stringify(evt, null, 2)}`;
      }
      console.debug(msg);
      EventBus.$emit('CLICK_DOWNLOAD', {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.playback-controls {
  padding: 20px;

  .control-group--slider {
    display: flex;

    .slider-label {
      flex: 1 3 20%;
    }
    .slider-control  {
      flex: 2 1 60%;
      margin: 0 10px;
    }
    .slider-value {
      flex: 1 3 20%;
    }
  }

  .control-group--buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .playback-button {
      width: 30%;
    }
  }
}
</style>
