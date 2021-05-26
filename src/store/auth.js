import router from '../router/index'
let localUser = JSON.parse(localStorage.getItem('userInfo')) || {};
let state = {
	userInfo: {
		name: ''
	}
}
Object.keys(state).forEach(key => state[key] = localUser[key] ? localUser[key] : state[key]);


export default {
	namespaced: true,
	state,
	getters: {
		getUserInfo: state => state.userInfo
	},
	mutations: {
		authSave(state, data) {
			state.userInfo = data
			router.options.routes.forEach(el => {
				if(el.path == '/listCr') {
					if(data.role.id == 1) {
						el.meta.links.forEach((e, i) => { if(i !== 4 && i !== 5) e.view = true})
					}
					if(data.role.id == 3 || data.role.id == 4) el.meta.links[0].view = true
					if(data.role.id == 2) {
						el.meta.links[0].view = true
						el.meta.links[4].view = true
						el.meta.links[5].view = true
					}
				}
				if(el.path == '/listUserForMZ') {
					if(data.role.id == 2) {
						el.meta.links[0].view = true
						el.meta.links[1].view = true
						el.meta.links[4].view = true
					}
				}
				if(el.path == '/listUser') {
					if(data.role.id == 5)
						el.meta.links[0].view = true
						el.meta.links[1].view = true
				}
				if(el.path == '/profileMPNKO') {
					if(data.role.id == 1) {
						el.meta.links.forEach(e => {e.view = true})
					}
				}
				if(el.path == '/editCR/:id') {
					if(data.role.id == 1) el.meta.links.forEach((e,i) => {
						el.meta.links.forEach((e, i) => { if(i !== 4) e.view = true})
					})
					if(data.role.id == 2) el.meta.links.forEach((e,i) => {
						if(i !== 2 && i !== 1) {
							e.view = true
						}
					})
				}
				if(el.path == '/viewCR/:id') {
					if(data.role.id == 1 || data.role.id == 2) el.meta.links.forEach(e => {e.view = true})
				}
				if(el.path == '/addUser') {
					if(data.role.id == 5) el.meta.links[0].view = true
				}
				if(el.path == '/History') {
					if(data.role.id == 2){
						el.meta.links[0].view = true
						el.meta.links[1].view = true
						el.meta.links[3].view = true
					}

					if(data.role.id == 5){
						el.meta.links[2].view = true
						el.meta.links[3].view = true
					}
				}


			})
		},
		resetLS(state) {
			state.userInfo = {name: ''}
			router.options.routes.forEach(el => {
				if(el.meta) el.meta.links.forEach(el => {el.view = false})
			})
		}
	},
	actions: {
		auth({ rootState, commit }, data) {
			return new Promise((resolve, reject) => {
				this.api.post(`${rootState.api_url}api/account`, data).then(res => {
					resolve(res)
					commit('authSave', res.data)
				}, error => {
					reject(error)
				})
			})
		},
		logout({ rootState, commit }) {
			return new Promise((resolve, reject) => {
				this.api.post(`${rootState.api_url}api/account/logout`, {}).then(res => {
					resolve(res)
					commit('resetLS')
				}, error => {
					reject(error)
				})
			})
		},
	}
};
