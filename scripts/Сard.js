function createCard(value) {
  // это template
const templateContainer = template.querySelector('.element').cloneNode(true);
const templateTitle = templateContainer.querySelector('.element__title');
const templateImage = templateContainer.querySelector('.element__image');
const templateTrash = templateContainer.querySelector('.element__trash');
const templateLike = templateContainer.querySelector('.element__like-button')

  templateTitle.textContent = value.name;
  templateImage.src = value.link;
  templateImage.alt = value.name;

  templateTrash.addEventListener('click', ()=> templateContainer.remove()); // этот слушатель удаляет элемент с картинкой

  templateLike.addEventListener('mousedown', ()=> {
    templateLike.classList.toggle('element__like-button_active')
  }) // этот слушатель меняет состояние лайка с помощью toggle - очень сокращает код

  templateImage.addEventListener('click', ()=> openImage(templateContainer, value.link)); // этот слушатель открывает картинку

  return templateContainer
} // эта функция создает элемент с картинкой
