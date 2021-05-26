<template lang='pug'>
    header(:class="$style.header")
        div(:class="$style.container")
            div(:class="$style.wrapper")
                div(:class="$style.left")
                    HeaderLogo
                div(:class="$style.center")
                    HeaderButtons(v-if="media === 'desktop'")
                div(:class="$style.right")
                    HeaderAccountInfo
</template>

<script>
import HeaderLogo from '../HeaderLogo/index'
import HeaderButtons from '../HeaderButtons/index'
import HeaderAccountInfo from '../HeaderAccountInfo/index'
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {HeaderLogo, HeaderButtons, HeaderAccountInfo},
    name: 'AppHeader',
    computed: {
        ...mapGetters({
            media: 'layout/getMedia'
        })
    },
    methods: {
        ...mapActions({
            getNotification: 'lu/getNotification'
        })
    },
    mounted() {
        this.$nextTick(()=> { this.getNotification() })
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