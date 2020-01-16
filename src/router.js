import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Nav from './views/Nav.vue'
import Empty from './Empty.vue'

Vue.use(Router)

let navRouter = [{
        path: '',
        name: 'index',
        component: Index,
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('./views/About.vue'),
    },
    {
        path: '/sass',
        name: 'sass',
        component: () =>
            import ('./views/Sass.vue'),
    },
]

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: Nav,
            children: navRouter
        },
        {
            path: '/nine',
            name: 'nine',
            component: () =>
                import ('./views/Nine.vue'),
            meta: {
                keepAlive: true,
                deepth: 1
            }
        },
        {
            path: '/circle',
            name: 'circle',
            component: () =>
                import ('./views/Circle.vue')
        },
        {
            path: '/img',
            name: 'img',
            component: () =>
                import ('./views/ImageLazy.vue')
        },
        {
            path: '/pic',
            name: 'pic',
            component: () =>
                import ('./views/Picker.vue')
        },
        { //动态组件
            path: '/dyn',
            name: 'dyn',
            component: () =>
                import ('./views/Dyn.vue'),

            meta: {
                keepAlive: true,
                deepth: 2
            }
        },
        { //动态组件
            path: '/design',
            name: 'design',
            component: Empty,
            children: [{
                    path: '',
                    name: 'design',
                    component: () =>
                        import ('./views/Design/Design.vue'),
                },
                {
                    path: 'show',
                    name: 'show',
                    component: () =>
                        import ('./views/Design/Show.vue')
                },
            ]
        },
        {
            path: '/degree',
            name: 'degree',
            component: () =>
                import ('./views/Degree.vue'),
            meta: {
                keepAlive: true,
                deepth: 3
            }
        },
        {
            path: '/slider',
            name: 'slider',
            component: () =>
                import ('./views/Slider.vue'),
            meta: {
                keepAlive: true,
                deepth: 3
            }
        }
    ]
})