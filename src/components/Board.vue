<template>
  <div class="tile-wrapper">
    <!-- <div class="dice-section"> -->
      <transition-group name="slide-fade" class="dice-section" tag="div">
      <Dice :value="diceValues[index].value" 
            v-for="(dice, index) in diceValues" 
            :key="dice.id"/>
      </transition-group>
      

    <!-- </div> -->
    <hr>
    <div class="total">{{ diceTotal }}</div>

    <button @click="lessDice" class="transparent middle light-gray"><i class="fas fa-minus"></i></button>
    <button @click="rollAll" class="transparent roller"><i class="fas fa-dice-d6"></i></button>
    <button @click="moreDice" class="transparent middle light-gray"><i class="fas fa-plus"></i></button>
  </div>
</template>

<script>
import Tile from '@/components/Tile.vue';
import Dice from '@/components/Dice.vue';

export default {
  components: {
    Tile,
    Dice
  },
  name: 'Board',
  props: {
    msg: String,
  },
  data() {
    return {
      diceValue: 0,
      numDice: 2,
      diceValues: [],
      nextDiceId: 0,
    };
  },
  mounted() {
    this.repopulateDice();
  },
  watch: {
    numDice() {
      this.repopulateDice();
    }
  },
  computed: {
    diceTotal() {
      let total = 0;
      for(let dice of this.diceValues) {
        total += dice.value;
      }
      return total;
    }
  },
  methods: {
    roll() {
      this.diceValue = this.generateInt(6);
    },
    rollAll() {
      for(let index = 0; index < this.diceValues.length; index++) {
        this.diceValues.splice(index, 1, this.getNewDice());
      }
    },
    repopulateDice() {
      this.diceValues = [];

      for(let i = 0; i < this.numDice; i++) {
        this.diceValues.push(this.getNewDice());
      }
    },
    getNewDice() {
      let diceObject = {
        id: this.nextDiceId,
        value: this.generateInt(6)
      };

      this.nextDiceId++;
      return diceObject;
    },
    generateInt(maxInt) {
      let safeInt = 1;
      if (maxInt) { safeInt = maxInt; }       // Generate based on 1

      return Math.ceil(safeInt * Math.random());
    },
    moreDice() {
      this.numDice++;
    },
    lessDice() {
      this.numDice--;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.total {
  font-size: 2rem;
}

.dice-section {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  // margin-bottom: 5rem;
}

.roller {
  font-size: 2rem;
}

.wiggle-jiggle {
  animation-name: wiggle;
}

.middle {
  vertical-align: super;
}

.light-gray {
  color: #cccccc;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, 
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: rotate(90deg);

  opacity: 0;
}

.slide-fade-leave-to {
  transition: none !important;
  transform: rotate(90deg);
  display: none;
}
.transparent {
  outline: none;
  border: none;
  background-color: transparent;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    transform: scale(1.3);
  }

  &:active {
    transform: scale(1.4);
  }
}
</style>
