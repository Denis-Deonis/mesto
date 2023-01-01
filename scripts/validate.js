
function disableSubmitButton(popup, config) {
  const buttonSave = popup.querySelector(config.submitButtonSelector)
  if (buttonSave) {
    buttonSave.classList.toggle(config.inactiveButtonClass)
    buttonSave.disabled = true
  }
} // кнопка popup__save не активна при открытии попапа

function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`) // здесь вместо id использовать name, так как принял решение не водить id
  errorElement.classList.add(config.errorClass)
  errorElement.textContent = inputElement.validationMessage // здесь сообщение ошибки
  inputElement.classList.add(config.inputErrorClass)
} // функция выводит ошибку если не валидно

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`) // здесь вместо id использовать name, так как принял решение не водить id
  errorElement.classList.remove(config.errorClass)
  errorElement.textContent = ""
  inputElement.classList.remove(config.inputErrorClass)
} // функция скрывает ошибку

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config)
  } else {
    showInputError(formElement, inputElement, config)
  }
} // функция проверяет инпут

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid)
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.disabled = false
  }
} // меняет класс "popup__save_disabled", через toggle не делать ведет не правильно

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  )
  const buttonElement = formElement.querySelector(config.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, config)

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
