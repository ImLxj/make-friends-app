<template>
		<view class="flex align-center flex-row px-2 mb-2" @click="opneTopicDetail">
			<image 
				:src="item.cover" 
				style="width: 150rpx;height: 150rpx;"
				class="rounded mr-2"></image>
			<view class="flex flex-column">
				<text class="font font-weight-bold">#{{item.title}}#</text>
				<text class="font-sm">{{item.desc}}</text>
				<view class="flex align-center font-sm">
					<text class="mr-1">动态 {{item.news_count}}</text>
					<text>今日 {{item.today_count}}</text>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		props: ['item', 'index'],
		methods: {
			// 跳转到话题详情页
			opneTopicDetail() {
				uni.navigateTo({
					url: `/pages/topic-detail/topic-detail?detail=${JSON.stringify(this.item)}`
				})
			}
		}
	}
</script>

<style>
</style>