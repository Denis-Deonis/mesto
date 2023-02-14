import './index.css';

import {template, cardsContainer, profileForm, formNewCard, nameInput, jobInput, titleInput, imageInput,
  buttonEdit, buttonAddFoto, popupEditProfile, popupNewCard,
  nameTitle, jobSubtitle, cardsContainer} from '../utils/constants.js';

import {initialCards} from '../utils/initialCards';
import { validationConfig } from '../utils/validationConfig';
import { selectorConfig } from '../utils/selectorConfig';

import {Card} from '../components/Сard';
import {PopupWithImage} from '../components/PopupWithImage';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {Section} from '../components/Section';
import {UserInfo} from '../components/UserInfo';

// создание карточки
function createCard(value) {
  return new Card(value, template, () => {popupPhotos.open(value.link, value.name)}).generateCard();
}

// открытие картинки по нажатию
const popupPhotos = new PopupWithImage(selectorConfig.popupImageSelector);
popupPhotos.setEventListeners();

// рендерит карточки
const cards = new Section(
  {
    renderer: (value)=> {
      cards.addItem(createCard(value));
    }
  }, cardsContainer);

cards.renderItems(initialCards.reverse());


// Валидатор
const formNewCardFormValidation = new FormValidator(validationConfig, popupNewCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditProfile);

profileFormValidation.enableValidation();
formNewCardFormValidation.enableValidation();



// информация о пользователе
const userInfo = new UserInfo({nameInput, jobInput,});

// класса редактирования профиля
const popupProfile = new PopupWithForm(profileForm, (evt)=> {
  evt.preventDefault();
  userInfo.setUserInfo({nameInput, jobInput });
  popupProfile.close();
});

popupProfile.setEventListeners();


const popupFormNewCard = new PopupWithForm(formNewCard, (value)=> {
  cards.addNewItem(createCard(value));
  popupFormNewCard.close();
});

popupFormNewCard.setEventListeners();



buttonEdit.addEventListener('click', () => {
  popupProfile();
}); // этот слушатель открывает Попап



buttonAddFoto.addEventListener('click', ()=> {
  popupNewCard();
});


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
