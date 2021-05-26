<template lang='pug'>
    div
        div(@click="setState(keepOpen || !state)" tabindex="-1" :class="buttonWrapperClass")
            slot(name="button")

        transition(name="dropdown")
            div(v-show="state" v-bind:tabindex="-1" @focusin="!closeOnSelect ? setState(true) : false" @focusout="setState(false)" :class="$style.hidden")
                slot
</template>

<script>
const TIMEOUT = 100

export default {
    name: 'Dropdown',
    props: {
        value: { default: 'noValue' },
        closeOnSelect: { type: Boolean, default: false },
        keepOpen: { type: Boolean, default: false },
        buttonWrapperClass: [String, Array, Object],
    },
    data: () => ({
        internalValue: false,
        timer: null,
    }),
    computed: {
        state: {
            get() {
                return this.value === 'noValue' ? this.internalValue : this.value
            },
            set(val) {
                if (this.value === 'noValue')
                    this.internalValue = val
                this.$emit('input', val)
            },
        },
    },
    methods: {
        setState(val) {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            this.timer = setTimeout(() => {
                this.timer = null
                this.state = val
            }, TIMEOUT)
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
