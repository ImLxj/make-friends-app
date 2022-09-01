<template>
	<view>
		<template v-if="searchData.length === 0">
			<view class="px-2 font py-2 font-weight-bold">搜索历史</view>
			<view class="flex flex-wrap">
				<view 
					class="font-sm rounded border mx-2 px-3 my-1" 
					v-for="(item,index) in searchList" :key="index"
					hover-class="bg-light"
					@click="clickSearchHistory(item)">
					{{ item }}
				</view>
			</view>
		</template>
		<!-- 搜索内容 -->
		<template v-else>
			<block v-for="(item, index) in searchData" :key="index">
				<common-list :item="item" :index="index"></common-list>
			</block>
		</template>
	</view>
</template>

<script>
	import CommonList from '@/components/common/common-list.vue';
	// 测试数据
	const dome = [
		{
			username: '王五', // 用户名
			userpic: '/static/default.jpg', // 用户头像
			newstime: '2022-8-28', // 用户更新时间
			isFollow: false, // 是否关注
			title: 'JS高级课', // 文章标题
			titlepic: '/static/demo/datapic/27.jpg', // 文章图片
			support: {
				type: 'unsupport',
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 3,
			share_num: 2
		},
		{
			username: '李四', // 用户名
			userpic: '/static/default.jpg', // 用户头像
			newstime: '2022-8-28', // 用户更新时间
			isFollow: false, // 是否关注
			title: 'JS高级课', // 文章标题
			titlepic: '', // 文章图片
			support: {
				type: 'support',
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 3,
			share_num: 2
		},
		{
			username: '王五', // 用户名
			userpic: '/static/default.jpg', // 用户头像
			newstime: '2022-8-28', // 用户更新时间
			isFollow: false, // 是否关注
			title: 'JS高级课', // 文章标题
			titlepic: '/static/demo/datapic/27.jpg', // 文章图片
			support: {
				type: 'support',
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: 3,
			share_num: 2
		}
	]
	export default {
		components: {CommonList},
		data() {
			return {
				searchList: ['JavaScript','HTML+CSS','Vue实战项目','EventLoop事件循环机制'],
				searchText: '',
				searchData: []
			}
		},
		// 监听顶部导航input输入的内容，只有点击软键盘的搜索才会触发
		onNavigationBarSearchInputConfirmed(value) {
			this.searchText = value.text
			// 点击软键盘的搜索不需要经过旁边的按钮
			this.searchEvent()
		},
		// 监听顶部导航input输入的内容，随着内容不断更新
		onNavigationBarSearchInputChanged(value) {
			this.searchText = value.text
		},
		// 监听顶部导航按钮的点击事件
		onNavigationBarButtonTap(btn) {
			if(btn.index === 0) {
				this.searchEvent()
			}
		},
		methods: {
			// 监听顶部导航的button事件触发
			searchEvent() {
				// 隐藏软件盘
				uni.hideKeyboard()
				// 显示loading加载
				uni.showLoading({
					title: "加载中...",
					mask: true
				})
				// 发送请求
				setTimeout(() => {
					this.searchData = dome
					// 隐藏loading框
					uni.hideLoading()
				}, 2000)
			},
			clickSearchHistory(value) {
				this.searchText = value
				this.searchEvent()
			}
		}
	}
</script>

<style>

</style>
