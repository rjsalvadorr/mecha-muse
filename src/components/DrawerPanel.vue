<template>
  <div class="rj-menu__wrapper">
    <h3 class="rj-menu__heading rj-menu__heading--first">Legend</h3>
    <div class="legend-row legend-row--1">
      <div class="legend-unit">
        <span class="legend-unit__label">Root</span>
        <div class="legend-unit__icon marker active marker--root" />
      </div>
      <div class="legend-unit">
        <span class="legend-unit__label">3rd</span>
        <div class="legend-unit__icon marker active marker--3rd" />
      </div>
      <div class="legend-unit">
        <span class="legend-unit__label">5th</span>
        <div class="legend-unit__icon marker active marker--5th" />
      </div>
    </div>
    <div class="legend-row legend-row--2">
      <div class="legend-unit">
        <span class="legend-unit__label">7th</span>
        <div class="legend-unit__icon marker active marker--7th" />
      </div>
      <div class="legend-unit">
        <span class="legend-unit__label">9th</span>
        <div class="legend-unit__icon marker active marker--9th" />
      </div>
    </div>

    <h3 class="rj-menu__heading">Contents</h3>
    <ol class="rj-menu__contents">
      <li>
        <a class="rj-menu__link" href="#five-string">
          <span>Five-string voicings (open)</span>
        </a>
      </li>
      <li>
        <a class="rj-menu__link" href="#three-string">
          <span>Three-string voicings (melodic)</span>
        </a>
      </li>
      <li>
        <a class="rj-menu__link" href="#four-string">
          <span>Four-string patterns</span>
        </a>
      </li>
      <li>
        <a class="rj-menu__link" href="#sevenths">
          <span>7th chord patterns</span>
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "DrawerPanel",
  props: {
    customId: String
  }
};
</script>

<style scoped lang="scss">
.rj-menu__wrapper {
  width: 300px;
  display: block;
  box-sizing: border-box;
  color: #ffffff;
}

.legend-row {
  display: flex;

  .legend-unit {
    flex-basis: 33%;
  }

  .legend-unit__label {
    display: block;
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

.rj-menu__heading {
  margin-top: 3rem;
  margin-bottom: 1rem;

  &--first {
    margin-top: 0;
  }
}

.rj-menu__link {
  text-decoration: none;
  color: #ffffff;
}

.rj-menu__contents {
  padding: 0 10px;

  li {
    text-align: left;
  }
}
</style>
