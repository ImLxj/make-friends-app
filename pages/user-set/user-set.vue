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
				clickable
				showArrow
				title="清除缓存">
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
				
			}
		},
		methods: {
			// 修改密码
			open(path) {
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				})
			}
		}
	}
</script>

<style>

</style>
