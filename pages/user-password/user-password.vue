<template>
	<view>
		<input class="uni-input" type="text" v-model="oldpassword" placeholder="请输入旧密码"/>
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
				return this.oldpassword === '' || this.newpassword === '' || this.renewpassword === ''
			}
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
				console.log('提交成功');
			}
		}
	}
</script>

<style>

</style>
