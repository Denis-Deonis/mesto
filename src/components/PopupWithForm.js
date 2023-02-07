import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.submitForm = submitForm;
    this._from = this.popup.forms;
    this._inputList = this._from.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this.formValues = {};

    this._inputList.forEach( input => {
      this.formValues[input.name] = input.value;
    } )

    return this.formValues;
  }

  getInputValues() {
    this._getInputValues();
  }

  close() {
    this._from.reset();
    super.close();
  }

  setEventListeners() {
    this._from.addEventListener( 'submit', evt => {
      this.submitForm(evt);
    } )
    super.setEventListener();
  }

}
