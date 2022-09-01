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
								<!-- 列表样式 -->
								<common-list :item="list" :index="index2" @follow="follow" @onSupport="onSupport">
								</common-list>
								<!-- 分割线 -->
								<divider></divider>
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
import CommonList from '@/components/common/common-list.vue';
import LoadMore from '@/components/common/loadmore.vue';
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
	components: { CommonList, LoadMore },
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
		follow(index) {
			this.list[index].isFollow = true;
			// 成功弹框
			uni.showToast({
				title: '关注成功'
			});
		},
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
