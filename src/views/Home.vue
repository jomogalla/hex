<template>
  <div class="board">
    <Board msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '@/components/Board.vue';

export default {
  name: 'board',
  components: {
    Board,
  },
};
</script>
