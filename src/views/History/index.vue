<template>
	<div>
		<div class="b-head-block">
			<div class="b-container">
				<div class="b-head-block__wrapper">
					<h1 class="b-title b-title--h1">История изменения клинических рекомендаций
					</h1>
				</div>
			</div>
		</div>
		<div class="b-container">
			<div class="b-wrapper-page">
				<div :class="{'b-filter': true, open: open}">
					<button @click="open=!open" class="b-filter__button">
						<iconSvg v-if="!open" class="b-icon b-icon--filter icon-filter icon"/>
						<span v-if="!open">Фильтр записей</span>


						<iconCloseSvg v-if="open" class="b-icon b-icon--close icon-close icon"/>
						<span v-if="open">Скрыть</span>
					</button>
					<form class="b-filter__hidden" onsubmit="return false">
						<div class="b-filter__form">
							<div class="b-input b-input--dual b-input--dual b-input--clinical b-input--search input-group">
								<!-- Номер -->
								<div class="b-input b-input--dual b-input--dual b-input--clinical b-input--search">
									<input id="search-filter-numberCR" placeholder="Номер КР" v-model="filter.number" class="b-input__input-field b-input__input-field--dual b-input__input-field--dual b-input__input-field--clinical b-input__input-field--search" type="search" name="search-filter-name" />
									<iconSearchSvg class="b-icon b-icon--table-search"/>
									<label class="b-input__label" for="search-filter">Номер КР</label>
								</div>
								<!-- Автор изменения -->
								<div class="b-input b-input--dual b-input--dual b-input--clinical b-input--search">
									<input id="search-filter-author" placeholder="Автор изменения" v-model="filter.author" class="b-input__input-field b-input__input-field--dual b-input__input-field--dual b-input__input-field--clinical b-input__input-field--search" type="search" name="search-filter-name" />
									<iconSearchSvg class="b-icon b-icon--table-search"/>
									<label class="b-input__label" for="search-filter">Автор изменения</label>
								</div>
								<!-- Наименование КР -->
								<div class="b-input b-input--dual b-input--dual b-input--clinical b-input--search">
									<input id="search-filter-nameCR" placeholder="Наименование КР" v-model="filter.nameCR" class="b-input__input-field b-input__input-field--dual b-input__input-field--dual b-input__input-field--clinical b-input__input-field--search" type="search" name="search-filter-name" />
									<iconSearchSvg class="b-icon b-icon--table-search"/>
									<label class="b-input__label" for="search-filter">Наименование КР</label>
								</div>
							</div>
							<div class="select-group">
									<!-- Дата от -->
								<div class="b-input b-input--dual b-input--clinical">
									<input :max="toJSONLocal(dateTo ? dateTo : null)" id="dateFrom" type="date" name="name" v-model="dateFrom" placeholder="Дата от" class="date-from"/>
									<label class="b-input__label" for="id"></label>
								</div>
								<!-- Дата до -->
								<div class="b-input b-input--dual b-input--clinical">
									<input :min="toJSONLocal(dateFrom ? dateFrom : '1970-01-01')" :max="toJSONLocal()" id="dateTo" type="date" name="name" v-model="dateTo" placeholder="Дата до" class="date-from"/>
									<label class="b-input__label" for="id"></label>
								</div>

								<!-- Статус -->
								<div class="b-select b-select--dual b-select--clinical b-select--status">
									<v-select placeholder="Статус" :reduce="obj => obj.id" v-model="statuses" :options="statusesList" label="name">
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching"> Поиск не дал результатов <em>{{ search }}</em>.</template>
										</template>
									</v-select>
								</div>

								<!-- <button @click="searchFunc" class="b-button b-button--fill b-button--filter-search">
									<iconSearchSvg v-if="media=='desktop'" class="iconSearch" style="fill:white"/>
									<span v-if="media=='mobile'">Поиск</span>
								</button> -->
							</div>

							<button @click="searchFunc" class="b-button b-button--fill">
								<span>Поиск</span>
							</button>
							<button @click="reset" class="ml-2 b-button b-button--cancel">
								<span>Сбросить фильтр</span>
							</button>
						</div>
					</form>
				</div>

				<div class="b-table-list b-table-list--summary">
					<div class="b-table-list__top">
						<div class="b-table-list__left">
							<div class="b-table-list__all">
								Всего записей:<span>{{allStroke}}</span>
							</div>
						</div>
						<div class="b-table-list__right">
							<a @click="downloadReports" class="b-link b-link--report" href="javascript:void(0);" title="">
								<iconDownloadSvg class="b-icon b-icon--report icon-download"/>
								<span class="mobile">Отчет</span>
								<span style="text-transform:none" class="desktop">Получить отчет</span>
							</a>
						</div>
					</div>
					<div class="b-table-list__table">
						<div style="position:relative;min-height:300px;" class="b-table-list__scroll b-table-list__scroll--table js-horizontal-scroll">

							<div v-if="isLoading" class="ring-load">
								<RingLoader class="ring-load-loading" color="#04092a" :size="160"/>
							</div>
							<table>
								<thead>
									<tr>
										<th v-for="item in columns" :style="item.nameEng == 'statusId' ? 'text-align:center' : ''" onselectstart="return false" onmousedown="return false">
											<span @click="sortFunc(item)" style="cursor:pointer">{{item.name}}</span>

											<div v-show="checkColumn == item.nameEng" class="b-table-list__arrow">
												<button v-if="item.sort" class="b-table-list__top-button">
													<iconSortupSvg class="b-icon b-icon--table-button icon-sort-up"/>
												</button>
												<button v-else class="b-table-list__bottom-button">
													<iconSortdownSvg class="b-icon b-icon--table-button icon-sort-up"/>
												</button>
											</div>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="row in list">
										<td style="width:10%">
											{{row.modifiedOn ? new Date(row.modifiedOn).toLocaleString() : ''}}
										</td>
										<td style="width:15%">
											{{row.changeAuthor ? `${row.changeAuthor.name}${row.changeAuthor.role ? ', '+row.changeAuthor.role.name : ''}` : '&mdash;'}}
										</td>
										<td style="width:10%">
											{{row.number}}
										</td>
										<td style="width:10%">
											{{row.stage ? row.stage.name : '&mdash;'}}
										</td>
										<td style="text-align:center;width:10%">
											{{row.status ? row.status.name : '&mdash;'}}
										</td>
										<td style="width:15%">
											{{row.name}}
										</td>
									</tr>
								</tbody>
							</table>

							<center v-if="list.length == 0 && !isLoading" style="text-align:center">
								<p>Данных нет...</p>
							</center>
						</div>
					</div>
				</div>
				<div v-if="!isLoading" class="b-wrapper-page__bottom">
					<div class="b-pagination">
						<ul class="b-pagination__list">
							<li class="b-pagination__item-prev">
								<a @click="prevPage()" :class="{'b-button': true, 'b-button--slider': true, 'b-button--disabled':pageNumber==0 }" href="javascript:void(0);" title="">
										<iconAngleleftSvg class="b-icon icon-angle-left"/>
								</a>
							</li>

								<li class="b-pagination__item">
										<span>{{resultCount > 0 ? pageNumber+1 : 0}} из {{resultCount}} стр</span>
								</li>

							<li class="b-pagination__item-next">
									<a @click="nextPage()" :class="{'b-button': true, 'b-button--slider': true, 'b-button--disabled':pageNumber >= resultCount-1 }" href="javascript:void(0);" title="">
										<iconAnglerightSvg class="b-icon icon-angle-left"/>
										</a>
							</li>
						</ul>
					</div>
					<div class="b-number-page">
						<div class="b-number-page__text">
							Показать кол-во строк
							<span></span>
						</div>
						<div class="b-number-page__text">
							<select @change="updateListEvent(size)" style="width:40px" v-model="size">
								<option :value="5">5</option>
								<option :value="10">10</option>
								<option :value="20">20</option>
								<option :value="30">30</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import iconSvg from "../../assets/icons/svg/filter.svg"
