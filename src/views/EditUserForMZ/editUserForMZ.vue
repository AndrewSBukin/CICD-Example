<template>
  <div class="b-page-wrapper">
    <div class="b-head-block b-head-block--link">
      <div class="b-container">
        <div class="b-head-block__wrapper">
          <a class="b-link b-link--header" href="javascript:void(0);" title="">
            <iconAngleleftSvg class="b-icon b-icon--header icon-angle-left" />
            <!-- <i class="b-icon b-icon--header icon-angle-left"></i> -->
            <span>Назад</span>
          </a>
          <h1 class="b-title b-title--h1">Редактирование нового пользователя
          </h1>
        </div>
      </div>
    </div>
    <div class="b-container">
      <div class="b-window">
        <div class="b-form" action="/">
          <div class="b-form__first-lavel">
            <div class="b-form__group b-form__group--min">
              <div class="b-form__left">
                <label class="b-label" for="role">Роль
                </label>
              </div>
              <div class="b-form__right">
                <div class="b-select">
                  <select class="b-select__select-field" id="role" name="role" disabled="disabled">
                    <option class="b-select__option" selected="selected">Сотрудник МПНКО
                    </option>
                    <option class="b-select__option" value="один">один
                    </option>
                    <option class="b-select__option" value="два">два
                    </option>
                    <option class="b-select__option" value="три">три
                    </option>
                    <option class="b-select__option" value="четыре">четыре
                    </option>
                  </select>
                  <div class="b-icon">
                    <iconAngleDownSvg class="b-icon--down icon-angle-down" />
                  </div>
                  <!-- <i class="b-icon b-icon--down icon-angle-down"></i> -->
                </div>
              </div>
            </div>
            <div class="b-form__group b-form__group--min">
              <div class="b-form__left">
                <label class="b-label" for="name">Наименование МПНКО
                </label>
              </div>
              <div class="b-form__right">
                <div class="b-input"><input class="b-input__input-field" id="name" type="text" placeholder="Введите наименование МПНКО" name="name" value="Ассоциация Детских Ревматологов"/><i class="b-icon b-icon--check icon-check"></i><i class="b-icon b-icon--close icon-close"></i>
                </div>
              </div>
            </div>
            <div class="b-form__group b-form__group--min">
              <div class="b-form__left">
                <label class="b-label" for="fio">ФИО пользователя
                </label>
              </div>
              <div class="b-form__right">
                <div class="b-input"><input class="b-input__input-field" id="fio" type="text" placeholder="Введите ФИО пользователя" name="fio" value="Алексеевская Татьяна Михайловна"/><i class="b-icon b-icon--check icon-check"></i><i class="b-icon b-icon--close icon-close"></i>
                </div>
              </div>
            </div>
            <div class="b-form__group b-form__group--min">
              <div class="b-form__left">
                <label class="b-label" for="email-developer">Логин
                </label>
              </div>
              <div class="b-form__right">
                <div class="b-input"><input class="b-input__input-field" id="email-developer" type="email" placeholder="Введите e-mail пользователя" name="email-developer" value="t.alekseevskaya@minzdrav.gov.ru"/><i class="b-icon b-icon--check icon-check"></i><i class="b-icon b-icon--close icon-close"></i>
                </div>
              </div>
            </div>
            <div class="b-form__group b-form__group--min">
              <div class="b-form__left">
                <label class="b-label" for="pass">Пароль
                </label>
              </div>
              <div class="b-form__right b-form__right--flex">
                <div class="b-input"><input class="b-input__input-field" id="pass" type="password" placeholder="Введите ФИО пользователя" name="fio" value="* * * * * * * *" disabled="disabled"/><i class="b-icon b-icon--check icon-check"></i><i class="b-icon b-icon--close icon-close"></i>
                </div>
              </div>
            </div>
            <div class="b-form__group b-form__group--min">
              <div class="b-form__left b-form__left--delete">
                <label class="b-label" for="new-pass">Изменить пароль
                </label>
              </div>
              <div class="b-form__right b-form__right--flex"><a class="b-link b-link--increased" href="javascript:void(0);" title="Отправить ссылку для создания пароля">Отправить ссылку для создания пароля</a>
              </div>
            </div>
          </div>
          <div class="b-form__group b-form__group--button">
            <button class="b-button b-button--fill b-button--full">Сохраненить изменения
            </button><a class="b-button b-button--empty b-button--full" href="javascript:void(0);" title="Отменить">Отменить</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconAngleleftSvg from "../../assets/icons/svg/angle-left.svg"
import iconAngleDownSvg from "../../assets/icons/svg/angle-down.svg"
export default {
  components: {
    iconAngleleftSvg,
    iconAngleDownSvg,
  }
}
</script>

<style>
  @import '../../style/stylePages.css';
</style>