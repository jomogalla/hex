import Vue from 'vue';
import Vuex from 'vuex';

import boardModule from './modules/boardModule'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    board: boardModule,
  },
  state: {
    diceTotal: 0,
    lastRollTime: new Date(),
    currentTime: new Date(),
    currentPlayerIndex: 0,
    playerNames: ['Mars', 'Matt', 'Ries', 'Jason'],
  },
  mutations: {
    updateDiceTotal(state, newDiceTotal) {
      state.diceTotal = newDiceTotal;
    },
    updateLastRollTime(state) {
      state.lastRollTime = new Date();
    },
    updateCurrentTime(state) {
      state.currentTime = new Date();
    },
    setNextPlayer(state) {
      state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.playerNames.length;
    },
  },
  getters: {
    currentPlayer(state) {
      return state.playerNames[state.currentPlayerIndex];
    },
    timeSinceLastRoll(state) {
      const diffInMs = Math.abs(state.currentTime - state.lastRollTime);
      return parseInt(diffInMs / 1000, 10);
    }
  }, 
});
