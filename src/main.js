import Vue from 'vue'
import App from './App.vue'
import router from './router'

//test -hd

Vue.config.productionTip = false

//me 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

//hd2 edit two three