<template>
  <div id="app" class="app">
    <h1 class="app__title">Guitarragrams</h1>
    <div class="row app__intro">
      <div class="five columns">
        <p class="app__description">
          A visual reference for guitar chord voicings,
          built and updated by <a href="http://rj-salvador.com" target="_blank">RJ Salvador</a>.
          Source code can be seen at <a href="https://github.com/rjsalvadorr/guitarragrams" target="_blank">GitHub</a>.
          If you like this kind of nerdy guitar stuff, I have more things <a href="http://www.rj-salvador.com/tags/music/" target="_blank">here</a>.
        </p>
      </div>
      <div class="seven columns">
        <ul class="app__notes">
          <li>
            <span>
              Click the help tab (on the left) to see the table of contents and legend.
              Use the filters below to find chord shapes by type or size.
            </span>
          </li>
          <li>
            <span>
              The chord diagrams are only for standard tuning (for now).
            </span>
          </li>
          <li>
            <span>
              No open strings are used here.
              These chord patterns are meant to be usable on any position on the fretboard.
            </span>
          </li>
          <li>
            <span>
              Planned features: chord playback, left-hand mode, alternate tunings.
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="filter-controls__wrapper">
      <h2 class="filter-controls__label">Filters</h2>
      <span class="filter-controls__results">Showing {{ numDiagrams }} diagrams</span>
      <form class="filter-controls">
        <div class="input-group">
          <label for="sel-chord-quality">Chord Type</label>
          <select v-model="selectedChordType" id="sel-chord-quality" name="sel-chord-quality">
            <option value="maj,maj7,7,min,m7,dim,m7b5,dim7" selected>All</option>
            <option value="maj,maj7,7">Major, Dominant</option>
            <option value="min,m7">Minor</option>
            <option value="dim,m7b5,dim7">Diminished</option>
          </select>
        </div>
        <div class="input-group">
          <label for="sel-max-fret-span">Max. Frets: {{selectedMaxFretSpan}}</label>
          <input type="range" v-model="selectedMaxFretSpan" id="sel-max-fret-span" name="sel-max-fret-span" min="0" max="6" />
        </div>
        <div class="input-group">
          <label for="sel-max-string-span">Max. Strings: {{selectedMaxStringSpan}}</label>
          <input type="range" v-model="selectedMaxStringSpan" id="sel-max-string-span" name="sel-max-string-span" min="0" max="6" />
        </div>
      </form>
      <div class="u-cf" />
    </div>

    <PatternGroup :diagrams="filteredDiagrams.FIVE_STRING" :label= "diagramLabels.FIVE_STRING" customId="five-string">
      <p class="pattern-group__description">
        Chord voicings with with plenty of space between the notes.
        These can be useful for playing on two areas of the fretboard at the same time.
      </p>
    </PatternGroup>

    <PatternGroup :diagrams="filteredDiagrams.THREE_STRING" :label= "diagramLabels.THREE_STRING" customId="three-string">
      <p class="pattern-group__description">
        Useful for adding harmony
        to a melodic passage. The fretting hand can form these chord shapes
        quickly while soloing.<br>
        NOTE: the fingering for the A,D,G strings can be used for the E,A,D strings.
      </p>
    </PatternGroup>

    <PatternGroup :diagrams="filteredDiagrams.FOUR_STRING" :label= "diagramLabels.FOUR_STRING" customId="four-string">
      <p class="pattern-group__description">
        Eiusmod minim voluptate tempor, picanha sed ball tip. Consequat enim shoulder ut pork loin.
      </p>
    </PatternGroup>

    <PatternGroup :diagrams="filteredDiagrams.SEVENTH" :label= "diagramLabels.SEVENTH" customId="sevenths">
      <p class="pattern-group__description">
        For a lighter sound, don't play the 5th.
     </p>
    </PatternGroup>

    <Slide
      @openMenu="handleOpenMenu"
      @closeMenu="handleCloseMenu"
    >
      <DrawerPanel />
    </Slide>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";

import * as constants from "./utils/constants";
import * as utils from "./utils/utils";

import fiveStringMaj from "./data/five-string-major.json";
import fiveStringMin from "./data/five-string-minor.json";
import fiveStringDim from "./data/five-string-diminished.json";
import threeStringMaj from "./data/three-string-major.json";
import threeStringMin from "./data/three-string-minor.json";
import threeStringDim from "./data/three-string-diminished.json";
import fourStringMaj from "./data/four-string-major.json";
import fourStringMin from "./data/four-string-minor.json";
import fourStringDim from "./data/four-string-diminished.json";
import seventhsMaj from "./data/7ths-major.json";
import seventhsMin from "./data/7ths-minor.json";
import seventhsDim from "./data/7ths-diminished.json";

import PatternGroup from "./components/PatternGroup.vue";
import FretboardMarker from "./components/FretboardMarker.vue";
import DrawerPanel from "./components/DrawerPanel.vue";

