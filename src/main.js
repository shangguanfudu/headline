import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.less'
import Vant from 'vant'
// import 'vant/lib/index.css'
// 引入全部样式
import 'vant/lib/index.less'
import 'amfe-flexible'
import MyIcon from '@/components/MyIcon.vue'

Vue.component('MyIcon', MyIcon)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
