import App from './App'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
// 注册全局组件
import divider from './components/common/divider.vue'
Vue.component('divider', divider)
import noThing from './components/common/noThing.vue'
Vue.component('no-thing', noThing)

// 引入 vuex
import store from './store/index.js'
Vue.prototype.$store = store

// 挂载工具库
import util from './common/util/index'
Vue.prototype.$U = util

// 挂载发送网络请求
import http from './common/http/request.js'
Vue.prototype.$H = http

// 权限验证
Vue.prototype.auth = (callback) => {
	if(!store.state.loginStatus){
		uni.showToast({
			title:'请先登录',
			icon:'none'
		})
		return uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	callback()
}

// 权限验证跳转
Vue.prototype.navigateTo = (options) => {
	if(!store.state.loginStatus){
		uni.showToast({
			title:'请先登录',
			icon:'none'
		})
		return uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	uni.navigateTo(options)
}

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
    app,
		store
  }
}
// #endif