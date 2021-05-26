<template lang='pug'>
    nav(:class="$style.menu")
        router-link(
            style="text-transform:none"
            v-for="(link, ind) in $route.meta.links"
            v-show="link.view"
            :key="ind"
            :to="`/${link.name.name}${link.name.params ? '/'+link.name.params.id : ''}`"
            :class="$style.headerLink"
            :exact-active-class="$style.active"
        ) {{link.text}}
</template>
<script>
export default {
    name: 'HeaderButtons',
    data: () => ({

    }),
    created() {
        // console.log(this.$route)
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