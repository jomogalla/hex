import Vue from 'vue';
import Router from 'vue-router';
import Game from './views/Game.vue';
import Welcome from './views/Welcome.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/game/:gameId',
      name: 'game',
      component: Game,
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "creator" */ './views/Creator.vue'),
    },
  ],
});
