<template lang='pug'>
    a(@click.prevent="log" href="", :class="$style.logout")
        span(v-if="media !== 'desktop'") Выйти
        Icon(v-else, :class="$style.svg")
</template>
<script>
import Icon from '../../assets/icons/svg/power.svg?inline'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'LogoutButton',
    data: () => ({
        wait: false
    }),
    components: { Icon },
    computed: {
        ...mapGetters({
            media: 'layout/getMedia'
        })
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        log() {
            this.logout().then(res => {
                if(res.status == 200) this.$router.replace('/')
            })
        },
    },
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