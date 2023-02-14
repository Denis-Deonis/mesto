import './index.css';

import {profileForm, formNewCard, nameInput, jobInput, titleInput, imageInput,
  buttonEdit, buttonAddFoto, template, popupEditProfile, popupNewCard,
  popupImage, nameTitle, jobSubtitle, cardsContainer} from '../utils/constants.js';

import {initialCards, validationConfig} from '../utils/dataSet'

import {Card} from '../components/Сard';
import {FormValidator} from '../components/FormValidator';
import {Popup} from '../components/Popup';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {Section} from '../components/Section';
import {UserInfo} from '../components/UserInfo';

// создание карточки
function createCard(value) {
  const card = new Card(value, '#element-template', () => popupPhotos.open(value.link, value.name));
  return card.generateCard();
}

// Валидатор
const formNewCardFormValidation = new FormValidator(validationConfig, popupNewCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditProfile);

profileFormValidation.enableValidation();
formNewCardFormValidation.enableValidation();

// открытие картинки по нажатию
const popupPhotos = new PopupWithImage('.popup_type_image');
popupPhotos.setEventListeners();

// рендерит карточки
const cards = new Section({
    renderer: (value)=> {
      cards.addItem(createCard(value));
  }
}, '.elements__list');



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


cards.renderItems(initialCards.reverse);
