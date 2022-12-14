// Для себя
////////////////////////////////////////////////////////////////////////////////////////////////////////
// это переменные формы
const editForm = document.querySelector('#editForm');
const newCard = document.querySelector('#newCard');

// это переменные попап
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_add-card');

// это поля инпутов в DOM, ищем через "name" очень удобно не нужно ID  или водить новый класс
const nameInput = document.querySelector('input[name="nameInput"]'); // Редактирование имени
const jobInput = document.querySelector('input[name="jobInput"]'); // Редактирование информации о работе

// это кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupEditProfile.querySelector('.popup__close-button'); // эта переменная работает только через переменную "popupEditProfile", через документ ломается функция

const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');

// находит кнопку Лайк
const likeButton = document.querySelector('.element__like-button');


// это функция открывает "popup" через замену "display: none" на "display: flex;" в "css"
function openPopup() {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
}

// это функция закрывает "popup". так же меняет "display"
function closePopup() {
  popupEditProfile.classList.remove('popup_opened');
}

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

// эта функция изменяет состояние кнопки лайк
function changeLike(evt){
  evt.target.classList.toggle('element__like-button_active');
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener('submit', handleFormSubmit);
////////////////////////////////////////////////////////////////////////////////////////////////////////

// это слушатели событий

editButton.addEventListener('click', openPopup); // этот слушатель открывает Попап
closeButton.addEventListener('click', closePopup); // этот слушатель закрывает Попап
likeButton.addEventListener('click', changeLike); // этот слушатель изменяет лайк


// эти строчки кода закрывает "popup" по нажатию на область вне "popup"
// желательно делать в связке так как может работать не предсказуемо
// //////////////////////////////
// popup.addEventListener('click', function(event){
//   if(!event.defaultPrevented){
//     closePopup();
//   }
// })
// document.querySelector('.popup__container').addEventListener('click', function(event){
//   event.preventDefault();
// })
///////////////////////////////
