// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
import 'weui/dist/style/weui.min.css'
Vue.config.productionTip = false
axios.defaults.timeout = 20000;
Vue.prototype.$http = axios;
/* eslint-disable no-new */
import { InfiniteScroll } from 'mint-ui';
import { Spinner } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);


axios.defaults.headers.post['Content-Type'] = 'application/x_www-form-urlencoded';
// 拦截器
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 404:
                  store.set("_person","")
                  window.location.href=_config.user_url+'#/err'
              case 403:
                  store.set("_person","")
                  // var href = window.location.href;
                  // store.set("_reherf","");
                  window.location.href=_config.user_login
              case 401:
                  // var href1 = window.location.href;
                  // store.set("_reherf", "");
                  store.set("_person","")
                  window.location.href=_config.user_login
              case 500:
                  window.location.href=_config.user_url+'#/err'
              case 501:
                  window.location.href=_config.user_url+'#/err'
              case 502:
                  window.location.href=_config.user_url+'#/err'
              case 503:
                  window.location.href=_config.user_url+'#/err'
              case 504:
                  window.location.href=_config.user_url+'#/err'
          }
      }
      // if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1){
      // }
      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      return Promise.reject(error.response.data)  // 返回接口返回的错误信息
});

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
});
Vue.filter('currency',function(price,sign,len){
	var num =  Math.abs(price);
	 return sign+(num.toFixed(len))
})
Vue.filter('formDate',function (input) {
    var d = new Date(input);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours()<10 ? '0' + d.getHours() : '' + d.getHours();
    var minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
    var seconds = d.getSeconds()<10 ? '0' + d.getSeconds() : '' + d.getSeconds();
    return year+ '.' + month + '.' + day + ' ' + hour + ':' + minutes+':'+seconds
 })
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
