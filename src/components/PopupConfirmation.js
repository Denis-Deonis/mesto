import {Popup} from "./Popup"

export class PopupConfirmation extends Popup {
  constructor(popup, handleSubmit) {
    super(popup)
    this._handleSubmit = handleSubmit
    this._popupForm = this._popup.querySelector(".popup__form")
  }

  open(card) {
    this._card = card
    super.open()
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}
