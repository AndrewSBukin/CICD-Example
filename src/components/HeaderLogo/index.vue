<template lang='pug'>
    div(:class="$style.logo")
        router-link(:to="roter_to_role", :class="$style.link")
            span(:class="$style.wrapper")
                Logo
            span(v-if="media !== 'mobile'", :class="$style.text") Система мониторинга процесса разработки клинических рекомендаций
</template>

<script>
import Logo from '../../assets/icons/logo.svg?inline'
import {mapGetters} from 'vuex'

export default {
    components: { Logo },
    name: 'HeaderLogo',
    data: () => ({

    }),
    computed: {
        ...mapGetters({
            media: 'layout/getMedia',
            getUserInfo: 'auth/getUserInfo'
        }),
        roter_to_role() {
            let res = '/';
            if(this.getUserInfo.role && this.getUserInfo.role.id == 5) {
                res = '/listUser'
            } else {
                res = '/listCr'
            }
            return res
        }
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