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
			<view 
				class="fixed-bottom flex align-center border-top bg-white px-2"
				style="height: 100rpx;">
				
				<input 
					type="text" 
					v-model="content" 
					placeholder="文明发言" 
					class="flex-1 rounded bg-light py-1 px-2"
					@confirm="submit">
				<view 
					class="flex align-center justify-center animated" 
					style="width: 100rpx;" 
					hover-class="jello"
					@click="submit"> 
					<text class="iconfont icon-fabu font-lg"></text>
				</view>
			</view>
	</view>
</template>

<script>
	import userChat from '@/components/user-char/user-chat.vue'
	export default {
		components: {userChat},
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
			submit() {
				let obj = {
					user_id: '110',
					username: '呲牙',
					avatar: '/static/demo/userpic/15.jpg',
					type: 'text',
					data: this.content,
					create_time: new Date().getTime()
				}
				if(this.content === '') {
					return uni.showToast({
						title:"消息不能为空",
						icon :'none'
					})
				}
				this.list.push(obj)
				this.content = ''
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
