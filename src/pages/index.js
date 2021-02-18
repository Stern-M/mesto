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
//const popupAvatarForm = document.querySelector('.popup_avatar_form');
export const profileTitleNode = '.profile__title';
export const profileSubTitleNode = '.profile__subtitle';
const profileAvatar = '.profile__avatar';
const avatarEditButton = document.querySelector('.profile__avatar-edit');
const inputAvatar = document.querySelector('.popup__avatar_input_url');
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

/*const showLikesNumber = (card, likes) => {
  console.log(card)
  console.log(likes)
  card.querySelector('.element__like-count').textContent = likes.length
}*/

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
        createNewCard(item, cardList, item.id)
      },
    }, cardListSelector);
    cardList.addItem();
    return cardList;
  })
  .catch(err=>console.log(err))

//функция для создания карточки
function createNewCard(data, list, cardID) {
  const card = new Card(data, '.template', openPreviewPopup, api, delPopup, cardID, userID,
  () => {delPopup.setSubmitHandler(cardDeleteRequest(card)), delPopup.open()},
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
  list.setItem(cardElement);
	return cardElement;
}

//попап для добавления новой карточки
const addPopup = new PopupWithForm(
  popupAddingNode, {
  handleFormSubmit: (data) => {
    submitRender('.popup__add', true)
    api
      .addCard({name: data.place_name, link: data.place_url})
      .then((data) => {
        createNewCard(data, cardList, data._id)
        })
      .then(() => addPopup.close())
      .catch(err=>console.log(err))
      .finally(() => {
        submitRender('.popup__add', false)})
  }
});

const cardDeleteRequest = (card) => {
  return () => {
    api
    .removeCard(card.getCardID())
    .then((res) => {
      if (res.status) 
      console.log('удаляю')
      card.deleteCard();
      delPopup.close();
    })
    .catch(err=>console.log(err))
  }
}

function submitRender(popupSelector, isLoading) {
  const buttonElement = document.querySelector(popupSelector).querySelector('.popup__button');
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    //content.classList.add('content_hidden');
  } else { 
    if (popupSelector === '.popup__add') {
      buttonElement.textContent = "Создать";
    } else {buttonElement.textContent = "Сохранить";}
  }
}

/*function handleFormSubmit(data) {
  api
    .addCard({name: data.place_name, link: data.place_url})
    .then((data) => {
      createNewCard(data, cardList, data._id)
      })
    .then(() => addPopup.close())
    .catch(err=>console.log(err))
}*/

/*function cardDeleteRequest(element, id) {
  delPopup.open();

}*/

//попап для удаления картинки НЕ ТРОГАТЬ
/*const delPopup = new PopupWithForm(
  deletePopup, {
  handleFormSubmit: (element, id) => {
    console.log(id)
    api
      .removeCard(id)
      .then(() => {
        element.remove();
        element = null;
        delPopup.close();
      })
      .catch(err=>console.log(err))
    }
});*/

const delPopup = new PopupWithDelete(deletePopup);

/*function onCardDelClick(element, id) {
  delPopup.setSubmitHandler(() => {
    api
      .removeCard(id)
      .then(() => {
        element.remove();
        element = null;
        delPopup.close();
      })
      .catch(err=>console.log(err))
  });
  delPopup.open();
}

    handleDelete: (element, id) => {
      delPopup.handleDelete(element, id)
    api
      .removeCard(id)
      .then(() => {
        element.remove();
        element = null;
        delPopup.close();
      })
      .catch(err=>console.log(err))
    }
  }
)*/

//попап редактирования профиля
const editPopup = new PopupWithForm(
  popupProfileNode, {
  handleFormSubmit: () => {
    submitRender('.popup__container', true)
    api
      .setUserData({name: titleInputNode.value, about: subInputNode.value})
      .then(() => {
        userInfo.setUserInfo(titleInputNode, subInputNode);
        editPopup.close();
      })
      .catch(err=>console.log(err))
      .finally(() => {submitRender('.popup__container', false)})
  }
});

//попап редактирования аватара
const avatarPopup = new PopupWithForm(
  popupAvatarNode, {
    handleFormSubmit: () => {
      submitRender('.popup__avatar', true)
      api
        .setUserAvatar(inputAvatar.value)
        .then(() => {
          userInfo.setUserAvatar(inputAvatar);
          avatarPopup.close();
        })
        .catch(err=>console.log(err))
        .finally(() => {submitRender('.popup__avatar', false)})
    }
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

//отображение актуальных данных пользователя
function showUserData() {
  api
    .getUserData()
    .then((data) => {
      document.querySelector(profileTitleNode).textContent = data.name;
      document.querySelector(profileSubTitleNode).textContent = data.about;
      document.querySelector('.profile__avatar').src = data.avatar;
      userID = data._id;
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
avatarPopup.setAvatarListners();
//delPopup.setDeleteEventListener();


formEditValidate.enableValidation();
formAddValidate.enableValidation();
formAvatarValidate.enableValidation();

//слушаетли для кнопок редактирования и новой карточки
profileEditButton.addEventListener('click', openEditProfilePopup);
profileAddButton.addEventListener('click', openAddCardPopup);
avatarEditButton.addEventListener('click', openAvatarPopup);