import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' //这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import './resize.js'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

Vue.config.productionTip = false
Vue.use(MintUI);
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')