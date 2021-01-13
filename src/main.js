import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import ajax from './assets/js/ajax';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$ajax = ajax;
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
const $vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

window.$vue = $vue;