import iconCloseSvg from "../../assets/icons/svg/close.svg"
import iconSearchSvg from "../../assets/icons/svg/search.svg"
import iconAngleleftSvg from "../../assets/icons/svg/angle-left.svg"
import iconAnglerightSvg from "../../assets/icons/svg/angle-right.svg"
import iconDownloadSvg from "../../assets/icons/svg/download.svg"
import iconSortdownSvg from "../../assets/icons/svg/sort-down.svg"
import iconSortupSvg from "../../assets/icons/svg/sort-up.svg"
import orderBy from 'lodash.orderby'
import { RingLoader } from '@saeris/vue-spinners'

import {mapGetters, mapActions} from 'vuex'

export default {
	name: 'listCr',
	components: { RingLoader, iconSvg, iconSearchSvg, iconCloseSvg, iconDownloadSvg, iconSortdownSvg, iconSortupSvg, iconAngleleftSvg, iconAnglerightSvg },
	computed: {
		...mapGetters({
			media: 'layout/getMedia',
			getUserInfo: 'auth/getUserInfo',
			apiUrl: 'apiUrl'
		}),
	},
	data: () => ({
		isLoading: true,
		isSearch: true,
		allStroke: 0,
		clickFilter: 0,
		open: false,
		checkColumn: 'number',
		filter: {
			number: '',
			author: '',
			nameCR: ''
		},
		columns: [
			{name: 'Дата изменения', sort: false, nameEng: 'changeDate', click: false},
			{name: 'Автор изменения, роль', sort: false, nameEng: 'author', click: false},
			{name: 'Номер КР', sort: false, nameEng: 'number', click: true},
			{name: 'Стадия КР', sort: false, nameEng: 'stageName', click: false},
			{name: 'Статус КР', sort: false, nameEng: 'statusName', click: false},
			{name: 'Наименование КР', sort: false, nameEng: 'name', click: false}
		],
		list: [],
		listFreeze: [],
		pageNumber: 0,
		statuses: null,
		dateFrom: null,
		dateTo: null,
		size: 5,
		resultCount: 0,
		mkbList: [],

		statusesList: [],
	}),
	methods: {
		...mapActions({
			apiAll: 'api/apiAll'
		}),
		sortFunc(e) {
			//очищаем всем флаг сортировки
			this.columns.forEach(el => el.click = false)

			this.isLoading = true
			e.sort = !e.sort
			e.click = true
			this.checkColumn = e.nameEng
			
			this.apiMethods(
				{ columnName: e.nameEng, orderOperation: e.sort ? 'asc' : 'desc' }, 
				{ offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true }
			)
		},
		pageCount(count){
			this.resultCount = Math.ceil(count/this.size)
		},
		nextPage(){
			this.pageNumber++;
			

			let columnsItem = this.columns.find(f => f.click);
			this.apiMethods(
				{ columnName: columnsItem.name, orderOperation: columnsItem.sort ? 'asc' : 'desc' }, 
				{ offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true }
			)
		},
		prevPage(){
			this.pageNumber--;

			let columnsItem = this.columns.find(f => f.click);
			this.apiMethods(
				{ columnName: columnsItem.name, orderOperation: columnsItem.sort ? 'asc' : 'desc' }, 
				{ offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true }
			)
		},
		apiMethods(orderByColumn, OffSetFetch) {
			this.isLoading = true
			this.apiAll({type: 'post', url: `api/ProjectHistory`, obj: {
				startChangeDate: this.dateFrom ? this.dateFrom : undefined,
				endChangeDate: this.dateTo ? this.dateTo : undefined,
				changeAuthor: this.filter.author ? this.filter.author : undefined,
				number: this.filter.number ? this.filter.number : undefined,
				name: this.filter.nameCR ? this.filter.nameCR : undefined,
				statusId: this.statuses ? this.statuses : undefined,
				orderByColumn: orderByColumn && orderByColumn.columnName ? orderByColumn : undefined,
				OffSetFetch: OffSetFetch ? OffSetFetch : undefined
			}, id: undefined})
			.then(res => {
				this.isLoading = false

				this.allStroke = res.headers[`${this.isSearch ? 'x-filtertotal-count' : 'x-total-count'}`]
				this.pageCount(+res.headers[`${this.isSearch ? 'x-filtertotal-count' : 'x-total-count'}`])

				this.list = res.data
			})
		},
		downloadReports() {
			this.api.post(`${this.apiUrl}api/ProjectHistory/Report`, {
				startChangeDate: this.dateFrom ? this.dateFrom : undefined,
				endChangeDate: this.dateTo ? this.dateTo : undefined,
				changeAuthor: this.filter.author ? this.filter.author : undefined,
				number: this.filter.number ? this.filter.number : undefined,
				name: this.filter.nameCR ? this.filter.nameCR : undefined,
				statusId: this.statuses ? this.statuses : undefined,
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
		toJSONLocal(date) {
			let local = date ? new Date(date) : new Date();
			local.setMinutes((date ? new Date(date) : new Date()).getMinutes() - (date ? new Date(date) : new Date()).getTimezoneOffset());

			return local.toJSON().slice(0, 10);
		},
		searchFunc() {
			this.isLoading = true
			this.isSearch = true

			let columnsItem = this.columns.find(f => f.click);
			this.apiMethods(
				{ columnName: columnsItem.name, orderOperation: columnsItem.sort ? 'asc' : 'desc' }, 
				{ offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true }
			)
		},
		updateListEvent() {
			this.pageNumber = 0

			let columnsItem = this.columns.find(f => f.click);
			this.apiMethods(
				{ columnName: columnsItem.name, orderOperation: columnsItem.sort ? 'asc' : 'desc' }, 
				{ offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true },
				this.clickFilter !== 0 ? this.clickFilter : null
			)
		},
		reset() {
			this.isLoading = true
			this.isSearch = false

			this.dateFrom = null
			this.dateTo = null
			this.filter = { number: '', author: '', nameCR: '' }
			this.statuses = null

			this.apiMethods(null, { offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true }, null)
		}
	},
	created() {
		this.apiMethods(null, {offsetRowCount: 0, fetchRowCount:this.size, use: true})
		this.apiAll({type: 'get', url: `api/Statuses`, id: undefined}).then(res => { this.statusesList = res.data })
	}
}
</script>

<style>
@import "../../style/stylePages.css";
@import "../../views/ListCr/style/mobile.css";

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
    top: 42%;
}

table tbody tr:hover {
	background: #f1f1f1;
	box-shadow: 0 1.5px 6px #00000080;
	cursor: pointer;
}

</style>