import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'font-awesome/css/font-awesome.min.css'
import 'swiper/dist/css/swiper.css' //这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import './resize.js' //通过设置device-width,initial-scale来适配移动端，这样开发就可直接用px
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

Vue.config.productionTip = false
Vue.use(MintUI);
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')