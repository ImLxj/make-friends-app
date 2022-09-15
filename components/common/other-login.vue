<template>
	<view class="flex align-center px-5 py-3">
		<view 
			class="flex flex-1 align-center justify-center"
			v-for="(item, index) in list" :key="index">
			<view
				:class="item.icon"
				:style="'background:' + item.bgColor + ';'"
				class="iconfont text-white rounded-circle flex align-center justify-center" 
				style="width: 130rpx;height: 130rpx; font-size: 60rpx;"
				@click="login(item)">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			back: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				providerList: []
			}
		},
		mounted() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						let icon = '';
						let bgColor = ''
						switch (value) {
							case 'weixin':
								providerName = '微信登录',
								icon = 'icon-weixin',
								bgColor = '#2ad19b'
								break;
							case 'qq':
								providerName = 'QQ登录',
								icon = 'icon-QQ',
								bgColor = '#2caefc'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录',
								icon = 'icon-xinlangweibo',
								bgColor = '#fc772a'
								break;
						}
						return {
							name: providerName,
							id: value,
							icon,
							bgColor
						}
					});
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},	
		computed: {
			list() {
				const list = this.providerList.filter(value => {
					return value.name !== ''
				})
				return list 
			}
		},
		methods: {
			login(item) {
				uni.login({
				  provider: item.id,
				  success: (loginRes) => {
				    // console.log(loginRes.authResult);
						uni.getUserInfo({
							provider: item.id,
							success:  (infoRes) => {
								let userInfo = {
									provider: item.id,
									openid: infoRes.userInfo.openId,
									expires_in: 0,
									nickName: infoRes.userInfo.nickName,
									avatarUrl: infoRes.userInfo.avatarUrl
								}
								// 发送登录请求
								this.loginEvent(userInfo)
							}
						});
				  }
				});
			},
			loginEvent(data) {
				this.$H({
					url: '/user/otherlogin',
					method: 'POST',
					data
				}).then(res => {
					let {data: result} = res
					this.$store.commit('login', this.$U.thirdPartyLogin(result.data))
					if(this.back) {
						uni.navigateBack({
							delta: 1
						})
					}
					uni.showToast({
						url:'登录成功',
						icon:"none"
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