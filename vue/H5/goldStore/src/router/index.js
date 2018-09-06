import Vue from 'vue'
import Router from 'vue-router'
import store from '@/pages/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/store'
    },
    {
      path: '/store',
      name: 'store',
      component: store	
    }
  ]
})
