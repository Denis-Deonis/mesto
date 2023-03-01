import './index.css';

import  {template, cardsContainer,  titleProfile, subtitleProfile,
  buttonEdit, buttonAddFoto,  popupEditProfile, popupNewCard,
  popupImage,  nameInputEdit, jobInputEdit, popupAvatarProfile, buttonUpdateAvatar,
  popupUpdateAvatar, popupConfirmationDelete,
} from '../utils/constants.js';

import {validationConfig} from '../utils/validationConfig'

import {Card} from '../components/Сard';
import {FormValidator} from '../components/FormValidator';
import {PopupWithForm} from '../components/PopupWithForm';
import {PopupWithImage} from '../components/PopupWithImage';
import {PopupConfirmation} from '../components/PopupConfirmation';
import {Section} from '../components/Section';
import {UserInfo} from '../components/UserInfo';
import {Api} from '../utils/Api'

let userId;

function createCard(value, template) {
  const card = new Card(value, template, () => {popupPhotos.open({value})}, userId,
    async () => {
      try {
        const response = await api.addLike(value._id)
        card.like()
        card.likesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    async () => {
      try {
        const response = await api.removeLike(value._id)
        card.dislike()
        card.likesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    () => { popupConfirmation.open(card)},
  );
  return card.generateCard();
};

const formNewCardFormValidation = new FormValidator(validationConfig, popupNewCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditProfile);
const validatorFormUpdateAvatar = new FormValidator(validationConfig, popupUpdateAvatar);


validatorFormUpdateAvatar.enableValidation();
profileFormValidation.enableValidation();
formNewCardFormValidation.enableValidation();

const userInfo = new UserInfo(titleProfile, subtitleProfile, popupAvatarProfile);

const popupPhotos = new PopupWithImage(popupImage);
popupPhotos.setEventListeners();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "014483e6-50f6-4a65-91e7-a3fda779d527",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile)

    userId = userProfile._id
    cardList.renderItems(cards)
  })
  .catch((error) => console.log(`Ошибка: ${error}`))

const popupConfirmation = new PopupConfirmation(
  popupConfirmationDelete,
  async (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        card.remove()
        popupConfirmation.close()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }
);


const cardList = new Section(
  {
    renderer: (value)=> {
      cardList.addItem(createCard(value, template));
    }
  }, cardsContainer);




// Форма обновления аватара
async function handleSubmitFormUpdateAvatar(data) {
  try {
    const userProfile = await api.updateProfileAvatar(data);
    userInfo.setUserInfo(userProfile);
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  }
};
const popupAvatar = new PopupWithForm(
  popupAvatarProfile,
  handleSubmitFormUpdateAvatar
);

// Форма редактирования профиля
async function handleSubmitFormEditProfile(data) {
  try {
    const userProfile = await api.editProfileUserInfo(data)
    user.setUserInfo(userProfile)
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
};

const popupEdit = new PopupWithForm(
  popupEditProfile ,
  handleSubmitFormEditProfile
);

// Форма добавления карточек
async function handleSubmitFormAddCard(data) {
  try {
    const newCard = await api.addNewCard(data)
    cardList.addItem(createCard(newCard))
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
};

const popupAdd = new PopupWithForm(
  popupNewCard,
  handleSubmitFormAddCard
);

buttonEdit.addEventListener('click', () => {
    popupEdit.open();
    popupEdit.setInputValue(user.getUserInfo());
    profileFormValidation.disableSubmitButton();
  },
  false
);

buttonUpdateAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.open();
    validatorFormUpdateAvatar.disableSubmitButton();
  },
  false
);

buttonAddFoto.addEventListener('click', ()=> {
  formNewCardFormValidation.resetValidation();
  popupAdd.open();
});




