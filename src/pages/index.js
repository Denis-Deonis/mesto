import './index.css';

import  {template, cardsContainer,  titleProfile, subtitleProfile,
  buttonEdit, buttonAddFoto,  popupEditProfile, popupNewCard,
  popupImage,  avatarProfile, buttonUpdateAvatar,
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
import {Api} from '../components/Api'

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

const userInfo = new UserInfo({name: titleProfile, about: subtitleProfile, avatar: avatarProfile});

const popupPhotos = new PopupWithImage(popupImage);
popupPhotos.setEventListeners();



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

popupConfirmation.setEventListeners();


const cardList = new Section(
  {
    renderer: (value)=> {
      cardList.addItem(createCard(value, template));
    }
  }, cardsContainer);




const popupAvatar = new PopupWithForm(
  popupUpdateAvatar,
  (data) => {
    popupAvatar.loading(true);
    api.updateProfileAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatar.loading(false);
      });
  }
);

popupAvatar.setEventListeners();

// Форма редактирования профиля

const popupEdit = new PopupWithForm(
  popupEditProfile,
  (dataForm) => {
    popupEdit.loading(true);
    api.editProfile(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEdit.loading(false);
      });
  }
);

popupEdit.setEventListeners();


const popupAdd = new PopupWithForm(
  popupNewCard,
  // handleSubmitFormAddCard
  (formData) => {
    popupAdd.loading(true);
    api.addNewCard(formData)
      .then((formData) => {
        cardList.addItem(createCard(formData));
        popupAdd.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAdd.loading(false);
      });
  }
);

popupAdd.setEventListeners();

buttonEdit.addEventListener('click', () => {
    popupEdit.open();
    popupEdit.setInputValue(userInfo.getUserInfo());
    profileFormValidation.resetValidation();
    profileFormValidation.disableSubmitButton();
  },
  false
);

buttonUpdateAvatar.addEventListener('click', () => {
    popupAvatar.open();
    validatorFormUpdateAvatar.resetValidation();
    validatorFormUpdateAvatar.disableSubmitButton();
  },
  false
);

buttonAddFoto.addEventListener('click', ()=> {
  formNewCardFormValidation.resetValidation();
  formNewCardFormValidation.disableSubmitButton();
  popupAdd.open();
});


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "014483e6-50f6-4a65-91e7-a3fda779d527",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    userInfo.setUserInfo(userProfile)

    userId = userProfile._id
    cardList.renderItems(cards)
  })
  .catch((error) => console.log(`Ошибка: ${error}`))


