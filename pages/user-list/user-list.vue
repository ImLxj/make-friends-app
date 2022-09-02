<template>
	<view>
		<view class="flex align-center py-1">
			<view 
				class="flex font-weight-bold flex-1 align-center justify-center"
				:class="tabIndex === index ? 'font-md text-main' : 'font text-secondary'"
				@click="changeTab(index)"
				v-for="(item, index) in tabList" :key="index">
				{{item.title}}
				<text class="ml-1" v-if="item.num > 0">{{item.num}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 1,
				tabList: [
					{title: '互关',num: 10},
					{title: '关注',num: 50},
					{title: '粉丝',num: 100},
				],
			}
		},
		// 监听点击搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:'/pages/search/search'
			})
		},
		// 监听点击取消按钮
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style>

</style>
