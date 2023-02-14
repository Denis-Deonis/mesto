// это переменные формы
const profileForm = document.forms.editForm;
const formNewCard = document.forms.newCard;

// это поля инпутов формы, ищем через "name"
const nameInput = profileForm.elements.nameInput; // Редактирование имени
const jobInput  = profileForm.elements.jobInput; // Редактирование информации о работе

const titleInput = formNewCard.elements.titleInput; // Добавление заголовка картинки
const imageInput = formNewCard.elements.imageInput; // Добавление ссылки на картинку

// это кнопки
const buttonEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const buttonAddFoto = document.querySelector('.profile__add-button'); // кнопка для добавления фото

const template = '#element-template';

const popupImage = '.popup_type_image';
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_add-card');


// это профиль тайтл и сабтайтл
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements__list');


export {profileForm, formNewCard, nameInput, jobInput, titleInput, imageInput,
  buttonEdit, buttonAddFoto, template, popupEditProfile, popupNewCard,
  popupImage, nameTitle, jobSubtitle, cardsContainer}
