<template>
  <div class="dice-tray">
      <transition-group name="slide-fade" class="dice-section" tag="div">
        <Dice :value="diceValues[index].value" 
              v-for="(dice, index) in diceValues" 
              :key="dice.id"
              v-on:click="rollByIndex(index)"
              class="dice-wrap"/>
      </transition-group>
      
    <div class="control-bar">
      <div class="total">{{ diceTotal }}</div>

      <button @click="lessDice" class="transparent middle light-gray side-button"><i class="fas fa-minus"></i></button>
      <button @click="rollAll" class="transparent roller"><i class="fas fa-dice-d6"></i></button>
      <button @click="moreDice" class="transparent middle light-gray side-button"><i class="fas fa-plus"></i></button>
    </div>
  </div>
</template>

<script>
import Dice from '@/components/Dice.vue';

export default {
  components: {
    Dice
  },
  name: 'Board',
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
    var self = this;

    // Attach Event Listeners
    window.addEventListener('keyup', function (event) {
      // If down arrow was pressed...
      if (event.keyCode == 32) { 
        event.stopPropagation();
        self.rollAll();

      }
    });
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
    rollByIndex(index) {
      console.log(index)
    },
    rollAll() {
      // for(let index = 0; index < this.diceValues.length; index++) {
      //   this.diceValues.splice(index, 1, this.getNewDice());
      // }
      this.diceValues = [];

      for(let i = 0; i < this.numDice; i++) {
        this.diceValues.push(this.getNewDice());
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
.dice-tray {
  grid-area: sidebar;
}

.total {
  font-size: 2rem;
}

.dice-section {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 3rem;
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

.dice-wrap {
  transition: transform 0.2s;
}
.slide-fade-enter, 
.slide-fade-leave-to {
  opacity: 0;
  transform: rotate(360deg);
}
.slide-fade-leave-active {
  position: absolute;
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

.control-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 3rem;

  .side-button {
    padding: 0 2rem;
  }
}
</style>
