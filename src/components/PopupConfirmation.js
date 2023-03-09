import {Popup} from "./Popup"

export class PopupConfirmation extends Popup {
  constructor(popup) {
    super(popup)
    this._popupForm = this._popup.querySelector(".popup__form");

  }

  setSubmitCallback(handleSubmit) {
    this._handlerSubmitForm = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handlerSubmitForm();
    });
  }


}
