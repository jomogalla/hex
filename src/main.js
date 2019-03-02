import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.filter('formatSeconds', (value) => {
  let newDate = new Date(null);
  newDate.setHours(0);
  newDate.setSeconds(value);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  let newMinutes = minutes.toString().padStart(2, 0);
  let newSeconds = seconds.toString().padStart(2, 0);

  if(hours != 0) {
    return `${hours}:${newMinutes}:${newSeconds}`
  }

  if(seconds != 0) {
    return `${newMinutes}:${newSeconds}`
  }

  return '00:00';
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    setInterval(() => { this.$store.commit('updateCurrentTime') }, 1000);
  }
}).$mount('#app');
