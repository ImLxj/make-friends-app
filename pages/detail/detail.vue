<template>
	<view>
		<scroll-view scroll-y :style="'height:'+ screenH +'px;'">
			<common-list
				:item="info" 
				isDetail 
				@doShare="doShare" 
				@doComment="doComment"
				@follow="follow"
				@onSupport="onSupport">
				<view>{{info.content}}</view>
				<view>
					<image 
						v-for="(item, index) in info.images" 
						:key="index"
						:src="item.url"
						class="w-100"
						mode="widthFix"
						@click="preview(item)"></image>
				</view>
			</common-list>
			<!-- 评论 -->
			<view class="p-2 font font-weight-bold">热门评论 3</view>
			<view class="px-2" style="height: 160rpx;">
				<view class="uni-comment-list">
					<view class="uni-comment-face">
						<image src="/static/demo/demo6.jpg" style="width: 80rpx;height: 80rpx;"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">15206774445</view>
						<view class="uni-comment-content">嘿嘿</view>
						<view class="uni-comment-date">
							<view>两天前</view>
						</view>
					</view>
				</view>
			</view>
			<view class="px-2" style="height: 160rpx;">
				<view class="uni-comment-list">
					<view class="uni-comment-face">
						<image src="/static/demo/demo6.jpg" style="width: 80rpx;height: 80rpx;"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">15206774445</view>
						<view class="uni-comment-content">嘿嘿</view>
						<view class="uni-comment-date">
							<view>两天前</view>
						</view>
					</view>
				</view>
			</view>
			<view class="px-2" style="height: 160rpx;">
				<view class="uni-comment-list">
					<view class="uni-comment-face">
						<image src="/static/demo/demo6.jpg" style="width: 80rpx;height: 80rpx;"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">15206774445</view>
						<view class="uni-comment-content">嘿嘿</view>
						<view class="uni-comment-date">
							<view>两天前</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部输入栏 -->
		<bottom-input @submit="submit"></bottom-input>
		<!-- 分享弹出 -->
		<more-share ref="popup" :providerList="providerList"></more-share>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	import moreShare from '@/components/common/more-share.vue'
	export default {
		components: { 
			commonList,
			bottomInput,
			moreShare
		},
		data() {
			return {
				screenH: '',
				info: {
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
					share_num: 2,
					content: '',
					images: [
						{
							url: '/static/demo/datapic/27.jpg'
						},
						{
							url: '/static/demo/datapic/27.jpg'
						}
					]
				},
				providerList: []
			}
		},
		onReady() {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '微信好友',
									id: 'weixin',
									icon: 'iconfont icon-weixin',
									bgColor: 'background-color: #2AD19B;',
									sort:0
								})
								data.push({
									name: '朋友圈',
									id: 'weixin',
									icon: 'uni-icon uni-icon-pengyouquan',
									bgColor: 'background-color: #514D4C;',
									type:'WXSenceTimeline',
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '新浪微博',
									id: 'sinaweibo',
									icon: 'iconfont icon-xinlangweibo',
									bgColor: 'background-color: #EE5E5E;',
									sort:2
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq',
									icon: 'iconfont icon-QQ',
									bgColor: 'background-color: #5280CE;',
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
		},
		// 微信小程序
		onShareAppMessage() {
			return {
				title: this.shareText ? this.shareText : "欢迎体验uni-app",
				path: '/pages/tabBar/component/component',
				imageUrl:this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
			}
		},
		// 当组件销毁之前
		beforeDestroy() {
			this.shareText='uni-app可以同时发布成原生App、小程序、H5，邀请你一起体验！',
			this.href = 'https://uniapp.dcloud.io',
			this.image='';
		},
		onLoad(value) {
			if(value.detail) {
				this.__init(JSON.parse(value.detail))
			}
			uni.getSystemInfo({
				success: (res) => {
					this.screenH = res.screenHeight - uni.upx2px(250)
				}
			})
		},
		// 监听顶部导航右侧按钮的点击
		onNavigationBarButtonTap() {
			this.$refs.popup.open()
		},
		// 监听返回 并对出底部弹出
		onBackPress() {
			this.$refs.popup.close()
		},
		methods: {
			__init(data) {
				uni.setNavigationBarTitle({
					title: data.title
				})
			},
			// 评论
			doComment() {
				
			},
			// 分享
			doShare() {
				
			},
			// 关注
			follow() {
				this.info.isFollow = true
				uni.showToast({
					title: '关注成功'
				});
			},
			// 顶踩操作
			onSupport(e) {
				let info = this.info
				let msg = e.type === 'support' ? '顶' : '踩'
				if(info.support.type === e.type) {
					return uni.showToast({
						title: '你已经' + msg + '过了',
						icon: 'none'
					})
				}
				// 如果点赞类型什么都没有
				if(info.support.type === '') {
					info.support[e.type + '_count']++
				}else if(info.support.type === 'support' && e.type === 'unsupport') {
					info.support.unsupport_count ++
					info.support.support_count --
				}else if(info.support.type === 'unsupport' && e.type === 'support') {
					info.support.unsupport_count --
					info.support.support_count ++
				}
				info.support.type = e.type
				uni.showToast({
					title: msg + '成功'
				})
			},
			// 预览图片
			preview(value) {
				uni.previewImage({
					urls: this.imageList,
						longPressActions: {
							itemList: ['发送给朋友', '保存图片', '收藏'],
							success: function(data) {
								console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							},
							fail: function(err) {
								console.log(err.errMsg);
							}
						}
				})
			},
			submit(data) {
				console.log(data);
			},
		},		
		computed: {
			imageList() {
				return this.info.images.map(item => item.url)
			}
		}
	}
</script>

<style>

</style>
