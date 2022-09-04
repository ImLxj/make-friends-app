<template>
	<view>
		<view class="flex align-center" style="height: 100rpx;">
			<view 
				class="flex font-weight-bold flex-1 align-center justify-center"
				:class="tabIndex === index ? 'font-md text-main' : 'font text-secondary'"
				@click="changeTab(index)"
				v-for="(item, index) in tabList" :key="index">
				{{item.title}}
				<text class="ml-1" v-if="item.num > 0">{{item.num}}</text>
			</view>
		</view>
		<!-- 滑动 -->
		<swiper
			:duration="150"
			:current="tabIndex" 
			@change="changeSwiperTab"
			:style="'height:' + scrollH + 'px'">
			<swiper-item v-for="(item, index) in userList" :key="index">
					<scroll-view
						scroll-y 
						:style="'height:' + scrollH + 'px'"
						@scrolltolower="loadmore(index)">
						<template v-if="item.list.length > 0">
							<block v-for="(list, index2) in item.list" :key="index2 + 'list'">
								<user-list @click="openMessage" :list="list" :index="index2"></user-list>
							</block>
							<!-- 上拉加载 -->
							<load-more v-if="item.list.length > 11" :loadmore="item.loadmore"></load-more>
						</template>
						<!-- 无数据 -->
						<template v-else>
							<no-thing></no-thing>
						</template>
					</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const dome = [
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
	import noThing from '@/components/common/noThing.vue'
	import loadMore from '@/components/common/loadmore.vue'
	import userList from '@/components/user-list/user-list.vue'
	export default {
		components: {noThing, loadMore},
		data() {
			return {
				tabIndex: 1,
				tabList: [
					{title: '互关',num: 10},
					{title: '关注',num: 50},
					{title: '粉丝',num: 100},
				],
				scrollH: 500,
				userList: [], //用户列表
			}
		},
		// 监听点击搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:'/pages/search/search?type=user'
			})
		},
		// 监听点击取消按钮
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		},
		onLoad() {
			uni.getSystemInfo({
				success : res => {
					// uni.upx2px 将rpx转换成px
					this.scrollH = res.windowHeight - uni.upx2px(100)
				}
			})
			// 加载假数据，在页面更新之前
			this.getData()
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
			},
			// swiper 关联 tab栏
			changeSwiperTab(tab) {
				this.changeTab(tab.detail.current)
			},
			loadmore(index) {
				let item = this.userList[index]
				if(item.loadmore !== '上拉加载更多') return 
				item.loadmore = '加载中...'
				// 模拟发送请求
				setTimeout(() => {
					item.list = [...item.list,...item.list]
					item.loadmore = '上拉加载更多'
				}, 1000)
			},
			getData() {
				let arr = []
				let obj = {}
				for(let i = 0; i < this.tabList.length; i ++) {
					obj = {
						loadmore: '上拉加载更多',
						list:[]
					}
					if(i < 2) {
						obj.list = dome
					}
					arr.push(obj)
				}
				this.userList = arr
			},
			openMessage() {
				uni.navigateTo({
					url: '/pages/message/message'
				})
			}
		}
	}
</script>

<style>

</style>
