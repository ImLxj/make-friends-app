<template>
	<view class="p-2">
		<!-- 头像昵称 | 关注按钮 -->
		<view class="flex align-center justify-between">
			<!-- 头像 -->
			<view class="flex align-center justify-between list-header-image">
				<image class="mr-2 rounded-circle" :src="item.userpic" lazy-load @click="openSpace"></image>
				<!-- 昵称和发布时间 -->
				<view class="list-header-name">
					<view class="font">{{ item.username }}</view>
					<text class="font-sm text-light-muted">{{ item.newstime }}</text>
				</view>
			</view>
			<view class="flex align-center justify-center bj-main text-white rounded list-header-btn animated faster" hover-class="pulse" v-if="!item.isFollow" @click="follow">
				<text>关注</text>
			</view>
		</view>
		<!-- 内容 -->
		<view class="list-body w-100" @click="openDetail">
			<!-- 标题 -->
			<view class="font my-1">{{ item.title }}</view>
			<view class="list-body-image" style="width: 100%;"><image v-if="item.titlepic" class="rounded" :src="item.titlepic"></image></view>
		</view>
		<view class="flex align-center justify-center	">
			<view class="flex align-center justify-center flex-1 animated faster" :class="item.support.type === 'support' ? 'active' : ''" hover-class="jello text-main" @click="onSupport('support')">
				<text class="iconfont font icon-dianzan2 mr-2"></text>
				<text>{{ item.support.support_count > 0 ? item.support.support_count : '点赞' }}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" :class="item.support.type === 'unsupport' ? 'active' : ''" hover-class="jello text-main" @click="onSupport('unsupport')">
				<text class="iconfont font icon-cai mr-2"></text>
				<text>{{ item.support.unsupport_count > 0 ? item.support.unsupport_count : '踩'}}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="openDetail">
				<text class="iconfont font icon-pinglun2 mr-2"></text>
				<text>{{ item.comment_count }}</text>
			</view>
			<view class="flex align-center justify-center flex-1 animated faster" hover-class="jello text-main" @click="openDetail">
				<text class="iconfont font icon-fenxiang mr-2"></text>
				<text>分享</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	},
	methods: {
		// 打开个人空间
		openSpace() {
			console.log('个人空间');
		},
		// 关注
		follow() {
			// 向父组件传递参数
			this.$emit('follow', this.index);
		},
		// 进入详情页
		openDetail() {
			uni.navigateTo({
				url:`/pages/detail/detail?detail=${JSON.stringify(this.item)}`
			})
		},
		onSupport(support) {
			this.$emit('onSupport', {
				type: support,
				index: this.index
			})
		}
	}
};
</script>

<style>
.list-header-image image {
	width: 65rpx;
	height: 65rpx;
}
.list-header-name view {
	line-height: 1.5;
}
.list-header-btn {
	width: 90rpx;
	height: 50rpx;
}
.list-body-image image {
	width: 710rpx;
	height: 350rpx;
}
.active {
	color: #fd597c;
}
</style>
