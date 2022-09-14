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
					{{item.classname}}
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
						<template v-else-if="!item.firsLoad">
							加载中。。。
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
export default {
	components: { topicList, LoadMore },
	data() {
		return {
			scrollH: 0, // 除了头部 底部tabbar 之外的可视窗口的高度
			scrollInto: "",  
			tabIndex: 0,
			tabBars:[],
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
			if(!this.pageList[this.tabIndex].flastLoad) {
				this.getList()
			}
		},
		// 获取数据
		getData() {
			this.$H({
				url: '/topicclass'
			}).then(res => {
				let {data: result} = res
				this.tabBars = result.data.list
				let arr = []
				let obj = {}
				for(let i = 0; i < this.tabBars.length; i ++) {
					arr.push({
						loadmore: '上拉加载更多',
						list:[],
						page: 1,
						firstLoad: false  //第一次加载
					})
				}
				this.pageList = arr
				if(this.tabBars.length > 0) {
					this.getList()
				}
			})
		},
		// 获取分类列表
		getList() {
			const index = this.tabIndex
			let id = this.tabBars[index].id
			let page = this.pageList[index].page
			this.$H({
				url: `/topicclass/${id}/topic/${page}`,
				method: 'GET'
			}).then(res => {
				let {data: result} = res
				let list = result.data.list.map(value => {
					return this.$U.topicList(value)
				})
				this.pageList[index].list = (page === 1) ? list : [...this.pageList[index].list, ...list],
				this.pageList[index].loadmore = list.length < 10 ? '没有更多了' : '上拉加载更多'
				if(page === 1) {
					this.pageList[index].flastLoad = true
				}
			}).catch(err => {
				if(!this.pageList[index].flastLoad) {
					this.pageList[index].page --
				}
			})
			
		},
		// 滚动到底部触发事件
		loadmore(index) {
			let item = this.pageList[index]
			if(item.loadmore !== '上拉加载更多') return 
			item.loadmore = '加载中...'
			// 发送请求
			item.page ++
			this.getList()
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
