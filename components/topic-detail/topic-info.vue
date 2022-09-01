<template>
	<view>
		<!-- 模糊图片 -->
		<image 
			:src="info.cover" 
			mode="aspectFill" 
			style="height: 300rpx;width: 100%;"
			class="filter-blur position-relative"></image>
		
		<!--  -->
		<view class="px-2 position-relative bg-white" style="z-index: 10; top: -10rpx;">
			<view class="flex align-center mb-2 ">
				<image 
					:src="info.cover" 
					style="width: 150rpx;height: 150rpx;margin-top: -75rpx;" 
					class="rounded mr-2"></image>
				<text class="font-md font-weight-bold">#{{info.title}}#</text>
			</view>
			<view class="font-sm mt-2 mb-1 text-light-muted">
				<text class="mr-1">动态 {{info.news_count}}</text>
				<text>今日 {{info.today_count}}</text>
			</view>
			<text class="font text-secondary">{{info.desc}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object
		}
	}
</script>

<style>
	.filter-blur {
		filter: blur(10px);
	}
</style>