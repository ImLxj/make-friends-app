import baseUrl from '@/common/config.js'
import $store from '@/store/index.js'
export const request = ({url, method, data}, token = false) => {
	let header = {}
	if(token) {
		header.token = $store.state.token
		if(!$store.state.token) {
			return uni.showToast({
				title: '非法token,请从新登录',
				icon: 'none'
			})
		}
	}
	return new Promise((reslove, reject) => {
		uni.request({
			url: baseUrl.webUrl + url,
			method: method || 'GET',
			data: data || {},
			header: header || {
				"content-type" : "application/json"
			},
			success: (res) => {
				if(res.statusCode !== 200) {
					return uni.showToast({
						title: res.data.msg,
						icon: 'error'
					})
				}
				reslove(res)
			},
			fail: (err) => {
				return uni.showToast({
					title:'请求接口失败',
					icon:'error'
				})
				reject(err)
			}
		})
	})
}