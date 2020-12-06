const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const cardContainerElement = document.querySelector('.elements');
const templateElement = document.querySelector('.template');

function renderCards() {
  const cardItems = initialCards.map(composeItem);
  cardContainerElement.append(...cardItems);
}

function composeItem(item) {
  const newCard = templateElement.content.cloneNode(true);
  const cardTitle = newCard.querySelector('.element__title');
  const cardImage = newCard.querySelector('.element__image');
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  return newCard;
}
renderCards();

let profileEditButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');
let popupNode = document.querySelector('.popup');
let popupCancelButtonNode = document.querySelector('.popup__cancel-button');
let profileTitleNode = document.querySelector('.profile__title');
let profileSubTitleNode = document.querySelector('.profile__subtitle');
let saveButtonNode = document.querySelector('.popup__save-button');
let popupInputTitle = document.querySelector('.popup__data_input_title');
let popupInputUrl = document.querySelector('.popup__data_input_url');
let form1 = document.querySelector('.popup__container');
let form2 = document.querySelector('.popup__add');
let titleInputNode = document.querySelector('.popup__data_input_name');
let subInputNode = document.querySelector('.popup__data_input_description');

function togglePopupVisibility() {
  popupNode.classList.toggle('popup_visible');
  titleInputNode.value = profileTitleNode.textContent;
  subInputNode.value = profileSubTitleNode.textContent;
}

function togglePopupAddVisibility() {
  popupNode.classList.toggle('popup_visible');
}

function togglePopupVisibilitynone() {
  popupNode.classList.toggle('popup_visible');
}

function popForm1Submit(event1) {
  event1.preventDefault();
  profileTitleNode.textContent = titleInputNode.value;
  profileSubTitleNode.textContent = subInputNode.value;
  popupNode.classList.toggle('popup_visible');
}

function popForm2Submit(event2) {
  event2.preventDefault();
  /*profileTitleNode.textContent = titleInputNode.value;
  profileSubTitleNode.textContent = subInputNode.value;*/
  popupNode.classList.toggle('popup_visible');
}

profileEditButton.addEventListener('click', togglePopupVisibility);
popupCancelButtonNode.addEventListener('click', togglePopupVisibilitynone);
profileAddButton.addEventListener('click', togglePopupAddVisibility);
form1.addEventListener('submit', popForm1Submit);
form2.addEventListener('submit', popForm2Submit);





