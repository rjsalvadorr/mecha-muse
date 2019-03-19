<template>
  <button v-on:click="clickHandler" class="button" type="button">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: String,
    clickHandler: Function,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.button {
  color: #fff;
  background-color: rgba(0, 0, 0, .5);
  padding: 0 10px;
}
</style>
