import { getUserInfo, removeUserInfo } from '@/utils/storage'


const userinfo = getUserInfo()

const state = {
	token: userinfo.token,
	u_id: userinfo.u_id,
	u_name: userinfo.u_name,
	u_nick: userinfo.u_nick,
	u_sex: userinfo.u_sex,
	u_birthday: userinfo.u_birthday,
	menusName: []
}

const mutations = {
	SET_USERINFO: (state, userinfo) => {
		state.token = userinfo.token
		state.u_name = userinfo.u_name
		state.u_id = userinfo.u_id
		state.u_nick = userinfo.u_nick
		state.u_sex = userinfo.u_sex
		state.u_birthday = userinfo.u_birthday
	},
	SET_MENUS_NAME: (state, menusName) =>{
		state.menusName = menusName
		// console.log(state.menusName)
	},
	CLEAR_USERINFO: (state) => {
		state = {
			token: '',
			u_id: '',
			u_name: '',
			u_nick: '',
			u_sex: '',
			u_birthday: ''
		}
		removeUserInfo()
	}
}

const actions = {
	// login({ commit }, userInfo) {
	// 	const { username, password } = userInfo
	// 	return new Promise((resolve, reject) => {
	// 		loginApi({ username: username.trim(), password: password }).then(response => {
	// 			const { data } = response
	// 			// commit('SET_TOKEN', data.token)
	// 			resolve()
	// 		}).catch(error => {
	// 			reject(error)
	// 		})
	// 	})
	// }
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
