<template>
	<div>
		<div class="b-head-block">
			<div class="b-container">
				<div class="b-head-block__wrapper">
					<h1 class="b-title b-title--h1">Клинические рекомендации
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
								<div v-for="item in filter" class="b-input b-input--dual b-input--dual b-input--clinical b-input--search">
										<input :id="`search-filter${item.id}`" :placeholder="item.name" v-model="item.value" class="b-input__input-field b-input__input-field--dual b-input__input-field--dual b-input__input-field--clinical b-input__input-field--search" type="search" name="search-filter-name" />
										<iconSearchSvg class="b-icon b-icon--table-search"/>
										<label class="b-input__label" for="search-filter">{{item.name}}</label>
								</div>
								<!-- Разработчик -->
								<div class="b-select b-select--dual b-select--clinical b-select--type">
										<v-select placeholder="Разработчик" :reduce="obj => obj.id" :closeOnSelect="false" :clearable="false" multiple v-model="searchResultDev" :options="сompaniesList" label="name">
												<template v-slot:no-options="{ search, searching }">
														<template v-if="searching"> Поиск не дал результатов <em>{{ search }}</em>.</template>
												</template>
										</v-select>
								</div>
								<!-- Заболевание -->
								<div class="b-select b-select--dual b-select--clinical b-select--type">
										<v-select placeholder="Заболевание" :filterable="false" @open="onOpen" @close="onClose" @search="query => search = query" :clearable="false" :closeOnSelect="false" multiple v-model="searchResult" :options="paginated" label="name">
												<template v-slot:no-options="{ search, searching }">
														<template v-if="searching">
																Поиск не дал результатов <em>{{ search }}</em>.
														</template>
												</template>

														<template #list-footer>
																<li ref="load" class="loader" v-show="hasNextPage">
																		Список прогружается...
																</li>
														</template>
										</v-select>
								</div>
								<!-- Код МКБ-10 -->
								<div class="b-select b-select--dual b-select--clinical b-select--type">
										<v-select placeholder="Код МКБ-10" :filterable="false" @open="onOpenMkb" @close="onCloseMkb" @search="query => searchMkb = query" :closeOnSelect="false" :clearable="false" multiple v-model="searchResultMkb" :options="paginatedMkb" label="code">
												<template v-slot:no-options="{ search, searching }">
														<template v-if="searching"> Поиск не дал результатов <em>{{ search }}</em>.</template>
												</template>
												<template #list-footer>
																<li ref="load" class="loader" v-show="hasNextPage">
																		Список прогружается...
																</li>
														</template>
										</v-select>
								</div>
								<!-- Решение НПС -->
								<div class="b-select b-select--dual b-select--clinical b-select--type">
										<v-select placeholder="Решение НПС" :reduce="obj => obj.id" :closeOnSelect="false" :clearable="false" multiple v-model="searchResultNpc" :options="npcList" label="name">
												<template v-slot:no-options="{ search, searching }">
														<template v-if="searching"> Поиск не дал результатов <em>{{ search }}</em>.</template>
												</template>
										</v-select>
								</div>
							</div>
							<div class="select-group">
									<!-- Дата от -->
								<div class="b-input b-input--dual b-input--clinical b-input--filter-date">
									<input :max="toJSONLocal(dateTo ? dateTo : null)" id="dateFrom" type="date" name="name" v-model="dateFrom" placeholder="От" class="date-from"/>
									<label class="b-input__label" for="id"></label>
								</div>
								<!-- Дата до -->
								<div class="b-input b-input--dual b-input--clinical b-input--filter-date">
									<input :min="toJSONLocal(dateFrom ? dateFrom : '1970-01-01')" :max="toJSONLocal()" id="dateTo" type="date" name="name" v-model="dateTo" placeholder="До" class="date-from"/>
									<label class="b-input__label" for="id"></label>
								</div>

								<!-- Статус -->
								<div class="b-select b-select--dual b-select--clinical b-select--status">
										<v-select placeholder="Статус" :reduce="obj => obj.id" :closeOnSelect="false" :clearable="false" multiple v-model="statuses" :options="statusesList" label="name">
												<template v-slot:no-options="{ search, searching }">
														<template v-if="searching"> Поиск не дал результатов <em>{{ search }}</em>.</template>
												</template>
										</v-select>
								</div>
								<!-- Связь с Перечнем -->
								<div class="b-select b-select--dual b-select--clinical b-select--type">
										<v-select placeholder="Связь с Перечнем" :reduce="obj => obj.id" :closeOnSelect="false" :clearable="false" multiple v-model="serviceTypes" :options="serviceTypesList" label="name">
												<template v-slot:no-options="{ search, searching }">
														<template v-if="searching"> Поиск не дал результатов <em>{{ search }}</em>.</template>
												</template>
										</v-select>
								</div>
								<!-- Возрастная группа -->
								<div class="b-select b-select--dual b-select--clinical b-select--age">
									<v-select placeholder="Возрастная группа" :reduce="obj => obj.id" :closeOnSelect="false" :clearable="false" multiple v-model="ageGroups" :options="ageGroupsList" label="name">
												<template v-slot:no-options="{ search, searching }">
														<template v-if="searching"> Поиск не дал результатов <em>{{ search }}</em>.</template>
												</template>
										</v-select>
								</div>
							</div>
							<button @click="searchFunc()" class="b-button b-button--fill">
								<span>Поиск</span>
							</button>
							<button @click="reset()" class="ml-2 b-button b-button--cancel">
								<span>Сбросить фильтр</span>
							</button>
						</div>
					</form>
				</div>

				<div class="b-table-list b-table-list--summary">
					<div class="b-table-list__top">
						<div class="b-table-list__left">
							<div class="b-table-list__all">Всего записей:<span>{{allStroke}}</span>
							</div>
							<div class="b-table-list__scroll b-table-list__scroll--filter js-horizontal-scroll">
								<ul class="b-table-list__list-record">
									<li class="b-table-list__item-record"><a @click="filterStage(0)" :class="{'b-link':true,'b-link--record':true, 'active':clickFilter==0}" href="javascript:void(0);" title="Все">Все</a></li>
									<li class="b-table-list__item-record"><a @click="filterStage(1)" :class="{'b-link':true,'b-link--record':true, 'active':clickFilter==1}" href="javascript:void(0);" title="Уведомления">Уведомления</a></li>
									<li class="b-table-list__item-record"><a @click="filterStage(2)" :class="{'b-link':true,'b-link--record':true, 'active':clickFilter==2}" href="javascript:void(0);" title="Заявления">Заявления</a></li>
									<li class="b-table-list__item-record"><a @click="filterStage(3)" :class="{'b-link':true,'b-link--record':true, 'active':clickFilter==3}" href="javascript:void(0);" title="Заявления">Направления</a></li>
									<li class="b-table-list__item-record"><a @click="filterStage(4)" :class="{'b-link':true,'b-link--record':true, 'active':clickFilter==4}" href="javascript:void(0);" title="Заявления">Заключения</a></li>
									<li class="b-table-list__item-record"><a @click="filterStage(5)" :class="{'b-link':true,'b-link--record':true, 'active':clickFilter==5}" href="javascript:void(0);" title="Решения">Решения</a></li>
									<li class="b-table-list__item-record"><a @click="filterStage(6)" :class="{'b-link':true,'b-link--record':true, 'active':clickFilter==6}" href="javascript:void(0);" title="Решения">КР</a></li>
								</ul>
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
										<th style="width:100px"></th>
										<th onselectstart="return false" onmousedown="return false" v-for="(item) in columns">
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
									<tr v-for="row in list" @click="nextPageEV(getUserInfo.role.id,row.status.id,row.stage.id, row.id)">
										<td style="width:100px">
											<div class="new-tag" v-if="row.newFlag">Новая</div>
										</td>
										<td>
											<a href="javascript:void(0);" title>{{row.stage ? row.stage.name : ''}} №{{row.number ? row.number : ''}}</a>
											<time>{{row.date ? new Date(row.date).toLocaleDateString() : ''}}</time>
										</td>
										<td>{{row.serviceType ? row.serviceType.name : '&mdash;'}}</td>
										<td>
											{{row.mkb ? row.mkb.name : ''}} {{`${row.ageGroups.length !== 0 ? '('+Array.prototype.map.call(row.ageGroups, function(item) { return item.name; }).join(", ") +')' : ''}`}}
										</td>
										<td>
											<ul style="padding: 0">
												<li v-for="item in row.mkbCodes">
													<b>{{item.code}}</b> &mdash; {{item.name}}
												</li>
											</ul>
										</td>
										<td>
											<span>
												{{row.developer ? row.developer.name : '&mdash;'}}
											</span>
										</td>
										<td>
											<span>{{row.status ? row.status.name : ''}}</span>
										</td>
										<td>
											{{row.npsDecision ? row.npsDecision.name : '&mdash;'}}
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
						<!-- <div class="b-number-page__text">
							из<span>{{allStroke}}</span>
							
						</div> -->
						<div class="b-number-page__text">
							<select @change="updateListEvent()" style="width:40px" v-model="size">
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
import iconAngleDownSvg from "../../assets/icons/svg/angle-down.svg"
import iconAngleleftSvg from "../../assets/icons/svg/angle-left.svg"
import iconAnglerightSvg from "../../assets/icons/svg/angle-right.svg"
import iconDownloadSvg from "../../assets/icons/svg/download.svg"
import iconSortdownSvg from "../../assets/icons/svg/sort-down.svg"
import iconSortupSvg from "../../assets/icons/svg/sort-up.svg"
import iconEditSvg from "../../assets/icons/svg/edit.svg"
import iconEyeSvg from "../../assets/icons/svg/eye.svg"
import orderBy from 'lodash.orderby'
import { RingLoader } from '@saeris/vue-spinners'

