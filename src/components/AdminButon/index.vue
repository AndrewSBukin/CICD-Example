<template lang='pug'>
    DropdownO(v-model="dropdown")
        template(slot="button")
            a(href :class="$style.link" @click.prevent="")
                slot(name="icons")
        div
            transition(name="dropdown")
                div(v-if="dropdown" :class="[$style.adminPanel, $style.adminPanelRight]" )
                    div(:class="$style.adminPanelWrapper")
                        div(:class="$style.adminPanelText") {{ text }}
                        button(:class="$style.button" @click="approve(row)") Подтвердить действие
</template>
<script>
import DropdownO from '../Dropdown/index'
import {mapActions} from 'vuex'

export default {
    components: {DropdownO},
    name: 'AdminButton',
    props: {
        order: Number,
        index: Number,
        id: [Number, String],
        action: String,
        text: String,
        scrollSearch: String,
        row: Object
    },
    data: () => ({
        dropdown: false,
        position: {},
    }),
    methods: {
        ...mapActions({
            apiAll: 'api/apiAll'
        }),
        getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return { top: box.top + pageYOffset, left: box.left + pageXOffset }
        },
        approve(row) {
            row.isBlocked = !row.isBlocked
            this.apiAll({type: 'put', url: `api/Users/${row.id}/blocking?isBlocked=${row.isBlocked}`, id: undefined})
			.then(res => {
				if(res.status == 200) {
					this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успешно', text: `Пользователь успешно ${row.isBlocked ? 'деактивирован' : 'активирован'}` })
                    this.dropdown = false
				} else {
					this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Произошла ошибка при создании пользователя' })
				}
			})
        }
    },
    watch: {
        dropdown (val) {
            if (val) {
                let { bottom, right, left } = this.$el.getBoundingClientRect()
                // const viewport = document.body.querySelector('.os-viewport')
                // bottom += viewport.scrollTop
                // y = this.getCoords(this.$el).top
                // console.log('2',{ y, right, left })

                this.position = { bottom, right, left }
            }
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