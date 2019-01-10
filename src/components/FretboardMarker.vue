<template>
  <div :class="['marker', markerClassname]">
  </div>
</template>

<script>
export default {
  name: "FretboardMarker",
  props: {
    stringNum: Number,
    fretNum: Number,
    markerData: Array
  },
  computed: {
    markerClassname: function() {
      for (var i = 0; i < this.markerData.length; i++) {
        if (
          this.markerData[i].string == this.stringNum &&
          this.markerData[i].fret == this.fretNum
        ) {
          return "active marker--" + this.markerData[i].degree;
        }
      }
      return "";
    }
  }
};
</script>

<!-- Not scoped, so the CSS is shared with other components -->
<style lang="scss">
$fretUnit: 25px;
$markerDiameter: $fretUnit * 0.66;
$borderWidth: 3px;

.marker {
  background: #ffffff;
  width: $markerDiameter;
  height: $markerDiameter;
  border-radius: 50%;
  margin: auto;
  position: relative;
  top: -$fretUnit / 2;
  border: $borderWidth #000000 solid;
  z-index: 40;
  display: none;

  &.active {
    display: block;
  }

  &--3rd {
    background: #aaaaaa;
  }

  &--5th {
    background: #000000;
  }

  &--7th {
    background: #888888;
  }

  &--9th {
    background: #ffffff;
  }

  &--7th::after,
  &--9th::after {
    content: "";
    background: #000000;
    width: $markerDiameter / 2;
    height: $markerDiameter / 2;
    border-radius: 50%;
    display: block;
    position: relative;
    top: $markerDiameter / 4;
    left: $markerDiameter / 4;
  }
}
</style>
