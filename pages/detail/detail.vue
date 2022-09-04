<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
			}
		}
	}
</script>

<style>

</style>
