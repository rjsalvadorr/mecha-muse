<template>
  <div class="playlist-display">
    <div class="playlist-item"
      v-for="item in playlistItems"
      @click="handleItemClick(item)"
      :key="item.id"
    >
      <span class="playlist-item__label">{{ item.name }}</span>
      <div v-if="selectedItem && item.id === selectedItem.id" class="playlist-item__highlight" />
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus';
import TestUtils from '../utils/testUtils';

export default {
  name: 'PlaylistDisplay',
  props: {
    minimized: Boolean,
  },
  data() {
    return {
      selectedItem: null,
      playlistItems: [
        TestUtils.buildTestSketch(),
        TestUtils.buildTestSketch(),
        TestUtils.buildTestSketch(),
        TestUtils.buildTestSketch(),
        TestUtils.buildTestSketch(),
      ],
    };
  },
  methods: {
    handleItemClick(selectedItemInput) {
      this.selectedItem = selectedItemInput;
      EventBus.$emit('CHANGE_TRACK', {
        selectedTrack: this.selectedItem,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.playlist-display {
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  padding: 10px 5px;
}
.playlist-item {
  position: relative;
  height: 24px;
}
.playlist-item__label {
  position: absolute;
  padding: 0 6px;
  top: 0;
  z-index: 2;
}
.playlist-item__highlight {
  background-color: #a00;
  width: 100%;
  height: 24px;
  position: absolute;
  top: 0;
  z-index: 1;
}
</style>
