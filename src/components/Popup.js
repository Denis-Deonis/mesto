export class Popup{
  constructor(popupSelector){
    this.popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    evt.code === "Escape" && this.close();
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {

  }

}
