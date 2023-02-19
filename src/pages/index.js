import './index.css';

import {template, cardsContainer,  titleProfile, subtitleProfile,
  buttonEdit, buttonAddFoto,  popupEditProfile, popupNewCard,
  popupImage,  nameInputEdit, jobInputEdit, titleInput, linkInput,} from '../utils/constants.js';

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

const userInfo = new UserInfo(titleProfile, subtitleProfile);

const popupPhotos = new PopupWithImage(popupImage);
popupPhotos.setEventListeners();

function createCard(value, template) {
  const card = new Card(value, template, () => {
    popupPhotos.open({value})
  });
  return card.generateCard();
}

const cards = new Section({
  renderer: (value)=> {
    cards.addItem(createCard(value, template));
}
}, cardsContainer);

cards.renderItems(initialCards);

function formValuesProfile(value) {
  userInfo.setUserInfo(value.nameInput, value.jobInput);
  popupProfile.close();
}

const popupProfile = new PopupWithForm(popupEditProfile, formValuesProfile);

popupProfile.setEventListeners();

function openEditPopup() {
  const user = userInfo.getUserInfo();
  nameInputEdit.value = user.title;
  jobInputEdit.value = user.subtitle;
  profileFormValidation.disableSubmitButton();
  profileFormValidation.resetValidation();
  popupProfile.open();
}

buttonEdit.addEventListener('click', () => openEditPopup());


const popupFormNewCard = new PopupWithForm(
  popupNewCard,
  (item)=> {
    const value = {name: item.titleInput, link: item.imageInput};
    cards.addNewItem(createCard(value, template));
    formNewCardFormValidation.disableSubmitButton();

    popupFormNewCard.close();
});

buttonAddFoto.addEventListener('click', ()=> { popupFormNewCard.open(); });
popupFormNewCard.setEventListeners();


