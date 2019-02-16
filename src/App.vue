<template>
  <div id="app" class="app container">
    <div class="row">
      <div class="twelve columns app__intro">
        <h1 class="app__title">Mecha-Muse</h1>
        <p class="app__description">
          A musical idea generator, built and updated by <a href="http://rj-salvador.com" target="_blank">RJ Salvador</a>.
          Source code can be seen at <a href="https://github.com/rjsalvadorr/mecha-muse" target="_blank">GitHub</a>.
          If you like this kind of nerdy music stuff, I have more things <a href="http://www.rj-salvador.com/tags/music/" target="_blank">here</a>.
        </p>
      </div>
    </div>
    <DebugPanel enabled />
  </div>
</template>


<script>
import DebugPanel from './components/DebugPanel.vue';

export default {
  name: 'app',
  components: {
    DebugPanel,
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
  }
}

/* Larger than mobile */
@media (min-width: 750px) {
  .app__description {
    width: 50%;
    margin: 0 auto;
  }
}

</style>
