import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
    this._form.addEventListener("submit", (event) => {
      event.preventDefault()
      const replacementText = event.submitter.textContent
      event.submitter.textContent = "Сохранение..."
      this.submitForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          event.submitter.textContent = replacementText
        })
    })
  }

  _getInputValues() {
    const values = {}
    this._inputs.forEach((input) => {
      values[input.name] = input.value
    })
    return values
  }

  close() {
    this._form.reset()
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submitForm(this._getInputValues());
    })
  }


}
