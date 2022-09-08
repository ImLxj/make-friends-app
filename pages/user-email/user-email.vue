<template>
	<view>
		<input class="uni-input" type="text" v-model="email" placeholder="请输入邮箱"/>
		<input class="uni-input" type="text" v-model="password" placeholder="请输入密码"/>
		
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
				email: '',
				password: ''
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
				let emailRules = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
				if(!emailRules.test(this.email)) {
					return false
				}
				return true
			},
			submit() {
				if(!this.check()) {
					uni.showToast({
						title: '邮箱格式不正确',
						icon: "none"
					})
					return
				}
				console.log('绑定成功');
			}
		}
	}
</script>

<style>

</style>
