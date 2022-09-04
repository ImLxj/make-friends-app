<template>
	<view>
		<view 
			class="flex my-1 align-center justify-center text-light-muted font-sm"
			v-if="shortTime">
			{{shortTime}}
		</view>
		<view
			class="flex align-center p-2 my-2" 
			:class="isSelf ? 'flex-row-reverse' : ''">
			<image 
				:src="item.avatar" 
				style="width: 80rpx;height: 80rpx;"
				class="rounded-circle"
				></image>
			<!-- 聊天气泡 -->
			<view 
				class="uni-bg-blue text-white font py-1 px-2 mx-2 rounded"
				style="max-width: 400rpx;">
				{{ item.data }}
			</view>
		</view>
	</view>
</template>

<script>
	const uId = '110' // 当前登录用户的id\
	import $T from '@/common/time.js'
	export default {
		props: {
			item: Object,
			index: Number,
			pretime: [Number, String]
		},
		computed: {
			// 是否是本人
			isSelf() {
				return uId === this.item.user_id
			},
			shortTime() {
				return $T.getChatTime(this.item.create_time, this.pretime)
			}
		}
	}
</script>

<style>
</style>