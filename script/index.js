import Card from './Card.js';
import formValidator from './FormValidator.js';
import {initialCards} from './initial-сards.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfileNode = document.querySelector('.popup_profile_form');
const popupAddingNode = document.querySelector('.popup_adding_form');
const popupCloseButtons = [...document.querySelectorAll('.popup__cancel-button')];
const profileTitleNode = document.querySelector('.profile__title');
const profileSubTitleNode = document.querySelector('.profile__subtitle');
const popupInputTitle = document.querySelector('.popup__data_input_title');
const popupInputUrl = document.querySelector('.popup__data_input_url');
const formEdit = document.querySelector('.popup__container');
const formAdd = document.querySelector('.popup__add');
const titleInputNode = document.querySelector('.popup__data_input_name');
const subInputNode = document.querySelector('.popup__data_input_description');
const targetCardReview = document.querySelector('.popup_preview_form');
const previewImage = targetCardReview.querySelector('.popup__review-image');
const previewTitle = targetCardReview.querySelector('.popup__review-title');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__data',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__data_invalid',
  inactiveButtonClass: 'popup__button_invalid', 
  customMessages: {
    textValueMissing: 'Вы пропустили это поле.',
    urlMissmath: 'Введите адрес изображения.',
    urlValueMissing: 'Вы пропустили это поле.',
  }
}
const formEditValidate = new formValidator(validationConfig, popupProfileNode);
const formAddValidate = new formValidator(validationConfig, popupAddingNode);

//просмотр попап с картинкой
const imageReview = (name, link) => { 
  openPopup(targetCardReview); 
  previewImage.src = link; 
  previewImage.alt = name; 
  previewTitle.textContent = name; 
}; 

initialCards.forEach((item) => {
	createNewCard(item);
});

function createNewCard(item) {
  const card = new Card(item, '.template', imageReview);
	const cardElement = card.generateCard(item);
	document.querySelector('.elements').prepend(cardElement);
}


//открытие попап редактирование профиля
function openEditProfilePopup() { 
  titleInputNode.value = profileTitleNode.textContent; 
  subInputNode.value = profileSubTitleNode.textContent;
  openPopup(popupProfileNode);
  formEditValidate.resetValidation();
} 

//открытие попап для добавления новой карточки
function openAddCardPopup() {
  formAdd.reset();
  formAddValidate.resetValidation();
  openPopup(popupAddingNode);
}

//сабмит попап редактирования
function submitPopupEditForm() {
  profileTitleNode.textContent = titleInputNode.value;
  profileSubTitleNode.textContent = subInputNode.value;
  closePopup(popupProfileNode);
}

//сабмит попап с новой карточкой
function submitPopupAddForm() {
  const cardTitle = popupInputTitle.value; 
  const cardImage = popupInputUrl.value;
  createNewCard({name:cardTitle, link:cardImage});
  closePopup(popupAddingNode);
  formAdd.reset();
}

//функция открытия любого попап
function openPopup(popup) {
  popup.classList.toggle('popup_visible');
  document.addEventListener('keydown', popupOnEscClose);
}

//функция закрытия любого попап
function closePopup(popup) {
  popup.classList.toggle('popup_visible');
  document.removeEventListener('keydown', popupOnEscClose);
}

//закрытие любого попап через крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

//закрытие любого попап через Esc
function popupOnEscClose(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_visible');
    closePopup(activePopup);
  }
}

//закрытие любого попап по клику на оверлей
function popupOnOverlayClose(evt) {
  if (evt.target.classList.contains('popup_visible')) {
    closePopup(evt.target);
  }
}

formEditValidate.enableValidation();
formAddValidate.enableValidation();

profileEditButton.addEventListener('click', openEditProfilePopup);
profileAddButton.addEventListener('click', openAddCardPopup);
formEdit.addEventListener('submit', submitPopupEditForm);
formAdd.addEventListener('submit', submitPopupAddForm);
document.addEventListener('click', popupOnOverlayClose);