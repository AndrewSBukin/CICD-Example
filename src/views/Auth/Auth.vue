<template lang="pug">
    div(:class="[{ [$style.await]: wait }, $style.login,]")
        div(:class="$style.wrapper")
            div(:class="$style.left")
                div(:class="$style.titleText") Добро пожаловать!
                h1(:class="$style.title") Система мониторинга процесса разработки клинических рекомендаций
                div(v-if="authError", :class="[$style.text, $style.errorText]") {{ authError.message }}
                div(v-else, :class="$style.text")
                    span(v-if="show==1") Для продолжения работы необходимо пройти авторизацию
                    span(v-if="show==2") Для восстановления пароля необходимо ввести e-mail адрес
                    span(v-if="show==3") Введите код подтверждения, отправленный Вам на email
                    span(v-if="show==4") Придумайте новый пароль
                form(:class="$style.form" autocomplete="off" id="form" action="javascript:void(0);")
                    div(v-if="show==1" :class="[$style.group, $style.first]")
                        div(:class="$style.input")
                            input(
                                :class="[{ [$style.error]: authError }, $style.inputField]"
                                placeholder="E-mail"
                                name="email"
                                v-model="form.login"
                            )
                            div(v-if="form.login", :class="$style.linkBLock")
                                a(:class="$style.clean", href, title, @click.prevent="form.login=''", tabindex="-1")
                                    Close
                    div(v-if="show==2" :class="[$style.group, $style.first]")
                        div(:class="$style.input")
                            input(
                                :class="[{ [$style.error]: authError }, $style.inputField]"
                                type="email"
                                placeholder="E-mail"
                                name="email"
                                v-model="email"
                                requared
                                id="mail"
                            )
                            div(v-if="form.login", :class="$style.linkBLock")
                                a(:class="$style.clean", href, title, @click.prevent="email=''", tabindex="-1")
                                    Close
                    div(v-if="show==3" :class="[$style.group, $style.first]")
                        div(:class="$style.input")
                            input(
                                :class="[{ [$style.error]: authError }, $style.inputField]"
                                placeholder="Код подтверждения"
                                name="token"
                                v-model="token"
                            )
                            div(v-if="form.login", :class="$style.linkBLock")
                                a(:class="$style.clean", href, title, @click.prevent="token=''", tabindex="-1")
                                    Close
                    div(v-if="show==4" :class="[$style.group, $style.first]")
                        div(:class="$style.input")
                            input(
                                :class="[{ [$style.error]: authError }, $style.inputField]"
                                placeholder="Введите пароль"
                                name="pass"
                                v-model="pass"
                            )
                            div(v-if="form.login", :class="$style.linkBLock")
                                a(:class="$style.clean", href, title, @click.prevent="pass=''", tabindex="-1")
                                    Close
                    div(v-if="show==4" :class="[$style.group, $style.first]")
                        div(:class="$style.input")
                            input(
                                :class="[{ [$style.error]: authError }, $style.inputField]"
                                placeholder="Подтвердите пароль"
                                name="pass2"
                                v-model="pass2"
                            )
                            div(v-if="form.login", :class="$style.linkBLock")
                                a(:class="$style.clean", href, title, @click.prevent="pass2=''", tabindex="-1")
                                    Close
                    div(v-if="show==1" :class="[$style.group, $style.last]")
                        div(:class="$style.input")
                            input(
                                :class="[{ [$style.error]: authError }, $style.inputField]"
                                :type="passwordType"
                                placeholder="Пароль"
                                name="password"
                                v-model="form.password"
                            )
                            div(v-if="form.password", :class="$style.linkBLock")
                                a(
                                    :class="$style.eye"
                                    href
                                    title
                                    @click.prevent=""
                                    @mousedown="passwordType = 'text'"
                                    @mouseup="passwordType = 'password'"
                                    @mouseleave="passwordType = 'password'"
                                )
                                    Eye(v-if="passwordType === 'text'", :class="$style.eyeHidden")
                                    EyeSlash(v-else, :class="$style.eyeHidden")
                                a(:class="$style.clean", href, title, @click.prevent="form.password = ''")
                                    Close
                    div(:class="[$style.group, $style.check]")
                        div(v-if="show==1" :class="$style.checkbox")
                            input(
                                type="checkbox"
                                name="remember"
                                id="remember"
                                value="Запомнить меня"
                                v-model="form.rememberMe"
                                :class="$style.checkboxInput"
                            )
                            label(for="remember", :class="$style.name")
                                span(:class="$style.checkboxText") Запомнить меня
                        span(
                            v-if="show==1"
                            style="text-transform:none;cursor:pointer"
                            title="Забыли пароль?"
                            :class="$style.link"
                            @click="show=2"
                        ) Забыли пароль?
                        span(
                            v-if="show > 1"
                            style="text-transform:none;cursor:pointer"
                            title="Вернуться назад"
                            :class="$style.link"
                            @click="show=show-1"
                        ) Вернуться назад
                    div(:class="[$style.group, $style.button]")
                        button(v-if="show==1" @click="authorization" :disabled="disabled" :class="$style.buttonNext") Войти
                        button(v-if="show==2" @click="checkEmail" :disabled="email.length==0" :class="$style.buttonNext") Отправить код
                        button(v-if="show==3" @click="checkToken(token)" :disabled="token.length==0" :class="$style.buttonNext") Продолжить
                        button(v-if="show==4" @click="checkPassword(pass, pass2)" :class="$style.buttonNext") Сохранить
        div(:class="$style.imageWrapperDesktop")
            Rus
        div(:class="$style.imageWrapperMobile")
            RusMobile
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Rus from '@/assets/images/inhtml/rus.svg?inline'
import Eye from '@/assets/icons/svg/eye.svg?inline'
import EyeSlash from '@/assets/icons/svg/eye-slash.svg?inline'
import Close from '@/assets/icons/svg/close.svg?inline'
import RusMobile from '@/assets/images/inhtml/rus-mobile.svg?inline'

