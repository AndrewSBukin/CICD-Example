<template lang='pug'>
    Dropdown(v-model="open" :class="$style.notification")
        template(slot="button")
            div(:class="$style.wrapper")
                div(:class="[$style.link, {[$style.open]: open}]")
                    BellIcon
                    div(:class="$style.number" v-show="notifications.length")
                        span {{ notifications.length }}
        div(:class="$style.drop")
            div(v-if="notifications.length")
                div(style="max-height:350px;overflow-y:scroll")
                    div(:class="$style.transitionGroup")
                        div(v-for="item in notifications" :key="item.id" :class="$style.element" v-show="item.view")
                            div(:class="$style.head")
                                span {{ item.project.name }}
                                span №{{ item.project.number }}
                                br
                                span {{item.status.name}}
                            div(:class="$style.body")
                                div(:class="$style.left")
                                    span {{item.sender.name}}
                                    br
                                    span Роль: {{item.sender.role.name}}
                                    br
                                    span {{ item.createdOn | formatDate }} в {{ item.createdOn | formatTime }}
                                div(:class="$style.right")
                                    span 
                                    span(@click="hideNotification(item)") Скрыть
                div(:class="$style.bottom")
                    div(@click="hideNotification({}, 'all')")  Отметить всё как прочитанное
            div(v-else, :class="$style.empty")
                h2 Уведомления отсутствуют

</template>
<script>
import Dropdown from '../Dropdown/index'
import BellIcon from '../../assets/icons/svg/notification.svg?inline'
import HoverBellIcon from '../../assets/icons/svg/notification-hover.svg?inline'
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
    components: { BellIcon, HoverBellIcon, Dropdown },
    name: 'Bell',
    data: () => ({
        open: false
	}),
    computed: {
        ...mapGetters({
            notifications: 'lu/gettersNotification'
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
		},
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