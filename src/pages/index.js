import './index.css';

import {template, cardsContainer, profileForm, formNewCard, nameInput, jobInput, titleInput, imageInput,
  buttonEdit, buttonAddFoto,  popupEditProfile, popupNewCard,
  popupImage, nameTitle, jobSubtitle} from '../utils/constants.js';

import {initialCards, validationConfig} from '../utils/dataSet'

import {Card} from '../components/Сard';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {Section} from '../components/Section';
import {UserInfo} from '../components/UserInfo';

// Валидатор
const formNewCardFormValidation = new FormValidator(validationConfig, popupNewCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditProfile);

profileFormValidation.enableValidation();
formNewCardFormValidation.enableValidation();

// информация о пользователе
const userInfo = new UserInfo({nameInput: nameInput, jobInput: jobInput,});


// создание карточки
function createCard(value, template) {
  const card = new Card(value, template, () => {
    const popupPhotos = new PopupWithImage(popupImage);
    popupPhotos.setEventListeners();
    popupPhotos.open({value})
  });
  return card.generateCard();
}

// рендерит карточки
const cards = new Section({
  items: initialCards,
  renderer: (value)=> {
    cards.addItem(createCard(value, template));
}
}, cardsContainer);

cards.renderItems();



// класса редактирования профиля
const popupProfile = new PopupWithForm(popupEditProfile, (evt)=> {
  evt.preventDefault();
  const formValues = popupProfile.getFormValues();
  userInfo.setUserInfo({nameInput: formValues.nameInput, jobInput: formValues.jobInput });
  popupProfile.close();
});

popupProfile.setEventListeners();


const popupFormNewCard = new PopupWithForm(popupNewCard, (value)=> {
  evt.preventDefault();
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



