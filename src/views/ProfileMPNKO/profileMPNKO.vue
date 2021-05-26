<template>
	<div class="b-page-wrapper">
		<div class="b-head-block">
			<div class="b-container">
				<div class="b-head-block__wrapper">
					<h1 class="b-title b-title--h1">Данные профиля
					</h1>
				</div>
			</div>
		</div>
		<div class="b-container">
			<div class="b-form b-form--profile-data bottom-padding" action="/">
				<div class="b-form__group">
					<!-- <div class="b-input">
						<input v-model="info.name" class="b-input__input-field" id="name" type="text" placeholder="Наименование разработчика" name="name"/>
					</div> -->
					<div class="b-select">
						<select disabled v-model="info.id" class="b-select__select-field" id="role" name="role">
							<option class="b-select__option" :value="null">МНПКО</option>
							<option v-for="(item, ind) in listCompanies" :key="ind" class="b-select__option" :value="item.id">{{item.name}}</option>
						</select>
						<div class="b-icon">
							<iconAngleDownSvg class="b-icon--down icon-angle-down" />
						</div>
					</div>
				</div>
				<div class="b-form__group">
					<div class="b-input">
						<input v-model="info.address" class="b-input__input-field" id="index" type="text" placeholder="Почтовый адрес" name="index"/>
					</div>
				</div>
				<div class="b-form__group">
					<div class="b-input">
						<input v-model="info.phone" class="b-input__input-field" id="tel" type="tel" placeholder="Контактный телефон" name="tel"/>
					</div>
				</div>
				<div class="b-form__group">
					<div class="b-input">
						<input v-model="info.email" class="b-input__input-field" id="email" type="email" placeholder="Адрес электронной почты" name="email"/>
					</div>
				</div>
				<div class="b-form__group b-form__group--button">
					<button @click="updateInfo(info)" class="b-button b-button--fill">Сохранить и отправить</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import iconAngleDownSvg from "../../assets/icons/svg/angle-down.svg"
import { mapActions, mapGetters } from "vuex";

export default {
	components: {iconAngleDownSvg},
	data: () => ({
		info: {},
		listCompanies: []
	}),
	computed: {
		...mapGetters({
			getUserInfo: 'auth/getUserInfo'
		})
	},
	methods: {
		...mapActions({
			apiAll: "api/apiAll"
		}),
		updateInfo(obj) {
			this.apiAll({type: 'put', url: `api/Companies/${obj.id}`, obj: {"name": this.listCompanies.find(f=> f.id == obj.id).name, "address": obj.address, "phone": obj.phone, "email": obj.email}, id: undefined})
			.then(res => {
				if(res.status == 200) {
					this.$notify({ group: 'foo', duration: 4000, type: 'success', title: 'Успешно', text: 'Данные успешно сохранены' })
				} else {
					this.$notify({ group: 'foo', duration: 4000, type: 'error', title: 'Ошибка', text: 'Произошла ошибка при сохранении' })
				}
			})
			.catch(error => {
				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Ошибка при сохранении' })
			})
		}
	},
	created() {
		this.apiAll({type: 'get', url: `api/Companies/UserCompany`, id: undefined}).then(res => { this.info = res.data })
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