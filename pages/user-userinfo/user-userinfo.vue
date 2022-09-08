<template>
	<view>
		<uni-list :border="false">
			<uni-list-item :border="false" title="头像">
				<view slot="footer" class="flex align-center" @click="changeImage">
					<image 
						:src="userpic" 
						style="width: 80rpx; height: 80rpx;"
						class="rounded-circle mr-1"
						></image>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
			<uni-list-item :border="false" title="昵称">
				<view slot="footer" class="flex align-center">
					<input class="font-sm text-muted mr-1 text-right" v-model="username"/>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
			<uni-list-item :border="false" title="性别">
				<view slot="footer" @click="changeSex">
					<text class="font-sm text-muted mr-1">{{ sexText }}</text>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
			<uni-list-item :border="false" title="生日">
				<view slot="footer">
					<text class="font-sm text-muted mr-1">2022-1-3</text>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
			<uni-list-item :border="false" title="情感">
				<view slot="footer">
					<text class="font-sm text-muted mr-1">未婚</text>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
			<uni-list-item :border="false" title="职业">
				<view slot="footer">
					<text class="font-sm text-muted mr-1">学生</text>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
			<uni-list-item :border="false" title="家乡">
				<view slot="footer">
					<text class="font-sm text-muted mr-1">山东济宁</text>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
		</uni-list>
		
		<view class="py-2 px-3">
			<button 
				type="primary" 
				class="bj-main text-white" 
				style="border-radius: 50rpx;">
				完成
			</button>
		</view>
	</view>
</template>

<script>
	let sexArray = ['不限', '男', '女']
	import uniList from '@/components/uni-ui/uni-list/components/uni-list/uni-list.vue'
	export default {
		components: {
			uniList
		},
		data() {
			return {
				userpic: '/static/demo/demo66.jpg',
				username: '小拿',
				sexNum: 0	
			}
		},
		computed: {
			sexText() {
				return sexArray[this.sexNum]
			}
		},
		methods: { 
			// 修改头像
			changeImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						this.userpic = res.tempFilePaths[0]
					}
				});
			},
			// 修改性别
			changeSex() {
				uni.showActionSheet({
					itemList: sexArray,
					success: (res) => {
						this.sexNum = res.tapIndex
					}
				});
			}
		}
	}
</script>

<style>

</style>