export default {
    components: { Rus, RusMobile, Eye, Close, EyeSlash },
    data: () => ({
        show: 1,
        authError: null,
        email: '',
        pass: '',
        pass2: '',
        token: '',
        id_user: null,
        form: {
            login: '',
            password: '',
            rememberMe: false,
        },
        wait: false,
        passwordType: 'password',
    }),

    computed: {
        disabled () {
            const { login, password, wait } = this.form
            return !(login && password && !wait)
        },
        ...mapGetters({
            // authError: 'account/getError'
        }),
    },

    methods: {
        ...mapActions({
            login: 'auth/auth',
            apiAll: 'api/apiAll'
        }),
        authorization() {
            this.wait = true
            this.login(this.form).then(res => {
                if(res.data.role.id !== 5) this.$router.push('/listCr')
                else this.$router.push('/listUser')
            })
            .catch(error => {
                if(error.response.status == 404)
                    this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка...', text: 'Данный пользователь не найден или заблокирован!' })
            })
        },
        checkEmail() {
            let email = document.getElementById('mail'),
            emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(email.validity.valid && emailRegExp.test(this.email)) {
                this.apiAll({type: 'get', url: `api/Users/EmailValidator/${this.email}`, id: undefined})
                .then(res => {
                    if(res.status == 200){
                        this.$notify({ group: 'foo', duration: 7000, type: 'success', title: 'Успешно...', text: 'Код отправлен!' })
                        this.show = 3
                        this.id_user = res.data.userId
                    }
                })
                .catch(error => {
                    if(error.status == 404){
                        this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка...', text: 'Введенный Вами e-mail не зарегистрирован в системе' })
                    }
                })
            }
        },
        checkToken(token) {
            this.apiAll({type: 'post', url: `api/Users/TokenValidator?Id=${this.id_user}&Token=${token}`, obj: {Id: this.id_user, Token: token}, id: undefined})
            .then(res => {
                if(res.status == 200){
                    this.show = 4
                }
            })
            .catch(error => {
                this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка...', text: 'Код указан неверно!' })
            })
        },
        checkDigits(pass) {
            let digits = "0123456789",
            cntCheckDigits = 0;
            for (let i = 0; i < pass.length; i++) if(digits.indexOf(pass[i]) != -1) cntCheckDigits++
            return cntCheckDigits >= 4 ? true : false
        },
        checkPassword(pass, pass2) {
            if(pass === pass2) {
                if(this.checkDigits(pass) && pass.length > 5) {
                    this.apiAll({type: 'post', url: `api/Users/PasswordSetter?Id=${this.id_user}&Password=${pass}`, obj: {Id: this.id_user, Password: pass}, id: undefined})
                    .then(res => {
                        if(res.status == 200){
                            this.id_user = null
                            this.email = ''
                            this.pass = ''
                            this.pass2 = ''
                            this.token = ''
                            this.show = 1
                            this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успех...', text: 'Пароль успешно изменен!' })
                        }
                    })
                } else {
                    this.$notify({ group: 'foo', duration: 7000, type: 'error', title: 'Ошибка...', text: 'В пароле должно быть не менее 6 знаков и 4 цифр!' })
                }
            } else {
                this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка...', text: 'Пароли не совпадают!' })
            }
        }
    }
}

</script>

<style lang='less' module>
@import "./style/mobile.less";

@media (min-width: 768px) {
    @import "./style/tablet.less";
}

@media (min-width: 1366px) {
    @import "./style/desktop.less";
}
</style>