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
					<divider></divider>
				</template>
				<template v-else-if="type === 'topic'">
					<!-- 话题 -->
					<topic-list :item="item" :index="index"></topic-list>
					<divider></divider>
				</template>
				<template v-else>
					<!-- 用户 -->
					<user-list :list="item" :index="index"></user-list>
					<divider></divider>
				</template>
			</block>
			<load-more :loadmore="loadmore"></load-more>
		</template>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue';
	import userList from '@/components/user-list/user-list.vue'
	import topicList from '@/components/topic-detail/topic-list.vue'
	import loadMore from '@/components/common/loadmore.vue'
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
			topicList,
			loadMore
		},
		data() {
			return {
				searchList: [],
				searchText: '',
				searchData: [],
				type: 'post',
				loadmore: '上拉加载更多',
				page: 1,
				refresh: true
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
		// 监听下拉刷新
		onPullDownRefresh() {
			if(this.searchText === '') {
				return uni.stopPullDownRefresh()
			}
			this.getData(() => {
				// 关闭下拉刷新
				uni.stopPullDownRefresh()
			})
		},
		// 上拉加载
		onReachBottom() {
			if(this.loadmore !== '上拉加载更多') return
			this.loadmore = '加载中....'
			this.refresh = false
			this.getData()
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
			// 获取本地存储数据
			let list = uni.getStorageSync('historySearchText')
			if(list) {
				this.searchList = JSON.parse(list)
			}
		},
		methods: {
			// 监听顶部导航的button事件触发
			searchEvent() {
				// 隐藏软件盘
				uni.hideKeyboard()
				// 将搜索记录添加到列表里面
				if(this.searchText === '') return
				let index = this.searchList.findIndex(value => value === this.searchText)
				if(index === -1) {
					this.searchList.unshift(this.searchText)
				}else {
					this.$U.toFirst(this.searchList, index)
				}
				// 将数据添加到本地
				uni.setStorageSync('historySearchText', JSON.stringify(this.searchList))
				this.getData()
			},
			// 获取数据
			async getData(callback = false) {
				// 显示loading加载
				uni.showLoading({
					title: "加载中...",
					mask: true
				})
				// 请求搜索
				this.page = this.refresh ? 1 : this.page ++ 
				const {data: res} = await this.$H({
					url: `/search/${this.type}`,
					method: 'POST',
					data: {
						keyword: this.searchText,
						page: this.page
					}
				})
				let list = []
				switch (this.type){
					case 'post':
						list = res.data.list.map(value => {
							return this.$U.publicList(value)
						})
						break;
					case 'topic':
						list = res.data.list.map(value => {
							return this.$U.topicList(value)
						})
						break;
					case 'user':
						pageTitle = '用户'
						break;
				}
				console.log(list);
				this.searchData = this.refresh ? [...list] : [...this.searchData, ...list]
				this.loadmore = list.length < 10 ? '没有更多了' : '上拉加载更多'
				if(typeof callback === 'function') {
					callback()
				}
				uni.hideLoading()
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
