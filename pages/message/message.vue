<template>
	<view>
		<template v-if="msgList.length > 0">
			<block v-for="(item, index) in msgList" :key="index">
				<message-list :item="item" :index="index"></message-list>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		
		<!-- 弹出栏 -->
		<uni-popup ref="popup" type="top">
			<view 
				class="flex align-center justify-center py-2 border-bottom" 
				hover-class="bg-light"
				@click="popupEvent('friend')">
				<text class="iconfont icon-sousuo mr-1"></text>
				<text>添加好友</text>
			</view>
			<view 
				class="flex align-center justify-center py-2" 
				hover-class="bg-light"
				@click="popupEvent('clear')">
				<text class="iconfont icon-qingchu mr-1"></text>
				<text>清除记录</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const dome = [
		{
			avatar: '/static/demo/userpic/17.jpg', // 图片地址
			username: '张三',
			update_time: 1662035227473,
			data: '你好啊，靓仔',
			noread: 1
		},
		{
			avatar: '/static/demo/userpic/16.jpg', // 图片地址
			username: '张三',
			update_time: 1662035227473,
			data: '你好啊，靓仔',
			noread: 1
		},
		{
			avatar: '/static/demo/userpic/15.jpg', // 图片地址
			username: '张三',
			update_time: 1662035227473,
			data: '你好啊，靓仔',
			noread: 1
		},
		{
			avatar: '/static/demo/userpic/14.jpg', // 图片地址
			username: '张三',
			update_time: 1662035227473,
			data: '你好啊，靓仔',
			noread: 1
		}
	]
	import messageList from '@/components/message/message-list.vue'
	import noThing from '@/components/common/noThing.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	export default {
		components: {
			messageList,
			noThing,
			uniPopup
		},
		data() {
			return {
				msgList: []
			}
		},
		// 监听页面下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		onLoad() {
			this.msgList = dome
		},
		// 监听导航栏的按钮
		onNavigationBarButtonTap(event) {
			// 弹出消息
			switch (event.index) {
				case 0:
					// 关闭弹出层
					this.$refs.popup.close()
					break;
				case 1:
					// 打开弹出层
					this.$refs.popup.open()
					break;
			}
		},
		methods: {
			refresh() {
				setTimeout(() => {
					this.msgList = dome
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				}, 2000)
			},
			// 关闭弹出层
			popupEvent(value) {
				switch (value){
					case 'friend':
						break;
					case 'clear':
						break;
				}
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>
