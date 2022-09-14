export const toFirst = (arr, index) => {
	if(index != 0) {
		arr.unshift(arr.splice(index, 1)[0])
	}
	return arr
}