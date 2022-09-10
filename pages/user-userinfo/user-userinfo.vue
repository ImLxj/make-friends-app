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
			<picker mode="date" :value="birthday" @change="changeBirthday">
				<uni-list-item :border="false" title="生日">
					<view slot="footer">
						<text class="font-sm text-muted mr-1">{{birthday}}</text>
						<text class="iconfont icon-bianji1"></text>
					</view>
				</uni-list-item>
			</picker>
			<uni-list-item :border="false" title="情感">
				<view slot="footer" @click="changEmotion">
					<text class="font-sm text-muted mr-1">{{emotionText}}</text>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
			<uni-list-item :border="false" title="职业">
				<view slot="footer" @click="changeProfession">
					<text class="font-sm text-muted mr-1">{{professionText}}</text>
					<text class="iconfont icon-bianji1"></text>
				</view>
			</uni-list-item>
			<uni-list-item :border="false" title="家乡">
				<view slot="footer" @click="openPicker">
					<text class="font-sm text-muted mr-1">{{ pickerText }}</text>
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
		<mpvue-city-picker 
			:themeColor="themeColor" 
			ref="mpvueCityPicker" 
			:pickerValueDefault="cityPickerValueDefault"
			@onConfirm="onConfirm">
		</mpvue-city-picker>
	</view>
</template>

<script>
	let sexArray = ['不限', '男', '女']
	let emotionArray = ['不知', '已婚', '未婚']
	let professionArray = ['IT', '其他', '学生']
	import uniList from '@/components/uni-ui/uni-list/components/uni-list/uni-list.vue'
	import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			uniList,
			mpvueCityPicker
		},
		data() {
			return {
				userpic: '/static/demo/demo66.jpg',
				username: '小拿',
				sexNum: 0	,
				emotionNum: 0,
				professionNum: 0,
				birthday: '2022-12-31',
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '请选择住址'
			}
		},
		computed: {
			sexText() {
				return sexArray[this.sexNum]
			},
			emotionText() {
				return emotionArray[this.emotionNum]
			},
			professionText() {
				return professionArray[this.professionNum]
			}
		},
		// 当点击返回按钮关闭三级联动
		onBackPress() {
			if(this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
				return true
			}
		},
		// 当退出当前页面的时候关闭三级联动
		onUnload() {
			if(this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
				return true
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
			},
			// 修改情感
			changEmotion() {
				uni.showActionSheet({
					itemList: emotionArray,
					success: (res) => {
						this.emotionNum = res.tapIndex
					}
				});
			},
			// 修改职业
			changeProfession() {
				uni.showActionSheet({
					itemList: professionArray,
					success: (res) => {
						this.professionNum = res.tapIndex
					}
				});
			},
			// 修改生日
			changeBirthday(e) {
				this.birthday = e.detail.value
			},
			// 三级联动取消
			onConfirm(e) {
				this.pickerText = e.label
			},
			// 打开三级联动
			openPicker() {
				this.$refs.mpvueCityPicker.show()
			}
		}
	}
</script>

<style>

</style>
