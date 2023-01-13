import {openImage} from './index.js';
export class Card {

  constructor( value, template) {
    this._title = value.name;
    this._link  = value.link;
    this._templateContainer = template;
  }

  _getTemplateElement() {
    return this._templateContainer.querySelector('.element').cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__trash').addEventListener('click', ()=>  this._cardElement.remove());
    this._cardElement.querySelector('.element__like-button').addEventListener('mousedown', (evt)=> {
      evt.target.classList.toggle('element__like-button_active')
    })
    this._cardsElementImage.addEventListener('click', ()=> openImage(this._templateContainer, this._link));
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
