<template>
	<view>
		<view class="flex align-center p-3 border-bottom">
			<image 
				src="/static/demo/demo66.jpg" 
				style="width: 180rpx;height: 180rpx;"
				class="rounded-circle"></image>
			<view class="pl-5 flex flex-1 flex-column pb-3">
				<view class="flex align-center pb-3">
					<view class="flex flex-1 font font-weight-bold flex-column align-center">
						<text>1</text>
						<text>获赞</text>
					</view>
					<view class="flex flex-1 font font-weight-bold flex-column align-center">
						<text>1</text>
						<text>关注</text>
					</view>
					<view class="flex flex-1 font font-weight-bold flex-column align-center">
						<text>1</text>
						<text>粉丝</text>
					</view>
				</view>
				<view class="flex align-center justify-around">
					<button type="primary" size="mini" style="width: 400rpx;" class="bj-main">关注</button>
				</view>
			</view>
		</view>
	
		<view class="flex align-center justify-around mt-2">
			<view 
				v-for="(item, index) in tabList" :key="index"
				:class="tabIndex === index ? 'text-main font-md' : ''"
				@click="changeTab(index)"
				class="flex-1 font flex align-center justify-center font-weight-bold">{{item.name}}</view>
		</view>
		
		<!-- 首页 -->
		<template v-if="tabIndex === 0">
			<view class="p-3 animated fast fadeIn">
				<view class="rounded-bottom">
					<view class="font-lg">账号信息</view>
					<view class="font-md">账号年龄:11</view>
					<view class="font-md">账号ID： 007</view>
				</view>
				<view class="rounded-bottom">
					<view>个人信息</view>
					<view>星座：魔羯座</view>
					<view>职业：学生</view>
					<view>故乡：中国</view>
					<view>情感：未婚</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="animated fast fadeIn">
				<block v-for="(item, index) in list" :key="index">
					<common-list :item="item" :index="index" @follow="follow" @onSupport="onSupport"></common-list>
					<divider></divider>
				</block>
				<load-more :loadmore="loadmore"></load-more>
			</view>
		</template>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view 
				class="flex align-center justify-center py-2 border-bottom" 
				hover-class="bg-light">
				<text class="iconfont icon-qingchu mr-1"></text>
				<text>加入黑名单</text>
			</view>
			<view 
				class="flex align-center justify-center py-2" 
				hover-class="bg-light">
				<text class="iconfont icon-pinglun2 mr-1"></text>
				<text>聊天</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
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
	import commonList from '@/components/common/common-list.vue'
	import LoadMore from '@/components/common/loadmore.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	export default {
		components: {
			commonList,
			LoadMore,
			uniPopup
		},
		data() {
			return {
				tabIndex: 0,
				screenH: 500,
				tabList: [
					{name: '主页'},
					{
						name: '帖子',
						list:dome,
						loadmore: '上拉加载更多'
					},
					{
						name: '动态',
						list:dome,
						loadmore: '上拉加载更多'
					},
				]
			}
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
			},
			follow(index) {
				this.tabList[this.tabIndex].list[index].isFollow = true
				// 成功弹框
				uni.showToast({
					title: '关注成功'
				});
			},
			onSupport(e) {
				let item = this.tabList[this.tabIndex].list[e.index];
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
				}else if(item.support.type === 'support' && e.type === 'support') {
					return
				}else if(item.support.type === 'unsupport' && e.type === 'unsupport') {
					return
				}
				item.support.type = e.type
				// 成功消息弹框
				uni.showToast({
					title: msg + '成功'
				})
			},
		},
		computed: {
			list() {
				return this.tabList[this.tabIndex].list
			},
			loadmore() {
				return this.tabList[this.tabIndex].loadmore
			}
		},
		// 打开弹出成
		onNavigationBarButtonTap() {
			this.$refs.popup.open()
		}
	}
</script>

<style>

</style>
