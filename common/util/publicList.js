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
		share_num: value.sharenum
	}
}