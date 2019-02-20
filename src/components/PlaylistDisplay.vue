<template>
  <div class="playlist-display">
    <div class="playlist-item" v-for="item in playlistItems" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistDisplay',
  props: {
    minimized: Boolean,
  },
  data: function() {
    return {
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
      ]
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.playlist-display {
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  padding: 20px;
}
</style>
