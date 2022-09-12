import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
// 注册全局组件
import divider from './components/common/divider.vue'
Vue.component('divider', divider)
import noThing from './components/common/noThing.vue'
Vue.component('no-thing', noThing)

// 引入配置文件
import $C from './common/config.js'
Vue.prototype.$C = $C

// 挂载工具库
import util from './common/util/index'
Vue.prototype.$U = util

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif