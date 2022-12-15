const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.elements__list');
// ниже область по проекту 5-template

// function imageOpen(templateContainer, ) {

// }

function createCard(value) {
  // это template
const template = document.querySelector('#element-template').content;
const templateContainer = template.querySelector('.element').cloneNode(true);
const templateTitle = templateContainer.querySelector('.element__title');
const templateImage = templateContainer.querySelector('.element__image');
const templateTrash = templateContainer.querySelector('.element__trash');
const likeButton = templateContainer.querySelector('.element__like-button');

  templateTitle.textContent = value.name;
  templateImage.src = value.link;
  //templateImage.addEventListener('click', () => imageOpen(templateContainer, value.link)); // этот слушатель открывает картинку
  templateTrash.addEventListener('click', ()=> templateContainer.remove()); // этот слушатель удаляет
  likeButton.addEventListener('click', (evt)=>{evt.target.classList.toggle('element__like-button_active')});



  return templateContainer
}

function renderCard(templateContainer, container) {  container.prepend(templateContainer)}

cardsContainer.append(...initialCards.map(createCard));

