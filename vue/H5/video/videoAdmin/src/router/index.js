import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/site',
            redirect: '/recording',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/recording',
                    component: resolve => require(['../components/page/recording.vue'], resolve)
                },
                {
                    path: '/createVideo',
                    component: resolve => require(['../components/page/createVideo.vue'], resolve)
                },
                {
                    path: '/videoList',
                    component: resolve => require(['../components/page/videoList.vue'], resolve)
                },
                {
                    path: '/videoPlay:id',
                    component: resolve => require(['../components/page/videoPlay.vue'], resolve)
                },
                {
                    path: '/videoAdmin',
                    component: resolve => require(['../components/page/videoAdmin.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
