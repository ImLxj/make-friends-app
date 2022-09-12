export const onNetWork = () => {
	uni.getNetworkType({
		success: function (res) {
			if(res.networkType === 'none') {
				uni.showToast({
					title: '没有网络',
					icon: 'error'
				})
			}
		}
	});
	uni.onNetworkStatusChange(function (res) {
		if(res.networkType === 'none') {
			uni.showToast({
				title: '请先连接网络',
				icon: 'loading'
			})
		}else {
			console.log(res.networkType);
		}
	});
}