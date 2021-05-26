import orderBy from 'lodash.orderby'
export default {
	namespaced: true,
	state: {
		list_users: [],
		list_users_mz: [],
		notification: []
	},
	getters: {
		getListUsers: state => state.list_users,
		getListUsersMZ: state => state.list_users_mz,
		gettersNotification: state => state.notification.filter(f=>f.view)
	},
	mutations: {
		set(state, obj) {
			if(obj.name == 'list_users_mz')
				obj.data.forEach(el => {el.companyName = el.company ? el.company.name : ''})
			if(obj.name == 'list_users')
				obj.data.forEach(el => {el.companyName = el.company ? el.company.name : ''; el.roleName = el.role ? el.role.name : ''})
			if(obj.name == 'notification')
				obj.data.forEach(el => {el.view = true})

			state[obj.name] = obj.data
		},
		sortMutationMZ(state, obj) {
			state.list_users_mz = orderBy(state.list_users_mz, obj.column, obj.sort)
		},
		sortMutation(state, obj) {
			state.list_users = orderBy(state.list_users, obj.column, obj.sort)
		},
		allNotificationTrue(state) {
			state.notification.forEach(el => el.view = false)
		}
	},
	actions: {
		getUser({ rootState, commit }, params) {
			this.api.post(`${rootState.api_url}api/Users/filters`, {
				companyName: params.MPNKO?params.MPNKO:undefined,
				name: params.fio?params.fio:undefined,
				email: params.login?params.login:undefined
			})
			.then(res => {
				if(res.status == 200) commit('set', {data: res.data, name: 'list_users'})
			})
		},
		getUserMZ({ rootState, commit }, params) {
			return new Promise((resolve, reject)=>{
                this.api.post(`${rootState.api_url}api/Users/filters`, {
					roleId: 1,
					companyName: params.MPNKO?params.MPNKO:undefined,
					name: params.fio?params.fio:undefined,
					email: params.login?params.login:undefined
				})
				.then(res => {
					if(res.status == 200) {
						commit('set', {data: res.data, name: 'list_users_mz'})
					}
                    resolve(res)
                },error => {
                    reject(error)
				})
            })
		},
		getNotification({rootState, commit}) {
			this.api.get(`${rootState.api_url}api/Notifications?IsRead=${false}`)
			.then(res => {
				if(res.status == 200) commit('set', {data: res.data.sort((a,b) => a.createdOn < b.createdOn ? 1 : -1), name: 'notification'})
			})
		}
	},
};
