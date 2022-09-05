<template>
	<view>
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
		<divider></divider>
		
		
		
		<!-- 底部输入栏 -->
		<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	export default {
		components: { commonList, bottomInput },
		data() {
			return {
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
				}
			}
		},
		onLoad(value) {
			if(value.detail) {
				this.__init(JSON.parse(value.detail))
			}
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
			}
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
