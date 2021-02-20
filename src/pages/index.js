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
import PopupWithDelete from '../components/PopupWithDelete.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfileNode = document.querySelector('.popup_profile_form');
const popupAddingNode = document.querySelector('.popup_adding_form');
const profileTitleNode = '.profile__title';
const profileSubTitleNode = '.profile__subtitle';
const profileAvatar = '.profile__avatar';
const avatarEditButton = document.querySelector('.profile__avatar-edit');
const inputAvatar = document.querySelector('.popup__data_avatar_url');
const titleInputNode = document.querySelector('.popup__data_input_name');
const subInputNode = document.querySelector('.popup__data_input_description');
const targetCardReview = document.querySelector('.popup_preview_form');
const popupAvatarNode = document.querySelector('.popup_avatar_form');
const cardListSelector = '.elements';
let cardList;
let userID;
const deletePopup = document.querySelector('.popup_card_delete');
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
const formAvatarValidate = new FormValidator(validationConfig, popupAvatarNode)
const userInfo = new UserInfo(profileTitleNode, profileSubTitleNode, profileAvatar);
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

//получаю данные юзера + карточки и отображаю данные юзера + отрисовываю карточки
Promise.all([
  api.getUserData(),
  api.getAllCards()
])
  .then((values)=>{
    const userData = values[0];
    userID = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    const initialCards = values[1].map(item=>{
      return {name: item.name, link: item.link, _id: item._id, owner: item.owner, likes:item.likes}
    })
    cardList = new Section({
      data: initialCards,
      renderer: (item) => {
        cardList.setItem(createNewCard(item), true)
      },
    }, cardListSelector);
    cardList.addItem();
    return cardList;
  })
  .catch((err)=>{
    console.log(err);
  })

//функция для создания карточки
function createNewCard(data) {
  const card = new Card(data, '.template', openPreviewPopup, delPopup, userID,
  () => {
    delPopup.setSubmitHandler(cardDeleteRequest(card)),
    delPopup.open()
    },
  () => {
    api
      .setLikeOnCard(card.getCardID())
      .then((res) => {card.setLikesNumber(res.likes.length)})
      .catch(err=>console.log(err))
    },
  () => {
    api
      .removeLikeFromCard(card.getCardID())
      .then((res) => {card.setLikesNumber(res.likes.length)})
      .catch(err=>console.log(err))
    });
  const cardElement = card.generateCard();
	return cardElement;
}

//попап для добавления новой карточки
const addPopup = new PopupWithForm(
  popupAddingNode,
  (data) => {
    submitRender('.popup__add', true)
    api
      .addCard({name: data.place_name, link: data.place_url})
      .then((data) => {
        cardList.setItem(createNewCard(data), false);
        })
      .then(() => addPopup.close())
      .catch(err=>console.log(err))
      .finally(() => {
        submitRender('.popup__add', false)})
});

//удаление карточки
const cardDeleteRequest = (card) => {
  return () => {
    deleteRender('.popup__delete', true)
    api
    .removeCard(card.getCardID())
    .then(() => {      
      card.deleteCard();
      delPopup.close();
    })
    .catch(err=>console.log(err))
    .finally(() => {
      deleteRender('.popup__delete', false)})
  }
}

//функция для вывода "сохранение..." в момент загрузки
function submitRender(popupSelector, isLoading) {
  const buttonElement = document.querySelector(popupSelector).querySelector('.popup__button');
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else { 
    if (popupSelector === '.popup__add') {
      buttonElement.textContent = "Создать";
    } else {buttonElement.textContent = "Сохранить";}
  }
}

//функция для вывода "удаление..." при удалении
function deleteRender(popupSelector, isLoading) {
  const buttonElement = document.querySelector(popupSelector).querySelector('.popup__button');
  if (isLoading) {
    buttonElement.textContent = "Удаление...";
  } else { 
    buttonElement.textContent = "Да";
  }
}

//попап с подтверждением удаления
const delPopup = new PopupWithDelete(deletePopup);


//попап редактирования профиля
const editPopup = new PopupWithForm(
  popupProfileNode,
  () => {
    submitRender('.popup__container', true)
    api
      .setUserData({name: titleInputNode.value, about: subInputNode.value})
      .then(() => {
        userInfo.setUserInfo(titleInputNode.value, subInputNode.value);
        editPopup.close();
      })
      .catch(err=>console.log(err))
      .finally(() => {submitRender('.popup__container', false)})
});

//попап редактирования аватара
const avatarPopup = new PopupWithForm(
  popupAvatarNode, () => {
      submitRender('.popup__avatar', true)
      api
        .setUserAvatar(inputAvatar.value)
        .then(() => {
          userInfo.setUserAvatar(inputAvatar.value);
          avatarPopup.close();
        })
        .catch(err=>console.log(err))
        .finally(() => {submitRender('.popup__avatar', false)})
    }
);

//открытие попап с редактирование аватара
function openAvatarPopup() {
  avatarPopup.open();
  formAvatarValidate.resetValidation();
}

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

//открытие попап для добавления новой карточки
function openAddCardPopup() {
  addPopup.open();
  formAddValidate.resetValidation();
}

editPopup.setEventListeners();
addPopup.setEventListeners();
avatarPopup.setAvatarListners();


formEditValidate.enableValidation();
formAddValidate.enableValidation();
formAvatarValidate.enableValidation();

//слушатели для кнопок редактирования и новой карточки
profileEditButton.addEventListener('click', openEditProfilePopup);
profileAddButton.addEventListener('click', openAddCardPopup);
avatarEditButton.addEventListener('click', openAvatarPopup);