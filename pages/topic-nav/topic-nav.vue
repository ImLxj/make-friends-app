<template>
	<view>
		<!-- 顶部导航栏 -->
		<scroll-view 
			scroll-x 
			:scroll-into-view="scrollInto"
			class="scroll-row border-bottom border-white"
			scroll-with-animation
			style="height: 100rpx;"
			>
			<view 
				v-for="(item, index) in tabBars" :key="index" 
				class="scroll-row-item px-3 py-2 font-md"
				:id="'tab' + index"
				:class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
				@click="changeTab(index)">
					{{item.name}}
				</view>
		</scroll-view>
		<divider></divider>
		<!-- swiper滑动 -->
		<swiper 
			:duration="150"
			:current="tabIndex" 
			@change="changeSwiperTab"
			:style="'height:' + scrollH + 'px'">
			<swiper-item v-for="(item, index) in pageList" :key="index">
					<scroll-view
						scroll-y 
						:style="'height:' + scrollH + 'px'"
						@scrolltolower="loadmore(index)">
						<template v-if="item.list.length > 0">
							<block v-for="(list, index2) in item.list" :key="index2 + 'list'">
								<topic-list :item="list" :index="index2"></topic-list>
							</block>
							<!-- 上拉加载 -->
							<load-more :loadmore="item.loadmore"></load-more>
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
import topicList from '@/components/topic-detail/topic-list.vue'
import LoadMore from '@/components/common/loadmore.vue';
const dome = [
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
export default {
	components: { topicList, LoadMore },
	data() {
		return {
			scrollH: 0, // 除了头部 底部tabbar 之外的可视窗口的高度
			scrollInto: "",  
			tabIndex: 0,
			tabBars:[
				{name:'关注'},
				{name:'推荐'},
				{name:'体育'},
				{name:'热点'},
				{name:'财经'},
				{name:'娱乐'},
				{name:'军事'},
				{name:'历史'},
			],
			pageList: []
		};
	},
	// 点击
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url:'/pages/search/search'
		})
	},
	onLoad() {
		uni.getSystemInfo({
			success : res => {
				// uni.upx2px 将rpx转换成px
				this.scrollH = res.windowHeight - uni.upx2px(115)
			}
		})
		// 加载假数据，在页面更新之前
		this.getData()
	},
	methods: {
		// 修改顶部选项卡
		changeTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index  // 如果没有高亮则证明没有点击则赋值给点击的index
			this.scrollInto = 'tab' + this.tabIndex // 滚动到当前点击的id
 		},
		// swiper 关联 tab栏 
		changeSwiperTab(tab) {
			this.tabIndex = tab.detail.current
			// 滚动到指定元素
			this.scrollInto = 'tab' + this.tabIndex
		},
		// 获取数据
		getData() {
			let arr = []
			let obj = {}
			for(let i = 0; i < this.tabBars.length; i ++) {
				obj = {
					loadmore: '上拉加载更多',
					list:[]
				}
				if(i < 3) {
					obj.list = dome
				}
				arr.push(obj)
			}
			this.pageList = arr
		},
		// 滚动到底部触发事件
		loadmore(index) {
			let item = this.pageList[index]
			if(item.loadmore !== '上拉加载更多') return 
			item.loadmore = '加载中...'
			// 模拟发送请求
			setTimeout(() => {
				item.list = [...item.list,...item.list]
				item.loadmore = '上拉加载更多'
			}, 1000)
		},
		// 监听顶部导航按钮的点击事件
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/app-input/app-input'
			})
		}
	}
};
</script>

<style></style>
