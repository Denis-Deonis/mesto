const template = '.element-template';
const cardsContainer = '.elements__list';
const popupImage = '.popup_type_image';

const titleProfile = ".profile__title";
const subtitleProfile  = ".profile__subtitle";
const popupAvatarProfile = ".profile__avatar";

const popupEditProfile = '.popup_type_edit-profile';
const popupNewCard = '.popup_type_add-card';
const popupUpdateAvatar = '.popup_type_update-avatar';
const popupConfirmationDelete = ".popup_type_confirmation";


const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddFoto = document.querySelector('.profile__add-button');
const buttonUpdateAvatar = document.querySelector(".profile__edit-avatar");



const nameInputEdit = document.querySelector('.popup__input_name');
const jobInputEdit = document.querySelector('.popup__input_job');

// const titleInput = document.querySelector('.popup__input_type_title');
// const linkInput = document.querySelector('.popup__input_type_image-link');


export {template, cardsContainer,  titleProfile, subtitleProfile,
  buttonEdit, buttonAddFoto,  popupEditProfile, popupNewCard,
  popupImage,  nameInputEdit, jobInputEdit,  popupAvatarProfile, buttonUpdateAvatar,
  popupUpdateAvatar, popupConfirmationDelete,
}
