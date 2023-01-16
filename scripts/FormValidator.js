export class FormValidator {

  constructor(validationConfig, popupFormElement) {
    this._config = validationConfig;
    this._element = popupFormElement;
    this._inputList = Array.from(this._element.querySelectorAll(`.${this._config.inputSelector}`));
    this._buttonElement = this._element.querySelector(`.${this._config.submitButtonSelector}`);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid)
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass)
      this._buttonElement.disabled = true
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass)
      this._buttonElement.disabled = false
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.name}-error`)
    errorElement.classList.add(this._config.errorClass)
    errorElement.textContent = inputElement.validationMessage
    inputElement.classList.add(this._config.inputErrorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.name}-error`)
    errorElement.classList.remove(this._config.errorClass)
    errorElement.textContent = ""
    inputElement.classList.remove(this._config.inputErrorClass)
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement)
    }
  }

  _setEventListeners() {
    this._toggleButtonState()
  }

}



function disableSubmitButton(popup, config) {
  const buttonSave = popup.querySelector(config.submitButtonSelector)
  if (buttonSave) {
    buttonSave.classList.add(config.inactiveButtonClass)
    buttonSave.disabled = true
  }
} // кнопка popup__save не активна при открытии попапа



 // функция скрывает ошибку

 // функция проверяет инпут



function setEventListeners(formElement, config) {

  const buttonElement = formElement.querySelector(config.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, config)

  formElement.addEventListener('reset', () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, config)
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  }) // добавляет слушателей каждому инпуту
}

function enableValidation({ formSelector, ...restConfig }) {
  const formList = Array.from(document.querySelectorAll(formSelector))   // делает из formSelector массив методом Array.from

  // Перебор полученной коллекции
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig)
  })
} // добавление обработчиков всем формам

enableValidation(validationConfig)
