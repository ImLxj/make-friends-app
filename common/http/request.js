import baseUrl from '@/common/config.js'

export const request = ({url, method, data}) => {
	return new Promise((reslove, reject) => {
		uni.request({
			url: baseUrl.webUrl + url,
			method: method || 'GET',
			data: data || {},
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