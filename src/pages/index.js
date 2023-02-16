import './index.css';

import {template, cardsContainer,  nameInput, jobInput,
  buttonEdit, buttonAddFoto,  popupEditProfile, popupNewCard,
  popupImage, } from '../utils/constants.js';

import {initialCards, validationConfig} from '../utils/dataSet'

import {Card} from '../components/Сard';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {Section} from '../components/Section';
import {UserInfo} from '../components/UserInfo';

const formNewCardFormValidation = new FormValidator(validationConfig, popupNewCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditProfile);

profileFormValidation.enableValidation();
formNewCardFormValidation.enableValidation();

const userInfo = new UserInfo({nameInput: nameInput, jobInput: jobInput,});

function createCard(value, template) {
  const card = new Card(value, template, () => {
    const popupPhotos = new PopupWithImage(popupImage);
    popupPhotos.setEventListeners();
    popupPhotos.open({value})
  });
  return card.generateCard();
}

const cards = new Section({
  items: initialCards,
  renderer: (value)=> {
    cards.addItem(createCard(value, template));
}
}, cardsContainer);

cards.renderItems();

function formValuesProfile(value) {
  userInfo.setUserInfo(value.nameInput, value.jobInput);
  popupProfile.close();
}

const popupProfile = new PopupWithForm(".popup_type_edit-profile", formValuesProfile);

popupProfile.setEventListeners();

const popupFormNewCard = new PopupWithForm('.popup_type_add-card', (evt)=> {
  
  const formValues = popupFormNewCard.getFormValues();
  const card = createCard({formValues}, template);
  cards.addNewItem(card);
  popupFormNewCard.close();
});

popupFormNewCard.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo;
  const formProfile = popupProfile.getFormElement();
  formProfile.elements.nameInput.value = data.name;
  formProfile.elements.jobInput.value = data.about;
  popupProfile.open();
});

buttonAddFoto.addEventListener('click', ()=> {
  popupFormNewCard.open();
});
