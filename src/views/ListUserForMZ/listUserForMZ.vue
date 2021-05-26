<template>
	<div class="b-page-wrapper administrator">
		<div class="b-head-block">
			<div class="b-container">
				<div class="b-head-block__wrapper">
					<h1 class="b-title b-title--h1">Пользователи МНПКО
					</h1>
				</div>
			</div>
		</div>
		<div class="b-container">
			<div class="b-wrapper-page b-wrapper-page--users-mpnko">
				<!-- ФИЛЬТР ПОИСКА -->
				<div :class="{'b-filter': true, open: open}">
					<button @click="open=!open" class="b-filter__button">
						<iconSvg v-if="!open" class="b-icon b-icon--filter icon-filter icon"/>
						<span v-if="!open" class="open">Фильтр записей</span>
						<i v-if="open" class="b-icon b-icon--filter-close icon-close"></i>
						<span v-if="open" class="close">Скрыть</span>
					</button>
					<form class="b-filter__hidden" action="javascript:void(0);">
						<div class="b-filter__form">
							<div class="b-input b-input--dual b-input--dual b-input--clinical b-input--search input-group">
								<div class="b-input b-input--dual b-input--dual b-input--clinical b-input--search b-input--users-mpnko">
									<input v-model="search.MPNKO" class="b-input__input-field b-input__input-field--dual b-input__input-field--dual b-input__input-field--clinical b-input__input-field--search b-input__input-field--users-mpnko" id="search-filter" type="search" placeholder="Поиск по МПНКО" name="search-filter-name"/>
									<iconSearchSvg class="iconSearch"/>
									<label class="b-input__label" for="search-filter">Поиск по МПНКО</label>
								</div>
								<div class="b-input b-input--dual b-input--dual b-input--clinical b-input--search b-input--fio">
									<input v-model="search.fio" class="b-input__input-field b-input__input-field--dual b-input__input-field--dual b-input__input-field--clinical b-input__input-field--search b-input__input-field--users-mpnko" id="search-filter" type="search" placeholder="Поиск по ФИО" name="search-filter-name"/>
									<iconSearchSvg class="iconSearch"/>
									<label class="b-input__label" for="search-filter">Поиск по ФИО</label>
								</div>
								<div class="b-input b-input--dual b-input--dual b-input--clinical b-input--search b-input--fio">
									<input v-model="search.login" class="b-input__input-field b-input__input-field--dual b-input__input-field--dual b-input__input-field--clinical b-input__input-field--search b-input__input-field--users-mpnko" id="search-filter" type="search" placeholder="Поиск по логину" name="search-filter-name"/>
									<iconSearchSvg class="iconSearch"/>
									<label class="b-input__label" for="search-filter">Поиск по логин</label>
								</div>
							</div>
						</div>
						<button style="margin-bottom:24px;padding-top:16px;" @click="apiMethods(search)" class="b-button b-button--fill mb-2">Применить</button>
					</form>
				</div>
				<div class="b-table-list b-table-list--users b-table-list--administrator">
					<div class="b-table-list__top">

						<!-- ДЛЯ ВЕРСИИ ДЕСКТОПА -->
						<div class="b-table-list__desktop">
							<div class="b-table-list__wrapper-top">
								<div class="b-table-list__left">
									<div class="b-table-list__all">Всего записей:<span>{{listUsers.length}}</span>
									</div>
									<router-link :to="{path: 'addUser', query: {mz: true}}">
										<button class="b-button b-button--new-user b-button--empty b-button--full">
											<iconPlusSvg class="b-icon b-icon--plus icon-plus" />
											Добавить пользователя
										</button>
									</router-link>
								</div>
								<div class="b-table-list__right">
									<a @click="downloadReports" class="b-link b-link--report-mpnlo" href="javascript:void(0);" title="">
										<iconDownloadSvg class="b-icon b-icon--report icon-download"/>
										<span class="mobile">Получить отчет</span>
									</a>
								</div>
							</div>
						</div>

						<!-- ДЛЯ ВЕРСИИ ТЕЛЕФОНА -->
						<div class="b-table-list__mobile">
							<router-link to="/addUser">
								<button class="b-button b-button--new-user b-button--empty b-button--full">
									<iconPlusSvg class="b-icon b-icon--plus icon-plus" />
									Добавить пользователя
								</button>
							</router-link>
							<div class="b-table-list__wrapper-top">
								<div class="b-table-list__left">
									<div class="b-table-list__all">Всего записей:<span>{{listUsers.length}}</span>
									</div>
								</div>
								<div class="b-table-list__right">
									<a class="b-link b-link--report-mpnlo" href="javascript:void(0);" title="">
									<iconDownloadSvg class="b-icon b-icon--report icon-download"/>
										<span class="mobile">Отчет</span>
									</a>
								</div>
							</div>
						</div>

					</div>
					<div class="b-table-list__table">
						<div style="position:relative;min-height:300px;" class="b-table-list__scroll--table js-horizontal-scroll">

							<div v-if="isLoading" class="ring-load">
								<RingLoader class="ring-load-loading" color="#04092a" :size="160"/>
							</div>
							<table class="b-table-list__table b-table-list__table--scroll-width">
								<thead>
									<tr>
										<th></th>
										<th onselectstart="return false" onmousedown="return false" v-for="(item, ind) in columns" :style="ind == 3 ? 'padding-right:0!important' : ''">
											<span @click="item.view ? sortFunc(item) : ''" :style="item.view ? 'cursor:pointer' : ''">{{item.name}}</span>

											<div v-show="checkColumn == item.nameEng && item.view" class="b-table-list__arrow">
												<button v-if="item.sort" class="b-table-list__top-button">
													<iconSortupSvg class="b-icon b-icon--table-button icon-sort-up"/>
												</button>
												<button v-else class="b-table-list__bottom-button">
													<iconSortdownSvg class="b-icon b-icon--table-button icon-sort-up"/>
												</button>
											</div>
										</th>
										<!-- <th>Действия</th> -->
									</tr>
								</thead>
								<tbody>
									<tr v-for="(row, index) in listUsers">
										<td>
											<div @click="editRow(row)" class="b-table-list__employee">
												<iconEditSvg class="b-icon b-icon--edit icon-edit pointer" />
											</div>
										</td>
										<td>
											Сотрудник {{row.role ? row.role.name : '---'}}
										</td>
										<td>
											{{row.companyName}}
										</td>
										<td>{{row.name}}</td>
										<td>{{row.login}}</td>
										<!-- <td style="padding-left:0">
											<a class="b-table-list__key mr-2">
												<admin-button :order="0" scrollSearch="#keyIcon" :index="index" :id="row.id" action="resetPassword" text="Отправить ссылку для создания пароля?">
													<template slot="icons">
														<key id="keyIcon"/>
													</template>
												</admin-button>
											</a>
										</td> -->
									</tr>
								</tbody>
							</table>

							<center v-if="listUsers.length == 0 && !isLoading" style="text-align:center">
								<p>Данных нет...</p>
							</center>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import key from '../../assets/icons/svg/key.svg?inline'

