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

const userInfo = new UserInfo(titleProfile, subtitleProfile, avatarProfile);

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
  popupUpdateAvatar,
  handleSubmitFormUpdateAvatar
);

popupAvatar.setEventListeners();

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

popupEdit.setEventListeners();

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

popupAdd.setEventListeners();

buttonEdit.addEventListener('click', () => {
    popupEdit.open();
    popupEdit.setInputValue(user.getUserInfo());
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
    // "Content-Type": "application/json",
  },
});

const user = new UserInfo( titleProfile, subtitleProfile, avatarProfile) ;

// Promise.all([api.getUserInfo(), api.getInitialCards()])
//   .then(([userProfile, cards]) => {
//     user.setUserInfo(userProfile)

//     userId = userProfile._id
//     cardList.renderItems(cards)
//   })
//   .catch((error) => console.log(`Ошибка: ${error}`))

// Отрисовка карточек с сервера + отрисовка данных пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile)
    // Использовал контрольную проверку для попадания правильных данных
    const error_title = "При получении данных с сервера"
    const editName = popupEditProfile.querySelector(".popup__input_type_name")
    const editJob = popupEditProfile.querySelector(".popup__input_type_job")
    if (editName) {
      editName.value = userProfile
.name
    } else console.log(error_title + " не найден Edit popup__input_type_name")
    if (editJob) {
      editJob.value = userProfile
.about
    } else console.log(error_title + " не найден Edit popup__input_type_job")
    userId = userProfile._id
    cardList.renderItems(cards)
  })
  .catch((error) => console.log(`Ошибка: ${error}`))
