export class Popup{
  constructor(popupSelector){
    this.popup = popupSelector;
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
    this.popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          this.close()
      }
      if (evt.target.classList.contains('popup__close-button')) {
          this.close()
      }
    })
  }

}
