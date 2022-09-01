<template>
	<view>
		<!-- 顶部自定义导航栏 -->
	<uni-nav-bar @clickRight="goToAppInput" :border="false" :statusBar="true" :fixed="true">
		<view class="flex align-center justify-center font-weight-bold w-100">
			<view 
				v-for="(item, index) in tabBar" :key="index" 
				class="mx-1"
				:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-light-muted'"
				@click="changeIndex(index)">{{ item.name }}</view>
		</view>
		<view slot="right">
			<text class="iconfont icon-fatie_icon font-md"></text>
		</view>
		</uni-nav-bar>
		<!-- 主体内容 -->
		<swiper
			:duration="150"
			:current="tabIndex" 
			@change="changeTabber"
			:style="'height:' + scrollH + 'px'">
			<swiper-item>
					<scroll-view scroll-y :style="'height:' + scrollH + 'px'" @scrolltolower="loadmore">
						<block v-for="(item, index) in list" :key="index">
							<common-list :item="item" :index="index" @onSupport="onSupport"></common-list>
							<divider></divider>
						</block>
						<load-more :loadmore="loadText"></load-more>
					</scroll-view>
			</swiper-item>
			<swiper-item>
					<scroll-view scroll-y :style="'height:' + scrollH + 'px'">
						<!-- 热门分类 -->
						<hot-categories :hotCate="hotCate"></hot-categories>
						<!-- 搜索话题 -->
						<view class="p-2 my-2">
							<view class="flex align-center justify-center bg-light py-1 rounded">
								<text class="iconfont icon-sousuo mr-1"></text>	
								<text>搜索话题</text>
							</view>
						</view>
						<!-- 轮播图 -->
						<swiper 
							class="px-2 pb-2" 
							:indicator-dots="true" 
							:autoplay="true" 
							:interval="2000" 
							:duration="1000">
							<swiper-item>
								<image 
									src="/static/demo/datapic/11.jpg" 
									style="height: 300rpx;" 
									class="w-100 rounded"></image>
							</swiper-item>
						</swiper>
						<!-- 最近更新 -->
						<view class="font-md p-2 font-weight-bold">
							最近更新
						</view>
						<!-- 话题列表组件 -->
						<block v-for="(item, index) in subjectList" :key="index">
							<topic-list :item="item" :index="index"></topic-list>
						</block>
					</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/loadmore.vue'
	import hotCategories from '@/components/common/hto-categories.vue'
	import topicList from '@/components/topic-detail/topic-list.vue'
	// 测试数据
	const dome = [
		{
			username: '王五', // 用户名
			userpic: '/static/default.jpg', // 用户头像
			newstime: '2022-8-28', // 用户更新时间
			isFollow: true, // 是否关注
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
			isFollow: true, // 是否关注
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
			isFollow: true, // 是否关注
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
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCategories,
			topicList
		},
		data() {
			return {
				tabIndex: 0, // 默认选中
				tabBar: [
					{name: '关注'},
					{name: '话题'}
				],
				scrollH: 500, // 中心区域高度
				list: [], // 中心内容
				loadText: '上拉加载更多', // 底部加载提示文本
				hotCate: [
					{name: '关注'},
					{name: '推荐'},
					{name: '体育'},
					{name: '热点'},
					{name: '财经'},
					{name: '娱乐'},
				],
				subjectList: [
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
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success : res => {
					// 想获得中心区域的高度 需要可视区域的高度 - 状态栏高度 - 导航栏高度
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			})
			// 赋值数据
			this.list = dome
		},
		methods: {
			// 切换到发布页
			goToAppInput() {
				uni.navigateTo({
					url:'/pages/app-input/app-input'
				})
			},
			// 改变顶部导航栏选项
			changeIndex(index) {
				this.tabIndex = index
			},
			// 关联顶部导航
			changeTabber(tab) {
				this.tabIndex = tab.detail.current
			},
			// 顶踩操作
			onSupport(e) {
				let item = this.list[e.index];
				let msg = e.type === 'support' ? '顶' : '踩';
				if (item.support.type === '') {
					item.support[e.type + '_count']++;
				}else if (item.support.type === 'unsupport' && e.type === 'support') {
					// 如果已经踩了 变成顶
					item.support.unsupport_count--; // 让踩-1
					item.support.support_count++; // 让顶+1
				}else if (item.support.type === 'support' && e.type === 'unsupport') {
					// 如果已经顶了 变成踩
					item.support.unsupport_count++; // 让踩+1
					item.support.support_count--	; // 让顶-1
				}
				item.support.type = e.type
				// 成功消息弹框
				uni.showToast({
					title: msg + '成功'
				})
			},
			// 滚动到底部触发事件
			loadmore() {
				if (this.loadText !== '上拉加载更多') return
				this.loadText = '加载中...'
				setTimeout(() => {
					this.list.push(...dome)
					this.loadText = '上拉加载更多'
				}, 1000)
			}
		}
	}
</script>

<style>

</style>
