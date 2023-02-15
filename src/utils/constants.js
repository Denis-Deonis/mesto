const template = '.element-template';
const cardsContainer = '.elements__list';
const popupImage = '.popup_type_image';

const nameInput = ".profile__title";
const jobInput  = ".profile__subtitle";

// это переменные формы
const profileForm = document.forms.editForm;
const formNewCard = document.forms.newCard;




const titleInput = formNewCard.elements.titleInput; // Добавление заголовка картинки
const imageInput = formNewCard.elements.imageInput; // Добавление ссылки на картинку

// это кнопки
const buttonEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const buttonAddFoto = document.querySelector('.profile__add-button'); // кнопка для добавления фото


const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_add-card');


// это профиль тайтл и сабтайтл
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');


export {template, cardsContainer, profileForm, formNewCard, nameInput, jobInput, titleInput, imageInput,
  buttonEdit, buttonAddFoto,  popupEditProfile, popupNewCard,
  popupImage, nameTitle, jobSubtitle}
