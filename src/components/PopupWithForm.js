import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.submitForm = submitForm;
    this._from = this.popup.querySelector('.popup__form');
    this._inputList = [...this._from.querySelectorAll('.popup__input')];
  }

  _getInputValues() {
    this.formValues = {};

    this._inputList.forEach( input => {
      this.formValues[input.name] = input.value;
    } )

    return this.formValues;
  }

  getFormValues()  {
    this._getInputValues();
  }

  getFormElement() {
    return this._form;
  }

  close() {
    this._from.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListener();
    this._from.addEventListener( 'submit', evt => {
      evt.preventDefault();
      this.submitForm(this._getInputValues());
    } )
    
  }

}
