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
let cardList;
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

//рендер и отрисовка карточек с сервера
api
  .getAllCards()
  .then((data) => {
    const newCards = data.map(item=>{
      return {name: item.name, link: item.link, id: item._id, owner: item.owner, likes:item.likes}
    })
    cardList = new Section({
      data: newCards,
      renderer: (item) => {
        createNewCard(item, cardList)
      },
    }, cardListSelector);
    cardList.addItem();
    return cardList;
  })
  .catch(err=>console.log(err))

//функция для создания карточки
function createNewCard(item, list) {
  const card = new Card(item, '.template', openPreviewPopup, api, delPopup);
  const cardElement = card.generateCard();
  list.setItem(cardElement);
	return cardElement;
}

//попап для добавления новой карточки
const addPopup = new PopupWithForm(
  popupAddingNode, {
  handleFormSubmit: (data) => {
    api
      .addCard({name: data.place_name, link: data.place_url, id: data._id, owner: data.owner})
      .then((data) => {
        createNewCard(data, cardList)})
      .then(() => addPopup.close())
      .catch(err=>console.log(err))
  }
});

//попап для удаления картинки
const delPopup = new PopupWithForm(
  deletePopup, {
  handleFormSubmit: (element, id) => {
    //handleDelete(element)
    api
      .removeCard(id)
      //.then(console.log(element._id))
      .then(() => {
        element.remove();
        element = null;
      })
      .catch(err=>console.log(err))
    }
  }
)

//открытие попап для удаления карточки
function cardDeleteRequest(element) {
  delPopup.open();
  //deletePopup.querySelector('.popup__delete-button').addEventListener('submit', handleDelete(element))
}

//попап редактирования профиля
const editPopup = new PopupWithForm(
  popupProfileNode, {
  handleFormSubmit: () => {
    api
      .setUserData({name: titleInputNode.value, about: subInputNode.value})
      .then(() => {
        userInfo.setUserInfo(titleInputNode, subInputNode);
        editPopup.close();
      })
      .catch(err=>console.log(err))
  }
});

//открытие попап редактирование профиля
function openEditProfilePopup() {
  editPopup.open();
  api
    .getUserData()
    .then((data) => {
      titleInputNode.value = data.name;   
      subInputNode.value = data.about;
      formEditValidate.resetValidation();
    })
    .catch(err=>console.log(err))
} 

//отображение актуальных данных пользователя
function showUserData() {
  api
    .getUserData()
    .then((data) => {
      document.querySelector(profileTitleNode).textContent = data.name;
      document.querySelector(profileSubTitleNode).textContent = data.about;
      document.querySelector('.profile__avatar').src = data.avatar
    })
    .catch(err=>console.log(err))
}

//открытие попап для добавления новой карточки
function openAddCardPopup() {
  addPopup.open();
  formAddValidate.resetValidation();
}

showUserData();

editPopup.setEventListeners();
addPopup.setEventListeners();


formEditValidate.enableValidation();
formAddValidate.enableValidation();

//слушаетли для кнопок редактирования и новой карточки
profileEditButton.addEventListener('click', openEditProfilePopup);
profileAddButton.addEventListener('click', openAddCardPopup);