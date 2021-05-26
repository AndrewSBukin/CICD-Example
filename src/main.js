import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.component('v-select', vSelect)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

Vue.prototype.api = store.api = axios.create({
	withCredentials: true
});

store.api.interceptors.response.use(res => {
	return res
}, (error) => {
	if (error.response.status === 401) {
		store.api.post(`${store.state.api_url}api/account/logout`)
		router.replace('/')
	}
	return Promise.reject(error)
})
