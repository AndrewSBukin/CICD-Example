<template lang='pug'>
    div(:class="$style.right")
        Bell
        Info
        div(:class="$style.user")
            router-link(
                v-if="media === 'desktop'"
                :class="$style.name"
                :to="getUserInfo.role && getUserInfo.role.id == 1 ? { name: 'ProfileMPNKO' } : ''"
            ) {{ getUserInfo.name | hideSurname }}
            div(:class="$style.logout")
                LogoutButton(v-if="media === 'desktop'", , :class="$style.svg")
        Burger(v-if="media !== 'desktop'" :name="getUserInfo.name | hideSurname")
</template>

<script>
import Bell from '../Bell/index'
import Info from '../Info/index'
import LogoutButton from '../LogoutButton/index'
import Burger from '../Burger/index'
import {mapGetters} from 'vuex'

export default {
    components: {Bell, Info, LogoutButton, Burger},
    name: 'HeaderAccountInfo',
    filters: {
        hideSurname: function (value) {
            if (!value)
                return ''
            const arr = value.split(' ')
            const sn = arr.shift()
            arr.push(`${ sn.slice(0, 1) }.`)
            return arr.join(' ')
        }
    },
    data:() => ({
        account: {name: ''}
    }),
    computed: {
        ...mapGetters({
            media: 'layout/getMedia',
            getUserInfo: 'auth/getUserInfo',
        })
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