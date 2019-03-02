<template>
  <div class="creator">
    <div>
    <router-link :to="'/game/45'"> <i class="fas fa-angle-left"></i> back to game</router-link>
    </div>
    <hr>
    <div class="player-wrapper" v-for="player in players" v-bind:key="player.id">
      <input type="text" v-model="player.name" placeholder="player name"/>
      <select v-model="player.color">
        <option value="">Select a Color</option>
        <option v-for="color in colors" :key="color">{{color}}</option>
      </select>
    </div>
    <div>
      <br>
    <button class="" @click="addPlayer">
      <i class="fas fa-plus"></i> Add Player
    </button>
    </div>
    <hr>
    <div>
    <button @click="restartBoard" class="restart-board-button"><i class="fas fa-chess-board"></i> Generate Board</button>
    <span v-show="boardGenerated">BOARD GENERATED</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'creator',
  data() {
    return {
      newPlayer: {
        id: 0,
        name: '',
        color: '',
      },
      colors: ['green', 'red', 'orange', 'white', 'blue', 'brown',],
      boardGenerated: false,
    };
  },
  computed: {
    numPlayers() {
      return this.$store.state.players.length;
    },
    players() {
      return this.$store.state.players;
    },
    colorsSelected() {
      const colors = [];

      this.players.forEach((player) => {
        colors.push(player.color);
      });

      return colors;
    },
    colorsLeft() {
      const colors = [];

      this.colors.forEach((color) => {
        if(!this.colorsSelected.includes(color)) { colors.push(color)}
      });

      return colors;
    },
  },
  methods: {
    addPlayer() {
      const player = Object.assign({}, this.newPlayer);

      player.id = this.makeId();

      this.$store.commit('addPlayer', player);
    },
    editPlayerName(index, name) {
      
    },
    restartBoard() {
      this.boardGenerated = true;
      this.$store.commit('setBoard', this.generateBoard(5));
    },
    makeId() {
      var text = "";
      var possible = "ABCDEF0123456789";

      for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
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
  }
};
</script>
<style scoped lang="scss">
  a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
  }

  button, input, select {
    background-color: transparent;
    border: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }

  input, select {
    border-radius: 0;
    border-bottom: 0.2rem dotted white;
  }
</style>