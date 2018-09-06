// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import QRCode from 'qrcodejs2';
import 'swiper/dist/css/swiper.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import { Swipe, SwipeItem } from 'mint-ui';
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, _config.socket);

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);



Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
// axios.defaults.timeout = 20000;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
