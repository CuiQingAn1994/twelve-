import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import site from '../pages/site'
import about from '../pages/about'



Vue.use(Router)

export default new Router({
  routes: [
  	{ path: '/', redirect: '/home' },
    {
      path: '/site',
      name: 'site',
      component: site,
      children:[
	        { path: '/home', component: home},
	        { path: '/about', component: about}
    	]
	}
  ]
})
