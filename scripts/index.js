// Для себя

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Открытие и закрытие попапа

// эти переменные находят классы в html, чтобы управлять ими
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button').addEventListener('click', openPopup);
// эта переменная работает только через переменную "popup", через документ ломается функция
const closeButton = popup.querySelector('.popup__close-button').addEventListener('click', closePopup);

// это слушатели событий. я их сразу добавил в переменную
// editButton.addEventListener('click', openPopup);
// closeButton.addEventListener('click', closePopup);

// это функция открывает "popup" через замену "display: none" на "display: flex;" в "css"
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
}

// это функция закрывает "popup". так же меняет "display"
function closePopup() {
  popup.classList.remove('popup_opened');
}

// эти строчки кода закрывает "popup" по нажатию на область вне "popup"
// желательно делать в связке так как может работать не предсказуемо
//////////////////////////////
popup.addEventListener('click', function(event){
  if(!event.defaultPrevented){
    closePopup();
  }
})
document.querySelector('.popup__container').addEventListener('click', function(event){
  event.preventDefault();
})
///////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Редактирование имени и информации о себе

// Находим форму в DOM
let formElement = document.querySelector('form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');

let nameTitle = document.querySelector('.profile__title');
let jobSubtitle = document.querySelector('.profile__subtitle');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

// Находим "profile__title", чтобы вставить имя с помощью "value"
  nameTitle.textContent = nameInput.value;
// Находим "profile__subtitle", чтобы вставить профессию с помощью "value"
  jobSubtitle.textContent = jobInput.value;

  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
////////////////////////////////////////////////////////////////////////////////////////////////////////
