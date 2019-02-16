<template>
  <div v-if="enabled" class="debug-panel">
    <div class="container">
      <h1 class="debug-panel--heading">Debug/test panel</h1>
      <div class="row">
        <div class="six columns">
          <Button label="Test MIDI playback" :clickHandler="handlerStubTest" /><br>
          <Button label="Test rhythm generation" :clickHandler="handlerStubTest" /><br>
          <Button label="Test note generation" :clickHandler="handlerStubTest" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'DebugPanel',
  props: {
    enabled: Boolean,
  },
  components: {
    Button,
  },
  methods: {
    handlerStubTest(event) {
      let msg = `STUB TEST FROM:\n${this.$vnode.tag}`;
      if (event) {
        msg += `\n\nEVENT:\n${JSON.stringify(event, null, 2)}`;
      }
      // eslint-disable-next-line
      window.alert(msg);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.debug-panel {
  background-color: rgba(0, 0, 0, 0.5);
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
