<template>
	<div class="b-page-wrapper administrator">
		<div class="b-head-block b-head-block--link">
			<div class="b-container">
				<div class="b-head-block__wrapper">
					<router-link class="b-link b-link--header" :to="$route.query.mz ? '/listUserForMZ' : '/listUser'" title="">
						<iconAngleleftSvg class="b-icon b-icon--header icon-angle-left" />
						<span>Назад</span>
					</router-link>
					<h1 class="b-title b-title--h1">Добавление нового пользователя
					</h1>
				</div>
			</div>
		</div>
		<div class="b-container">
			<div class="b-window">
				<div class="b-form" action="/">
					<div class="b-form__first-lavel">
						<div class="b-form__group b-form__group">
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
						<div class="b-form__group b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="name">Наименование МПНКО
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select
										v-model="obj.companyId"
										:disabled="obj.roleId == 2"
										id="role" name="role"
										:options="listCompanies"
										:reduce="item => item.id"
									  label="name">
									</v-select>
									<!-- <select v-model="obj.companyId"  :disabled="obj.roleId == 2" class="b-select__select-field" id="role" name="role">
										<option class="b-select__option" :value="null">МПНКО</option>
										<option v-for="(item, ind) in listCompanies" :key="ind" class="b-select__option" :value="item.id">{{item.name}}</option>
									</select> -->
									<div class="b-icon">
										<iconAngleDownSvg class="b-icon--down icon-angle-down" />
									</div>
								</div>

							</div>
						</div>
						<div v-if="!disabledInpRole" class="b-form__group b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="name">Наименование Департамента Минздрава России
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input v-model="obj.department" :disabled="obj.roleId == 1" class="b-input__input-field" id="name" type="text" placeholder="Введите наименование Департамента Минздрава России" name="name"/>
									<i class="b-icon b-icon--check icon-check"></i><i class="b-icon b-icon--close icon-close"></i>
								</div>
							</div>
						</div>
						<div class="b-form__group b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="fio">ФИО пользователя
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input v-model="obj.name" class="b-input__input-field" id="fio" type="text" placeholder="Введите ФИО пользователя" name="fio"/>
									<i class="b-icon b-icon--check icon-check"></i><i class="b-icon b-icon--close icon-close"></i>
								</div>
							</div>
						</div>
						<div class="b-form__group b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="email-developer">Логин
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input v-model="obj.email" class="b-input__input-field" id="email-developer" type="email" placeholder="Введите e-mail пользователя" name="email-developer"/>
									<i class="b-icon b-icon--check icon-check"></i><i class="b-icon b-icon--close icon-close"></i>
								</div>
							</div>
						</div>
						<!-- <div class="b-form__group b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="pass">Пароль
								</label>
							</div>
							<div class="b-form__right b-form__right--flex">
								<a style="text-transform:none" class="b-link b-link--increased" href="javascript:void(0);" title="Отправить ссылку для создания пароля">Отправить ссылку для создания пароля</a>
							</div>
						</div> -->
					</div>
					<div class="b-form__group b-form__group--button">
						<button @click="save(obj)" class="b-button b-button--fill b-button--full">Добавить пользователя</button>

						<router-link class="b-button b-button--empty b-button--full" :to="$route.query.mz ? '/listUserForMZ' : '/listUser'" title="Отменить">Отменить</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import iconAngleDownSvg from "../../assets/icons/svg/angle-down.svg"
import iconAngleleftSvg from "../../assets/icons/svg/angle-left.svg"
import {mapActions} from 'vuex'

export default {
	components: {
		iconAngleleftSvg,
		iconAngleDownSvg
	},
	name: 'icn',
	data: () => ({
		disabledInpRole: false,
		obj: {
			email: "",
			roleId: null,
			name: "",
			department: "",
			companyId: null
		},
		listRole: [],
		listCompanies: [],
	}),
	methods: {
		...mapActions({
			apiAll: 'api/apiAll'
		}),
		save(obj) {
			this.apiAll({type: 'post', url: `api/Users`, id: undefined, obj: obj})
			.then(res => {
				if(res.status == 201) {
					this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успешно', text: 'Пользователь успешно создан' })
					this.obj = { email: "", roleId: null, name: "", department: "", companyId: null }
					this.$router.push(`${this.$route.query.mz ? '/listUserForMZ' : '/listUser'}`)
				} else {
					this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Произошла ошибка при создании пользователя' })
				}
			})
			.catch(error => {
				if(error) {
					if(error.status == 409){
						this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка при создании', text: 'Пользователь с данным email уже существует в Системе' })
					} else {
						this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка при создании', text: 'Заполните все поля...' })
					}
				}
			})
		}
	},
	created() {
		if(this.$route.query.mz) {
			this.disabledInpRole = true
			this.obj.roleId = 1
		}
		this.apiAll({type: 'get', url: `api/Roles`, id: undefined}).then(res => { this.listRole = res.data })
		this.apiAll({type: 'get', url: `api/Companies`, id: undefined}).then(res => {
			this.listCompanies = res.data
			this.listCompanies.sort(function (a, b) {
			  if (a.name > b.name) return 1
			  if (a.name < b.name) return -1
			  return 0
			});
		})
	}
}
</script>

<style>
@import '../../style/stylePages.css';

.b-select__select-field[disabled] {
    color: black!important;
	cursor: not-allowed;
}

.vs__dropdown-toggle {
	border-radius: 0;
	border: 1px solid #e5e5eb;
}

.vs__actions {
	display: none;
}
</style>
