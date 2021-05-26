<template>
	<div class="b-page-wrapper">
		<div class="b-head-block b-head-block--link">
			<div class="b-container">
				<div class="b-head-block__wrapper">
					<router-link class="b-link b-link--header" to="/listCr" title="">
						<iconAngleleftSvg class="b-icon b-icon--header icon-angle-left" />
						<span>Назад</span>
					</router-link>
					<h1 class="b-title b-title--h1">
						<span v-if="$route.params.id !== 'new' && $route.params.id !== 'newZ'">Редактировать {{obj.stage ? obj.stage.name : ''}} №{{obj.number ? obj.number : ''}}</span>
						<span v-else>
							Создать
							<span v-if="$route.params.id == 'new'">уведомление</span>
							<span v-if="$route.params.id == 'newZ'">заявление</span>
						</span>
					</h1>
				</div>
			</div>
		</div>
		<div class="b-container">
			<div class="b-window">
				<div class="b-form" action="/">
					<div class="b-form__first-lavel">
						<!-- Стадия -->
						<div v-if="computedShow([1,2,3,4,5,6], [], []).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="type">Стадия</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select
										:disabled="computedShow([1,2,3,4,5,6], [], []).disabled"
										:clearable="false"
										v-model="obj.stageName"
										:options="stageList"
										no-options="Данных нет..."
										label="name"
									>
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
												Поиск не дал результатов <em>{{ search }}</em
												>.
											</template>
										</template>
									</v-select>
								</div>
							</div>
						</div>

						<!-- Статус -->
						<div v-if="computedShow([1,2,3,4,5,6], [], []).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="type">Статус </label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select
										:disabled="computedShow([1,2,3,4,5,6], [], []).disabled"
										:clearable="false"
										v-model="obj.statusName"
										:options="statusList"
										no-options="Данных нет..."
										label="name"
									>
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
												Поиск не дал результатов <em>{{ search }}</em
												>.
											</template>
										</template>
									</v-select>
								</div>
							</div>
						</div>

						<!-- Тип подачи уведомления/заявления -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="type">
									Тип подачи
									<span v-if="obj.stage.id == 1">уведомления</span>
									<span v-else>заявления</span>
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select
										ref="typeName"
										:disabled="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).disabled"
										:clearable="false"
										v-model="obj.typeName"
										:options="listType"
										no-options="Данных нет..."
										label="name"
									>
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
												Поиск не дал результатов <em>{{ search }}</em
												>.
											</template>
										</template>
									</v-select>
								</div>
							</div>
						</div>

						<!-- Дата создания уведомления/заявления -->
						<div v-if="computedShow([1,2,3,4,5,6], [], []).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="date">
									Дата создания
									<span v-if="obj.stage.id == 1">уведомления</span>
									<span v-else>заявления</span>
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input :max="new Date().toISOString().substr(0,10)" :disabled="computedShow([1,2,3,4,5,6], [], []).disabled" v-model="obj.date" id="date" type="date" name="date" placeholder="" class="date-from"/>
									<iconCalendarSvg class="b-icon b-icon--calendar icon-calendar" />
								</div>
							</div>
						</div>

						<!-- Номер уведомления/заявления -->
						<div v-if="computedShow([1,2,3,4,5,6], [], []).show && $route.params.id !== 'new' && $route.params.id !== 'newZ'" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="number">
									Номер
									<span v-if="obj.stage.id == 1">уведомления</span>
									<span v-else>заявления</span>
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										:disabled="computedShow([1,2,3,4,5,6], [], []).disabled"
										v-model="obj.number"
										class="b-input__input-field"
										id="number"
										type="text"
										name="number"
									/>
								</div>
							</div>
						</div>

						<!-- Наименование КР -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="name-kr">Наименование КР </label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										ref="name"
										:disabled="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).disabled"
										v-model="obj.name"
										class="b-input__input-field"
										id="name-kr"
										type="text"
										name="name-kr"
									/>
								</div>
							</div>
						</div>

						<!-- Связь с Перечнем -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="type-feed">Связь с Перечнем </label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select ref="serviceType" :disabled="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).disabled" :clearable="false" v-model="obj.serviceType" :options="serviceTypes" label="name" >
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
													Поиск не дал результатов <em>{{ search }}</em>.
											</template>
										</template>
									</v-select>
								</div>
							</div>
						</div>

						<!-- Возрастная группа из Перечня -->
						<!-- <div v-if="computedShow([1,2,3,4,5,6], [1,2], [1]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="age"
									>Возрастная группа из Перечня
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select :disabled="computedShow([1,2,3,4,5,6], [1,2], [1]).disabled" :clearable="false" multiple v-model="obj.ageGroups" :options="ageList" label="name" >
											<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
													Поиск не дал результатов <em>{{ search }}</em>.
											</template>
											</template>
									</v-select>
								</div>
							</div>
						</div> -->

						<!-- Наименование заболевания/состояния из Перечня -->
						<!-- <div v-if="computedShow([1,2,3,4,5,6], [1,2], [1]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="disease"
									>Наименование заболевания/состояния из Перечня
								</label>
							</div>
							<div class="b-form__right">
								<v-select :disabled="computedShow([1,2,3,4,5,6], [1,2], [1]).disabled" :filterable="false" @open="onOpen" @close="onClose" @search="query => search = query" :clearable="false" v-model="obj.mkb" :options="paginated" label="name">
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
						</div> -->

						<!-- Кодирование по МКБ-10 (из Перечня) -->
						<!-- <div v-if="computedShow([1,2,3,4,5,6], [1,2], [1]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="mkb-10"
									>Кодирование по МКБ-10 (из Перечня)
								</label>
							</div>
							<div class="b-form__right">
								<v-select :disabled="computedShow([1,2,3,4,5,6], [1,2], [1]).disabled" :filterable="false" @open="onOpenMkb" @close="onCloseMkb" @search="query => searchMkb = query" :closeOnSelect="false" :clearable="false" multiple v-model="obj.mkbCodes" :options="paginatedMkb" label="code">
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
						</div> -->

						<!-- Возрастная группа -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="age"
									>Возрастная группа
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select ref="ageGroups" :disabled="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).disabled" :clearable="false" multiple v-model="obj.ageGroups" :options="ageList" label="name" >
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
													Поиск не дал результатов <em>{{ search }}</em>.
											</template>
										</template>
									</v-select>
								</div>
							</div>
						</div>

						<!-- Наименование заболевания/состояния -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="disease"
									>Наименование заболевания/состояния
								</label>
							</div>
							<div class="b-form__right">
								<v-select ref="mkb" :disabled="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).disabled" :filterable="false" @open="onOpen" @close="onClose" @search="query => search = query" :clearable="false" v-model="obj.mkb" :options="paginated" label="name">
									<template v-slot:no-options="{ search, searching }">
										<template v-if="searching">Поиск не дал результатов <em>{{ search }}</em>.</template>
									</template>

									<template #list-footer>
										<li ref="load" class="loader" v-show="hasNextPage">Список прогружается...</li>
									</template>
								</v-select>
							</div>
						</div>

						<!-- Код МКБ-10 -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="mkb-10"
									>Код МКБ-10
								</label>
							</div>
							<div class="b-form__right">
								<v-select ref="mkbCodes" :clearSearchOnBlur="clearSearchOnBlur" :disabled="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).disabled" :filterable="false" @open="onOpenMkb" @close="onCloseMkb" @search="query => searchMkb = query" :closeOnSelect="false" :clearable="false" multiple v-model="obj.mkbCodes" :options="paginatedMkb" label="code">
									<template v-slot:no-options="{ search, searching }">
										<template v-if="searching"> Поиск не дал результатов <em>{{ search }}</em>.</template>
									</template>

									<template #list-footer>
										<li ref="load" class="loader" v-show="hasNextPage">Список прогружается...</li>
									</template>
								</v-select>
							</div>
						</div>

						<!-- Наименование разработчика -->
						<div v-if="computedShow([1,2,3,4,5,6], [], []).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="name-developer"
									>Наименование разработчика
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										:disabled="computedShow([1,2,3,4,5,6], [], []).disabled"
										:value="obj.developer ? obj.developer.name : devList.companyName"
										class="b-input__input-field"
										id="name-developer"
										type="text"
										name="name-developer"
									/>
								</div>
							</div>
						</div>

						<!-- Соавторы -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="type">Соавторы</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select
										:closeOnSelect="false"
										:disabled="computedShow([1,2,3,4,5,6], [1,2,6], [1], $route.params.id).disabled"
										:clearable="false"
										multiple
										v-model="obj.developers"
										:options="companieSList"
										no-options="Данных нет..."
										label="name"
									>
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
												Поиск не дал результатов <em>{{ search }}</em
												>.
											</template>
										</template>
									</v-select>
								</div>
							</div>
						</div>

						<!-- Адрес разработчика -->
						<div v-if="computedShow([1,2,3,4,5,6], [], []).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="adress-developer"
									>Адрес разработчика
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										:disabled="computedShow([1,2,3,4,5,6], [], []).disabled"
										:value="obj.developerAddress ? obj.developerAddress : devList.companyAddress"
										class="b-input__input-field"
										id="adress-developer"
										type="text"
										name="adress-developer"
									/>
								</div>
							</div>
						</div>

						<!-- Телефон разработчика -->
						<div v-if="computedShow([1,2,3,4,5,6], [], []).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="tel">Телефон разработчика </label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										:disabled="computedShow([1,2,3,4,5,6], [], []).disabled"
										:value="obj.developerPhone ? obj.developerPhone : devList.companyPhone"
										class="b-input__input-field"
										id="tel-developer"
										type="tel"
										name="tel"
									/>
								</div>
							</div>
						</div>

						<!-- E-mail разработчика -->
						<div v-if="computedShow([1,2,3,4,5,6], [], []).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="email-developer"
									>E-mail разработчика
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										:disabled="computedShow([1,2,3,4,5,6], [], []).disabled"
										:value="obj.developerEmail ? obj.developerEmail : devList.companyEmail"
										class="b-input__input-field"
										id="email-developer"
										type="email"
										name="email-developer"
									/>
								</div>
							</div>
						</div>

						<!-- Адрес размещения проекта КР для проведения общественного обсуждения -->
						<div v-if="computedShow([2,3,4,5,6], [6,7,8], [1]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="adress-developer2"
									>Адрес размещения проекта КР для проведения общественного обсуждения
								</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										ref="locationAddress"
										:disabled="computedShow([2,3,4,5,6], [6,7,8], [1]).disabled"
										v-model="obj.locationAddress"
										class="b-input__input-field"
										id="adress-developer2"
										type="text"
										name="adress-developer2"
									/>
								</div>
							</div>
						</div>

						<!-- Срок общественного обсуждения КР -->
						<div v-if="computedShow([2,3,4,5,6], [6,7,8], [1]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="date">
									Срок общественного обсуждения КР
								</label>
							</div>
							<div class="b-form__right b-form__right--date-group">
								<div class="b-input b-input-calendar b-input-calendar--mb17">
									<input ref="startPublicDiscussionDate" :max="obj.finalPublicDiscussionDate ? obj.finalPublicDiscussionDate : obj.date" :disabled="computedShow([2,3,4,5,6], [6,7,8], [1]).disabled" id="date" type="date" name="От __.__.____" v-model="obj.startPublicDiscussionDate" placeholder="Дата от" class="date-from"/>
									<iconCalendarSvg class="b-icon b-icon--calendar icon-calendar" />
								</div>
								<div class="b-input">
									<input ref="finalPublicDiscussionDate" :min="obj.startPublicDiscussionDate" :max="obj.date" :disabled="computedShow([2,3,4,5,6], [6,7,8], [1]).disabled || obj.startPublicDiscussionDate == null" id="date" type="date" name="До __.__.____" v-model="obj.finalPublicDiscussionDate" placeholder="Дата до" class="date-from"/>
									<iconCalendarSvg class="b-icon b-icon--calendar icon-calendar" />
								</div>
							</div>
						</div>

						<!-- Файл с КР -->
						<div v-if="computedShow([2,3,4,5,6], [6,7,8,14], [1,3]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="file-developer">Файл с КР </label>
							</div>
							<div class="b-form__right">
								<button ref="fileCrBtn" v-show="!fileCr.id" :disabled="computedShow([2,3,4,5,6], [6,7,8,14], [1,3]).disabled" @click="$refs['fileCr'].click()" class="b-button b-button--fill b-button--full b-button--file" >
									<iconDownloadSvg class="b-icon b-icon--report icon-download" />
									<input v-show="false" type="file" ref="fileCr" @change="handleFileUpload('fileCr', 1)"/>
									Добавить файл
								</button>

								<div v-show="fileCr.id" class="b-file class-relative">
									<a class="b-file__name" :href="$route.params.id !== 'newZ' ? `${this.apiUrl}api/ProjectFiles?id=${fileCr.id}` : 'javascript:void(0);'" title="файл_с_кр.docx" :target="$route.params.id !== 'newZ' ? '_blank' : ''" rel="noopener noreferrer">
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с КР</span>
									</a>
									<iconCloseSvg v-if="!computedShow([2,3,4,5,6], [6,7,8,14], [1,3]).disabled" @click="resetFile('fileCr', 1, fileCr.id)" style="float:right" class="b-icon b-icon--close icon-close class-custom" />
								</div>
							</div>
						</div>

						<!-- Экспертиза Минздрава -->
						<div v-if="computedShow([2,3,4,5,6], [11,12,13,14,15,16,17,18,19,20,21,22,23,24,28,29,30], [2]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="file-developer"
									>Экспертиза Минздрава
								</label>
							</div>
							<div class="b-form__right">
								<div ref="ekspmz" class="b-file class-relative">
									<a @click="!computedShow([2,3,4,5,6], [11,12,13,14,15,16,17,18,19,20,21,22,23,24,28,29,30], [1,2,3,4,5,6,7,8,9,10]).disabled ? dialogCheckList=true : ''" class="b-file__name" style="text-decoration:underline;color:#0050b2" href="javascript:void(0);" title="Чек-лист проверки">
										<span>Чек-лист проверки</span>
									</a>
									<iconNotApproved v-if="!icon_check_list" style="position:relative;top:7px;"/>
									<iconApproved v-if="icon_check_list" style="position:relative;top:7px;"/>
								</div>
							</div>
						</div>

						<!-- Файл Результаты проверки Минздрава -->
						<div v-if="computedShow([2,3,4,5,6], [11], [2]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="file-developer"
									>Результаты проверки Минздрава
								</label>
							</div>
							<div class="b-form__right">
								<button v-show="!fileResMZ.id" :disabled="computedShow([2,3,4,5,6], [11], [2]).disabled" @click="$refs['fileResMZ'].click()" class="b-button b-button--fill b-button--full b-button--file" >
									<iconDownloadSvg class="b-icon b-icon--report icon-download" />
									<input v-show="false" type="file" ref="fileResMZ" @change="handleFileUpload('fileResMZ', 4)"/>
									Добавить файл
								</button>

								<div v-show="fileResMZ.id" class="b-file class-relative">
									<a class="b-file__name" :href="`${this.apiUrl}api/ProjectFiles?id=${fileResMZ.id}`" title="файл_с_комментариями.docx" target="_blank" rel="noopener noreferrer">
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Результаты проверки Минздрава</span>
									</a>
									<iconCloseSvg v-if="!computedShow([2,3,4,5,6], [11], [2]).disabled" @click="resetFile('fileResMZ', 4, fileResMZ.id)" style="float:right" class="b-icon b-icon--close icon-close class-custom" />
								</div>
							</div>
						</div>

						<!-- Файл с заключением -->
						<div v-if="computedShow([3,4,5,6], [14], [3]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="file-developer"
									>Файл с заключением
								</label>
							</div>
							<div class="b-form__right">
								<button v-show="!fileZacl.id" :disabled="computedShow([3,4,5,6], [14], [3]).disabled" @click="$refs['fileZacl'].click()" class="b-button b-button--fill b-button--full b-button--file" >
									<iconDownloadSvg class="b-icon b-icon--report icon-download" />
									<input v-show="false" type="file" ref="fileZacl" @change="handleFileUpload('fileZacl', 2)"/>
									Добавить файл
								</button>

								<div v-show="fileZacl.id" class="b-file class-relative">
										<a class="b-file__name" :href="`${this.apiUrl}api/ProjectFiles?id=${fileZacl.id}`" title="файл_с_комментариями.docx" target="_blank" rel="noopener noreferrer">
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с заключением</span>
									</a>
									<iconCloseSvg v-if="!computedShow([3,4,5,6], [14], [3]).disabled" @click="resetFile('fileZacl', 2, fileZacl.id)" style="float:right" class="b-icon b-icon--close icon-close class-custom" />
								</div>
							</div>
						</div>

						<!-- Результаты экспертизы -->
						<div v-if="computedShow([3,4,5,6], [14], [3]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="type">Результаты экспертизы </label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select
										ref="expertiseResultName"
										:disabled="computedShow([3,4,5,6], [14], [3]).disabled"
										:clearable="false"
										v-model="obj.expertiseResultName"
										:options="expertizeResList"
										no-options="Данных нет..."
										label="name"
									>
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
												Поиск не дал результатов <em>{{ search }}</em
												>.
											</template>
										</template>
									</v-select>
								</div>
							</div>
						</div>

						<!-- Файл с протоколом НПС -->
						<div v-if="computedShow([4,5,6], [17], [4]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="file-developer"
									>Файл с протоколом НПС
								</label>
							</div>
							<div class="b-form__right">
								<button ref="fileProtocolNpcBtn" v-show="!fileProtocolNpc.id" :disabled="computedShow([4,5,6], [17], [4]).disabled" @click="$refs['fileProtocolNpc'].click()" class="b-button b-button--fill b-button--full b-button--file" >
									<iconDownloadSvg class="b-icon b-icon--report icon-download" />
									<input v-show="false" type="file" ref="fileProtocolNpc" @change="handleFileUpload('fileProtocolNpc', 3)"/>
									Добавить файл
								</button>

								<div v-show="fileProtocolNpc.id" class="b-file class-relative">
										<a class="b-file__name" :href="`${this.apiUrl}api/ProjectFiles?id=${fileProtocolNpc.id}`" title="файл_с_комментариями.docx" target="_blank" rel="noopener noreferrer">
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с протоколом НПС</span>
									</a>
									<iconCloseSvg v-if="!computedShow([4,5,6], [17], [4]).disabled" @click="resetFile('fileProtocolNpc', 3, fileProtocolNpc.id)" style="float:right" class="b-icon b-icon--close icon-close class-custom" />
								</div>
							</div>
						</div>

						<!-- Дата протокола -->
						<div v-if="computedShow([4,5,6], [17], [4]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="date">Дата протокола </label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input ref="protocolDate" :max="new Date().toISOString().substr(0,10)" :disabled="computedShow([4,5,6], [17], [4]).disabled" v-model="obj.protocolDate" id="date" type="date" name="date" placeholder="" class="date-from"/>
									<iconCalendarSvg class="b-icon b-icon--calendar icon-calendar" />
								</div>
							</div>
						</div>

						<!-- Номер протокола -->
						<div v-if="computedShow([4,5,6], [17], [4]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="name-kr">Номер протокола</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										ref="protocolNumber"
										v-model="obj.protocolNumber"
										:disabled="computedShow([4,5,6], [17], [4]).disabled"
										class="b-input__input-field"
										id="name-kr"
										type="text"
										name="name-kr"
									/>
								</div>
							</div>
						</div>

						<!-- Решение -->
						<div v-if="computedShow([4,5,6], [17], [4]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="type">Решение</label>
							</div>
							<div class="b-form__right">
								<div class="b-select">
									<v-select
										ref="npsDecisionName"
										:disabled="computedShow([4,5,6], [17], [4]).disabled"
										:clearable="false"
										v-model="obj.npsDecisionName"
										:options="npsList"
										no-options="Данных нет..."
										label="name"
									>
										<template v-slot:no-options="{ search, searching }">
											<template v-if="searching">
												Поиск не дал результатов <em>{{ search }}</em
												>.
											</template>
										</template>
									</v-select>
								</div>
							</div>
						</div>

						<!-- Файл с сопроводительным письмом -->
						<!-- <div v-if="computedShow([4,5,6], [29], [1]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="file-developer"
									>Файл с сопроводительным письмом
								</label>
							</div>
							<div class="b-form__right">
								<button v-show="!fileWithSopr.id" :disabled="computedShow([4,5,6], [29], [1]).disabled" @click="$refs['fileWithSopr'].click()" class="b-button b-button--fill b-button--full b-button--file" >
									<iconDownloadSvg class="b-icon b-icon--report icon-download" />
									<input v-show="false" type="file" ref="fileWithSopr" @change="handleFileUpload('fileWithSopr', 5)"/>
									Добавить файл
								</button>

								<div v-show="fileWithSopr.id" class="b-file class-relative">
										<a class="b-file__name" :href="`${this.apiUrl}api/ProjectFiles?id=${fileWithSopr.id}`" title="файл_с_комментариями.docx" target="_blank" rel="noopener noreferrer">
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с сопроводительным письмом</span>
									</a>
									<iconCloseSvg v-if="!computedShow([4,5,6], [29], [1]).disabled" @click="resetFile('fileWithSopr', 5, fileWithSopr.id)" style="float:right" class="b-icon b-icon--close icon-close class-custom" />
								</div>
							</div>
						</div> -->

						<!-- Файл с подписанным сопроводительным письмом -->
						<div v-if="computedShow([6], [29], [1]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="file-developer">
									Файл с подписанным сопроводительным письмом
								</label>
							</div>
							<div class="b-form__right">
								<button ref="fileWithSoprPodpBtn" v-show="!fileWithSoprPodp.id" :disabled="computedShow([4,5,6], [29], [1]).disabled" @click="$refs['fileWithSoprPodp'].click()" class="b-button b-button--fill b-button--full b-button--file" >
									<iconDownloadSvg class="b-icon b-icon--report icon-download" />
									<input v-show="false" type="file" ref="fileWithSoprPodp" @change="handleFileUpload('fileWithSoprPodp', 6)"/>
									Добавить файл
								</button>

								<div v-show="fileWithSoprPodp.id" class="b-file class-relative">
										<a class="b-file__name" :href="`${this.apiUrl}api/ProjectFiles?id=${fileWithSoprPodp.id}`" title="файл_с_комментариями.docx" target="_blank" rel="noopener noreferrer">
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с подписанным сопроводительным письмом</span>
									</a>
									<iconCloseSvg v-if="!computedShow([4,5,6], [29], [1]).disabled" @click="resetFile('fileWithSoprPodp', 6, fileWithSoprPodp.id)" style="float:right" class="b-icon b-icon--close icon-close class-custom" />
								</div>
							</div>
						</div>

						<!-- Результаты общественного обсуждения -->
						<div v-if="computedShow([2,3,4,5,6], [6], [1]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="file-developer">Результаты общественного обсуждения
								</label>
							</div>
							<div class="b-form__right">
								<button ref="filePublicCouncilResultBtn" v-show="!filePublicCouncilResult.id" :disabled="computedShow([2,3,4,5,6], [6], [1]).disabled" @click="$refs['filePublicCouncilResult'].click()" class="b-button b-button--fill b-button--full b-button--file" >
									<iconDownloadSvg class="b-icon b-icon--report icon-download" />
									<input v-show="false" type="file" ref="filePublicCouncilResult" @change="handleFileUpload('filePublicCouncilResult', 8)"/>
									Добавить файл
								</button>

								<div v-show="filePublicCouncilResult.id" class="b-file class-relative">
										<a class="b-file__name" :href="`${this.apiUrl}api/ProjectFiles?id=${filePublicCouncilResult.id}`" title="Результаты_общественного_обсуждения.docx" target="_blank" rel="noopener noreferrer">
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Результаты общественного обсуждения</span>
									</a>
									<iconCloseSvg v-if="!computedShow([2,3,4,5,6], [6], [1]).disabled" @click="resetFile('filePublicCouncilResult', 8, filePublicCouncilResult.id)" style="float:right" class="b-icon b-icon--close icon-close class-custom" />
								</div>
							</div>
						</div>

						<!-- ID КР -->
						<div v-if="computedShow([6], [24], [3]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="name-kr">ID КР</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										v-model="obj.rubricatorId"
										:disabled="computedShow([6], [24], [3]).disabled"
										class="b-input__input-field"
										id="name-kr"
										type="text"
										name="name-kr"
									/>
								</div>
							</div>
						</div>

						<!-- Адрес публикации КР -->
						<div v-if="computedShow([6], [24], [3]).show" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label" for="name-kr">Адрес публикации КР</label>
							</div>
							<div class="b-form__right">
								<div class="b-input">
									<input
										v-model="obj.publicationAddress"
										:disabled="computedShow([6], [24], [3]).disabled"
										class="b-input__input-field"
										id="name-kr"
										type="text"
										name="name-kr"
									/>
								</div>
							</div>
						</div>

					</div>
					<div v-if="computedChangeStatus(getUserInfo.role.id, obj.status.id, obj.stage.id).length > 0" class="b-form__group b-form__group--button">
						<button v-for="(item, ind) in computedChangeStatus(getUserInfo.role.id, obj.status.id, obj.stage.id)" :disabled="disabledSave" @click="savePut(obj, item.nextStatus, obj.stage.id)" :class="{'b-button':true, 'b-button--fill':ind == 0, 'b-button--cancel':ind == 1, 'b-button--full':true}">
							<span>{{item.name}}</span>
						</button>
					</div>
				</div>
			</div>
		</div>


		<transition v-if="dialogCheckList" name="modal">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">
						<div class="modal-header">
							<slot name="header">
								Чек-лист проверки заявления и прилагаемого к нему проекта клинической рекомендации в соответствии с порядком и сроками одобрения и утверждения клинических рекомендаций, утвержденных приказом Минздрава России от 28.02.2019 № 104н
							</slot>
						</div>

						<div class="modal-body">
							<slot name="body">
								<table>
									<thead>
										<tr>
											<th>№</th>
											<th>Требование</th>
											<th>Соответствие</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row, indx) in check_list" :key="indx">
											<td>{{row.checkListId}}</td>
											<td>{{row.checkListName}}</td>
											<td>
												<select v-if="getUserInfo&&getUserInfo.role&&getUserInfo.role.id == 2 && obj.status.id == 11" v-model="row.isSatisfy">
													<option :value="null">Выбрать</option>
													<option :value="true">Да</option>
													<option :value="false">Нет</option>
												</select>
												<span v-else>
													<span v-if="row.isSatisfy">Да</span>
													<span v-if="!row.isSatisfy">Нет</span>
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</slot>
						</div>

						<div class="modal-footer">
							<slot name="footer">
								<button v-if="getUserInfo&&getUserInfo.role&&getUserInfo.role.id == 2 && obj.status.id == 11" class="b-button b-button--fill" @click="saveCheckList(check_list)">Сохранить</button>
								<button class="b-button b-button--cancel ml-2" @click="dialogCheckList=false">Закрыть</button>
							</slot>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import iconSvg from "../../assets/icons/svg/filter.svg";
