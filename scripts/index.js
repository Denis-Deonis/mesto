import {Card} from './Сard.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, validationConfig} from './dataSet.js'

// это переменные формы
const profileForm = document.forms.editForm;
const formNewCard = document.forms.newCard;

// это поля инпутов формы, ищем через "name"
const nameInput = profileForm.elements.nameInput; // Редактирование имени
const jobInput  = profileForm.elements.jobInput; // Редактирование информации о работе

const titleInput = formNewCard.elements.titleInput; // Добавление заголовка картинки
const imageInput = formNewCard.elements.imageInput; // Добавление ссылки на картинку


const template = document.querySelector('#element-template').content;

// это переменные попап
const popups = document.querySelectorAll('.popup')

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

const img = document.querySelector('.popup__image');
const imgTitle = document.querySelector('.popup__image-title');

// это кнопки
const buttonEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const buttonAddFoto = document.querySelector('.profile__add-button'); // кнопка для добавления фото

// это профиль тайтл и сабтайтл
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements__list');

const formNewCardFormValidation = new FormValidator(validationConfig, popupNewCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditProfile);

// Валидатор
profileFormValidation.enableValidation();
formNewCardFormValidation.enableValidation();


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
    const popup = document.querySelector(".popup_opened"); // если переменая глобально, то не работает
    closePopup(popup);
  }
}; // эта функция закрывает попап при нажатии Esc

popups.forEach((popup) => {
  //добавляет каждому попапу слушателя на событие mousedown
    popup.addEventListener('mousedown', (evt) => {
      // проверяет класс попап и затем закрывает
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
      // проверяет класс кнопки и затем закрывает
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})  // закрывает попап вне блока при событии mousedown, а не click

// // // это слушатели событий

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

buttonAddFoto.addEventListener('click', (evt)=> {
  formNewCardFormValidation.resetValidation();
  openPopup(popupNewCard);
  });  // этот слушатель открывает Попап popupNewCard

// ниже область по проекту 5-template

function handleCardClick(link, title) {
  imgTitle.textContent = title;
  img.src = link;
  img.alt = title;
  openPopup(popupImage);
}  // эта функция открывает картинку

function createCard(value) {
  const card = new Card(value, template, handleCardClick);
  return card.generateCard();
} // забирает изшаблона Card для добавления элементов через map

cardsContainer.append(...initialCards.map(createCard)); // добавляет все элементы с картинкой с помощью функции createCard


formNewCard.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const name = titleInput.value;
  const link = imageInput.value;
  const newCard = createCard({ name, link });
  cardsContainer.prepend(newCard);
  closePopup(popupNewCard);
  evt.target.reset();
  formNewCardFormValidation.resetValidation();
})
