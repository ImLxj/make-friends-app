<template>
	<view>
			<!-- 聊天滚动条 -->
			<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'">
				<view class="flex mt-2 align-start p-2">
					<image 
						src="/static/demo/userpic/15.jpg" 
						style="width: 80rpx;height: 80rpx;"
						class="rounded-circle"
						></image>
					<!-- 聊天气泡 -->
					<view 
						class="uni-bg-blue text-white font ml-2 py-1 px-3 rounded bubble bubble-left"
						style="max-width: 400rpx;min-width: 100rpx;">
						你好啊
					</view>
				</view>
				
				<view class="flex mt-2 align-start flex-row-reverse p-2">
					<image 
						src="/static/demo/userpic/15.jpg" 
						style="width: 80rpx;height: 80rpx;"
						class="rounded-circle"
						></image>
					<!-- 聊天气泡 -->
					<view 
						class="uni-bg-blue flex flex-row-reverse text-white mr-2 py-1 px-3 rounded bubble bubble-right"
						style="max-width: 400rpx;min-width: 100rpx;">
						你好啊
					</view>
				</view>
			</scroll-view>
			<!-- 底部操作条 -->
			<view 
				class="fixed-bottom flex align-center border-top bg-white px-2"
				style="height: 100rpx;">
				
				<input type="text" placeholder="文明发言" class="flex-1 rounded bg-light py-1 px-2">
				<view 
					class="flex align-center justify-center animated" 
					style="width: 100rpx;" 
					hover-class="jello"> 
					<text class="iconfont icon-fabu font-lg"></text>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 500,
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.screenHeight - uni.upx2px(101)
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.bubble {
		position: relative;
	}
	.bubble-left::before {
		content: "";
		width: 10px;
		height: 10px;
		position: absolute;
		background-color: #007AFF;
		top: 5px;
		left: -5rpx;
		-webkit-transform: rotate(47deg);
		transform: rotate(47deg);
	}
	
	.bubble-right::before {
		content: "";
		width: 10px;
		height: 10px;
		position: absolute;
		background-color: #007AFF;
		top: 5px;
		left: 143rpx;
		-webkit-transform: rotate(47deg);
		transform: rotate(47deg);
	}
	
	
</style>
