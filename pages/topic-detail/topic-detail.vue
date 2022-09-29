<template>
	<view>
		<topic-info :info="detailInfo"></topic-info>
		<divider></divider>
		
		<!-- 置顶帖子 -->
		<view 
			class="flex align-center py-1 px-2 border-bottom border-light-secondary"
			v-for="(item, index) in hotList" :key="index">
			<text class="iconfont icon-xihuan text-main"></text>
			<text class="text-dark font text-ellipsis">
				{{item.title}}
			</text>
		</view>
		<divider></divider>
		<!-- tab -->
		<view class="flex align-center py-2">
			<view 
				class="flex flex-1 align-center justify-center font-weight-bold"
				:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-secondary'"
				@click="changeTab(index)"
				v-for="(item, index) in tabList" :key="index">
				{{item.title}}
			</view>
		</view>
		<!-- 列表 -->
		<template v-if="listData.length > 0">
			<block v-for="(item, index) in listData">
				<common-list :item="item" :index="index"></common-list>
				<divider></divider>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		<!-- 上拉加载 -->
		<load-more :loadmore="loadText"></load-more>
	</view>
</template>

<script>
	import topicInfo from '@/components/topic-detail/topic-info.vue'
	import commonList from '@/components/common/common-list.vue'
	import noThing from '@/components/common/noThing.vue'
	import loadMore from '@/components/common/loadmore.vue'
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
		components: {topicInfo, commonList, noThing, loadMore},
		data() {
			return {
				detailInfo: {},
				hotList: [
					{title: '	【新人必读】 uni-app社区交友实战项目开发 '},
					{title: '	【新人必读】 uni-app社区交友实战项目开发 '},
					{title: '	【新人必读】 uni-app社区交友实战项目开发 '},
				],
				tabIndex: 0,
				tabList: [
					{title: '默认',},
					{title: '最新',},
				],
				defaultList: [],
				loadText1: '上拉加载更多',
				page1: 1,
				firstLoad1 : false,
				newsList: [],
				loadText2: '上拉加载更多',
				firstLoad2: false,
				page2: 2,
			}
		},
		// 接收上个页面传递过来的参数
		onLoad(value) {
			if(value.detail) {
				this.detailInfo = JSON.parse(value.detail)
				uni.setNavigationBarTitle({
					title: this.detailInfo.title
				})
			}
			// 获取数据
			this.getData()
			// 监听关注和顶踩操作
			uni.$on('updateFollowOnSupport', (e) => {
				switch(e.type) {
					case "follow":
						this.follow(e.data.user_id)
						break;
					default: 
						break
				}
			})
		},
		onUnload() {
			uni.$off('updateFollowOnSupport')
		},
		methods: {
			// 改变tab导航
			changeTab(index) {
				this.tabIndex = index
				if(!this['firstLoad' + (index + 1)]) {
					this.getData()
				}
			},
			loading() {
				let index = this.tabIndex
				if(this.loadText !== '上拉加载更多') return
				// 修改loadtext的值
				this['loadText' + (index + 1)] = '加载中....'
				setTimeout(() => {
					this['loadText' + (index + 1)] = '上拉加载更多'
					if(index === 0) {
						this.defaultList = [...this.defaultList,...this.defaultList]
					}else {
						this.newsList = [...this.newsList, ...this.newsList]
					}
				}, 2000)
			},
			follow(user_id) {
				this.defaultList.forEach(item => {
					if(item.user_id === user_id) {
						item.isFollow = true
					}
				})
				this.newsList.forEach(item => {
					if(item.user_id === user_id) {
						item.isFollow = true
					}
				})
				// 成功弹框
				uni.showToast({
					title: '关注成功'
				});
			},
			getData() {
				let index = this.tabIndex + 1
				let id = this.detailInfo.id
				let page = this['page' + index]
				this.$H({
					url: `/topic/${id}/post/${page}`,
					method: 'GET'
				}).then(res => {
					let {data: result} = res
					let list = result.data.list.map(value => {
						return this.$U.publicList(value)
					})
					if(this.tabIndex === 0) {
						this.defaultList = (page === 1) ? [...list] : [...this.defaultList, ...list]
					}else {
						this.newsList = (page === 1) ? [...list] : [...this.newsList, ...list]
					}
					this['loadText' + index] = list.length < 10 ? '没有更多了' : '上拉加载更多'
					// 上拉刷新
					if(page === 1) {
						this['firstLoad' + index] = true
					}
				}).catch(err => {

				})
			},
			// 滚动到底部触发事件
			loadmore() {
				let index = this.tabIndex
				if(this['loadText' + index] !== '上拉加载更多') return 
				this['loadText' + index] = '加载中...'
				// 发送请求
				this['page' + index] ++
				this.getList()
			},
		},
		computed: {
			// 判断级联
			listData() {
				if(this.tabIndex === 0) {
					return this.defaultList
				}
				return this.newsList
			},
			loadText() {
				if(this.tabIndex === 0) {
					return this.loadText1
				}
				return this.loadText2
			}
		},
		onReachBottom () {
			this.loading() 
		}
	}
</script>

<style>
</style>
