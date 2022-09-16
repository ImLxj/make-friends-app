import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loginStatus: false,
		token: false,
		user: {}
	},
	mutations: {
		login(state, user) {
			state.loginStatus = true
			state.user = user
			state.token = state.user.token
			uni.setStorageSync('user', JSON.stringify(user))
		},
		// 初始化用户登录状态
		initLogin(state) {
			let user = uni.getStorageSync('user')
			if(user) {
				state.user = JSON.parse(user)
				state.token = state.user.token
				state.loginStatus = true
			}
		},
		// 退出登录
		logout(state) {
			state.loginStatus = false
			state.user = {}
			state.token = false
			// 清空缓存
			uni.removeStorageSync('user')
		},
		// 修改手机号/密码/邮箱
		editUserinfo(state, {key, value}) {
			state.user[key] = value
			// 重新缓存数据
			uni.setStorageSync('user', JSON.stringify(state.user))
		},
		editUserdata(state, obj) {
			if(state.user.userinfo) {
				let userinfo = state.user.userinfo
				userinfo.sex = obj.sex
				userinfo.qg = obj.qg
				userinfo.birthday = obj.birthday
				userinfo.job = obj.job
				userinfo.path = obj.path
			}
 		}
 	},
})