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
				<template v-if="type === 'post'">
					<!-- 帖子 -->
					<common-list :item="item" :index="index"></common-list>
				</template>
				<template v-else-if="type === 'topic'">
					<!-- 话题 -->
					<topic-list :item="item" :index="index"></topic-list>
				</template>
				<template v-else>
					<!-- 用户 -->
					<user-list :list="item" :index="index"></user-list>
				</template>
			</block>
		</template>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue';
	import userList from '@/components/user-list/user-list.vue'
	import topicList from '@/components/topic-detail/topic-list.vue'
	// 测试数据
	const dome1 = [
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
	const dome2 = [
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
		{
			cover: '/static/demo/demo5.jpg',
			title: 'JavaScript高级',
			desc: '节流与防抖',
			today_count: 10,
			news_count: 0
		},
	]
	const dome3 = [
		{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 1,
			age: 24,
			isFollow: true
		},
		{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 1,
			age: 28,
			isFollow: true
		},
		{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: true
		},
		{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: true
		},
		{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: false
		},{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: false
		},
		{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: false
		},{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: false
		},
		{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: false
		},{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: false
		},{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: false
		},
		{
			avatar: '/static/demo/userpic/2.jpg',
			username: 'ciyaya',
			sex: 0,
			age: 24,
			isFollow: false
		}
	]
	export default {
		components: {
			commonList,
			userList,
			topicList
		},
		data() {
			return {
				searchList: ['JavaScript','HTML+CSS','Vue实战项目','EventLoop事件循环机制'],
				searchText: '',
				searchData: [],
				type: 'post'
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
		onLoad(e) {
			if(e.type){
				this.type = e.type
			}
			let pageTitle = '帖子'
			switch (this.type){
				case 'post':
					pageTitle = '帖子'
					break;
				case 'topic':
					pageTitle = '话题'
					break;
				case 'user':
					pageTitle = '用户'
					break;
			}
			// 修改搜索占位
			// #// #ifdef APP-PLUS
			let currentWebview = this.$mp.page.$getAppWebview()
			let tn = currentWebview.getStyle().titleNView
			tn.searchInput.placeholder = '搜索' + pageTitle
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif
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
					switch (this.type){
						case 'post':
							this.searchData = dome1
							break;
						case 'topic':
							this.searchData = dome2
							break;
						case 'user':
							this.searchData = dome3
							break;
					}
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
