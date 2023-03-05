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


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "014483e6-50f6-4a65-91e7-a3fda779d527",
    "Content-Type": "application/json",
  },
});


  Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

  const userInfo = new UserInfo({name: titleProfile, about: subtitleProfile, avatar: avatarProfile});

  const popupPhotos = new PopupWithImage(popupImage);
  popupPhotos.setEventListeners();


function createCard(value, template) {
  const card = new Card(value, template, () => {popupPhotos.open({value})}, userId,
    (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    (cardId) => {
      popupConfirmation.open();
      popupConfirmation.submitCallback(() => {
        const id = card._id
        console.log(card._id)
        console.log(id)
        api.deleteCard(id)
          .then(() => {
            popupConfirmation.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    }
  );
  return card.generateCard();
};

const popupConfirmation = new PopupConfirmation(
  popupConfirmationDelete  );

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
        cardList.addNewItem(createCard(formData, template));
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
    validatorFormUpdateAvatar.disableSubmitButton();
  }
);

buttonAddFoto.addEventListener('click', ()=> {
  formNewCardFormValidation.resetValidation();
  formNewCardFormValidation.disableSubmitButton();
  popupAdd.open();
});


const formNewCardFormValidation = new FormValidator(validationConfig, popupNewCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditProfile);
const validatorFormUpdateAvatar = new FormValidator(validationConfig, popupUpdateAvatar);


validatorFormUpdateAvatar.enableValidation();
profileFormValidation.enableValidation();
formNewCardFormValidation.enableValidation();
