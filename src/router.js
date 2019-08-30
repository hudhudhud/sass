import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/sass',
      name: 'sass',
      component: () => import('./views/Sass.vue')
    },
    {
      path: '/nine',
      name: 'nine',
      component: () => import('./views/Nine.vue')
    },
    {
      path:'/circle',
      name:'circle',
      component: () => import('./views/Circle.vue')
    }
  ]
})
