import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    diceTotal: 0
  },
  mutations: {
    updateDiceTotal(state, newDiceTotal) {
      state.diceTotal = newDiceTotal;
    }
  },
  actions: {

  },
});
