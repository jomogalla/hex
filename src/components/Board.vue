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
    <button @click="restartBoard" class="restart-board-button"><i class="fas fa-bomb"></i></button>
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
      tiles: this.generateBoard(5),
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
    this.tiles = this.generateBoard(5);
  },
  computed: {
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
    restartBoard() {
      this.tiles = this.generateBoard(5);
    },
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
    generateBoard(boardSize) {
      if(!boardSize) { return [[]]; }
      if(boardSize !== 5 && boardSize !== 6) { return [[]]; }

      const middleIndex = Math.floor(boardSize / 2);

      let totalTiles = 0;

      // Figure out how many dang tiles well have. this should probably be de duped if u know what i men
      for(let q = 0; q < boardSize; q++) {
        let currentWidth = q >= middleIndex ? boardSize - q + middleIndex : middleIndex + q + 1;

        for(let r = 0; r < currentWidth; r++) {
          totalTiles++;
        }
      }

      // Get the number of each tiles we'll have
      let numDesertTiles = Math.ceil(totalTiles / 25);
      let numPlentyTiles = Math.ceil(totalTiles / 5);
      let numScarceTiles = Math.floor(totalTiles / 6);

      // Make some arrays with those names
      let desertArray = Array(numDesertTiles).fill('sand');
      let oreArray = Array(numScarceTiles).fill('ore');
      let brickArray = Array(numScarceTiles).fill('brick');
      let wheatArray = Array(numPlentyTiles).fill('wheat');
      let woolArray = Array(numPlentyTiles).fill('wool');
      let woodArray = Array(numPlentyTiles).fill('wood');

      // COMBINE AND SHUFFLE!
      const nonShuffledArray = [...desertArray, ...oreArray, ...brickArray, ...wheatArray, ...woolArray, ...woodArray];
      let shuffledResourceArray = this.knuthShuffle(nonShuffledArray);
      shuffledResourceArray = this.knuthShuffle(shuffledResourceArray);
      shuffledResourceArray = this.knuthShuffle(shuffledResourceArray);

      // GET US SOME VALUES FOR THE DICE
      let resourceDiceValues = [];
      // Bad place for this...
      let fiveWideNumberArray = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
      let sixWideNumberArray = [2, 5, 4, 6, 3, 9, 8, 11, 11, 10, 6, 3, 8, 4, 8, 10, 11, 12, 10, 5, 4, 9, 5, 12, 9, 3, 2, 6];


      if(boardSize === 5) { resourceDiceValues = fiveWideNumberArray; }
      if(boardSize === 6) { resourceDiceValues = sixWideNumberArray; }

      let finalBoard = [];
      let idNumber = 0;
      for(let q = 0; q < boardSize; q++) {
        let currentWidth = q >= middleIndex ? boardSize - q + middleIndex : middleIndex + q + 1;
        let row = [];

        for(let r = 0; r < currentWidth; r++) {
          let resourceType = shuffledResourceArray.pop();
          
          let resourceValue = null;
          if(resourceType !== "sand") {
            resourceValue = resourceDiceValues.pop();
          }

          row.push({ 
            id: idNumber,
            value: resourceValue,
            resourceType: resourceType,
          })

          idNumber++;
        }
        finalBoard.push(row);
      }

      return finalBoard;
    },
    knuthShuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
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