import Dropdown from '../../components/Dropdown/index'
import {mapGetters, mapActions} from 'vuex'

export default {
	name: 'listCr',
	components: { RingLoader, Dropdown, iconEditSvg, iconEyeSvg, iconSvg, iconSearchSvg, iconAngleDownSvg, iconCloseSvg, iconDownloadSvg, iconSortdownSvg, iconSortupSvg, iconAngleleftSvg, iconAnglerightSvg },
	computed: {
			...mapGetters({
				media: 'layout/getMedia',
				getUserInfo: 'auth/getUserInfo',
				apiUrl: 'apiUrl'
			}),
			filtered () {
					return this.mkbList.filter(f => f.name.includes(this.search));
			},
			paginated () {
					return this.filtered.slice(0, this.limit);
			},
			hasNextPage () {
					return this.paginated.length < this.filtered.length;
			},

			filteredMkb () {
					return this.mkbList.filter(f => f.code.includes(this.searchMkb.toUpperCase()))
			},
			paginatedMkb () {
					return this.filteredMkb.slice(0, this.limitMkb);
			},
			hasNextPageMkb () {
					return this.paginatedMkb.length < this.filteredMkb.length;
			},
	},
	data: () => ({
		isSearch: false,
		isLoading: true,
		allStroke: 0,
		clickFilter: 0,
		open: false,
		checkColumn: 'number',
		filter: [
				{name: 'Номер', value: null, id: 'number'},
				// {name: 'Заболевание', value: null, id: 'zab'},
				// {name: 'Kод МКБ-10', value: null, id: 'code'},
				// {name: 'Решение НПС', value: null, id: 'npc'},
				// {name: 'Разработчик', value: null, id: 'dev'},
		],
		options: ['1','2','3'],
		columns: [
			{name: 'Стадия, номер и дата', sort: false, nameEng: 'number', click: true},
			{name: 'Связь с Перечнем', sort: false, nameEng: 'serviceTypeName', click: false},
			{name: 'Заболевание и возрастная группа', sort: false, nameEng: 'mkbName', click: false},
			{name: 'МКБ-10', sort: false, nameEng: 'mkbCode', click: false},
			{name: 'Разработчик', sort: false, nameEng: 'developerName', click: false},
			{name: 'Статус', sort: false, nameEng: 'statusName', click: false},
			{name: 'Решение НПС', sort: false, nameEng: 'npsDecisionName', click: false}
		],
		list: [],
		pageNumber: 0,
		npcList: [],
		сompaniesList: [],
		serviceTypes: [],
		ageGroups: [],
		statuses: [],
		dateFrom: null,
		dateTo: null,
		size: 5,
		resultCount: 0,
		mkbList: [],
		//поиск по названию
		observer: null,
		limit: 10,
		search: '',
		searchResult: [],
		//поиск по мкб названию
		observerMkb: null,
		limitMkb: 10,
		searchMkb: '',
		searchResultMkb: [],
		searchResultDev: [],
		searchResultNpc: [],
		serviceTypesList: [],
		ageGroupsList: [],
		statusesList: []
	}),
	methods: {
		...mapActions({
			apiAll: 'api/apiAll'
		}),
		async onOpen () {
				if (this.hasNextPage) {
						await this.$nextTick();
						this.observer.observe(this.$refs.load)
				}
		},
		onClose () {
				this.observer.disconnect();
		},
		async infiniteScroll ([{isIntersecting, target}]) {
				if (isIntersecting) {
						const ul = target.offsetParent;
						const scrollTop = target.offsetParent.scrollTop;
						this.limit += 10;
						await this.$nextTick();
						ul.scrollTop = scrollTop;
				}
		},
		async onOpenMkb () {
				if (this.hasNextPageMkb) {
						await this.$nextTick();
						this.observerMkb.observe(this.$refs.load)
				}
		},
		onCloseMkb () {
				this.observerMkb.disconnect();
		},
		async infiniteScrollMkb ([{isIntersecting, target}]) {
				if (isIntersecting) {
						const ul = target.offsetParent;
						const scrollTop = target.offsetParent.scrollTop;
						this.limitMkb += 10;
						await this.$nextTick();
						ul.scrollTop = scrollTop;
				}
		},
		sortFunc(e) {
			//очищаем всем флаг сортировки
			this.columns.forEach(el => el.click = false)

			this.isLoading = true
			e.sort = !e.sort
			e.click = true
			this.checkColumn = e.nameEng
			
			this.apiMethods(
				{ columnName: e.nameEng, orderOperation: e.sort ? 'asc' : 'desc' }, 
				{ offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true },
				this.clickFilter !== 0 ? this.clickFilter : null
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
				{ offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true },
				this.clickFilter !== 0 ? this.clickFilter : null
			)
		},
		prevPage(){
			this.pageNumber--;

			let columnsItem = this.columns.find(f => f.click);
			this.apiMethods(
				{ columnName: columnsItem.name, orderOperation: columnsItem.sort ? 'asc' : 'desc' }, 
				{ offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true },
				this.clickFilter !== 0 ? this.clickFilter : null
			)
		},
		searchFunc() {
			this.isLoading = true
			this.isSearch = true

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
			this.filter[0].value = null
			this.searchResult = []
			this.searchResultMkb = []
			this.ageGroups = []
			this.searchResultDev = []
			this.statuses = []
			this.serviceTypes = []
			this.searchResultNpc = []

			this.apiMethods(null, { offsetRowCount: this.pageNumber !== 0 ? this.pageNumber*this.size : 0, fetchRowCount: this.size, use: true }, null)
		},
		apiMethods(orderByColumn, OffSetFetch, stageId) {
			let num = [], mkb = [];
			if(this.filter.find(f=>f.id=='number').value !== null) this.filter.find(f=>f.id=='number').value.split(',').forEach(el => { if(el&&el !== 0) num.push(+el) })

			let obj = {
				"name": null,
				"number": num,
				"stageId": stageId ? [stageId] : [],
				"statusId": this.statuses,
				"typeId": [],
				"serviceTypeId": this.serviceTypes,
				"mkbId": this.searchResult.map(m=>m.id),
				"expertiseResultId": [],
				"npsDecisionId": this.searchResultNpc,
				"developerId": this.searchResultDev,
				"startDate": this.dateFrom,
				"finalDate": this.dateTo,
				"mkbCodesId": this.searchResultMkb.map(m=>m.id),
				"ageGroupId": this.ageGroups,
				"developerCompanyId": [],
				"orderByColumn": orderByColumn ? orderByColumn : undefined,
				"OffSetFetch": OffSetFetch ? OffSetFetch : undefined
			}
			this.apiAll({type: 'post', url: `api/Projects/filters`, obj: obj, id: undefined})
			.then(res => {
				this.isLoading = false

				res.data.forEach(el => {
					el.newFlag = el.roleListDisplayIsNewProject.length > 0 && el.roleListDisplayIsNewProject[0].forProjectAuthor && this.getUserInfo.id == el.createdBy ?
					true : (this.getUserInfo.role.id == (el.roleListDisplayIsNewProject[0] ? el.roleListDisplayIsNewProject[0].userRoleId : null) ? true : false)

					el.serviceTypeId = el.serviceType ? el.serviceType.id : ''
					el.mkbName = el.mkb ? el.mkb.name : ''
					el.mkbCodesOne = el.mkbCodes.length > 0 ? el.mkbCodes[0].code : ''
					el.developerName = el.developer ? el.developer.name : ''
					el.statusName = el.status ? el.status.name : ''
					el.npcName = el.npsDecision ? el.npsDecision.name : ''
				})

				this.allStroke = res.headers[`${this.isSearch ? 'x-filtertotal-count' : 'x-total-count'}`]
				this.pageCount(+res.headers[`${this.isSearch ? 'x-filtertotal-count' : 'x-total-count'}`])
				this.list = orderBy(res.data, 'newFlag', 'desc')
			})
		},
		downloadReports() {
			let num = [];
			if(this.filter.find(f=>f.id=='number').value !== null) this.filter.find(f=>f.id=='number').value.split(',').forEach(el => { num.push(+el) })

			this.api.post(`${this.apiUrl}api/Projects/Report`, {
				number: num.length > 0 ? num : undefined,
				statusId: this.statuses.length > 0 ? this.statuses : undefined,
				serviceTypeId: this.serviceTypes.length > 0 ? this.serviceTypes : undefined,
				mkbId: this.searchResult.length > 0 ? this.searchResult.map(m=>m.id) : undefined,
				npsDecisionId: this.searchResultNpc.length > 0?this.searchResultNpc:undefined,
				startDate: this.dateFrom?this.dateFrom:undefined,
				finalDate: this.dateTo?this.dateTo:undefined,
				mkbCodesId: this.searchResultMkb.length > 0?this.searchResultMkb.map(m=>m.id):undefined,
				ageGroupId: this.ageGroups.length > 0?this.ageGroups:undefined,
				developerId: this.searchResultDev.length > 0?this.searchResultDev:undefined
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
		filterStage(stage) {
			this.isLoading = true
			this.pageNumber = 0
			this.clickFilter = stage;

			if(stage !== 0){
				this.apiMethods(null, {offsetRowCount: 0, fetchRowCount:this.size, use: true}, stage)
			} else {
				this.apiMethods(null, {offsetRowCount: 0, fetchRowCount:this.size, use: true}, null)
			}
		},
		nextPageEV(role,status,stage, id) {
			if(role == 1 && status == 1 && stage == 1) this.$router.push(`/editCR/${id}`)
			else if(role == 1 && status == 6 && stage == 2) this.$router.push(`/editCR/${id}`)
			else if(role == 2 && status == 11 && stage == 2) this.$router.push(`/editCR/${id}`)
			else if(role == 3 && status == 14 && stage == 3) this.$router.push(`/editCR/${id}`)
			else if(role == 4 && status == 17 && stage == 4) this.$router.push(`/editCR/${id}`)
			else if(role == 1 && status == 29 && stage == 6) this.$router.push(`/editCR/${id}`)
			else if(role == 3 && status == 24 && stage == 6) this.$router.push(`/editCR/${id}`)
			else if(role == 1 && status == 8 && stage == 2) this.$router.push(`/editCR/${id}`)
			else this.$router.push(`/viewCR/${id}`)

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
		toJSONLocal(date) {
			let local = date ? new Date(date) : new Date();
			local.setMinutes((date ? new Date(date) : new Date()).getMinutes() - (date ? new Date(date) : new Date()).getTimezoneOffset());

			// console.log(this.maxYesterday);
			return local.toISOString().substr(0,10);
		}
	},
	mounted() {
		this.observer = new IntersectionObserver(this.infiniteScroll);
		this.observerMkb = new IntersectionObserver(this.infiniteScrollMkb);
	},
	created() {
		this.apiMethods(null, {offsetRowCount: 0, fetchRowCount:this.size, use: true})
		this.apiAll({type: 'get', url: `api/MKB`, id: undefined}).then(res => { this.mkbList = res.data })
		this.apiAll({type: 'get', url: `api/NPSDecisions`, id: undefined}).then(res => { this.npcList = res.data })
		this.apiAll({type: 'get', url: `api/Companies`, id: undefined}).then(res => { this.сompaniesList = res.data })
		this.apiAll({type: 'get', url: `api/ServiceTypes`, id: undefined}).then(res => { this.serviceTypesList = res.data })
		this.apiAll({type: 'get', url: `api/AgeGroups`, id: undefined}).then(res => { this.ageGroupsList = res.data })
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

.new-tag {
	float: right;
    width: 60px;
    height: 21px;
    background: #0da057;
    color: white;
    border-radius: 15px;
    text-align: center;
}

table tbody tr:hover {
	background: #f1f1f1;
	box-shadow: 0 1.5px 6px #00000080;
	cursor: pointer;
}

</style>