import iconSvg from "../../assets/icons/svg/filter.svg"
import iconSearchSvg from "../../assets/icons/svg/search.svg"
import iconDownloadSvg from "../../assets/icons/svg/download.svg"
import iconSortdownSvg from "../../assets/icons/svg/sort-down.svg"
import iconSortupSvg from "../../assets/icons/svg/sort-up.svg"
import iconPlusSvg from "../../assets/icons/svg/plus.svg"
import iconEditSvg from "../../assets/icons/svg/edit.svg"
import iconLockSvg from "../../assets/icons/svg/lock.svg"
// import iconKeySvg from "../../assets/icons/svg/key.svg"
import iconCloseSvg from "../../assets/icons/svg/close.svg"

import adminButton from '../../components/AdminButon/index'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import { RingLoader } from '@saeris/vue-spinners'

export default {
	components: { RingLoader, adminButton, iconCloseSvg, iconSvg, iconSearchSvg, iconDownloadSvg, iconSortdownSvg, iconSortupSvg, iconPlusSvg, iconEditSvg, iconLockSvg, key},
	name: 'icn',
	computed: {
		...mapGetters({
			media: 'layout/getMedia',
			getUserInfo: 'auth/getUserInfo',
			listUsers: 'lu/getListUsersMZ',
			apiUrl: 'apiUrl'
		})
	},
	data: () => ({
		isLoading: true,
		search: {
			MPNKO: '',
			fio: '',
			login: ''
		},
		open: false,
		open1: false,
		checkColumn: 'name',
		columns: [
			{name: 'Роль', view: false, sort: false, nameEng: 'department'},
			{name: 'МНПКО', view: true, sort: false, nameEng: 'companyName'},
			{name: 'ФИО', view: true, sort: false, nameEng: 'name'},
			{name: 'Логин', view: true, sort: false, nameEng: 'login'}
		],
	}),
	methods: {
		...mapActions({
			getUserMZ: 'lu/getUserMZ'
		}),
		...mapMutations({
			sortMutationMZ: 'lu/sortMutationMZ'
		}),
		sortFunc(e) {
			e.sort = !e.sort
			this.checkColumn = e.nameEng
			this.sortMutationMZ({column: e.nameEng, sort: e.sort ? 'asc' : 'desc'})
		},
		editRow(row) {
			this.$router.push({path: `/editUser/${row.id}`, query: { mz: 'true' }})
		},
		downloadReports() {
			this.api.post(`${this.apiUrl}api/Users/Report`, {
				roleId:1,
				companyName: this.search.MPNKO?this.search.MPNKO:undefined,
				name: this.search.fio?this.search.fio:undefined,
				email: this.search.login?this.search.login:undefined
			}, { responseType: 'blob' })
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'Отчет.xlsx');
				document.body.appendChild(link);
				link.click();
			})
			.catch((error) => console.log(error))
		},
		apiMethods(search) {
			this.isLoading = true
			this.getUserMZ(search)
			.then(res => {
				if(res.status == 200) this.isLoading = false
			})
		}
	},
	created() {
		setTimeout(() => { this.sortMutationMZ({column: 'name', sort: 'desc'}) }, 100)
		this.apiMethods(this.search)
	}
}
</script>

<style>
@import '../../style/stylePages.css';

.ring-load {
	position: absolute;
	cursor: progress;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/* opacity: 0.4; */
	z-index: 10;
	background-color: rgba(88, 88, 88, 0.2);
}

.ring-load-loading {
	left: 42%;
    top: 25%;
}

table tbody tr:hover {
	background: #f1f1f1;
	box-shadow: 0 1.5px 6px #00000080;
}
tr td {
	text-align: center!important;
}
tr th {
	text-align: center!important;
}

.pointer {
	cursor: pointer;
}
</style>