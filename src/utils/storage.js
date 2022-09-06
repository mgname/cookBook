const getStorage = (key) => {
	return uni.getStorageSync(key)
}

const setStorage = (key, data) => {
	uni.setStorageSync(key, data)
}

const removeStorage = (key) => {
	uni.removeStorageSync(key)
}

// 用戶基本信息
export const getUserInfo = () => {
	return getStorage('userinfo')
}
export const setUserInfo = (data) => {
	return setStorage('userinfo', data)
}
export const removeUserInfo = () => {
	return removeStorage('userinfo')
}