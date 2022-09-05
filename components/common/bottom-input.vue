<template>
	<view>
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
	export default {
		data() {
			return {
				content: ''
			}
		},
		methods: {
			submit() {
				if(this.content === '') {
					return uni.showToast({
						title:"消息不能为空",
						icon :'none'
					})
				}
				this.$emit('submit', this.content)
				this.content = ''
			}
		}
	}
</script>

<style>
</style>