<template>
	<view>
		<input 
			class="uni-input" 
			:disabled="user.email" 
			type="text" 
			v-model="email" 
			placeholder="请输入邮箱"/>
		<view class="py-2 px-3">
			<button 
				type="primary" 
				class="bj-main text-white" 
				style="border-radius: 50rpx;"
				:disabled="disabled || user.email"
				:class="disabled ? 'bj-main-disabled' : ''"
				@click="submit">
				提交
			</button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				email: ''
			}
		},
		onLoad() {
			if(this.user.email) {
				this.email = this.user.email
			}
		},
		computed: {
			disabled() {
				return this.email === ''
			},
			...mapState({
				user: state => state.user
			})
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
				this.$H({
					url: '/user/bindemail',
					method: 'POST',
					data: {
						email: this.email
					}
				}, {
					token: true
				}).then(res => {
					this.$store.commit('editUserinfo', {
						key: 'email',
						value: this.email
					})
					uni.navigateBack({
						delta: 1
					})
					uni.showToast({
						title: '绑定成功',
						icon: "success"
					})
				})
			}
		}
	}
</script>

<style>

</style>
