<template>
	<view>
		<view class="p-2">
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
		</view>
		
		<view class="py-2 px-3">
			<button 
				type="primary" 
				class="bj-main text-white" 
				style="border-radius: 50rpx;"
				:disabled="disabled"
				:class="disabled ? 'bj-main-disabled' : ''"
				@click="submit">
				提交
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				codeTime: 0,
			}
		},
		computed: {
			disabled() {
				return this.email === '' || this.password === ''
			}
		},
		methods: {
			// 验证
			check() {
				const phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
				if(!phone.test(this.phone)) {
					return false
				}
				return true
			},
			submit() {
				if(!this.check() && this.code === '') {
					uni.showToast({
						title: '手机号格式不正确',
						icon: "none"
					})
					return
				}
				this.$H({
					url: '/user/bindphone',
					method: 'POST',
					data: {
						phone: this.phone,
						code: this.code
					}
				}, true).then(res => {
					// 修改本地存储的手机号
					this.$store.commit('editUserinfo', {
						key: 'phone',
						value: this.phone
					})
					uni.navigateBack({
						delta: 1
					})
					uni.showToast({
						title: '绑定成功',
						icon:"success"
					})
				}).catch(err => {
					console.log(err);
				})
			},
			getCode() {
				// 防止多次点击
				if(this.codeTime > 0) return
				// 验证手机号
				if(!this.check()) return 
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
		}
	}
</script>

<style>

</style>
