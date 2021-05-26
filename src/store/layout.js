export default {
	namespaced: true,
	state: {
		media: 'desktop'
	},
	getters: {
		getMedia: state => state.media
	},
	mutations: {
		changeResizeWidth(state, payload) {
			state.media = payload
		}
	},
	actions: {

	},
};
