////////////////////////////////////////////////////////////////////////////////////////////////////////
// эти строчки кода закрывает "popup" по нажатию на область вне "popup"
// желательно делать в связке так как может работать не предсказуемо
// popup.addEventListener('click', function(event){
//   if(!event.defaultPrevented){
//     closePopup();
//   }
// })
// document.querySelector('.popup__container').addEventListener('click', function(event){
//   event.preventDefault();
// })
///////////////////////////////
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// function handleFormSubmit(evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//   nameTitle.textContent = nameInput.value;// Находим "profile__title", чтобы вставить имя с помощью "value"
//   jobSubtitle.textContent = jobInput.value;// Находим "profile__subtitle", чтобы вставить профессию с помощью "value"
//   closePopup(popupEditProfile);
// }
// editForm.addEventListener("submit", handleFormSubmit); // этот слушатель следит за событием “submit” - «отправка»

//////
// здесь массив перевернут
// function render() {
//   initialCards.reverse().forEach((value)=>{
//     const newCard = createCard(value);
//     if (newCard) renderCard(newCard, cardsContainer)
//   })
// }

// render()
///////
//function changeLike(evt){ evt.target.classList.toggle('element__like-button_active');} // эта функция изменяет состояние кнопки лайк
// likeButton.addEventListener('click', changeLike); // этот слушатель изменяет лайк
