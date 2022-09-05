<template>
	<view>
			<!-- 聊天滚动条 -->
			<scroll-view 
				scroll-y="true" 
				style="position: absolute;top: 0;left: 0;right: 0;bottom: 100rpx;"
				:scroll-into-view="scrollInto"
				scroll-with-animation="true">
				<block v-for="(item, index) in list" :key="index">
					<view :id="'chat' + index">
						<user-chat
							:item="item" 
							:index="index" 
							:pretime="index > 0 ? list[index-1].create_time : 0">
						</user-chat>
					</view>
				</block>
			</scroll-view>
			<!-- 底部操作条 -->
			<bottom-input @submit="submit"></bottom-input>
	</view>
</template>

<script>
	import userChat from '@/components/user-char/user-chat.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	export default {
		components: {userChat, bottomInput},
		data() {
			return {
				scrollH: 500,
				scrollInto: '',
				content: '', //输入聊天信息
				// 消息记录
				list: [
					{
						user_id: '007',
						username: '张三',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: 1662269428328
					},
					{
						user_id: '110',
						username: '呲牙',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: new Date().getTime()
					},{
						user_id: '110',
						username: '呲牙',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: new Date().getTime()
					},
					{
						user_id: '110',
						username: '呲牙',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: new Date().getTime()
					},
					{
						user_id: '110',
						username: '呲牙',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: new Date().getTime()
					},
					{
						user_id: '110',
						username: '呲牙',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: new Date().getTime()
					},
					{
						user_id: '110',
						username: '呲牙',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: new Date().getTime()
					},
					{
						user_id: '110',
						username: '呲牙',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: new Date().getTime()
					},
					{
						user_id: '007',
						username: '张三',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: 1662269428328
					},
					{
						user_id: '007',
						username: '张三',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: 1662269428328
					},
					{
						user_id: '007',
						username: '张三',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: 1662269428328
					},
					{
						user_id: '007',
						username: '张三',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: 1662269428328
					},
					{
						user_id: '007',
						username: '张三',
						data: "你好啊",
						avatar: '/static/demo/userpic/15.jpg',
						type: 'text',
						create_time: 1662269428328
					},
				]
			}
		},
		// 页面加载完成的时候，让滚动条滚动到底部
		onReady() {
			this.pageToBottom()
		},
		methods: {
			// 发送消息
			submit(data) {
				let obj = {
					user_id: '110',
					username: '呲牙',
					avatar: '/static/demo/userpic/15.jpg',
					type: 'text',
					data: data,
					create_time: new Date().getTime()
				}

				this.list.push(obj)

				// 发送完消息之后滚动到底部
				this.pageToBottom()
			},
			pageToBottom() {
				let lastIndex = this.list.length - 1
				if(lastIndex < 0) return
				this.scrollInto = 'chat' + lastIndex
				console.log(this.scrollInto);
			}
		}
	}
</script>

<style>
</style>
