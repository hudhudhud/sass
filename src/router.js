import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Nav from './views/Nav.vue'
import Empty from './Empty.vue'

Vue.use(Router)

let navRouter=[
  {
    path: '',
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
]

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:Nav,
      children:navRouter
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
    },
    {//动态组件
      path:'/design',
      name:'design',
      component:Empty,
      children:[{
        path:'',
        name:'desi',
        component: () => import('./views/Design/Design.vue')
      },
      {
        path:'show',
        name:'show',
        component: () => import('./views/Design/Show.vue')
      },
      ]
     
    }
  ]
})
