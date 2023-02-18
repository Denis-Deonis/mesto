export class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // _handleEscClose(evt) {
  //   evt.code === "Escape" && this.close();
  // }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      this.close()
    }
  }


}
