<template>
  <div class="playlist-display">
    <div class="playlist-item"
      v-for="(item, index) in playlistItems"
      @click="handleItemClick(item)"
      :key="item.id"
    >
      <span class="playlist-item__label">{{ item.name }}</span>
      <div v-if="item.id === selectedItem.id" class="playlist-item__highlight" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistDisplay',
  props: {
    minimized: Boolean,
  },
  data() {
    return {
      selectedItem: {
        id: 1,
        name: 'test one',
        melody: ['Bb4', 'B4', 'C5', 'D5'],
        accompaniment: ['G2 D3', 'E3 Ab2', 'E3 G2', 'Gb2 A2'],
        bassline: ['G1', 'E1', 'C2', 'D2'],
      },
      playlistItems: [
        {
          id: 1,
          name: 'test one',
          melody: ['Bb4', 'B4', 'C5', 'D5'],
          accompaniment: ['G2 D3', 'E3 Ab2', 'E3 G2', 'Gb2 A2'],
          bassline: ['G1', 'E1', 'C2', 'D2'],
        },
        {
          id: 2,
          name: 'test two',
          melody: ['Bb4', 'B4', 'C5', 'D5'],
          accompaniment: ['G2 D3', 'E3 Ab2', 'E3 G2', 'Gb2 A2'],
          bassline: ['G1', 'E1', 'C2', 'D2'],
        },
        {
          id: 3,
          name: 'test three',
          melody: ['Bb4', 'B4', 'C5', 'D5'],
          accompaniment: ['G2 D3', 'E3 Ab2', 'E3 G2', 'Gb2 A2'],
          bassline: ['G1', 'E1', 'C2', 'D2'],
        },
      ],
    };
  },
  methods: {
    handleItemClick(selectedItemInput) {
      this.selectedItem = selectedItemInput;
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
