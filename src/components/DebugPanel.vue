<template>
  <div v-if="enabled" class="debug-panel">
    <span>Debug panel test...</span>
  </div>
</template>

<script>
export default {
  name: "DebugPanel",
  props: {
    enabled: Boolean,
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
