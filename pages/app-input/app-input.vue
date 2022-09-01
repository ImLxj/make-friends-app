<template>
	<view class="overflow-hidden">
		<!-- 自定义导航栏 -->
		<uni-nav-bar leftIcon="back" statusBar :border="false" @clickLeft="goBack">
			<view class="flex align-center justify-center w-100">
				<text class="px-1">所有人可见</text>
				<text class="iconfont icon-shezhi"></text>
			</view>
		</uni-nav-bar>
		
		<!-- 文本域 -->
		<textarea v-model="context" placeholder="说一句话把" class="uni-textarea px-2 py-1"/>
		
		<!-- 图片操作 -->
		<upload-image :show="show" ref="uploadImageEvent" :list="imageList" @change="changeImage"></upload-image>
		
		<!-- 底部导航区域 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 86rpx;">
			<view class="iconfont icon-caidan footed-btn animated" hover-class="pulse"></view>
			<view class="iconfont icon-huati footed-btn animated" hover-class="pulse"></view>
			<view 
				class="iconfont icon-tupian footed-btn animated" 
				hover-class="pulse"
				@click="uploadImage('upload-image')"></view>
			<view 
				class="flex align-center justify-center rounded bj-main text-white ml-auto mr-2 animated" 
				hover-class="pulse"
				style="width: 142rpx; height: 62rpx;">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import UploadImage from '@/components/common/upload-image.vue'
	export default {
		components: {uniNavBar, UploadImage},
		data() {
			return {
				context: '', // 文本域内容
				imageList: [], // 子组件传递给父组件的图片信息
				showBack: false, //是否已经弹出提示框
			}
		},
		// 监听页面返回
		onBackPress() {
			if((this.context !== '' || this.imageList.length > 0) && !this.showBack) {
				uni.showModal({
					content: "是否要保存草稿",
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if (res.confirm) {
							// 保存草稿
							this.storageStore()
						}else {
							// 点击不报存直接返回，并删除之前存储的数据
							this.deleteStroe()
						}
						uni.navigateBack({delta:1})
					}
				})
				this.showBack = true
				return true
			}
		},
		// 获取草稿
		onLoad() {
			uni.getStorage({
				key: 'app-input',
				success: (res) => {
					if (res.data) {
						let data = JSON.parse(res.data)
						this.context = data.context
						this.imageList = data.imageList
					}
				}
			})
		},
		methods: {
			// 获取图片内容
			changeImage(value) {
				this.imageList = value
			},
			// 保存草稿
			storageStore() {
				// 异步保存数据
				uni.setStorage({
					key: 'app-input',
					data: JSON.stringify({
						context: this.context,
						imageList: this.imageList
					})
				})
			},
			// 删除草稿
			deleteStroe() {
				uni.removeStorage({
					key: 'app-input'
				})
			},
			// 返回上一页
			goBack() {
				uni.navigateBack({delta:1})
			},
			// 底部导航上传图片功能
			uploadImage(value) {
				switch(value) {
					case 'upload-image':
						this.$refs.uploadImageEvent.chooseImage()
						break
				}
			}
		},
		computed: {
			show() {
				return this.imageList.length > 0
			}
		}
	}
</script>

<style>
	.footed-btn {
		width: 86rpx;
		height: 86rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 60rpx;
	}
</style>
