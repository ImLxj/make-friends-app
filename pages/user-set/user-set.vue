<template>
	<view>
		<uni-list :border="false">
			<uni-list-item 
				:border="false" 
				clickable
				showArrow
				title="账号与安全" 
				@click="open('user-password')">
			</uni-list-item>
			<uni-list-item
				:border="false" 
				clickable
				showArrow
				@click="open('user-email')"
				title="绑定邮箱">
			</uni-list-item>
			<uni-list-item 
				:border="false" 
				clickable
				showArrow
				@click="open('user-userinfo')"
				title="资料编辑">
			</uni-list-item>
			<uni-list-item 
				:border="false" 
				:clickable="!currentSize > 0"
				:showArrow="!currentSize > 0"
				@click="clear"
				title="清除缓存">
				<template slot="footer" v-if="currentSize > 0">
					<view class="text-muted">{{currentSize | cloreStorage}}</view>
				</template>
			</uni-list-item>
			<uni-list-item 
				:border="false" 
				clickable
				showArrow
				@click="open('user-feedback')"
				title="意见反馈">
			</uni-list-item>
			<uni-list-item 
				:border="false" 
				clickable
				showArrow
				@click="open('about')"
				title="关于社区">
			</uni-list-item>
		</uni-list>
		
		<view class="py-2 px-3">
			<button 
				type="primary" 
				class="bj-main text-white" 
				style="border-radius: 50rpx;">
				退出登录
			</button>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/uni-list/components/uni-list/uni-list.vue'
	export default {
		components: {
			uniList
		},
		data() {
			return {
				currentSize: 0
			}
		},
		onLoad() {
			this.getStorageInfo()
		},
		filters: {
			cloreStorage(value) {
				return value > 1024 ? (value/1024).toFixed(2) + 'MB' : value.toFixed(2) + 'KB'
			}
		},
		methods: {
			// 获取缓存
			getStorageInfo() {
				const res = uni.getStorageInfoSync()
				this.currentSize = res.currentSize
			},
			// 修改密码
			open(path) {
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				})
			},
			// 清除缓存
			clear() {
				console.log('11111');
				uni.showModal({
					title: '提示',
					content: '是否清除缓存',
					cancelText: '不清除',
					confirmText: '清除',
					success: res => {
						if(res.confirm) {
							uni.clearStorageSync()
							// 重新获取缓存
							this.getStorageInfo()
							uni.showToast({
								title: '清除成功',
								icon:'success'
							});
						}
					},
				});
			}
		}
	}
</script>

<style>

</style>
