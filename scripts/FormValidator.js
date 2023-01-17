


/*
function disableSubmitButton(popup, config) {
  const buttonSave = popup.querySelector(config.submitButtonSelector)
  if (buttonSave) {
    buttonSave.classList.add(config.inactiveButtonClass)
    buttonSave.disabled = true
  }
} // кнопка popup__save не активна при открытии попапа



function enableValidation({ formSelector, ...restConfig }) {
  const formList = Array.from(document.querySelectorAll(formSelector))   // делает из formSelector массив методом Array.from

  // Перебор полученной коллекции
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig)
  })
} // добавление обработчиков всем формам

enableValidation(validationConfig)
*/

/*
export class FormValidator {

  constructor(validationConfig, popupFormElement) {
    this._config = validationConfig;
    this._element = popupFormElement;
  }

  _hasInvalidInput() {
    this._inputList = Array.from(this._element.querySelector(this._config.inputSelector));
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    this._buttonElement = this._element.querySelector(this._config.submitButtonSelector);
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.name}-error`);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.name}-error`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    } )
  }

  enableValidation() {
    this._setEventListeners();
  }

}
*/
