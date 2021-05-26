import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import layout from './layout';
import api from './API';
import lu from './ListUser'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		api_url: 'https://crapproveapi.nitrosbase.com/',
		api_url_portal: 'https://crportalapi.nitrosbase.com/api/',
		api_url_file: 'https://crapprovedev.nitrosbase.com/',
		// api_url: 'https://democenter.nitrosbase.com/CRApproveAPIProd/'
	},
	getters: {
		apiUrl: state => state.api_url,
		apiUrlPortal: state => state.api_url_portal,
		apiUrlFile: state => state.api_url_file,
	},
	modules: {
		auth,
    layout,
    api,
		lu
	},
});

store.subscribe((mutation, state) => {
	localStorage.setItem('userInfo', JSON.stringify(state.auth));
});

export default store;