export default {
  name: "app",
  components: {
    Slide,
    PatternGroup,
    FretboardMarker,
    DrawerPanel
  },
  data: function() {
    return {
      inputDiagrams: [
        fiveStringMaj,
        fiveStringMin,
        fiveStringDim,
        threeStringMaj,
        threeStringMin,
        threeStringDim,
        fourStringMaj,
        fourStringMin,
        fourStringDim,
        seventhsMaj,
        seventhsMin,
        seventhsDim
      ],
      selectedChordType: "maj,maj7,7,min,m7,dim,m7b5,dim7",
      selectedMaxFretSpan: 6,
      selectedMaxStringSpan: 6
    };
  },
  computed: {
    diagrams: function() {
      let ctr = 0;
      const outputDiagrams = {};
      for (var i = 0; i < this.inputDiagrams.length; i++) {
        let diagramGroup = this.inputDiagrams[i];
        let patternType = diagramGroup.patternType;

        outputDiagrams[patternType] = outputDiagrams[patternType] || [];
        for (var j = 0; j < diagramGroup.diagrams.length; j++) {
          let currentDiagram = utils.buildDiagram(
            diagramGroup.diagrams[j],
            ctr
          );
          outputDiagrams[patternType].push(currentDiagram);
          ctr++;
        }
      }
      return outputDiagrams;
    },
    filteredDiagrams: function() {
      return {
        FIVE_STRING: utils.filterDiagrams(
          this.diagrams.FIVE_STRING,
          this.options
        ),
        THREE_STRING: utils.filterDiagrams(
          this.diagrams.THREE_STRING,
          this.options
        ),
        FOUR_STRING: utils.filterDiagrams(
          this.diagrams.FOUR_STRING,
          this.options
        ),
        SEVENTH: utils.filterDiagrams(this.diagrams.SEVENTH, this.options)
      };
    },
    diagramLabels: function() {
      return constants.groupLabels;
    },
    options: function() {
      return {
        chordTypes: this.selectedChordType,
        fretSpanMin: 0,
        fretSpanMax: this.selectedMaxFretSpan,
        stringSpanMin: 0,
        stringSpanMax: this.selectedMaxStringSpan
      };
    },
    numDiagrams: function() {
      let totalDiagrams = 0;
      totalDiagrams += this.filteredDiagrams.FIVE_STRING.length;
      totalDiagrams += this.filteredDiagrams.THREE_STRING.length;
      totalDiagrams += this.filteredDiagrams.FOUR_STRING.length;
      totalDiagrams += this.filteredDiagrams.SEVENTH.length;

      return totalDiagrams;
    }
  },
  methods: {
    handleOpenMenu: function() {
      document.querySelector(".bm-menu").classList.add("bm-menu--open");
      document.querySelector(".bm-menu").classList.remove("bm-menu--closed");
    },
    handleCloseMenu: function() {
      document.querySelector(".bm-menu").classList.add("bm-menu--closed");
      document.querySelector(".bm-menu").classList.remove("bm-menu--open");
    }
  }
};
</script>

<style lang="scss">
$box-shadow-color: rgba(0, 0, 0, 0.5);
$mui-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.38), 0 6px 6px rgba(0, 0, 0, 0.46);
$main-color: #2c3e50;

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main-color;
  margin-top: 30px;
}

pre,
code {
  text-align: left;
}

.app {
  hr {
    margin: 0 0 5rem 0;
    border-color: $main-color;
  }

  &__title {
    text-align: center;
  }

  &__description,
  &__notes {
    text-align: left;
  }

  &__title,
  &__description,
  &__notes {
    padding: 0;
  }

  .bm-menu {
    padding-top: 3rem;
  }

  .bm-menu--open {
    border: none;
    box-shadow: $mui-box-shadow;
  }

  .cross-style {
    right: 10px;
    color: #ffffff;

    .bm-cross {
      height: 20px !important;
      background-color: #ffffff !important;
    }
  }

  .bm-burger-button {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(63, 63, 65);
    height: auto;
    width: auto;
    padding: 0 10px;
    border-radius: 0 0 10px 0;
    &::after {
      content: "\f128";
      color: #ffffff;
      font-family: FontAwesome;
      font-size: 30px;
    }
    box-shadow: $mui-box-shadow;
    z-index: 999;
  }
  .bm-item-list {
    margin-left: 0;
  }
  .bm-burger-bars.line-style {
    display: none;
  }

  .filter-controls__wrapper {
    text-align: left;
    margin-bottom: 2rem;

    .filter-controls__results {
      font-size: 2rem;
      display: block;
      margin-bottom: 20px;
    }

    .filter-controls__label {
      text-align: left;
      margin-bottom: 0;
    }
  }

  .input-group {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    padding: 0 15px;
    height: 85px;
    float: left;

    label,
    select,
    input {
      text-align: left;
      width: 100%;
    }
  }
}
/* Larger than mobile */
@media (min-width: 400px) {
  #app {
    margin-top: 40px;
  }
  .app {
    hr {
      margin: 0 20px 5rem 20px;
    }
    .bm-burger-button {
      padding: 2px 10px;
      &::after {
        font-size: 35px;
      }
    }
    &__title,
    &__description,
    &__notes {
      padding: 0 20px;
    }
    &__title {
      text-align: left;
    }

    .filter-controls__label,
    .filter-controls__results {
      padding: 0 20px;
    }

    .input-group {
      width: 50%;
      padding: 0 20px;
    }
  }
}

/* Larger than phablet */
@media (min-width: 550px) {
  #app {
    margin-top: 60px;
  }
  .app {
    &__intro {
      margin-bottom: 20px;
    }
    &__title {
      font-size: 6rem;
    }
    .bm-burger-button {
      top: calc(50% - 100px);
      border-radius: 0 8px 8px 0;
      padding: 15px;
      &::after {
        font-size: 40px;
      }
    }

    .input-group {
      width: 33%;
    }
  }
}
</style>
