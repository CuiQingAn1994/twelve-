import Vue from 'vue'
import Router from 'vue-router'
import video from '@/components/video'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/video'
    },
    {
      path: '/video',
      name: 'video',
      component: video
    }
  ]
})
