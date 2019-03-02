<template>
  <div id="app" class="app container" @keyup.esc="toggleDebugPanel">
    <div class="row">
      <div class="app__intro">
        <h1 class="app__title">Mecha-Muse</h1>
        <p class="app__description">
          A musical idea generator, built and updated by <a href="http://rj-salvador.com" target="_blank">RJ Salvador</a>.
          Source code can be seen at <a href="https://github.com/rjsalvadorr/mecha-muse" target="_blank">GitHub</a>.
          If you like this kind of nerdy music stuff, I have more things <a href="http://www.rj-salvador.com/tags/music/" target="_blank">here</a>.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="six columns">
        <PlaylistDisplay />
      </div>
      <div class="six columns">
        <NotationDisplay />
        <PlaybackControls />
        <GenerationControls />
      </div>
    </div>
    <DebugPanel :enabled="debugPanelEnabled" />
  </div>
</template>


<script>
import EventBus from './eventBus';
import MidiPlayer from './utils/midiPlayer';
import DebugPanel from './components/DebugPanel.vue';
import GenerationControls from './components/GenerationControls.vue';
import NotationDisplay from './components/NotationDisplay.vue';
import PlaybackControls from './components/PlaybackControls.vue';
import PlaylistDisplay from './components/PlaylistDisplay.vue';

export default {
  name: 'app',
  components: {
    DebugPanel,
    GenerationControls,
    NotationDisplay,
    PlaybackControls,
    PlaylistDisplay,
  },
  data() {
    return {
      debugPanelEnabled: false,
      selectedTrack: {},
    };
  },
  methods: {
    toggleDebugPanel() {
      this.debugPanelEnabled = !this.debugPanelEnabled;
    },
  },
  // event bus listeners
  mounted() {
    EventBus.$on('TEST_MELODY_SOLO', (payload) => {
      MidiPlayer.playMelodySolo(payload.melody);
    });
    EventBus.$on('TEST_MELODY_ACCOMP', (payload) => {
      MidiPlayer.playMelodyWithAccompaniment(
        payload.melody,
        payload.accompaniment,
        payload.bassline,
      );
    });
    EventBus.$on('PLAY_MELODY_SOLO', () => {
      if (this.selectedTrack.melody) {
        MidiPlayer.playMelodySolo(this.selectedTrack.melody);
      }
    });
    EventBus.$on('CLICK_PLAY', () => {
      if (this.selectedTrack.melody) {
        MidiPlayer.playMelodyWithAccompaniment(
          this.selectedTrack.melody,
          this.selectedTrack.accompaniment,
          this.selectedTrack.bassline,
        );
      }
    });
    EventBus.$on('CLICK_STOP', () => {
      MidiPlayer.stopPlayback();
    });
    EventBus.$on('CHANGE_TRACK', (payload) => {
      this.selectedTrack = payload.selectedTrack;
    });
    EventBus.$on('CHANGE_VOLUME', (payload) => {
      MidiPlayer.setVolume(payload.volume);
    });
    EventBus.$on('CHANGE_TEMPO', (payload) => {
      MidiPlayer.setTempo(payload.tempo);
    });
  },
};
</script>


<style lang="scss">
$box-shadow-color: rgba(0, 0, 0, 0.5);
$mui-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.38), 0 6px 6px rgba(0, 0, 0, 0.46);
$main-color: #2c3e50;

.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $main-color;
  margin-top: 30px;

  &__intro {
    text-align: center;
    max-width: 600px;
  }
}
</style>
