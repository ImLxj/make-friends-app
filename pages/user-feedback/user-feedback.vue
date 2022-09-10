<template>
	<view>
		<uni-collapse>
			<uni-collapse-item title="折叠文字" showAnimation>
				<view class="content">文字内容</view>
			</uni-collapse-item>
			<uni-collapse-item title="折叠文字" showAnimation>
				<view class="content">文字内容</view>+
			</uni-collapse-item>
			<uni-collapse-item title="折叠文字" showAnimation>
				<view class="content">文字内容</view>
			</uni-collapse-item>
		</uni-collapse>
		
		<view class="py-2 px-3">
			<button 
				type="primary" 
				class="bj-main text-white" 
				style="border-radius: 50rpx;">
				提交反馈
			</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-ui/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
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
