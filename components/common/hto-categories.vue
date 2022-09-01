<template>
	<view>
		<view class="flex align-center justify-between">
			<view class="font-weight-bold font-md px-2">热门分类</view>
			<view class="flex align-center px2 text-light-muted font" @click="openMore">
				<text>更多</text>
				<text class="iconfont icon-jinru"></text>
			</view>
		</view>
		<view class="flex flex-wrap align-center py-2 border-bottom px-2">
			<view 
				class="mx-1 font-sm rounded border px-2 bg-light my-1 animated" 
				hover-class="pulse"
				v-for="(item, index) in hotCate" :key="index"
				@click="openDetail(item)">
				{{ item.name }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['hotCate'],
		methods: {
			// 打开更多页面
			openMore() {
				uni.navigateTo({
					url: '/pages/topic-nav/topic-nav'
				})
			},
			// 打开话题分类页
			openDetail(detail) {
				console.log("打开话题分类页", detail);
			}
		}
	}
</script>

<style>
</style>