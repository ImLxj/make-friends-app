import baseUrl from '@/common/config.js'
const common = {
	method: 'GET',
	header:{
		"content-type": "application/json"
	},
	data: {}
}
function request(options = {}) {
	options.url = baseUrl.webUrl + options.url
	options.method = options.method || common.method 
	options.data = common.data
	options.header = options.header || common.header
	console.log(options);
	return uni.request(options);
}
function get(url, data = {}, options = {}) {
	options.url = url
	options.data = data
	options.method = 'GET'
	return request(options)
}
function post(url, data = {}, options = {}) {
	options.url = url
	options.data = data
	options.method = 'POST'
	return request(options)
}
export default {
	get,
	post
}