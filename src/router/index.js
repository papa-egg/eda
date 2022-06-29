import Vue from 'vue';
import Router from 'vue-router';

const Eda = r => require.ensure([], () => r(require('@/pages/eda/Eda.vue')), 'Eda');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/eda',
      component: Eda,
    },
    {
      path: '/*',
      component: Eda,
    },
  ]
});
