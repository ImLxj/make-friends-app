<template>
	<view>
		<view>
			<!-- 状态栏高度 -->
			<uni-status-bar></uni-status-bar>
			<view
				style="margin-left: 20rpx;"
				hover-class="pulse"
				:style="'top:' + statusBarHeight + 'px'"
				@click="back"
				class="iconfont icon-guanbi font-lg font-weight-bold animated">
			</view>
		</view>
		<view 
			class="text-center" 
			style="padding-top: 130rpx; padding-bottom: 70rpx; font-size: 55rpx;">
			{{statusText}}
		</view>
		<view class="px-2">
			<template v-if="!status">
				<view class="mb-2">
					<input type="text" v-model="username" class="p-2 border-bottom" placeholder="昵称/手机号/邮箱">
				</view>
				<view class="flex mb-2 align-stretch">
					<input type="text" v-model="password" class="p-2 border-bottom flex-1" placeholder="请输入密码">
					<view 
						style="width: 150rpx;" 
						class="flex font-sm border-bottom align-center justify-center text-light-muted">
						忘记密码？	
					</view>
				</view>
			</template>
			<template v-else>
				<view class="mb-2 flex">
					<view class="font flex align-center justify-center border-bottom font-weight-bold">+86</view>
					<input type="text" v-model="phone" class="p-2 flex-1 border-bottom" placeholder="请输入手机号码">
				</view>
				<view class="flex mb-2 align-stretch">
					<input type="text" v-model="code" class="p-2 border-bottom flex-1" placeholder="请输入验证码">
					<view 
						style="width: 150rpx;" 
						@click="getCode"
						:class="codeTime > 0 ? 'bj-main-disabled' : 'bj-main'"
						class="flex font-sm border-bottom align-center justify-center text-white">
						{{ codeTime > 0 ? codeTime + ' s' : '获取验证码'}}
					</view>
				</view>
			</template>
		</view>
		<!-- 底部按钮 -->
		<view class="py-2 px-3" style="margin-top: 100rpx;">
			<button 
				type="primary" 
				class="bj-main text-white" 
				style="border-radius: 50rpx;"
				:disabled="disabled"
				:class="disabled ? 'bj-main-disabled' : ''"
				:loading="loading"
				@click="submit">
				{{loading ? '登录中' : '登录'}}
			</button>
		</view>
		
		<!-- 切换登录 -->
		<view class="flex align-center justify-center pb-3 pt-3">
			<view class="font-sm" style="color: #376678;" @click="changeStatus">
				{{ status ? '账号密码登录' : '验证码登录' }}
			</view>
			<text class="text-muted mx-1">|</text>
			<view class="font-sm" style="color: #376678;">登录遇到问题</view>
		</view>
		<!-- 社交账号登录 -->
		<view class="flex align-center justify-center pt-2">
			<view style="height: 1rpx; width: 100rpx; background-color: #dddddd;"></view>
			<view class="mx-2" style="color: #dddddd;">社交账号登录</view>
			<view style="height: 1rpx; width: 100rpx; background-color: #dddddd;"></view>
		</view>
		<!-- 第三方登录 -->
		<other-login back></other-login>
		<!-- 同意协议 -->
		<view class="flex align-center justify-center">
			<text style="color: #dddddd;">注册代表您同意</text>
			<text style="color: #007aff;">《呲牙》社区协议</text>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	import otherLogin from '@/components/common/other-login.vue'
	export default {
		components: {
			uniStatusBar,
			otherLogin
		},
		data() {
			return {
				statusBarHeight: 0,
				status: false, // 判断用什么方式登录
				username: '13711111111',
				password: '123456',
				phone: '',
				code: '',
				codeTime: 0,
				loading: false
			}
		},
		onLoad() {
			let { statusBarHeight } = uni.getSystemInfoSync()
			this.statusBarHeight = statusBarHeight
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 初始化表单
			init() {
				this.username = '13711111111'
				this.password = '123456'
				this.phone = ''
				this.code = ''
			},
			// 改变登录状态
			changeStatus() {
				this.init()
				this.status = !this.status
			},
			// 验证手机号
			validate() {
				const phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
				if(!phone.test(this.phone)) {
					uni.showToast({
						title: '手机号输入不正确',
						icon: 'none'
					})
					return false
				}else {
					return true
				}
			},
			
			// 登录按钮
			submit() {
				if(!this.status) {
					this.loading = true
					let url = '/user/login'
					let data = {
						username: this.username,
						password: this.password
					}
					this.loginRequest(url, data)
				}else {
					this.loading = true
					if(!this.validate()) return
					let url = '/user/phonelogin'
					let data = {
						phone: this.phone,
						code: this.code
					}
					this.loginRequest(url, data)
				}
			},
			// 获取验证码
			getCode() {
				// 防止多次点击
				if(this.codeTime > 0) return
				// 验证手机号
				if(!this.validate()) return 
				this.$H({
					url: '/user/sendcode',
					method: 'POST',
					data: {
						phone: this.phone
					}
				}).then(res => {
					let {data : result} = res
					uni.showToast({
						title: result.msg,
						icon: 'none'
					})
					this.codeTime = 60
					let timer = setInterval(() => {
						if(this.codeTime >= 1) {
							this.codeTime--
						}else {
							this.codeTime = 0
							clearInterval(timer)
						}
					}, 1000)
				}).catch(err => {
					console.log(err);
				})
			},
			// 登录请求
			loginRequest(url, data) {
				this.$H({
					url,
					method: 'POST',
					data
				}).then(res => {
					this.loading = false
					// 改变登录状态
					let {data: result} = res
					// 持久化存储
					this.$store.commit('login', result.data)
					// 提示跳转
					uni.navigateBack({
						delta: 1
					})
					uni.showToast({
						title:'登录成功',
						icon:'none'
					})
				}).catch(err => {
					this.loading = false
					console.log(err);
				})
			}
		},
		computed: {
			statusText() {
				return this.status ? '手机验证码登录' : '账号密码登录'
			},
			disabled() {
				if((this.username === '' || this.password === '') && (this.phone === '' || this.code === '')) {
					return true
				}
				return false
			}
		}
	}
</script>

<style>

</style>
