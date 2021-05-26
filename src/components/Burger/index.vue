<template lang='pug'>
    Dropdown(v-model="open" :class="$style.burger")
        template(slot="button")
            div(:class="[$style.burgerButton, { [$style.open]: open }]")
                span(:class="$style.line")
            div(v-if="open", :class="$style.wrapp")
                div(:class="$style.content")
                    div(:class="$style.profile")
                        div(:class="$style.name")
                            span {{ name }}
                        div
                            LogoutButton(:class="$style.svg")
                    div(:class="$style.nav")
                        HeaderButtons
</template>
<script>
import HeaderButtons from '../HeaderButtons/index'
import LogoutButton from '../LogoutButton/index'
import Dropdown from '../Dropdown/index'

export default { 
    components: {Dropdown, LogoutButton, HeaderButtons},
    name: 'Burger',  
    props: {
        name: {
            type: String,
            default: '',
        },
    },
    data: () => ({ open: false }) 
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