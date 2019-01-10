<template>
  <div v-if="showGroup" class="pattern-group" :id="customId">
    <h2 class="pattern-group__label">{{ label }}</h2>
    <slot></slot>
    <div class="pattern-group__diagrams">
      <FretboardDiagram
        instrument="guitar"
        v-for="n in diagrams"
        :key="n.id"
        :diagramData="n"
      />
    </div>
    <hr>
  </div>
</template>

<script>
import FretboardDiagram from "./FretboardDiagram.vue";

export default {
  name: "PatternGroup",
  props: {
    label: String,
    diagrams: Array,
    customId: String
  },
  computed: {
    showGroup: function() {
      return this.diagrams.length > 0;
    }
  },
  components: {
    FretboardDiagram
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pattern-group {
  margin-bottom: 5rem;

  & > p {
    text-align: center;
    padding: 0 0 10px 0;
    margin-bottom: 0.5rem;
  }

  &__label {
    text-align: center;
    padding: 0;
    margin-bottom: 0.5rem;
  }

  &__diagrams {
    display: flex;
    flex-wrap: wrap;
  }
}

/* Larger than mobile */
@media (min-width: 400px) {
  .pattern-group {
    & > p {
      text-align: left;
      padding: 0 20px 10px 20px;
    }

    &__label {
      text-align: left;
      padding: 0 20px;
    }
  }
}
</style>
