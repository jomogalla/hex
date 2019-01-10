<template>
<div class="game">
  <DiceTray/>
  <div class="board">
    <Board />
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import DiceTray from '@/components/DiceTray.vue';
import Board from '@/components/Board.vue';

export default {
  name: 'home',
  components: {
    DiceTray,
    Board,
  },
};
</script>

<style lang="scss">
.game {
  display: grid;
  grid-template-areas: 
    "main"
    "sidebar";
}

html {
  background-color: black;
}
</style>
