import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loginStatus: false,
		user: {}
	},
	mutations: {
		login(state, user) {
			state.loginStatus = true
			state.user = user
			uni.setStorageSync('user', JSON.stringify(user))
		},
		// 初始化用户登录状态
		initLogin(state) {
			let user = uni.getStorageSync('user')
			if(user) {
				state.user = user
				state.loginStatus = true
			}
		},
		// 退出登录
		logout(state) {
			state.loginStatus = false
			state.user = {}
			// 清空缓存
			uni.removeStorageSync('user')
		}
 	},
})