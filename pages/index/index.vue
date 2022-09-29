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
								<!-- 列表样式 -->
								<common-list :item="list" :index="index2" @follow="follow" @onSupport="onSupport">
								</common-list>
								<!-- 分割线 -->
								<divider></divider>
							</block>
							<!-- 上拉加载 -->
							<load-more :loadmore="item.loadmore"></load-more>
						</template>
						<!-- 加载中 -->
						<template v-else-if="!item.flastLoad">
							<view>加载中..</view>
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
import CommonList from '@/components/common/common-list.vue';
import LoadMore from '@/components/common/loadmore.vue';
export default {
	components: { CommonList, LoadMore },
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
			url:'/pages/search/search?type=post'
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
		// 注销事件
		uni.$off('updateFollowOnSupport')
	},
	methods: {
		// 修改顶部选项卡
		changeTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index  // 如果没有高亮则证明没有点击则赋值给点击的index
			this.scrollInto = 'tab' + this.tabIndex // 滚动到当前点击的id
			this.getList()
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
		follow(user_id) {
			this.pageList.forEach(item => {
				item.list.forEach(l => {
					if(l.user_id === user_id) {
						l.isFollow = true
					}
				})
			})
			// 成功弹框
			uni.showToast({
				title: '关注成功'
			});
		},
		onSupport(e) {
			let item = this.pageList[this.tabIndex].list[e.index]
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
		// 获取数据
		async getData() {
			const {data : res} = await this.$H({
				url:'/postclass',
				method: 'GET'
			})
			this.tabBars = res.data.list
			let arr = []
			let obj = {}
			for(let i = 0; i < this.tabBars.length; i ++) {
				arr.push({
					loadmore: '上拉加载更多',
					list:[],
					page: 1,
					flastLoad: false
				})
			}
			this.pageList = arr
			if(this.tabBars.length > 0) {
				this.getList()
			}
		},
		// 获取分类列表
		async getList() {
			const index = this.tabIndex
			let id = this.tabBars[index].id
			let page = this.pageList[index].page
			const {data : res} = await this.$H({
				url: `/postclass/${id}/post/${page}`,
				method: 'GET'
			})
			let list = res.data.list.map(value => {
				return this.$U.publicList(value)
			})
			this.pageList[index].list = (page === 1) ? list : [...this.pageList[index].list, ...list],
			this.pageList[index].loadmore = list.length < 10 ? '没有更多了' : '上拉加载更多'
			if(page === 1) {
				this.pageList[index].flastLoad = true
			}
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
			this.navigateTo({
				url: '/pages/app-input/app-input'
			})
		}
	}
};
</script>

<style></style>
