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
	export default {
		components: {
			messageList,
			noThing
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
		methods: {
			refresh() {
				setTimeout(() => {
					this.msgList = dome
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				}, 2000)
			}
		}
	}
</script>

<style>

</style>
