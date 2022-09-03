<template>
	<view
		class="py-1 px-2 flex align-center border-bottom border-light-secondary"
		hover-class="bg-light">
		<image
			:src="list.avatar" 
			class="rounded-circle mr-3" 
			style="height:80rpx; width: 80rpx;">
		</image>
		<view class="flex flex-column flex-1">
			<text class="font text-dark font-weight-bold">{{list.username}}</text>
			<uni-badge :text="list.age" :type="list.sex === 1 ? 'primary' : 'error'" size="small">
				<text 
					class="iconfont font-small" 
					:class="list.sex === 1 ? 'icon-nan' : 'icon-nv'" 
					style="margin-right: 5rpx;">
				</text>
			</uni-badge>
		</view>
		<view 
			class="uni-icon flex align-center uni-icon-checkbox-filled" 
			:class="list.isFollow ? 'text-main' : 'text-light-muted'">
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	export default {
		components: {uniBadge},
		props: {
			list: Object,
			index: Number
		},
		methods: {
			
		}
	}
</script>

<style>
</style>