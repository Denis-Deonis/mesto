const formEditForm = document.forms.editForm;
const nameInputForm = formEditForm.elements.nameInput;
const jobInputForm = formEditForm.elements.jobInput;

function setSubmitButtonState(isFormValid){
  if (isFormValid) {
    addButton.removeAttribute('disabled');
    addButton.classList.remove('popup__save_disabled');
  } else {
    addButton.setAttribute('disabled', true);
    addButton.classList.add('popup__save_disabled');
  }
}

formEditForm.addEventListener('input', function (evt) {
  const isValid = nameInputForm.value.length > 0 && jobInputForm.value.length > 0;
  setSubmitButtonState(isValid);
});




// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig)
