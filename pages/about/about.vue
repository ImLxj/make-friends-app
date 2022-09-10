<template>
	<view>
		<view class="flex align-center justify-center flex-column pt-4 pb-2">
			<image 
				src="/static/common/nothing.png"
				style="width: 200rpx; height: 200rpx;"
				class="rounded-circle"></image>
			<text class="mt-2">version 1.0.0</text>
		</view>
		<uni-list :border="false">
			<uni-list-item :border="false" clickable showArrow title="新版本检测" showExtraIcon></uni-list-item>
			<uni-list-item :border="false" clickable showArrow title="社区用户协议" showExtraIcon></uni-list-item>
		</uni-list>
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
			
		}
	}
</script>

<style>

</style>
