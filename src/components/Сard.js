export class Card {

  constructor( value, template, handleCardClick, userId,
    like, dislike, deleteCard) {
    this._title = value.name;
    this._link  = value.link;
    this._likes = value.likes;
    this._id = value._id;
    this._ownerId = value.owner._id;
    this._templateContainer = template;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
  }

  like() {
    this._likeButton.classList.add("element__like-button_active");
  }

  dislike() {
    this._likeButton.classList.remove("element__like-button_active");
  }

  _userLiked() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this.like()
      } else {
        this.dislike()
      }
    })
  }

  likesCount(res) {
    this._likesCount.textContent = `${res.likes.length}`
  }


  _getTemplateElement() {
    return document.querySelector(this._templateContainer).content.querySelector('.element').cloneNode(true);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__like-button_active')
  }

  _deleteCard() {
    this._cardElement.remove();
    this._element = null;
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
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._countLikeElement = this._cardElement.querySelector('.element__count-like');
    this._countLikeElement.textContent = this._likes.length;

    this._setEventListeners();
    this._userLiked();

    this._cardsElementImage.src = this._link;
    this._cardsElementImage.alt = this._title;
    this._cardsElementTitle.textContent = this._title;

    return this._cardElement;
  }

}
