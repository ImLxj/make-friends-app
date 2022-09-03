<template>
	<view>
		<view
			class="px-2" 
			hover-class="bg-light"
			@click="openMessage">
			<view class="flex align-center border-bottom pb-1 mt-1">
				<image
					:src="item.avatar" 
					style="height: 80rpx;width: 80rpx;"
					class="rounded-circle mr-2"></image>
				<view class="flex flex-column	w-100">
					<view class="flex align-center justify-between">
						<text>{{item.username}}</text>
						<text class="text-secondary font-sm">{{item.update_time | formatTime}}</text>
					</view>
					<view class="flex align-center justify-between">
						<text 
							class="text-secondary font-sm text-ellipsis" 
							style="max-width: 500rpx;">{{item.data}}</text>
						<uni-badge :text="item.noread" type="error" size="small"></uni-badge>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue';
	import $T from '@/common/time.js'
	export default {
		components: {
			uniBadge
		},
		props: {
			item: Object,
			index: Number
		},
		onLoad() {
			console.log(this.item);
		},
		filters: {
			formatTime(value) {
				return $T.gettime(value)
			}
		},
		methods: {
			openMessage() {
				uni.navigateTo({
					url: '/pages/user-chat/user-chat'
				})
			}
		}
	}
</script>

<style>
</style>