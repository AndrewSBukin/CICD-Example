export default {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {
		apiAll({rootState}, data){
			return new Promise((resolve, reject) => {
				this.api[`${data.type}`](`${rootState.api_url}${data.url}${data.id ? '/'+data.id : ''}`, data.obj?data.obj:undefined)
				.then(res => {
					resolve(res)
				}, error => {
					reject(error.response)
				})
				.catch(error => {
					console.log(error)
				})
			})
		}
	},
};
