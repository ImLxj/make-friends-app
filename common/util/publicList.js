export const publicList = (value) => {
	return {
		username: value.user.username, // 用户名
		userpic: value.user.userpic, // 用户头像
		newstime: value.create_time, // 用户更新时间
		isFollow: false, // 是否关注 
		title: value.title, // 文章标题
		titlepic: value.titlepic, // 文章图片
		content: value.content,
		images: value.images,
		support: {
			type: 'unsupport',
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: value.comment_count,
		share_num: value.sharenum,
		user_id: value.user_id
	}
}
export const topicList = (value) => {
	return {
		id: value.id,
		cover: value.titlepic,
		title: value.title,
		desc: value.desc,
		today_count: value.todaypost_count,
		news_count: value.post_count
	}
}
export const thirdPartyLogin = (value) => {
	// 已绑定手机号
	if(value.user && value.user.user_id > 0) {
		return {
			id: value.user.id,
			username: value.user.username || value.nickname,
			userpic: value.user.userpic || value.avatarurl,
			phone: value.user.phone,
			email: value.user.email,
			status: value.user.status,
			create_time: value.user.create_time,
			logintype: value.logintype,
			password: value.user.password,
			token: value.token,
			userinfo: {
				id: value.user.userinfo.id,
				user_id: value.user.userinfo.user_id,
				age: value.user.userinfo.age,
				sex: value.user.userinfo.sex,
				qg: value.user.userinfo.qg,
				birthday: value.user.userinfo.birthday,
				job: value.user.userinfo.job,
				path: value.user.userinfo.path
			}
		}
	}
	return {
		id: value.user_id,
		username: value.nickname,
		userpic: value.avatarurl,
		phone: false,
		email: false,
		status: 1,
		create_time: false,
		logintype: value.logintype,
		token: value.token,
		userinfo: false
	}
}