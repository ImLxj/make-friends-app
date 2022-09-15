<template>
	<view>
		<uni-list :border="false">
			<uni-list-item 
				:border="false" 
				v-for="(item, index) in userinfo" :key="index" 
				:title="item.name">
				<view slot="footer" class="flex align-center text-right text-light-muted">
					{{item.data}}
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-ui/uni-list/components/uni-list/uni-list.vue'
	export default {
		components: {
			uniList
		},
		data() {
			return {
				userinfo: [
					{
						name: '手机号',
						data: '未绑定',
					},
					{
						name: '登录密码',
						data: '未设置',
					},
					{
						name: '邮箱绑定',
						data: '未绑定',
					},
					{
						name: '微信账号',
						data: '未绑定',
					},
					{
						name: 'QQ账号',
						data: '未绑定',
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
