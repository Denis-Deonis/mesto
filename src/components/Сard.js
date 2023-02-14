export class Card {

  constructor( value, template, handleCardClick) {
    this._title = value.name;
    this._link  = value.link;
    this._templateContainer = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplateElement() {
    return this._templateContainer.querySelector('.element').cloneNode(true);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__like-button_active')
  }

  _deleteCard() {
    this._cardElement.remove();
  }


  _setEventListeners() {
    this._cardElement.querySelector('.element__trash').addEventListener('click', ()=> this._deleteCard());
    this._cardElement.querySelector('.element__like-button').addEventListener('mousedown', (evt)=> this._toggleLike(evt))
    this._cardsElementImage.addEventListener('click', ()=> this._handleCardClick(this._link,  this._title));
  }

  generateCard() {
    this._cardElement = this._getTemplateElement();
    this._cardsElementImage = this._cardElement.querySelector('.element__image');
    this._cardsElementTitle = this._cardElement.querySelector('.element__title');

    this._setEventListeners();

    this._cardsElementImage.src = this._link;
    this._cardsElementImage.alt = this._title;
    this._cardsElementTitle.textContent = this._title;

    return this._cardElement;
  }

}
