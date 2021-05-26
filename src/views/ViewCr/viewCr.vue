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
						{{ obj.stage ? obj.stage.name : "" }} №{{
							obj.number ? obj.number : ""
						}}
				<!-- <a @click="$router.push(`/editCr/${obj.id}`)" class="b-link b-link--header" href="javascript:void(0);" title="">
					
					<span>Редактировать</span>
				</a> -->
					</h1>
				</div>
			</div>
		</div>
		<div class="b-container">
			<div class="b-window b-window--information">
				<div class="b-form b-form--information" action="/">
					<div class="b-form__first-lavel b-form__first-lavel--empty">
						<!-- Стадия -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left">
								<span>Стадия</span>
							</div>
							<div class="b-form__right">
								<span>{{ obj.stage ? obj.stage.name : "&mdash;" }}</span>
							</div>
						</div>
						<!-- Статус -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left">
								<span>Статус</span>
							</div>
							<div class="b-form__right">
								<span>{{ obj.status ? obj.status.name : "&mdash;" }}</span>
							</div>
						</div>
			<!-- Тип подачи уведомления/заявления -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label">
									Тип подачи
									<span v-if="obj.stage.id == 1"> уведомления</span>
									<span v-else> заявления</span>
								</label>
							</div>
							<div class="b-form__right">
								<span>{{ obj.type ? obj.type.name : "&mdash;" }}</span>
							</div>
						</div>
			<!-- Дата создания уведомления/заявления -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label">
									Дата создания
									<span v-if="obj.stage.id == 1"> уведомления</span>
									<span v-else> заявления</span>
								</label>
							</div>
							<div class="b-form__right">
								<time datetime="19.08.2019">{{
									obj.date ? new Date(obj.date).toLocaleDateString() : "&mdash;"
								}}</time>
							</div>
						</div>
			<!-- Номер уведомления/заявления -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left">
								<label class="b-label">
									Номер
									<span v-if="obj.stage.id == 1"> уведомления</span>
									<span v-else> заявления</span>
								</label>
							</div>
							<div class="b-form__right">
								<span>№{{ obj.number }}</span>
							</div>
						</div>
			<!-- Наименование КР -->
						<div v-if="computedShow([1,2,3,4,5,6], [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>Наименование КР</span></div>
							<div class="b-form__right">
								<span>{{ obj.name ? obj.name : "-" }}</span>
							</div>
						</div>
			<!-- Связь с Перечнем -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>Связь с Перечнем</span></div>
							<div class="b-form__right">
								<span>{{
									obj.serviceType ? obj.serviceType.name : "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Наименование заболевания по Перечню -->
						<!-- <div v-if="computedShow([1,2,3,4,5,6], [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left">
								<span>Наименование заболевания по Перечню</span>
							</div>
							<div class="b-form__right">
								<span>{{ obj.mkb ? obj.mkb.name : "&mdash;" }}</span>
							</div>
						</div> -->
			<!-- Кодирование по МКБ-10 (из Перечня) -->
						<!-- <div v-if="computedShow([1,2,3,4,5,6], [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left">
								<span>Кодирование по МКБ-10 (из Перечня)</span>
							</div>
							<div class="b-form__right">
								<span>{{ obj.mkb ? obj.mkb.code : "&mdash;" }}</span>
							</div>
						</div> -->
			<!-- Возрастная группа из Перечня -->
						<!-- <div v-if="computedShow([1,2,3,4,5,6], [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left">
								<span>Возрастная группа из Перечня</span>
							</div>
							<div class="b-form__right">
								<span>{{
									obj.ageGroups.length !== 0
										? "(" +
											Array.prototype.map
												.call(obj.ageGroups, function (item) {
													return item.name;
												})
												.join(", ") +
											")"
										: "&mdash;"
								}}</span>
							</div>
						</div> -->
			<!-- Наименование заболевания/состояния  -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>Наименование заболевания/состояния </span></div>
							<div class="b-form__right">
								<span>{{ obj.mkb ? obj.mkb.name : "&mdash;"}}</span>
							</div>
						</div>
			<!-- Код МКБ-10 -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>Код МКБ-10</span></div>
							<div class="b-form__right">
								<span>{{
									obj.mkbCodes.length !== 0
										? Array.prototype.map
												.call(obj.mkbCodes, function (item) {
													return item.code;
												})
												.join(", ")
										: "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Возрастная группа -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>Возрастная группа</span></div>
							<div class="b-form__right">
								<span>{{
									obj.ageGroups.length !== 0
										? Array.prototype.map
												.call(obj.ageGroups, function (item) {
													return item.name;
												})
												.join(", ")
										: "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Наименование разработчика -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left">
								<span>Наименование разработчика</span>
							</div>
							<div class="b-form__right">
								<span>{{ obj.developer ? obj.developer.name : "&mdash;" }}</span>
							</div>
						</div>
			<!-- Соавторы -->
						<div v-if="computedShow([1,2,3,4,5,6], [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>Соавторы</span></div>
							<div class="b-form__right">
								<span>{{
									obj.developers.length !== 0
										? Array.prototype.map
												.call(obj.developers, function (item) {
													return item.name;
												})
												.join(", ")
										: "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Адрес разработчика -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>Адрес разработчика</span></div>
							<div class="b-form__right">
								<span>{{
									obj.developerAddress ? obj.developerAddress : "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Телефон разработчика -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>Телефон разработчика</span></div>
							<div class="b-form__right">
								<span>{{
									obj.developerPhone ? obj.developerPhone : "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- E-mail разработчика -->
						<div v-if="computedShow([1,2,3,4,5,6], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])" class="b-form__group">
							<div class="b-form__left"><span>E-mail разработчика</span></div>
							<div class="b-form__right">
								<span>{{
									obj.developerEmail ? obj.developerEmail : "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Адрес размещения проекта КР для проведения общественного обсуждения -->
						<div v-if="computedShow([2,3,4,5,6], [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left">
								<span
									>Адрес размещения проекта КР для проведения
									общественного обсуждения</span
								>
							</div>
							<div class="b-form__right">
								<span>{{
									obj.locationAddress ? obj.locationAddress : "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Срок общественного обсуждения КР -->
						<div v-if="computedShow([2,3,4,5,6], [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left">
								<span>Срок общественного обсуждения КР</span>
							</div>
							<div class="b-form__right">
								<span
									>От
									<span
										>{{
											obj.startPublicDiscussionDate
												? new Date(
														obj.startPublicDiscussionDate
													).toLocaleDateString()
												: "&mdash;"
										}}
									</span>
									— До
									<span>
										{{
											obj.finalPublicDiscussionDate
												? new Date(
														obj.finalPublicDiscussionDate
													).toLocaleDateString()
												: "&mdash;"
										}}</span
									>
								</span>
							</div>
						</div>
			<!-- Файл с КР -->
						<div v-if="computedShow([2,3,4,5,6], [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left"><span>Файл с КР</span></div>
							<div class="b-form__right">
								<div class="b-file">
									<a
										v-if="fileCr.id"
										class="b-file__name"
										:href="`${this.apiUrl}api/ProjectFiles?id=${fileCr.id}`"
										title="Файл с КР"
									>
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с КР</span>
									</a>
									<span v-else>&mdash;</span>
								</div>
							</div>
						</div>
			<!-- Файл Результаты проверки Минздрава -->
						<div v-if="computedShow([2,3,4,5,6], [12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left">
								<span>Результаты проверки Минздрава</span>
							</div>
							<div class="b-form__right">
								<div class="b-file">
									<a
										v-if="fileResMZ.id"
										class="b-file__name"
										:href="`${this.apiUrl}api/ProjectFiles?id=${fileResMZ.id}`"
										title="Результаты проверки Минздрава"
									>
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Результаты проверки Минздрава</span>
									</a>
									<span v-else>&mdash;</span>
								</div>
							</div>
						</div>
			<!-- Файл с заключением -->
						<div v-if="computedShow([3,4,5,6], [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left"><span>Файл с заключением</span></div>
							<div class="b-form__right">
								<div class="b-file">
									<a
										v-if="fileZacl.id"
										:href="`${this.apiUrl}api/ProjectFiles?id=${fileZacl.id}`"
										title="Файл с заключением"
									>
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с заключением</span>
									</a>
									<span v-else>&mdash;</span>
								</div>
							</div>
						</div>
			<!-- Результаты экспертизы -->
						<div v-if="computedShow([3,4,5,6], [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left"><span>Результаты экспертизы</span></div>
							<div class="b-form__right">
								<span>{{
									obj.expertiseResult ? obj.expertiseResult.name : "&mdash;"
								}}</span>
							</div>
						</div>

			<!-- Экспертиза Минздрава -->
						<div v-if="computedShow([2,3,4,5,6], [11,12,13,14,15,16,17,18,19,20,21,22,23,24,28,29,30])" class="b-form__group">
							<div class="b-form__left"><span>Экспертиза Минздрава</span></div>
							<div class="b-form__right">
								<a @click="dialogCheckList=true" style="color:blu" href="javascript:void(0);">Чек-лист проверки</a>
								<iconNotApproved v-if="!icon_check_list" style="position:relative;top:7px;"/>
								<iconApproved v-if="icon_check_list" style="position:relative;top:7px;"/>
							</div>
						</div>
			<!-- Файл с протоколом НПС -->
						<div v-if="computedShow([4,5,6], [18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left">
								<span>Файл с протоколом НПС</span>
							</div>
							<div class="b-form__right">
								<div class="b-file">
									<a
										v-if="fileProtocolNpc.id"
										:href="`${this.apiUrl}api/ProjectFiles?id=${fileProtocolNpc.id}`"
										title="Файл с протоколом НПС"
									>
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с протоколом НПС</span></a
									>
									<span v-else>&mdash;</span>
								</div>
							</div>
						</div>
			<!-- Дата протокола -->
						<div v-if="computedShow([4,5,6], [18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left"><span>Дата протокола</span></div>
							<div class="b-form__right">
								<span>{{obj.protocolDate ? new Date(obj.protocolDate).toLocaleDateString() : '&mdash;'}}</span>
							</div>
						</div>
			<!-- Номер протокола -->
						<div v-if="computedShow([4,5,6], [18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left"><span>Номер протокола</span></div>
							<div class="b-form__right">
								<span>{{obj.protocolNumber ? obj.protocolNumber : '&mdash;'}}</span>
							</div>
						</div>
			<!-- Решение НПС -->
						<div v-if="computedShow([4,5,6], [18,19,20,21,22,23,24,25,26,27,28,29,30])" class="b-form__group">
							<div class="b-form__left"><span>Решение НПС</span></div>
							<div class="b-form__right">
								<span>{{
									obj.npsDecision ? obj.npsDecision.name : "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Файл с сопроводительным письмом -->
						<!-- <div v-if="computedShow([4,5,6], [23,24,25])" class="b-form__group">
							<div class="b-form__left">
								<span>Файл с сопроводительным письмом</span>
							</div>
							<div class="b-form__right">
								<div class="b-file">
									<a
										v-if="fileWithSopr.id"
										:href="`${this.apiUrl}api/ProjectFiles?id=${fileWithSopr.id}`"
										title="Файл с сопроводительным письмом"
									>
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с сопроводительным письмом</span></a
									>
									<span v-else>&mdash;</span>
								</div>
							</div>
						</div> -->
			<!-- Файл с подписанным сопроводительным письмом -->
						<div v-if="computedShow([4,5,6], [23,24,25])" class="b-form__group">
							<div class="b-form__left">
								<span>Файл с подписанным сопроводительным письмом</span>
							</div>
							<div class="b-form__right">
								<div class="b-file">
									<a
										v-if="fileWithSoprPodp.id"
										:href="`${this.apiUrl}api/ProjectFiles?id=${fileWithSoprPodp.id}`"
										title="Файл с подписанным сопроводительным письмом"
									>
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Файл с подписанным сопроводительным письмом</span></a
									>
									<span v-else>&mdash;</span>
								</div>
							</div>
						</div>
			<!-- Результаты общественного обсуждения -->
						<div v-if="computedShow([2,3,4,5,6], [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,28,29,30])" class="b-form__group">
							<div class="b-form__left">
								<span>Результаты общественного обсуждения</span>
							</div>
							<div class="b-form__right">
								<div class="b-file">
									<a
										v-if="filePublicCouncilResult.id"
										:href="`${this.apiUrl}api/ProjectFiles?id=${filePublicCouncilResult.id}`"
										title="Результаты общественного обсуждения"
									>
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>Результаты общественного обсуждения</span></a
									>
									<span v-else>&mdash;</span>
								</div>
							</div>
						</div>
			<!-- ID КР -->
						<div v-if="computedShow([6], [24,28])" class="b-form__group">
							<div class="b-form__left"><span>ID КР</span></div>
							<div class="b-form__right">
								<span>{{
									obj.rubricatorId ? obj.rubricatorId : "&mdash;"
								}}</span>
							</div>
						</div>
			<!-- Адрес публикации КР -->
						<div v-if="computedShow([6], [24,28])" class="b-form__group">
							<div class="b-form__left"><span>Адрес публикации КР</span></div>
							<div class="b-form__right">
								<a style="text-transform:none;text-decoration:underline;color:#0050b2;" :href="obj.publicationAddress" target="_blank" rel="noopener noreferrer">
									<span>{{
										obj.publicationAddress ? obj.publicationAddress : "&mdash;"
									}}</span>
								</a>
							</div>
						</div>
					</div>
			<div v-if="computedChangeStatus(getUserInfo.role.id, obj.status.id, obj.stage.id).length > 0" class="b-form__group b-form__group--button">
				<button v-for="(item, ind) in computedChangeStatus(getUserInfo.role.id, obj.status.id, obj.stage.id)" @click="item.nextStatus ? savePut(obj, item.nextStatus) : dialogForPortal=!dialogForPortal" :class="{'b-button':true, 'b-button--fill':ind == 0, 'b-button--cancel':ind == 1, 'b-button--full':true}">
						<span>{{item.name}}</span>
				</button>
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
									<button class="b-button b-button--cancel ml-2" @click="dialogCheckList=false">Закрыть</button>
								</slot>
							</div>
						</div>
					</div>
				</div>
			</transition>
		<!-- комментарии -->
			<!-- <div class="b-form" action="/">
				<div class="b-comment-block">
					<p class="b-title b-title--comment">Комментарии<span>, 3</span></p>
					<div class="b-comment">
						<div class="b-comment__wrapper">
							<div class="b-comment__line">
								<p class="b-comment__person">Константин Константинопольский</p>
								<span class="b-comment__date">07.10.2020 в 16:12 </span>
							</div>
							<p class="b-comment__text">
								Разнообразный и богатый опыт дальнейшее развитие различных форм
								деятельности играет важную роль в формировании позиций,
								занимаемых участниками в отношении поставленных задач.
								Повседневная практика показывает, что начало повседневной работы
								по формированию позиции играет важную роль в формировании систем
								массового участия. Задача организации, в особенности же рамки и
								место обучения кадров влечет за собой процесс внедрения и
								модернизации систем массового участия.
							</p>
							<div class="b-comment__link-block">
								<a
									class="b-link b-link--comment"
									href="javascript:void(0);"
									title="Ответить"
									>Ответить</a
								><a
									class="b-link b-link--comment"
									href="javascript:void(0);"
									title="Цитировать"
									>Цитировать</a
								>
							</div>
							<i class="b-icon b-icon--answer icon-answer"></i>
						</div>
						<div class="b-comment b-comment--answer">
							<div class="b-comment__wrapper b-comment__wrapper--answer">
								<div class="b-comment__line">
									<p class="b-comment__person">Татьяна Михайловна</p>
									<span class="b-comment__date">07.10.2020 в 16:12 </span>
								</div>
								<blockquote class="b-comment__blockquote">
									«Разнообразный и богатый опыт дальнейшее развитие различных
									форм деятельности играет важную роль в формировании позиций,
									занимаемых участниками в отношении поставленных задач»
								</blockquote>
								<p class="b-comment__text">
									Разнообразный и богатый опыт дальнейшее развитие различных
									форм деятельности играет важную роль в формировании позиций,
									занимаемых участниками в отношении поставленных задач.
								</p>
								<div class="b-comment__link-block">
									<a
										class="b-link b-link--comment"
										href="javascript:void(0);"
										title="Ответить"
										>Ответить</a
									><a
										class="b-link b-link--comment"
										href="javascript:void(0);"
										title="Цитировать"
										>Цитировать</a
									>
								</div>
								<i class="b-icon b-icon--answer icon-answer"></i>
							</div>
						</div>
					</div>
					<div class="b-comment">
						<div class="b-comment__wrapper">
							<div class="b-comment__line">
								<p class="b-comment__person">Константин Константинопольский</p>
								<span class="b-comment__date">07.10.2020 в 16:12 </span>
							</div>
							<p class="b-comment__text">
								Разнообразный и богатый опыт дальнейшее развитие различных форм
								деятельности играет важную роль в формировании позиций,
								занимаемых участниками в отношении поставленных задач.
								Повседневная практика показывает, что начало повседневной работы
								по формированию позиции играет важную роль в формировании систем
								массового участия. Задача организации, в особенности же рамки и
								место обучения кадров влечет за собой процесс внедрения и
								модернизации систем массового участия.
							</p>
							<div class="b-comment__link-block">
								<a
									class="b-link b-link--comment"
									href="javascript:void(0);"
									title="Ответить"
									>Ответить</a
								><a
									class="b-link b-link--comment"
									href="javascript:void(0);"
									title="Цитировать"
									>Цитировать</a
								>
							</div>
							<i class="b-icon b-icon--answer icon-answer"></i>
						</div>
					</div>
					<p class="b-title b-title--comment-add b-title--comment">
						Добавить комментарий
					</p>
					<div class="b-input b-input--comment">
						<input
							class="b-input__input-field b-input__input-field--comment"
							id="textarea-notify-before"
							type="textarea"
							placeholder=""
							name="textarea-notify-before"
						/>
						<i class="b-icon b-icon--check icon-check" />
						<i class="b-icon b-icon--close icon-close" />
						<!-- <img class="b-input__img b-input__img--tablet" src="/images/inhtml/edit-icon-tablet.jpg" alt="icon" title=""/>
							<img class="b-input__img b-input__img--mobile" src="/images/inhtml/edit-icon-mobile.jpg" alt="icon" title=""/> 
					</div>
					<button class="b-button b-button--fill">Отправить</button>
				</div>
			</div> -->
		</div>


		<transition v-if="dialogForPortal" name="modal">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">
						<div class="modal-header">
							<slot name="header">
								Отправить на обсуждение № {{obj.number}}
							</slot>
						</div>

						<div class="modal-body">
							<slot name="body">
								<label class="label">
									<p style="margin-bottom:7px">Наименование КР</p>
									<input v-model="obj.name" class="inp" readonly type="text">
								</label>

								<label class="label label-marg">
									<p style="margin-bottom:7px">Дата начала обсуждения</p>
									<input v-model="dateNew" @change="changeDate(dateNew)" class="inp" type="date">
								</label>
								
								<label class="label label-marg">
									<p style="margin-bottom:7px">Дата окончания обсуждения</p>
									<input v-model="date30" readonly class="inp" type="date">
								</label>
								
								<!-- <label class="label label-marg">
									<input ref="inpfile" accept=".doc, .docx, application/pdf" class="inp" type="file">
								</label> -->
								<button v-show="!fileObs" @click="$refs['fileObs'].click()" class="label-marg b-button b-button--fill b-button--full b-button--file" >
									<iconDownloadSvg class="b-icon b-icon--report icon-download" />
									<input accept=".doc, .docx, application/pdf" v-show="false" type="file" ref="fileObs" @change="handleFileUpload('fileObs')"/>
									Добавить файл
								</button>

								<div v-show="fileObs" class="label-marg b-file class-relative">
									<a class="b-file__name" href="javascript:void(0);" :title="fileObs&&fileObs.name">
										<iconFileSvg class="b-icon b-icon--file icon-file" />
										<span>{{fileObs&&fileObs.name}}</span>
									</a>
									<iconCloseSvg @click="resetFile('fileObs')" style="float:right" class="b-icon b-icon--close icon-close class-custom" />
								</div>
							</slot>
						</div>

						<div class="modal-footer">
							<slot name="footer">
								<button class="b-button b-button--success" @click="nextPortal(obj.id, fileObs, 31)">Отправить</button>
								<button class="b-button b-button--cancel ml-2" @click="dialogForPortal=!dialogForPortal">Отменить</button>
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
import iconSearchSvg from "../../assets/icons/svg/search.svg";
import iconAngleDownSvg from "../../assets/icons/svg/angle-down.svg";
import iconAngleleftSvg from "../../assets/icons/svg/angle-left.svg";
import iconDownloadSvg from "../../assets/icons/svg/download.svg";
import iconSortdownSvg from "../../assets/icons/svg/sort-down.svg";
import iconSortupSvg from "../../assets/icons/svg/sort-up.svg";
import iconCalendarSvg from "../../assets/icons/svg/calendar.svg";
import iconFileSvg from "../../assets/icons/svg/file.svg";
import iconApproved from "../../assets/icons/svg/approved_checklist.svg";
import iconNotApproved from "../../assets/icons/svg/not_approved.svg";

import { mapActions, mapGetters } from "vuex";

export default {
	components: {
		iconSvg,
		iconSearchSvg,
		iconAngleDownSvg,
		iconCloseSvg,
		iconDownloadSvg,
		iconSortdownSvg,
		iconSortupSvg,
		iconAngleleftSvg,
		iconCalendarSvg,
		iconFileSvg,
		iconApproved,
		iconNotApproved
	},
	data: () => ({
		icon_check_list: false,
		dialogCheckList: false,
		fileObs: null,
		dialogForPortal: false,
		dateNew: new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ),
		date30: new Date(new Date().getTime()+(86400000*30)).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ),
		obj: {
			number: null,
			name: null,
			stage: { id: null, name: null },
			status: { id: null, name: null },
			type: { id: null, name: null },
			serviceType: null,
			mkb: null,
			date: null,
			startPublicDiscussionDate: null,
			finalPublicDiscussionDate: null,
			expertiseResult: { id: null, name: null },
			npsDecision: { id: null, name: null },
			locationAddress: null,
			protocolDate: null,
			protocolNumber: null,
			developer: { id: null, name: null },
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
		devList: {},
		fileCr: { id: null },
		fileResMZ: { id: null },
		fileZacl: { id: null },
		fileWithSopr: { id: null },
		fileWithSoprPodp: { id: null },
		filePublicCouncilResult: { id: null },
		fileProtocolNpc: { id: null }
	}),
	computed: {
		...mapGetters({
			getUserInfo: 'auth/getUserInfo',
			apiUrl: 'apiUrl',
			apiUrlPortal: 'apiUrlPortal'
		})
	},
	methods: {
		...mapActions({
			apiAll: "api/apiAll"
		}),
		computedShow(stage, status) {
			// console.log)(o)
			return stage.find(f => f == this.obj.stage.id) && status.find(f => f == this.obj.status.id)
		},
		computedChangeStatus(role, status, stage) {
			let arr = [];
			if(role == 2 && status == 3 && stage == 1) arr.push({name: 'Принять', nextStatus: 4})
			
			// if(role == 1 && status == 4 && stage == 1) arr.push({name: 'Создать заявление', nextStatus: 6})
			if(role == 1 && status == 4 && stage == 1) arr.push({name: 'Отправить на обсуждение', nextStatus: null})
			
			if(role == 2 && status == 10 && stage == 2) arr.push({name: 'Взять в работу', nextStatus: 11})
			if(role == 3 && status == 13 && stage == 3) arr.push({name: 'Взять в работу', nextStatus: 14})
			if(role == 4 && status == 16 && stage == 4) arr.push({name: 'Взять в работу', nextStatus: 17})
			if(role == 1 && status == 18 && stage == 5) arr.push({name: 'Взять в работу', nextStatus: 21})
			if(role == 1 && status == 21 && stage == 5) arr.push({name: 'Проинформировать об утверждении', nextStatus: 22})


			//Работа с КР полученной от Минздрава
			if(role == 1 && status == 12 && stage == 2) arr.push({name: 'Взять в работу', nextStatus: 6})
			
			//Работа с КР полученной от ЦЭККМП
			if(role == 1 && status == 15 && stage == 3) arr.push({name: 'Взять в работу', nextStatus: 6})
			
			//Работа с КР полученной от НПС
			if(role == 1 && status == 20 && stage == 5) arr.push({name: 'Взять в работу', nextStatus: 8})
			if(role == 2 && status == 9 && stage == 2) arr.push({name: 'Взять в работу', nextStatus: 11})
			
			if(role == 1 && status == 30 && stage == 5) arr.push({name: 'Взять в работу', nextStatus: 21})

			//доработать логику
			if(role == 1 && status == 22 && stage == 6) arr.push({name: 'Сформировать письмо', nextStatus: 29})
			// if(role == 1 && status == 29 && stage == 6) arr.push({name: 'Отправить', nextStatus: 23})
			//доработать логику

			if(role == 3 && status == 23 && stage == 6) arr.push({name: 'Взять в работу', nextStatus: 24})
			
			if(role == 1 && status == 32 && stage == 1) arr.push({name: 'Создать заявление', nextStatus: 6})
			
			return arr
		},
		savePut(obj, nextStatus) {
			if(obj.status.id == 22 && obj.stage.id == 6 && nextStatus == 29) {
				let a = document.createElement('a')
				a.href = `${this.apiUrl}api/Projects/getLetter?id=${this.$route.params.id}`
				a.target = '_blank'
				a.click()
			}
			this.apiAll({type: "put", url:`api/Projects?id=${this.$route.params.id}&statusId=${nextStatus}`, id: undefined, }).then((res) => {
				this.$router.push('/listCr')
			})
		},
		changeDate(date) {
			this.date30 = new Date(new Date(date).getTime()+(86400000*30)).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
		},
		nextPortal(id, file, nextStatus) {
			if(file) {
				let newObj = {
					"id": id,
					"name": this.obj.name ? this.obj.name : undefined,
					"statusId": nextStatus,
					"typeId": this.obj.type.id,
					"number": this.obj.number,
					"date": this.obj.date ? this.obj.date : undefined,
					"serviceTypeId": this.obj.serviceType ? this.obj.serviceType.id : undefined,
					"mkbId": this.obj.mkb ? this.obj.mkb.id : undefined,
					"locationAddress": this.obj.locationAddress ? this.obj.locationAddress : undefined,
					"startPublicDiscussionDate": this.dateNew ? this.dateNew : undefined,
					"finalPublicDiscussionDate": this.date30 ? this.date30 : undefined,
					"protocolNumber": this.obj.protocolNumber,
					"publicationAddress": this.obj.publicationAddress ? this.obj.publicationAddress : undefined,
					"rubricatorId": this.obj.rubricatorId,
					"mkbCodes": this.obj.mkbCodes ? this.obj.mkbCodes.map(m=>m.id) : undefined,
					"ageGroups": this.obj.ageGroups ? this.obj.ageGroups.map(m=>m.id) : undefined,
					"companies": this.obj.developers ? this.obj.developers.map(m=>m.id) : undefined
				}
				let data = new FormData()
				data.append('ProjectId', id)
				data.append('File', file)
				data.append('TypeId', 10)

				//отправляем файл (на портал) на сервер и ждем ответа что все успешно
				this.api.post(`${this.apiUrl}api/ClinicalRecommendationPortal/SendProjectFile`, data)
				.then(res => {
					if(res.status == 200 && res.data.portalResponseStatusCode == 200) {
						
						//обновляем КР (даты)
						this.apiAll({type: 'put', url: `api/Projects`, obj: newObj, id: id})
						.then(res => {
							if(res.status == 200) {

								//обновляем в КР (статус)
								this.apiAll({type: "put", url:`api/Projects?id=${id}&statusId=${nextStatus}`, id: undefined, })
								.then((res) => {
									if(res.status == 200) {
										this.$notify({ group: 'foo', duration: 5000, type: 'success', title: 'Успешно', text: 'КР отправлена на обсуждение' })
										this.$router.push('/listCr')
									}
								})
							}
						})
					} else {
						this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Файл не был отправлен на портал, попробуйте еще раз!' })
					}
				})
			} else {
				this.$notify({ group: 'foo', duration: 5000, type: 'error', title: 'Ошибка', text: 'Прикрепите файл для отправки...' })
			}
		},
		handleFileUpload(fileName) {
			this[fileName] = this.$refs[fileName].files[0]
		},
		resetFile(fileName) {
			if(confirm('Вы уверены что хотите удалить прикрепленный файл?')) {
				this.$refs[fileName].value = ''
				this[fileName] = null
			}
		},
	},
	created() {
		this.apiAll({type: 'get', url: `api/Account`, id: undefined}).then(res => { this.devList = res.data })
		this.apiAll({type: "get", url: `api/Projects`, id: this.$route.params.id,}).then((res) => {
			this.obj = res.data;
		});
		this.apiAll({type: "get", url: `api/ProjectFiles/${this.$route.params.id}`,id: undefined }).then((res) => {
			res.data.forEach((el) => {
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
	},
};
</script>

<style>
@import "../../style/stylePages.css";

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
  width: 700px;
  margin: 0px auto;
  /* padding: 20px 30px; */
  background-color: #fff;
  border-radius: 10px;
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
	background: #003b84;
	color: white;
	font-size: 19px;
	border-bottom: 1px solid lightgray;
	padding: 10px;
}
.modal-footer {
	text-align: center;
	padding: 10px 20px;
}

.modal-body {
  margin: 20px 0;
  padding: 20px 100px;
}

.label {
	font-size: 18px;
}
.label-marg {
	margin-top: 15px;
}

.inp {
	padding: 10px;
	border-radius: 10px;
}
.inp:hover {
	background-color: #fafafa;
	box-shadow:0 0 4px rgba(0,0,0,0.3);
	transition: .3s box-shadow;
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