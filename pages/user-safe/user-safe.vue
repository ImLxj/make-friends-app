<template>
	<view>
		<uni-list :border="false">
			<uni-list-item 
				:border="false" 
				clickable
				v-for="(item, index) in userinfo" :key="index" 
				@click="open(item)"
				:title="item.name">98
				<view slot="footer" class="flex align-center text-right text-light-muted">
					{{item.data}}
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/uni-list/components/uni-list/uni-list.vue'
	import {mapState} from 'vuex'
	export default {
		components: {
			uniList
		},
		data() {
			return {
				userinfo: []
			}
		},
		onShow() {
			this.__init()
		},
		methods: {
			__init() {
				let list = [
					{
						name: '手机号',
						data: this.user.phone ? this.user.phone : '未绑定',
						type: 'navigateTo',
						url: '/pages/user-phone/user-phone'
					},
					{
						name: '修改密码',
						data: this.user.password ? '修改密码' : '未设置',
						type: 'navigateTo',
						url: '/pages/user-password/user-password'
					},
					{
						name: '绑定邮箱',
						data: this.user.email ? this.user.email : '未绑定',
						type: 'navigateTo',
						url: '/pages/user-email/user-email'
					},
				]
				this.userinfo = [...list]
				// 获取当前第三放登录情况
				this.$H({
					url: '/user/getuserbind',
					method: 'GET'
				}, {
					token: true
				}).then(res => {
					let {data : result} = res
					this.$store.commit('editUserinfo', {
						key: 'user_bind',
						value: result
					})
					let other = [
						{
							name: '微信账号',
							data: this.user.user_bind.data.weixin ? this.user.user_bind.data.weixin.nickname : '未绑定',
							type: 'bind',
							provider: 'weixin'
						},
						{
							name: 'QQ账号',
							data: this.user.user_bind.data.qq ? this.user.user_bind.data.qq.nickname : '未绑定',
							type: 'bind',
							provider: 'qq'
						},
						{
							name: '新浪微博',
							data: this.user.user_bind.data.sinaweibo ? this.user.user_bind.data.sinaweibo.nickname : '未绑定',
							type: 'bind',
							provider: 'sinaweibo'
						}
					]
					this.userinfo = [...list, ...other]
				})
				
			},
			open(item) {
				if(item.type === '') return
				switch (item.type){
					case 'navigateTo':
						uni.navigateTo({
							url: item.url
						})
						break;
					case 'bind':
						if(item.data !== '未绑定') return
						// 绑定第三方登录
						this.bind(item.provider)
						break;
				}
			},
			bind(provider) {
				uni.login({
				  provider: provider,
				  success: (loginRes) => {
						uni.getUserInfo({
							provider: provider,
							success:  (infoRes) => {
								// 发送绑定第三封登录请求
									this.$H({
										url: '/user/bindother',
										method: 'POST',
										data: {
											provider: provider,
											openid: infoRes.userInfo.openId,
											nickName: infoRes.userInfo.nickName,
											avatarUrl: infoRes.userInfo.avatarUrl
										}
									}, {
										token: true
									}).then(r => {
										if(r.data.errorCode === 20006) {
											return uni.showToast({
												title: r.data.msg,
												icon:'none'
											})
										}
										this.__init()
										uni.showToast({
											title: '绑定成功',
											icon: 'success'
										})
									}).catch(err => {
										console.log('error',err);
									})
							}
						});
				  }
				});
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		}
	}
</script>

<style>

</style>
