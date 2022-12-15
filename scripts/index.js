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
const editButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const addButton = document.querySelector('.profile__add-button'); // кнопка для добавления фото
const closeButton = popupEditProfile.querySelector('.popup__close-button'); // эта переменная работает только через переменную "popupEditProfile", через документ ломается функция
const likeButton = document.querySelector('.element__like-button'); // находит кнопку Лайк

// это профиль тайтл и сабтайтл
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');

function openPopup(popup) { popup.classList.add('popup_opened');} // эта функция открывает "popup"
function closePopup(popup) { popup.classList.remove('popup_opened');} // эта функция закрывает "popup"
//function changeLike(evt){ evt.target.classList.toggle('element__like-button_active');} // эта функция изменяет состояние кнопки лайк


// это слушатели событий
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}); // этот слушатель обработчик «отправки» формы должен быть выше слушателя который открывает Попап. Если будет по другому угроблю опять 3 часа

editButton.addEventListener('click', () => {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
  openPopup(popupEditProfile);
}); // этот слушатель открывает Попап

closeButton.addEventListener('click', ()=> closePopup(popupEditProfile)); // этот слушатель закрывает Попап
// likeButton.addEventListener('click', changeLike); // этот слушатель изменяет лайк

addButton.addEventListener('click', ()=> {openPopup(popupNewCard)});

