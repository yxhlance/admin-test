import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import request from './utils/request'
// import request from './utils/request'

// 重置样式默认值
import 'normalize.css'

// 全局引入 elementUI，设置大小及国际语言
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import enLang from 'element-ui/lib/locale/lang/en'
Vue.use(Element, {
  size: 'small',
  locale: enLang
})

require('./mock/index.js')
import './permission'

Vue.config.productionTip = false

// Vue.prototype.$request = request

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
