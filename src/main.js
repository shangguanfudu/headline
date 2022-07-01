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
import ArticleList from '@/components/ArticleList.vue'
import * as obj from '@/filters'

Vue.component('MyIcon', MyIcon)
Vue.component('ArticleList', ArticleList)
Vue.use(Vant)
Vue.config.productionTip = false
// 批量创建过滤器
// const obj = {
//   a: function (time) { return time },
//   b: function (time) { return time },
//   dateformat: function (time) { return time }
// }
Object.keys(obj).forEach((key) => {
  Vue.filter(key, obj[key])
})
// Vue.filter('dateformat', function (time) { return time })

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
