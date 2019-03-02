<template>
  <div class="tile-wrapper">
      <!-- <transition-group name="slide-fade" class="dice-section" tag="div"> -->
    <svg viewBox="-110 -300 1100 1000" class="game-board">
      <!-- <defs>
        <pattern id="img1" patternUnits="userSpaceOnUse" width="1000" height="1000">
          <image xlink:href="/assets/woods.jpg" x="0" y="0" width="200" height="100" />
        </pattern>
      </defs> -->
      <g transform="translate(0, 0) rotate(-30)">
          <!-- <g class="grid"> -->
          <transition-group name="slide-fade" class="grid" tag="g">
              <Tile v-for="tile in flattenedTiles"
                    :value="tile.value" 
                    :resourceType="tile.resourceType"
                    :id="tile.id"
                    :rValue="tile.rValue"
                    :qValue="tile.qValue"
                    :key="tile.id">
              </Tile>
          </transition-group>
          <!-- </g> -->
      </g>
    </svg>
      <!-- </transition-group> -->
  </div>
</template>

<script>
import Tile from '@/components/Tile.vue';

export default {
  components: {
    Tile,
  },
  name: 'Board',
  data() {
    return {
      //arrayForStuff: [],
      tileHeight: 175,
      tileWidth: 150,
     // tiles: this.generateBoard(5),
      exampleTiles: [[{
        id: 0,
        value: 5,
        resourceType: "brick"
      }, {
        id: 1,
        value: 2,
        resourceType: "wood"
      }],[ {
        id: 2,
        value: 5,
        resourceType: "wool"
      }, {
        id: 3,
        value: 2,
        resourceType: "ore"
      }, {
        id: 4,
        value: 5,
        resourceType: "wheat"
      }], [{
        id: 5,
        value: 2,
        resourceType: "sand"
      }, {
        id: 6,
        value: 2,
        resourceType: "sand"
      },]]
    };
  },
  mounted() {
  //  this.tiles = this.generateBoard(5);
  //  this.$store.commit('setBoard', this.generateBoard(5));
  },
  computed: {
    tiles() {
      return this.$store.state.board.tiles;
    },
    flattenedTiles() {
      if(!this.tiles) { return [[]]; }

      let flattenedTiles = [];

      for(let q = 0; q < this.tiles.length; q++) {
        for(let r = 0; r < this.tiles[q].length; r++) {
          let updatedTile = this.tiles[q][r];
          updatedTile.qValue = this.getQOffset(q, this.tiles.length);
          updatedTile.rValue = this.getROffset(r, this.tiles[q].length);

          flattenedTiles.push(updatedTile);
        }
      }

      return flattenedTiles;
    },
    maxBoardWidth() {
      let maxWidth = 0;

      for(let q = 0; q < this.tiles.length; q++) {
        if(this.tiles[q].length > maxWidth) { 
          maxWidth = this.tiles[q].length;
        }
      }

      return maxWidth;
    }
  },
  methods: {
    getQOffset(currentQ, totalQ) {
      return currentQ * this.tileWidth;
    },
    getROffset(currentR, totalR) {
      let offset = 0;

      if(totalR < this.maxBoardWidth) {
        offset = this.tileHeight * ((this.maxBoardWidth - totalR) / 2 );
      }

      return currentR * this.tileHeight + offset;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .game-board { 
    max-width: 90vw;
    max-height: 90vh;
  }

  .slide-fade-enter, 
.slide-fade-leave-to {
  opacity: 0;
  transform: rotate(360deg);
}
.slide-fade-leave-active {
  position: absolute;
}

.restart-board-button {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1;
  font-size: 2rem;

}
</style>
