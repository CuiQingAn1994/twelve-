import Vue from 'vue'
import Router from 'vue-router'
import enter from '@/pages/enter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'enter',
    },
    {
      path: '/enter',
      name: 'enter',
      component: enter,
    },
    {
      path: '/success',
      component: resolve => require(['@/pages/success.vue'], resolve)
    },
    {
      path: '/settleInProtocol',
      component: resolve => require(['@/pages/settleInProtocol.vue'], resolve)
    },
  ]
})