import iconCloseSvg from "../../assets/icons/svg/close.svg";
import iconApproved from "../../assets/icons/svg/approved_checklist.svg";
import iconNotApproved from "../../assets/icons/svg/not_approved.svg";
import iconSearchSvg from "../../assets/icons/svg/search.svg";
import iconAngleDownSvg from "../../assets/icons/svg/angle-down.svg";
import iconAngleleftSvg from "../../assets/icons/svg/angle-left.svg";
import iconDownloadSvg from "../../assets/icons/svg/download.svg";
import iconSortdownSvg from "../../assets/icons/svg/sort-down.svg";
import iconSortupSvg from "../../assets/icons/svg/sort-up.svg";
import iconCalendarSvg from "../../assets/icons/svg/calendar.svg";
import iconUploadSvg from "../../assets/icons/svg/upload.svg";
import iconFileSvg from "../../assets/icons/svg/file.svg";
import { mapActions, mapGetters } from "vuex";

export default {
	name: 'IntersectionObserver',
	components: {
			iconSvg,
			iconFileSvg,
			iconSearchSvg,
			iconAngleDownSvg,
			iconCloseSvg,
			iconApproved,
			iconNotApproved,
			iconDownloadSvg,
			iconSortdownSvg,
			iconSortupSvg,
			iconAngleleftSvg,
			iconCalendarSvg,
			iconUploadSvg,
	},
	data() {
		return {
			disabledSave: false,
			dialogCheckList: false,
			icon_check_list: false,
			check_list: [],
			obj: {
				number: null,
				name: null,
				stage: {id:1, name:'Уведомление'},
				stageName: 'Уведомление',
				status: {id:1, name: 'Подготовка уведомления о начале разработки КР начата'},
				statusName: 'Подготовка уведомления о начале разработки КР начата',
				typeName: null,
				companyName: '',
				expertiseResultName: null,
				serviceType: null,
				mkb: null,
				isPortalDiscussion: null,
				date: (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1).substr(0,10),
				startPublicDiscussionDate: null,
				finalPublicDiscussionDate: null,
				npsDecisionName: null,
				locationAddress: null,
				protocolDate: null,
				protocolNumber: null,
				developer: null,
				developerPhone: null,
				developerEmail: null,
				developerAddress: null,
				publicationAddress: null,
				rubricatorId: null,
				mkbCodes: [],
				ageGroups: [],
				developers: [],
				id: null,
				createdOn: null,
				modifiedOn: null,
				createdBy: null,
				modifiedById: null,
				author: null,
			},
			stage_cr: 1,
			status_cr: 1,
			listType: [],
			allListType: [],
			stageList: [],
			statusList: [],
			companieSList: [],
			npsList: [],
			expertizeResList: [],
			devList: {
				companyAddress: '',
				companyPhone: '',
				companyEmail: '',
			},
			serviceTypes: [],
			mkbList: [],
			ageList: [],
			//поиск по мкб названию
			observer: null,
			limit: 10,
			search: '',
			//поиск по мкб коду
			observerMkb: null,
			limitMkb: 10,
			searchMkb: '',
			fileCr: { id: null, typeId: 1, file: null, crId: null },
			fileResMZ: { id: null, typeId: 4, file: null, crId: null },
			fileZacl: { id: null, typeId: 2, file: null, crId: null },
			fileWithSopr: { id: null, typeId: 5, file: null, crId: null },
			fileWithSoprPodp: { id: null, typeId: 6, file: null, crId: null },
			filePublicCouncilResult: { id: null, typeId: 8, file: null, crId: null },
			fileProtocolNpc: { id: null, typeId: 3, file: null, crId: null }
		}
	},
	computed: {
			...mapGetters({
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
			}
	},
	methods: {
		computedShow(stage, status, role_list, params_id) {

			let res_status = status.find(f => f == this.obj.status.id) !== undefined ? true : false,
			res_role = role_list.find(f => f == this.getUserInfo.role.id) !== undefined ? true : false;


			return {show: params_id&&params_id == 'newZ' ? true : stage.find(f => f == this.obj.stage.id) !== undefined ? true : false, disabled: params_id&&params_id == 'newZ' ? false : !(res_status && res_role)}
		},
		computedChangeStatus(role, status, stage) {
			let arr = [];
			if(role == 1 && status == 1 && stage == 1) arr.push({name: 'Отправить', nextStatus: 3})
			if(role == 1 && status == 6 && stage == 2) arr.push({name: 'Отправить', nextStatus: 10})
			if(role == 1 && status == 8 && stage == 2) arr.push({name: 'Отправить', nextStatus: 9})
			if(role == 2 && status == 11 && stage == 2) {
				arr.push({name: 'Отправить', nextStatus: this.check_list.find(f=>!f.isSatisfy) ? 12 : 13})
			}

			if(role == 3 && status == 14 && stage == 3) arr.push({name: 'Отправить в НПС', nextStatus: 16},{name: 'Отправить на доработку', nextStatus: 15})

			if(role == 4 && status == 17 && stage == 4) {
				let _nps = undefined;
				if(typeof this.obj.npsDecisionName == 'object' && this.obj.npsDecisionName !== null) {
					_nps = this.npsList.find(f=>f.name == this.obj.npsDecisionName.name).id
				} else if(this.obj.npsDecisionName){
					_nps = this.npsList.find(f=>f.name == this.obj.npsDecisionName).id
				}
				// console.log({nextStatus: _nps == 1 ? 18 : (_nps == 3 ? 19 : (_nps == 4 ? 30 : 20))})
				arr.push(
					{name: 'Отправить', nextStatus: _nps == 1 ? 18 : (_nps == 3 ? 19 : (_nps == 4 ? 30 : 20))}
				)

			}
			if(role == 1 && status == 29 && stage == 6) arr.push({name: 'Отправить', nextStatus: 23})

			if(role == 3 && status == 24 && stage == 6) arr.push({name: 'Разместить', nextStatus: 28})
			return arr
		},
		...mapActions({
			apiAll: "api/apiAll"
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
		handleFileUpload(fileName, typeId) {
			if(this.$route.params.id !== 'newZ') {
				this[fileName] = { file: this.$refs[fileName].files[0], typeId: typeId, crId: this.$route.params.id }
				let data = new FormData()
				data.append('file', this[fileName].file)

				this.apiAll({type: 'post', url: `api/ProjectFiles?crId=${this[fileName].crId}&typeId=${this[fileName].typeId}`, obj: data, id: undefined}).then(res => {
					if(res){
						this.apiAll({type: 'get', url: `api/ProjectFiles/${this.$route.params.id}`, id: undefined}).then(response => {
							response.data.forEach(el => {
								if(el.typeId == 1) this.$set(this.fileCr, 'id', el.id)
								if(el.typeId == 4) this.$set(this.fileResMZ, 'id', el.id)
								if(el.typeId == 2) this.$set(this.fileZacl, 'id', el.id)
								if(el.typeId == 5) this.$set(this.fileWithSopr, 'id', el.id)
								if(el.typeId == 6) this.$set(this.fileWithSoprPodp, 'id', el.id)
								if(el.typeId == 8) this.$set(this.filePublicCouncilResult, 'id', el.id)
								if(el.typeId == 3) this.$set(this.fileProtocolNpc, 'id', el.id)
							})
						})
					}
				})
			} else {
				this.$set(this[fileName], 'id', 'newZ')
			}
		},
		resetFile(fileName, typeId, fileId) {
			if(confirm('Вы уверены что хотите удалить прикрепленный файл?')) {
				if(this.$route.params.id !== 'newZ') {
					this.apiAll({type: 'delete', url: `api/ProjectFiles/${fileId}`, id: undefined}).then(res => {
						this[fileName] = {id: null, file: null, typeId: typeId, crId: null}
					})
				} else {
					this[fileName] = {id: null, file: null, typeId: typeId, crId: null}
				}
				this.$refs[fileName].value = ''
			}
		},
		savePut(obj, newStatus, stage) {
			//Проверка при создании уведомления
			if(this.$route.params.id == 'new' && (!obj.serviceType || !obj.typeName || !obj.name || !obj.ageGroups.length>0 || !obj.mkb || !obj.mkbCodes.length>0)) {
				let arr = ['name', 'serviceType', 'typeName','ageGroups','mkb','mkbCodes'];
				
				for (let key in obj) {
					if(arr.find(f=> f == key))
						//если нету значения в поле или массиве то подсветить
						if(!obj[arr.find(f=> f == key)] || obj[arr.find(f=> f == key)].length == 0) {
							//Для обычных инпутов
							if(this.$refs[arr.find(f=> f == key)].classList) this.$refs[arr.find(f=> f == key)].classList.add('error-style-border')

							//Для v-select
							if(this.$refs[arr.find(f=> f == key)].$refs) this.$refs[arr.find(f=> f == key)].$el.classList.add('error-style-border')
						} else {
							//если есть значение в поле или массиве то убрать подсветку

							//Для обычных инпутов
							if(this.$refs[arr.find(f=> f == key)].classList) this.$refs[arr.find(f=> f == key)].classList.remove('error-style-border')

							//Для v-select
							if(this.$refs[arr.find(f=> f == key)].$refs) this.$refs[arr.find(f=> f == key)].$el.classList.remove('error-style-border')
						}
				}
				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Нужно заполнить обязательные поля!!!' })
				return;
			}
			
			//Проверка при создании заявлении когда isPortalDiscussion = false || null
			if((this.$route.params.id == 'newZ' || obj.status.id == 6) && !obj.isPortalDiscussion && (!this.fileCr.id || !obj.serviceType || !obj.finalPublicDiscussionDate || !obj.startPublicDiscussionDate || !obj.typeName || !obj.name || !obj.locationAddress || !obj.ageGroups.length>0 || !obj.mkb || !obj.mkbCodes.length>0)) {
				let arr = ['name', 'serviceType', 'typeName','ageGroups','mkb','mkbCodes','locationAddress','startPublicDiscussionDate','finalPublicDiscussionDate'];
				
				if(!this.fileCr.id) {
					this.$refs.fileCrBtn.classList.add('error-style-border-btn')
				} else {
					this.$refs.fileCrBtn.classList.remove('error-style-border-btn')
				}
				for (let key in obj) {
					if(arr.find(f=> f == key))
						//если нету значения в поле или массиве то подсветить
						if(!obj[arr.find(f=> f == key)] || obj[arr.find(f=> f == key)].length == 0) {
							//Для обычных инпутов
							if(this.$refs[arr.find(f=> f == key)].classList) this.$refs[arr.find(f=> f == key)].classList.add('error-style-border')

							//Для v-select
							if(this.$refs[arr.find(f=> f == key)].$refs) this.$refs[arr.find(f=> f == key)].$el.classList.add('error-style-border')
						} else {
							//если есть значение в поле или массиве то убрать подсветку

							//Для обычных инпутов
							if(this.$refs[arr.find(f=> f == key)].classList) this.$refs[arr.find(f=> f == key)].classList.remove('error-style-border')

							//Для v-select
							if(this.$refs[arr.find(f=> f == key)].$refs) this.$refs[arr.find(f=> f == key)].$el.classList.remove('error-style-border')
						}
				}
				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Нужно заполнить обязательные поля!!!' })

				return;
			}

			//Проверка на заполненность чек-листов
			if(obj.status.id == 11 && ( this.check_list.find(f=>f.isSatisfy==null) || !this.icon_check_list) ) {
				this.$refs.ekspmz.classList.add('error-style-border-link')
				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка при отправлении КР дальше...', text: 'Все разделы чек-листа должны быть заполнены...' })
				
				return;
			}

			//Если isPortalDiscussion = true, то поле "Адрес размещения.." автоматически заполняется адресом нашего портала
			//и обязательные файлы (файл КР и результаты общ обсуждения) для заполнения
			if(obj.isPortalDiscussion) obj.locationAddress = 'https://portalcr.minzdrav.gov.ru'
			if(obj.isPortalDiscussion && !this.fileCr.id && !this.filePublicCouncilResult.id) {
				if(!this.fileCr.id) {
					this.$refs.fileCrBtn.classList.add('error-style-border-btn')
				} else {
					this.$refs.fileCrBtn.classList.remove('error-style-border-btn')
				}
				
				if(!this.filePublicCouncilResult.id) {
					this.$refs.filePublicCouncilResultBtn.classList.add('error-style-border-btn')
				} else {
					this.$refs.filePublicCouncilResultBtn.classList.remove('error-style-border-btn')
				}

				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Нужно прикрепить обязательные файлы!!!' })
				
				return;
			}


			// При статусе 29 прикрепление подписанного сопроводительного письма обязательно
			if(obj.status.id == 29 && !this.fileWithSoprPodp.id) {
				if(!this.fileWithSoprPodp.id) {
					this.$refs.fileWithSoprPodpBtn.classList.add('error-style-border-btn')
				} else {
					this.$refs.fileWithSoprPodpBtn.classList.remove('error-style-border-btn')
				}

				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Нужно прикрепить обязательные файлы!!!' })
				
				return
			}

			// При статусе 14 прикрепление файла с заключением ИЛИ результаты экспертизы
			if(obj.status.id == 14 && !obj.expertiseResultName) {				
				//Для v-select
				if(this.$refs.expertiseResultName.$refs) this.$refs.expertiseResultName.$el.classList.add('error-style-border')

				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Нужно заполнить обязательные поля!!!' })
				
				return
			}
			
			// При статусе 17 нужно заполнить (файл с протоколом, дата протокола, номер протокола, решение)
			if(obj.status.id == 17 && (!this.fileProtocolNpc.id || !obj.protocolDate || !obj.protocolNumber || !obj.npsDecisionName)) {				
				let arr = ['protocolDate','protocolNumber','npsDecisionName'];
				
				if(!this.fileProtocolNpc.id) {
					this.$refs.fileProtocolNpcBtn.classList.add('error-style-border-btn')
				} else {
					this.$refs.fileProtocolNpcBtn.classList.remove('error-style-border-btn')
				}

				for (let key in obj) {
					if(arr.find(f=> f == key))
						//если нету значения в поле или массиве то подсветить
						if(!obj[arr.find(f=> f == key)] || obj[arr.find(f=> f == key)].length == 0) {
							//Для обычных инпутов
							if(this.$refs[arr.find(f=> f == key)].classList) this.$refs[arr.find(f=> f == key)].classList.add('error-style-border')

							//Для v-select
							if(this.$refs[arr.find(f=> f == key)].$refs) this.$refs[arr.find(f=> f == key)].$el.classList.add('error-style-border')
						} else {
							//если есть значение в поле или массиве то убрать подсветку

							//Для обычных инпутов
							if(this.$refs[arr.find(f=> f == key)].classList) this.$refs[arr.find(f=> f == key)].classList.remove('error-style-border')

							//Для v-select
							if(this.$refs[arr.find(f=> f == key)].$refs) this.$refs[arr.find(f=> f == key)].$el.classList.remove('error-style-border')
						}
				}
				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Нужно заполнить обязательные поля!!!' })
				
				return;
			}

			
			let type_id, prot_dt = null, nps_name = undefined, expertise_result = undefined;

			if(typeof obj.typeName == 'object') {
				type_id = this.listType.find(f=>f.name == obj.typeName.name).id
			} else {
				type_id = this.listType.find(f=>f.name == obj.typeName).id
			}

			// console.log(obj.npsDecisionName)
			if(typeof obj.npsDecisionName == 'object' && obj.npsDecisionName !== null) {
				nps_name = this.npsList.find(f=>f.name == obj.npsDecisionName.name).id
			} else if(obj.npsDecisionName){
				nps_name = this.npsList.find(f=>f.name == obj.npsDecisionName).id
			}

			if(typeof obj.expertiseResultName == 'object' && obj.expertiseResultName !== null) {
				expertise_result = this.expertizeResList.find(f=>f.name == obj.expertiseResultName.name).id
			} else if(obj.expertiseResultName){
				expertise_result = this.expertizeResList.find(f=>f.name == obj.expertiseResultName).id
			}

			if(obj.protocolDate) prot_dt = +obj.protocolDate.slice(0,4) < 2020 ? new Date().toISOString().substr(0,10) : obj.protocolDate

			let newObj = {
				"id": this.$route.params.id !== 'new' && this.$route.params.id !== 'newZ' ? this.$route.params.id : undefined,
				"name": obj.name ? obj.name : undefined,
				"statusId": newStatus,
				"typeId": type_id,
				"number": obj.number,
				"isPortalDiscussion": this.$route.params.id == 'new' && stage == 1 && newStatus == 3 ? true : undefined,
				"date": obj.date ? obj.date : undefined,
				"serviceTypeId": obj.serviceType ? obj.serviceType.id : undefined,
				"mkbId": obj.mkb ? obj.mkb.id : undefined,
				"developerId": (stage == 1 || stage == 2) && (newStatus == 3 || newStatus == 10) ? this.devList.id : undefined,
				"developerPhone": (stage == 1 || stage == 2) && (newStatus == 3 || newStatus == 10) ? this.devList.companyPhone : undefined,
				"developerEmail": (stage == 1 || stage == 2) && (newStatus == 3 || newStatus == 10) ? this.devList.companyEmail : undefined,
				"developerAddress": (stage == 1 || stage == 2) && (newStatus == 3 || newStatus == 10) ? this.devList.companyAddress : undefined,
				"locationAddress": obj.locationAddress ? obj.locationAddress : undefined,
				"startPublicDiscussionDate": obj.startPublicDiscussionDate ? obj.startPublicDiscussionDate : undefined,
				"finalPublicDiscussionDate": obj.finalPublicDiscussionDate ? obj.finalPublicDiscussionDate : undefined,
				"expertiseResultId":  expertise_result,
				"npsDecisionId": nps_name,
				"protocolDate": prot_dt,
				"protocolNumber": obj.protocolNumber,
				"publicationAddress": obj.publicationAddress ? obj.publicationAddress : undefined,
				"rubricatorId": obj.rubricatorId,
				"mkbCodes": obj.mkbCodes ? obj.mkbCodes.map(m=>m.id) : undefined,
				"ageGroups": obj.ageGroups ? obj.ageGroups.map(m=>m.id) : undefined,
				"companies": obj.developers ? obj.developers.map(m=>m.id) : undefined
			}

			this.apiAll({type: `${this.$route.params.id !== 'new' && this.$route.params.id !== 'newZ' ? 'put' : 'post'}`, url: `api/Projects`, obj: newObj, id: this.$route.params.id !== 'new' && this.$route.params.id !== 'newZ' ? this.$route.params.id : undefined})
			.then(res => {
				let numberCR = res.data.number;

				if(res.status == 200 && this.$route.params.id == 'newZ') {
					this.fileCr = { file: this.$refs['fileCr'].files[0], typeId: 1, crId: res.data.id }
					this.filePublicCouncilResult = { file: this.$refs['filePublicCouncilResult'].files[0], typeId: 8, crId: res.data.id }

					if(this.fileCr.file && this.filePublicCouncilResult.file) {
						let data = new FormData()
						data.append('file', this.fileCr.file)
						this.apiAll({type: 'post', url: `api/ProjectFiles?crId=${this.fileCr.crId}&typeId=${this.fileCr.typeId}`, obj: data, id: undefined})
						.then(res2 => {
							if(res2.status == 200) {
								let datafbcr = new FormData()
								datafbcr.append('file', this.filePublicCouncilResult.file)
								this.apiAll({type: 'post', url: `api/ProjectFiles?crId=${this.filePublicCouncilResult.crId}&typeId=${this.filePublicCouncilResult.typeId}`, obj: datafbcr, id: undefined})
								.then(res3 => {
									if(res3.status == 200) {
										if(this.filePublicCouncilResult.typeId == 8) {
											let dataPortal = new FormData()
											dataPortal.append('ProjectId', res.data.id)
											dataPortal.append('File', this.filePublicCouncilResult.file)
											dataPortal.append('TypeId', this.filePublicCouncilResult.typeId)

											this.api.post(`${this.apiUrl}api/ClinicalRecommendationPortal/SendProjectFile`, dataPortal)
											.then(res4 => {
												if(res4.status == 200) {
													if(this.$route.params.id == 'newZ' || this.$route.params.id == 'new')
														this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успех', text: `${this.$route.params.id !== 'newZ' ? 'Уведомление' : 'Заявление'} сохранено под номером ${numberCR}` })
													this.disabledSave = false
													this.$router.push('/listCr')
													
												}
											})
										} else {
											if(this.$route.params.id == 'newZ' || this.$route.params.id == 'new')
												this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успех', text: `${this.$route.params.id !== 'newZ' ? 'Уведомление' : 'Заявление'} сохранено под номером ${numberCR}` })
											this.disabledSave = false
											this.$router.push('/listCr')
										}
									}
								})
							}
						})
					} else if(this.fileCr.file){
						let datafc = new FormData()
						datafc.append('file', this.fileCr.file)
						this.apiAll({type: 'post', url: `api/ProjectFiles?crId=${this.fileCr.crId}&typeId=${this.fileCr.typeId}`, obj: datafc, id: undefined})
						.then(res => {
							if(res.status == 200) {
								if(this.$route.params.id == 'newZ' || this.$route.params.id == 'new')
									this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успех', text: `${this.$route.params.id !== 'newZ' ? 'Уведомление' : 'Заявление'} сохранено под номером ${numberCR}` })
								this.disabledSave = false
								this.$router.push('/listCr')
							}
						})
					} else if(this.filePublicCouncilResult.file){
						let datafbcr = new FormData()
						datafbcr.append('file', this.filePublicCouncilResult.file)
						this.apiAll({type: 'post', url: `api/ProjectFiles?crId=${this.filePublicCouncilResult.crId}&typeId=${this.filePublicCouncilResult.typeId}`, obj: datafbcr, id: undefined})
						.then(res => {
							if(res.status == 200) {
								if(this.$route.params.id == 'newZ' || this.$route.params.id == 'new')
									this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успех', text: `${this.$route.params.id !== 'newZ' ? 'Уведомление' : 'Заявление'} сохранено под номером ${numberCR}` })
								this.disabledSave = false
								this.$router.push('/listCr')
							}
						})
					}

				} else {
					if(this.$route.params.id == 'newZ' || this.$route.params.id == 'new')
						this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успех', text: `${this.$route.params.id !== 'newZ' ? 'Уведомление' : 'Заявление'} сохранено под номером ${numberCR}` })
					this.disabledSave = false
					this.$router.push('/listCr')
				}
			})
		},
		clearSearchOnBlur({clearSearchOnSelect, multiple}) {
			return clearSearchOnSelect
		},
		saveCheckList(array) {
			if(array.find(f=>f.isSatisfy==null)) {
				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка при сохранении', text: 'Укажите соответствие для всех требований...' })
			} else {
				this.apiAll({type: 'post', url: `api/ProjectCheckList`, obj: {projectId: +this.$route.params.id, checkListInfo: array} })
				.then(res => {
					if(res.status == 200)
						this.check_list = res.data.checkListInfo
						this.dialogCheckList = false
						this.icon_check_list = true
						this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Cохранено', text: 'Успешно сохранено...' })
				})
			}
		}
	},
	mounted() {
		this.observer = new IntersectionObserver(this.infiniteScroll);
		this.observerMkb = new IntersectionObserver(this.infiniteScrollMkb);
	},
	beforeUpdate() {
		if(this.$route.params.id == 'newZ') {
			this.obj.status = {id:6, name: 'Подготовка заявления о разработке КР начата'}
			this.obj.stage = {id:2, name:'Заявление'}
			this.obj.stageName = 'Заявление'
			this.obj.statusName = 'Подготовка заявления о разработке КР начата'
			this.listType = this.allListType.filter(f=> f.id !== 1 && f.id !== 2)

		} else if(this.$route.params.id == 'new') {
			this.obj.stage = {id:1, name:'Уведомление'}
			this.obj.stageName = 'Уведомление'
			this.obj.status = {id:1, name: 'Подготовка уведомления о начале разработки КР начата'}
			this.obj.statusName = 'Подготовка уведомления о начале разработки КР начата'
			this.listType = this.allListType.filter(f=> f.id == 1 || f.id == 2)
		}
	},
	created() {
		this.apiAll({ type: "get", url: `api/ServiceTypes`, id: undefined }).then((res) => { this.serviceTypes = res.data });
		this.apiAll({type: 'get', url: `api/MKB`, id: undefined}).then(res => { this.mkbList = res.data })
		this.apiAll({type: 'get', url: `api/AgeGroups`, id: undefined}).then(res => { this.ageList = res.data })
		this.apiAll({type: 'get', url: `api/Stages`, id: undefined}).then(res => { this.stageList = res.data })
		this.apiAll({type: 'get', url: `api/Statuses`, id: undefined}).then(res => { this.statusList = res.data })
		this.apiAll({type: 'get', url: `api/ExpertiseResults`, id: undefined}).then(res => { this.expertizeResList = res.data })
		this.apiAll({type: 'get', url: `api/Companies`, id: undefined}).then(res => { this.companieSList = res.data })
		this.apiAll({type: 'get', url: `api/NPSDecisions`, id: undefined}).then(res => { this.npsList = res.data })

		this.apiAll({type: 'get', url: `api/Account`, id: undefined}).then(res => {
			this.devList = {
				id: res.data.company.id,
				companyAddress: res.data.company.address,
				companyPhone: res.data.company.phone,
				companyEmail: res.data.company.email,
				companyName: res.data.company.name,
			}
		})

		if(this.$route.params.id !== 'new' && this.$route.params.id !== 'newZ') {
				this.apiAll({ type: "get", url: `api/Projects`, id: this.$route.params.id }).then((res) => {
					let stage = res.data.stage;

					this.obj = {
						stage: res.data.stage,
						stageName: res.data.stage.name,
						status: res.data.status,
						statusName: res.data.status.name,
						type: res.data.type,
						typeName: res.data.type.name,
						date: res.data.stage&&res.data.stage.id > 1 ? res.data.applicationStageDate : res.data.date,
						number: res.data.number,
						name: res.data.name,
						serviceType: res.data.serviceType,
						ageGroups: res.data.ageGroups,
						mkb: res.data.mkb,
						isPortalDiscussion: res.data.isPortalDiscussion,
						mkbCodes: res.data.mkbCodes,
						developers: res.data.developers,
						developer: res.data.developer,
						developerAddress: res.data.developerAddress,
						developerPhone: res.data.developerPhone,
						developerEmail: res.data.developerEmail,
						locationAddress: res.data.locationAddress,
						startPublicDiscussionDate: res.data.startPublicDiscussionDate,
						finalPublicDiscussionDate: res.data.finalPublicDiscussionDate,
						expertiseResultName: res.data.expertiseResult ? res.data.expertiseResult.name : null,
						protocolDate: res.data.protocolDate,
						protocolNumber: res.data.protocolNumber,
						npsDecisionName: res.data.npsDecision ? res.data.npsDecision.name : null,
						rubricatorId: res.data.rubricatorId,
						publicationAddress: res.data.publicationAddress,
					}
					// console.log('1', this.obj)

					this.obj.date = res.data.date.slice(0,10)
					// console.log('2', this.obj.status.id, this.obj.stage.id)

					if(this.obj.protocolDate) this.obj.protocolDate = res.data.protocolDate.slice(0,10)
					if(this.obj.finalPublicDiscussionDate) this.obj.finalPublicDiscussionDate = res.data.finalPublicDiscussionDate.slice(0,10)
					if(this.obj.startPublicDiscussionDate) this.obj.startPublicDiscussionDate = res.data.startPublicDiscussionDate.slice(0,10)

					this.apiAll({ type: "get", url: `crTypes`, id: undefined }).then((res) => {
						if(stage.id == 1 || stage.id == 2) this.listType = res.data.filter(f=> f&&f.stage&&f.stage.id == stage.id)
						else this.listType = res.data
					});
				})
				this.apiAll({type: 'get', url: `api/ProjectFiles/${this.$route.params.id}`, id: undefined}).then(res => {
					res.data.forEach(el => {
						if (el.typeId == 1) this.fileCr.id = el.id;
						if (el.typeId == 4) this.fileResMZ.id = el.id;
						if (el.typeId == 2) this.fileZacl.id = el.id;
						if (el.typeId == 5) this.fileWithSopr.id = el.id;
						if (el.typeId == 6) this.fileWithSoprPodp.id = el.id;
						if (el.typeId == 8) this.filePublicCouncilResult.id = el.id;
						if (el.typeId == 3) this.fileProtocolNpc.id = el.id;
					})
				})
				this.apiAll({type: 'get', url: `api/ProjectCheckList/${this.$route.params.id}`, id: undefined})
				.then(res => {
					for (let i = 0; i < res.data.checkListInfo.length; i++) {
						if(!res.data.checkListInfo[i].isSatisfy || res.data.checkListInfo[i].isSatisfy == false) {
							break;
						} else {
							this.icon_check_list = true
						}
					}
					this.check_list = res.data.checkListInfo
				})
		} else {
			// console.log(1);

			this.apiAll({ type: "get", url: `crTypes`, id: undefined }).then((res) => {
				this.allListType = res.data

				if(this.$route.params.id == 'new') {
					this.listType = res.data.filter(f=> f.id == 1 || f.id == 2)
				} else if (this.$route.params.id == 'newZ'){
					this.listType = res.data.filter(f=> f.id !== 1 && f.id !== 2)
				} else {
					this.listType = res.data
				}
			});
		}
	}
};
</script>

<style>
@import "../../style/stylePages.css";
@import "../EditCr/style/mobile.css";

.error-style-border .vs__dropdown-toggle {
	border-color: red;
}

.error-style-border {
	border-color: red!important;
}
.error-style-border-btn {
	border: 2px solid red!important;
}
.error-style-border-link {
	border: 2px solid red!important;
	border-radius: 4px;
}

.loader {
		text-align: center;
		color: #bbbbbb;
}
.class-relative {
		position: relative;
		top: 10px;
}
.class-custom {
		float: right;
		position: relative;
		right: 5px;
		top: 4px;
		fill: red;
		cursor: pointer;
}
button[disabled], html input[disabled] {
		background: #f1f2f5;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-header {
	text-align: center;
	font-size: 19px;
}
.modal-footer {
	text-align: center;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

table {
	border-collapse: collapse;
}

table td, th {
	min-width: 50px;
	text-align: center;
}

th, td {
	border: 1px solid #000;
	padding: 5px;
}


</style>
