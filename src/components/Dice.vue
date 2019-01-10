<template>
  <div class="dice">
    <i class="fas" :class="getFontClass"></i>
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
      fontClasses: [
        'fa-dice-one',
        'fa-dice-two',
        'fa-dice-three',
        'fa-dice-four',
        'fa-dice-five',
        'fa-dice-six'
      ]
    };
  },
  computed: {
    getFontClass() {
      return this.fontClasses[this.value - 1]
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dice {
  color: white;
  font-size: 4rem;
  // font-size: 20vw;
  margin: 0.5rem;
}
</style>
