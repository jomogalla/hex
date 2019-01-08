<template>
  <div class="dice">
    <i class="fas" :class="[classes[value - 1]]"></i>
  </div>
</template>

<script>
export default {
  name: 'Dice',
  props: {
    value: Number
  },
  data() {
    return {
      classes: [
        'fa-dice-one',
        'fa-dice-two',
        'fa-dice-three',
        'fa-dice-four',
        'fa-dice-five',
        'fa-dice-six'
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dice {
  font-size: 5rem;
  font-size: 20vw;
  margin: 0.1rem;
}
</style>
