<template>
	<view>
		<input 
			v-if="user.password" 
			class="uni-input" 
			type="text" 
			v-model="oldpassword" 
			placeholder="请输入旧密码"/>
		<input class="uni-input" type="text" v-model="newpassword" placeholder="请输入新密码"/>
		<input class="uni-input" type="text" v-model="renewpassword" placeholder="请输入确认密码"/>
		
		<view class="py-2 px-3">
			<button 
				type="primary" 
				class="bj-main text-white" 
				style="border-radius: 50rpx;"
				:disabled="disabled"
				:class="disabled ? 'bj-main-disabled' : ''"
				@click="submit">
				确定修改
			</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				oldpassword: '',
				newpassword: '',
				renewpassword: ''
			}
		},
		computed: {
			disabled() {
				if(this.user.password) {
					return this.oldpassword === '' || this.newpassword === '' || this.renewpassword === ''
				}
				return this.newpassword === '' || this.renewpassword === ''
			},
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			// 密码验证
			check() {
				if(this.newpassword !== this.renewpassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: "none"
					})
					return false
				}
				return true
			},
			submit() {
				if(!this.check()) {
					return
				}
				this.$H({
					url: '/repassword',
					method: 'POST',
					data: {
						oldpassword: this.oldpassword,
						newpassword: this.newpassword,
						renewpassword: this.renewpassword
					}
				},{
					token: true
				}).then(res => {
					// 将密码变成false
					this.$store.commit('editUserinfo', {
						key: 'password',
						value: true
					})
					uni.navigateBack({
						delta: 1
					})
					uni.showToast({
						title: '修改密码成功',
						icon: 'none'
					})
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style>

</style>
