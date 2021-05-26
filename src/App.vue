<template>
	<transition name="page-fade" mode="out-in">
		<div key="main" :class="$style.pageWrapper" class="profile-main-wrapper">
			<app-header v-if="this.$route.fullPath !== '/'"/>
			<main :class="$style.main">
				<transition name="page-fade" mode="out-in">
					<router-view class="os-viewport"/>
				</transition>
			</main>
			<app-footer v-if="this.$route.name !== 'Auth'"/>
            <notifications group="foo" />
		</div>
	</transition>
</template>

<script>
import appFooter from './components/AppFooter/index'
import appHeader from './components/AppHeader/index'
import {mapMutations, mapGetters} from 'vuex'
import router from './router/index'

export default {
	components: {appFooter, appHeader},
	data: () => ({
		// isAuth: null
    }),
    computed: {
        ...mapGetters({
            getUserInfo: 'auth/getUserInfo'
        })
    },
    mounted() {
        window.addEventListener("resize", this.myEventHandler);
        this.myEventHandler({srcElement:{innerWidth: window.innerWidth}})

        router.options.routes.forEach(el => {
            if(this.getUserInfo.role) {
                if(el.path == '/listCr') {
                    if(this.getUserInfo.role.id == 1) {
						el.meta.links.forEach((e,i) => { if(i !== 4 && i !== 5) e.view = true})
					}
                    if(this.getUserInfo.role.id == 3 || this.getUserInfo.role.id == 4) el.meta.links[0].view = true
                    if(this.getUserInfo.role.id == 2) {
                        el.meta.links[0].view = true
                        el.meta.links[4].view = true
                        el.meta.links[5].view = true
                        // el.meta.links[3].view = true
                    }
                }
                if(el.path == '/listUserForMZ') {
                    if(this.getUserInfo.role.id == 2) {
						el.meta.links[0].view = true
						el.meta.links[1].view = true
						el.meta.links[4].view = true
                    }
                }
                if(el.path == '/listUser') {
                    if(this.getUserInfo.role.id == 5)
                        el.meta.links[0].view = true
                        el.meta.links[1].view = true
                }
                if(el.path == '/profileMPNKO') {
                    if(this.getUserInfo.role.id == 1) {
                        el.meta.links.forEach(e => {e.view = true})
                    }
                }
                if(el.path == '/editCR/:id') {
                    if(this.getUserInfo.role.id == 1) el.meta.links.forEach((e,i) => {
						el.meta.links.forEach((e,i) => { if(i !== 4) e.view = true})
					})
                    if(this.getUserInfo.role.id == 2) el.meta.links.forEach((e,i) => {
						if(i !== 2 && i !== 1) {
							e.view = true
						}
					})
                }
                if(el.path == '/viewCR/:id') {
                    if(this.getUserInfo.role.id == 1 || this.getUserInfo.role.id == 2) el.meta.links.forEach(e => {e.view = true})
                }
                if(el.path == '/addUser') {
					if(this.getUserInfo.role.id == 5) el.meta.links[0].view = true
				}
                if(el.path == '/History') {
					if(this.getUserInfo.role.id == 2){
                        el.meta.links[0].view = true
                        el.meta.links[1].view = true
                        el.meta.links[3].view = true
                    }
                    
                    if(this.getUserInfo.role.id == 5){
                        el.meta.links[2].view = true
                        el.meta.links[3].view = true
                    }
				}
            }

            setTimeout(() => {
                if(this.$route.path !== '/' && this.$route.path == el.path) {
                    el.meta.links.forEach(e => {
                        if(this.$route.name == e.name.name) {
                            if(!e.view) this.$router.go(-1)
                        }
                    })
                }
            }, 200);
        })
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
    methods: {
        ...mapMutations({
            changeResizeWidth: 'layout/changeResizeWidth'
        }),
        myEventHandler(e) {
            if(e.srcElement.innerWidth <= 768) this.changeResizeWidth('mobile')
            else if(e.srcElement.innerWidth > 768 && e.srcElement.innerWidth <= 1366) this.changeResizeWidth('tablet')
            else if(e.srcElement.innerWidth > 1366) this.changeResizeWidth('desktop')
        }
    }
}
</script>


<style src="./style/_style.less" lang="less" module/>