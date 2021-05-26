<template lang='pug'>
    Dropdown(v-model="open" :class="$style.notification")
        template(slot="button")
            div(:class="$style.wrapper")
                div(:class="[$style.link, {[$style.open]: open}]")
                    infoIcon
        div(:class="$style.drop")
            div()
                div(style="max-height:350px")
                    div(:class="$style.transitionGroup")
                        header(:class="$style.headerInfo") Помощь
                        div(:class="$style.mainInfo")
                            a(:class="$style.ahref" :href="`${apiUrlFile}Files/${getUserInfo&&getUserInfo.role&&getUserInfo.role.id == 1 ? 'mnpko' : (getUserInfo&&getUserInfo.role&&getUserInfo.role.id == 2 ? 'mz' : getUserInfo&&getUserInfo.role&&getUserInfo.role.id == 3 ? 'cekkmp' : 'npc')}.pdf`" target="_blank")
                                p Руководство пользователя скачать
                                    <iconDownloadSvg class="b-icon b-icon--report" style="height:12px;fill:blue;padding-left:4px" />
                            span Служба технической поддержки:
                                a(:class="$style.ahref" href="javascript:void(0);") support@nitrosbase.com 
                            p Часы работы: 09:00-18:00 (МСК)

</template>
<script>
import Dropdown from '../Dropdown/index'
import infoIcon from '../../assets/icons/svg/question.svg?inline'
import iconDownloadSvg from "../../assets/icons/svg/download.svg";

import {mapGetters, mapActions, mapMutations} from 'vuex'


const dateFormatter = new Intl.DateTimeFormat('ru', {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
})
const timeFormatter = new Intl.DateTimeFormat('ru', {
	hour: '2-digit',
	minute: '2-digit',
})

export default {
    components: { iconDownloadSvg, infoIcon, Dropdown },
    name: 'Info',
    data: () => ({
        open: false
	}),
    computed: {
        ...mapGetters({
            notifications: 'lu/gettersNotification',
            getUserInfo: 'auth/getUserInfo',
            apiUrlFile: 'apiUrlFile'
        })
    },
	methods: {
        ...mapActions({
            apiAll: 'api/apiAll'
        }),
        ...mapMutations({
            allNotificationTrue: 'lu/allNotificationTrue'
        }),
		hideNotification(item, all) {
            if(!all){
                item.view = !item.view
                this.apiAll({type: 'put', url: `api/Notifications`, obj: [item.id], id: undefined})
            } else {
                this.apiAll({type: 'put', url: `api/Notifications`, obj: this.notifications.map(m=>m.id), id: undefined})
                .then(res => {
                    if(res.status == 200) this.allNotificationTrue()
                })
            }
		}
	},
	filters: {
		formatDate(date) {
			return dateFormatter.format(new Date(date || Date.now()))
		},
		formatTime(date) {
			return timeFormatter.format(new Date(date || Date.now()))
		},
	}
}
</script>

<style lang='less' module>
    @import "./style/mobile";

    @media (min-width: 768px) {
        @import "./style/tablet";
    }

    @media (min-width: 1366px) {
        @import "./style/desktop";
    }
</style>