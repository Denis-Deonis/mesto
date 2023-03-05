import {Popup} from "./Popup"

export class PopupConfirmation extends Popup {
  constructor(popup) {
    super(popup)
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  submitCallback(handleSubmit) {
    this._handlerSubmitForm = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('mousedown', () => {
      this._handlerSubmitForm()
    });
  }


}
