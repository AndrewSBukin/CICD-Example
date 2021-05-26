<template lang='pug'>
    footer(:class="$style.footer")
        div(:class="$style.container")
            div(:class="$style.wrapper")
                p(:class="$style.copyright") © 2021
                    span(:class="$style.title") Министерство здравоохранения Российской Федерации. 
                    | Все права защищены
</template>
<script>
    export default {
        name: 'AppFooter',

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