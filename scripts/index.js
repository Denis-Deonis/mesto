// Для себя
////////////////////////////////////////////////////////////////////////////////////////////////////////
// это переменные формы
const editForm = document.querySelector('#editForm');
const newCard = document.querySelector('#newCard');

// это переменные попап
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_add-card');

// это поля инпутов в DOM, ищем через "name" очень удобно не нужно ID  или водить новый класс
const nameInput = document.querySelector('input[name="nameInput"]'); // Редактирование имени
const jobInput = document.querySelector('input[name="jobInput"]'); // Редактирование информации о работе
const titleInput = document.querySelector('input[name="titleInput"]'); // Добавление заголовка картинки
const imageInput = document.querySelector('input[name="imageInput"]'); // Добавление ссылки на картинку

// это кнопки
const editButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const addButton = document.querySelector('.profile__add-button'); // кнопка для добавления фото
const closeButton = popupEditProfile.querySelector('.popup__close-button'); // кнопка закрытия popupEditProfile
const closeButtonCard = popupNewCard.querySelector('.popup__close-button'); // кнопка закрытия Попап popupNewCard
const likeButton = document.querySelector('.element__like-button'); // находит кнопку Лайк

// это профиль тайтл и сабтайтл
const nameTitle = document.querySelector('.profile__title');
const jobSubtitle = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements__list');

function openPopup(popup) { popup.classList.add('popup_opened');} // эта функция открывает "popup"
function closePopup(popup) { popup.classList.remove('popup_opened');} // эта функция закрывает "popup"

// это слушатели событий
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}); // этот слушатель обработчик «отправки» формы должен быть выше слушателя который открывает Попап. Если будет по другому угроблю опять 3 часа

editButton.addEventListener('click', () => {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
  openPopup(popupEditProfile);
}); // этот слушатель открывает Попап

closeButton.addEventListener('click', ()=> closePopup(popupEditProfile)); // этот слушатель закрывает Попап popupEditProfile
closeButtonCard.addEventListener('click', ()=> closePopup(popupNewCard)); // этот слушатель закрывает Попап popupNewCard

addButton.addEventListener('click', ()=> {
  openPopup(popupNewCard)
});


// ниже область по проекту 5-template

function openImage(templateContainer, link, name){
  const img = document.querySelector('.popup__image');
  const imgTitle = document.querySelector('.popup__image-title');
  imgTitle.textContent = name;
  img.src = link;
  img.alt = name;
  openPopup(templateContainer);
}


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
  templateTrash.addEventListener('click', ()=> templateContainer.remove()); // этот слушатель удаляет
  likeButton.addEventListener('click', (evt)=> {
    evt.target.classList.toggle('element__like-button_active')
  });

  templateImage.addEventListener('click',  openImage(templateContainer, value.link, value.name) ); // этот слушатель открывает картинку

  return templateContainer
}

cardsContainer.append(...initialCards.map(createCard));

newCard.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const name = titleInput.value;
  const link = imageInput.value;
  const newCard = createCard({ name, link });
  cardsContainer.prepend(newCard);
  closePopup(popupNewCard);
  evt.target.reset();
})
