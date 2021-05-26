<template>
	<div class="b-page-wrapper administrator">
		<div class="b-head-block b-head-block--link">
			<div class="b-container">
				<div class="b-head-block__wrapper">
					<router-link class="b-link b-link--header" :to="$route.query.mz ? '/listUserForMZ' : '/listUser'" title="">
						<iconAngleleftSvg class="b-icon b-icon--header icon-angle-left"/>  
						<span>Назад</span>
					</router-link>
					<h1 class="b-title b-title--h1">Редактирование профиля пользователя
					</h1>
				</div>
			</div>
		</div>
		<div class="b-container">
			<div class="b-window">
				<div class="b-form b-form--administrator-edit" action="/">
					<div class="b-form__first-lavel">
						<div class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="role">Роль
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<select :disabled="disabledInpRole" v-model="obj.roleId" class="b-select__select-field" id="role" name="role">
										<option class="b-select__option" :value="null">Выбрать роль</option>
										<option v-for="(item, ind) in listRole" :key="ind" class="b-select__option" :value="item.id">{{item.name}}</option>
									</select>
									<div class="b-icon">
										<iconAngleDownSvg class="b-icon--down icon-angle-down" />
									</div>
								</div>
							</div>
						</div>
						<div class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="nameorg">Наименование МПНКО
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<select v-model="obj.companyId" :disabled="obj.roleId == 2" class="b-select__select-field" id="role" name="role">
										<option class="b-select__option" :value="null">МНПКО</option>
										<option v-for="(item, ind) in listCompanies" :key="ind" class="b-select__option" :value="item.id">{{item.name}}</option>
									</select>
									<div class="b-icon">
										<iconAngleDownSvg class="b-icon--down icon-angle-down" />
									</div>
								</div>
							</div>
						</div>
						<div v-if="!disabledInpRole" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="nameorg1">Наименование Департамента Минздрава России
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input v-model="obj.department" :disabled="obj.roleId == 1" class="b-input__input-field" id="nameorg1" type="text" placeholder="" name="nameorg"/>
								</div>
							</div>
						</div>
						<div class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="fio">ФИО пользователя</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input v-model="obj.name" class="b-input__input-field" id="fio" type="text" placeholder="" name="fio"/>
								</div>
							</div>
						</div>
						<div class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="login">Логин</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input v-model="obj.email" class="b-input__input-field" id="login" type="text" placeholder="" name="login"/>
								</div>
							</div>
						</div>
						<!-- <div class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="pass">Пароль</label>
							</div>
							<div class="b-form__right">
								<div class="b-input-field">
									<input class="b-input__input-field" id="pass" type="password" placeholder="" name="pass" value="* * * * * * * *" disabled="disabled"/>
									<i class="b-icon b-icon--check icon-check" />
									<i class="b-icon b-icon--close icon-close" />
									<div class="b-icon">
										<iconAngleDownSvg class="b-icon--down icon-angle-down" />
									</div>
								</div>
							</div>
						</div> -->
						<div class="b-form__group b-form__group--tumbler">
							<div class="b-form__left b-form__left--tumbler">
								<label class="b-label" for="desabled">Деактивировать профиль</label>
							</div>
							<div class="b-form__right b-form__right--flex">
								<div class="b-switch">
									<input v-model="obj.isBlocked" class="b-switch__input" type="checkbox" id="switch" checked="checked"/>
									<label class="b-switch__lbl-off" for="switch" />
									<label class="b-switch__lbl-on" for="switch" />
								</div>
							</div>
						</div>
						<!-- <div class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="newpas">Изменить пароль</label>
							</div>
							<div class="b-form__right b-form__right--flex">
								<a style="text-transform:none" class="b-link b-link--increased" href="javascript:void(0);" title="Отправить ссылку для создания нового пароля">Отправить ссылку для создания нового пароля</a>
							</div>
						</div> -->
					</div>
					<div class="b-form__group b-form__group--button">
						<button @click="save(obj)" class="b-button b-button--fill b-button--full">Сохранить</button>
						
						<router-link class="b-button b-button--empty b-button--full" :to="$route.query.mz ? '/listUserForMZ' : '/listUser'" title="Отменить">Отменить</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import iconAngleleftSvg from "../../assets/icons/svg/angle-left.svg"
import iconAngleDownSvg from "../../assets/icons/svg/angle-down.svg"
import {mapActions} from 'vuex'

export default {
	components: {
		iconAngleleftSvg,
		iconAngleDownSvg,
	},
	data: () => ({
		disabledInpRole: false,
		obj: {
			email: "",
			roleId: null,
			name: "",
			department: "",
			companyId: null,
			isBlocked: null
		},
		listRole: [],
		listCompanies: [],
	}),
	methods: {
		...mapActions({
			apiAll: 'api/apiAll'
		}),
		save(obj) {
			this.apiAll({type: 'put', url: `api/Users`, id: this.$route.params.id, obj: obj})
			.then(res => {
				if(res.status == 200) {
					this.$notify({ group: 'foo', duration: 4000, type: 'success', title: 'Успешно', text: 'Пользователь успешно отредактирован' })
				} else {
					this.$notify({ group: 'foo', duration: 4000, type: 'error', title: 'Ошибка', text: 'Произошла ошибка при редактировании пользователя' })
				}
			})
			.catch(error => {
				if(error.status !== 409) {
					this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка при редактировании', text: 'Заполните все поля...' })
				} else {
					this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка при редактировании', text: 'Такой логин уже существует' })
				}
			})
		}
	},
	created() {
		if(this.$route.query.mz) this.disabledInpRole = true
		this.apiAll({type: 'get', url: `api/Users/${this.$route.params.id}`, id: undefined})
		.then(res => { 
			this.obj = {
				id: res.data.id,
				email: res.data.login,
				roleId: res.data.role ? res.data.role.id : null,
				name: res.data.name,
				department: res.data.department,
				companyId: res.data.company ? res.data.company.id : null,
				isBlocked: res.data.isBlocked
			}
		})
		this.apiAll({type: 'get', url: `api/Roles`, id: undefined}).then(res => { this.listRole = res.data })
		this.apiAll({type: 'get', url: `api/Companies`, id: undefined}).then(res => { this.listCompanies = res.data })
	}
}
</script>

<style>
@import '../../style/stylePages.css';

.b-select__select-field[disabled] {
    color: black!important;
	cursor: not-allowed;
}
</style>