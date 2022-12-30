// Для себя
////////////////////////////////////////////////////////////////////////////////////////////////////////
// это переменные формы
const profileForm = document.querySelector('#editForm');
const formNewCard = document.querySelector('#newCard');
const template = document.querySelector('#element-template').content;

// это переменные попап
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

// это поля инпутов в DOM, ищем через "name" очень удобно не нужно ID  или водить новый класс
const nameInput = document.querySelector('input[name="nameInput"]'); // Редактирование имени
const jobInput = document.querySelector('input[name="jobInput"]'); // Редактирование информации о работе
const titleInput = document.querySelector('input[name="titleInput"]'); // Добавление заголовка картинки
const imageInput = document.querySelector('input[name="imageInput"]'); // Добавление ссылки на картинку

// это кнопки
const buttonEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const buttonAddFoto = document.querySelector('.profile__add-button'); // кнопка для добавления фото

const buttonClose = popupEditProfile.querySelector('.popup__close-button'); // кнопка закрытия popupEditProfile
const buttonCloseCard = popupNewCard.querySelector('.popup__close-button'); // кнопка закрытия Попап popupNewCard
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

// это профиль тайтл и сабтайтл
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements__list');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupOnEscape);
} // эта функция открывает "popup"

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupOnEscape);
} // эта функция закрывает "popup"


function closePopupOnEscape(evt) {
  if(evt.code == "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}; // эта функция закрывает попап при нажатии Esc

function closeThisPopup(evt) {
  if (evt.currentTarget === evt.target) {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

// // это слушатели событий

// эти слушатели закрывают попап вне блока при событии mousedown, а не click
popupEditProfile.addEventListener('mousedown', closeThisPopup);
popupNewCard.addEventListener('mousedown', closeThisPopup);
popupImage.addEventListener('mousedown', closeThisPopup);

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}); // этот слушатель обработчик «отправки» формы должен быть выше слушателя который открывает Попап. Если будет по другому угроблю опять 3 часа

buttonEdit.addEventListener('click', () => {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
  openPopup(popupEditProfile);
}); // этот слушатель открывает Попап

buttonClose.addEventListener('click', ()=> closePopup(popupEditProfile)); // этот слушатель закрывает Попап popupEditProfile
buttonCloseCard.addEventListener('click', ()=> closePopup(popupNewCard)); // этот слушатель закрывает Попап popupNewCard
buttonCloseImage.addEventListener('click', ()=> closePopup(popupImage));

buttonAddFoto.addEventListener('click', ()=>  openPopup(popupNewCard));

cardsContainer.addEventListener('click', (evt)=> {
  if (evt.target.classList.contains('element__like-button')){
    evt.target.classList.toggle('element__like-button_active')
  }
})

// ниже область по проекту 5-template

function openImage(templateContainer, link){
  const templateTitle = templateContainer.querySelector('.element__title');
  const img = document.querySelector('.popup__image');
  const imgTitle = document.querySelector('.popup__image-title');
  imgTitle.textContent = templateTitle.textContent;
  img.src = link;
  img.alt = templateTitle.textContent;
  openPopup(popupImage);
}


function createCard(value) {
  // это template
const templateContainer = template.querySelector('.element').cloneNode(true);
const templateTitle = templateContainer.querySelector('.element__title');
const templateImage = templateContainer.querySelector('.element__image');
const templateTrash = templateContainer.querySelector('.element__trash');

  templateTitle.textContent = value.name;
  templateImage.src = value.link;
  templateTrash.addEventListener('click', ()=> templateContainer.remove()); // этот слушатель удаляет

  templateImage.addEventListener('click', ()=> openImage(templateContainer, value.link)); // этот слушатель открывает картинку

  return templateContainer
}

cardsContainer.append(...initialCards.map(createCard));

formNewCard.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const name = titleInput.value;
  const link = imageInput.value;
  const newCard = createCard({ name, link });
  cardsContainer.prepend(newCard);
  closePopup(popupNewCard);
  evt.target.reset();
})
