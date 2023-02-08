import './index.css';

import {profileForm, formNewCard, nameInput, jobInput, titleInput, imageInput,
  buttonEdit, buttonAddFoto, template, popupEditProfile, popupNewCard,
  popupImage, nameTitle, jobSubtitle, cardsContainer} from '../utils/constants.js';

import {initialCards, validationConfig} from '../utils/dataSet'

import {Card} from '../components/Сard';
import {FormValidator} from '../components/FormValidator';
import {Popup} from '../components/Popup';
import {PoppWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {Section} from '../components/Section';
import {UserInfo} from '../components/UserInfo';


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
