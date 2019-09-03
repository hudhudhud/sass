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
    },
    {
      path:'/img',
      name:'img',
      component: () => import('./views/ImageLazy.vue')
    },
    {
      path:'/pic',
      name:'pic',
      component: () => import('./views/Picker.vue')
    },
    {//动态组件
      path:'/dyn',
      name:'dyn',
      component: () => import('./views/Dyn.vue')
    }
  ]
})
