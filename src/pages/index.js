import '../pages/index.css';
import '../images/logo.svg';
import '../images/avatar.jpg';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../components/initial-сards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfileNode = document.querySelector('.popup_profile_form');
const popupAddingNode = document.querySelector('.popup_adding_form');
export const profileTitleNode = '.profile__title';
export const profileSubTitleNode = '.profile__subtitle';
export const titleInputNode = document.querySelector('.popup__data_input_name');
export const subInputNode = document.querySelector('.popup__data_input_description');
const targetCardReview = document.querySelector('.popup_preview_form');
const cardListSelector = '.elements';
const popupPreviewImage = new PopupWithImage(targetCardReview);

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
const formEditValidate = new FormValidator(validationConfig, popupProfileNode);
const formAddValidate = new FormValidator(validationConfig, popupAddingNode);
const userInfo = new UserInfo(profileTitleNode, profileSubTitleNode);
//const card = new Card(item, '.template', openPreviewPopup);

//открытие попап с картинкой
const openPreviewPopup = (name, link) => {
  popupPreviewImage.setEventListeners();
  popupPreviewImage.open(name, link);
};

//Рендер начальных карточек
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    createNewCard(item)
  },
}, cardListSelector);

cardList.addItem();

//создание новой карточки
function createNewCard(item) {
  const card = new Card(item, '.template', openPreviewPopup);
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
	return card.generateCard();
}

//попап новой карточки
const addPopup = new PopupWithForm(
  popupAddingNode, {
  handleFormSubmit: (data) => {
    createNewCard({name: data.place_name, link: data.place_url})
    addPopup.close();
  }
});

//попап редактирования профиля
const editPopup = new PopupWithForm(
  popupProfileNode, {
  handleFormSubmit: () => {
    userInfo.setUserInfo();
    editPopup.close();
  }
});

//открытие попап редактирование профиля
function openEditProfilePopup() {
  editPopup.open();
  userInfo.getUserInfo();
  formEditValidate.resetValidation();
} 

//открытие попап для добавления новой карточки
function openAddCardPopup() {
  addPopup.open();
  formAddValidate.resetValidation();
}

editPopup.setEventListeners();
addPopup.setEventListeners();

formEditValidate.enableValidation();
formAddValidate.enableValidation();

//слушаетли для кнопок редактирования и новой карточки
profileEditButton.addEventListener('click', openEditProfilePopup);
profileAddButton.addEventListener('click', openAddCardPopup);