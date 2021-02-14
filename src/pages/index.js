import '../pages/index.css';
import '../images/logo.svg';
import '../images/avatar.jpg';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfileNode = document.querySelector('.popup_profile_form');
const popupAddingNode = document.querySelector('.popup_adding_form');
export const profileTitleNode = '.profile__title';
export const profileSubTitleNode = '.profile__subtitle';
const titleInputNode = document.querySelector('.popup__data_input_name');
const subInputNode = document.querySelector('.popup__data_input_description');
const targetCardReview = document.querySelector('.popup_preview_form');
const cardListSelector = '.elements';
const cardList = document.querySelector('.elements');
const deletePopup = document.querySelector('.popup_card_delete')
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
const popupPreviewImage = new PopupWithImage(targetCardReview);
const formEditValidate = new FormValidator(validationConfig, popupProfileNode);
const formAddValidate = new FormValidator(validationConfig, popupAddingNode);
const userInfo = new UserInfo(profileTitleNode, profileSubTitleNode);

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    "content-type": "application/json",
    "Authorization":"9b76e223-fcf4-4649-a71c-6a4d1969a300"
  }
});

//открытие попап с картинкой
const openPreviewPopup = (name, link) => {
  popupPreviewImage.setEventListeners();
  popupPreviewImage.open(name, link);
};

api
  .getAllCards()
  .then((data) => {
    const newCards = data.map(item=>{
      return {name: item.name, link: item.link, id: item._id, owner: item.owner}
    })
    const cardList = new Section({
      data: newCards,
      renderer: (item) => {
        const card = new Card(item, '.template', openPreviewPopup, api, deletePopup);
        const cardElement = card.generateCard();
        cardList.setItem(cardElement);
	      return cardElement;
      },
    }, cardListSelector, api);
    cardList.addItem();
    
  })
  .catch(err=>console.log(err))

//Рендер начальных карточек
/*const cardList = new Section({
  data: newCards,
  renderer: (item) => {
    createNewCard(item)
  },
}, cardListSelector);

cardList.addItem();*/

//создание новой карточки
function createNewCard(item) {
  const card = new Card(item, '.template', openPreviewPopup, api, deletePopup);
  const cardElement = card.generateCard();
  console.log(cardElement)
  cardList.setItem(cardElement);
	return cardElement;
}

//попап новой карточки
/*const addPopup = new PopupWithForm(
  popupAddingNode, {
  handleFormSubmit: (data) => {
    createNewCard({name: data.place_name, link: data.place_url});
    addPopup.close();
  }
});*/

//попап новой карточки ДОДЕЛАТЬ
const addPopup = new PopupWithForm(
  popupAddingNode, {
  handleFormSubmit: (data) => {
    api
      .addCard({name: data.place_name, link: data.place_url, id: data._id, owner: data.owner})
      .then((data) => {
        const card = new Card({name: data.place_name, link: data.place_url}, '.template', openPreviewPopup, api);
        const cardElement = card.generateCard();
        console.log(cardList)
        cardList.setItem(cardElement);
	      return cardElement})
      .then(() => addPopup.close())
      .catch(err=>console.log(err))
   }
});



//попап редактирования профиля
const editPopup = new PopupWithForm(
  popupProfileNode, {
  handleFormSubmit: () => {
    userInfo.setUserInfo(titleInputNode, subInputNode);
    editPopup.close();
  }
});

//открытие попап редактирование профиля
function openEditProfilePopup() {
  editPopup.open();
  const currentData = userInfo.getUserInfo();
  titleInputNode.value = currentData.name;   
  subInputNode.value = currentData.description;
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