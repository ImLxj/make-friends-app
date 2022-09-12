export const hotUpdate = () => {
	//#ifdef APP-PLUS  
		var server = "http://39.108.147.245:5001/api/v1/update"; //检查更新地址  
		var req = { //升级检测数据  
				"appid": plus.runtime.appid,  
				"version": plus.runtime.version  
		};  
		uni.request({  
			url: server,  
			data: req,  
			success: (res) => {  
					if (res.statusCode == 200 && res.data.status === 1) {  
							uni.showModal({ //提醒用户更新  
									title: "更新提示",  
									content: res.data.note,  
									success: (res) => {  
											if (res.confirm) {  
													plus.runtime.openURL(res.data.url);  
											}  
									}  
							})  
					}  
			}  
	})  
	//#endif  
}