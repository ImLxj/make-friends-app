<template>
	<view class="animated fast fadeIn">
		<template v-if="!loginStatus">
			<!-- 未登录状态 -->
			<view class="flex align-center justify-center py-2 font text-dark">
				登录之后解锁更多功能
			</view>
			<other-list></other-list>
			<view	
				class="flex align-center justify-center py-2 font text-secondary"
				@click="openLogin">
				账号 | 邮箱 | 手机登录<text class="iconfont icon-jinru ml-2"></text>
			</view>
		</template>
		<!-- 个人信息 -->
		<template v-else>
			<view class="flex align-center p-2" hover-class="bg-light">
				<image 
					:src="avater" 
					style="width: 100rpx; height: 100rpx;"
					class="rounded-circle mr-2">
				</image>
				<view class="flex flex-column flex-1">
					<text class="font-md font-weight-bold text-dark">{{user.username}}</text>
					<text class="font-sm text-muted">总帖子 10 今日发帖 0</text>
				</view>
				<text class="iconfont icon-jinru"></text>
			</view>
			<!-- 帖子数量 -->
			<view class="flex align-center px-3 py-2">
				<view 
					class="flex flex-1 flex-column align-center justify-center"
					v-for="(item, index) in myData" :key="index">
					<text class="font-lg font-weight-bold text-dark">{{ item.num }}</text>
					<text class="font text-muted">{{ item.name }}</text>
				</view>
			</view>
			<!-- 广告 -->
			<view class="px-3 py-2">
				<image 
					class="rounded" 
					src="/static/demo/demo20.jpg" 
					style="height: 170rpx; width: 100%" 
					mode="aspectFill">
				</image>
			</view>
			
			<!-- 列表区域 -->
			<uni-list>
				<uni-list-item :border="false" clickable showArrow title="浏览历史" showExtraIcon>
					<text slot="header" class="iconfont icon-liulan mr-1"></text>
				</uni-list-item>
				<uni-list-item :border="false" clickable showArrow title="社区认证" showExtraIcon>
					<text slot="header" class="iconfont icon-huiyuanvip mr-1"></text>
				</uni-list-item>
				<uni-list-item :border="false" clickable showArrow title="审核帖子" showExtraIcon>
					<text slot="header" class="iconfont icon-keyboard mr-1"></text>
				</uni-list-item>
			</uni-list>
		</template>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/uni-list/components/uni-list/uni-list.vue'
	import otherList from '@/components/common/other-login.vue'
	import { mapState } from 'vuex'
	export default {
		components: {
			uniList,
			otherList
		},
		data() {
			return {
				myData: [
					{
						name: '帖子',
						num: 0
					},
					{
						name: '动态',
						num: 2
					},
					{
						name: '评论',
						num: 4
					},
					{
						name: '粉丝',
						num: 1
					}
				]
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/user-set/user-set'
			})
		},
		methods: {
			// 进入登录页面
			openLogin() {
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		},
		computed: {
			...mapState({
				loginStatus: state => state.loginStatus,
				user: state => state.user
			}),
			avater() {
				return this.user.userpic ? this.user.userpic : '/static/default.jpg'
			}
		}
	}
</script>

<style>

</style>
