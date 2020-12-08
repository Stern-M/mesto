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
let profileEditButton = document.querySelector('.profile__edit-button');
let profileAddButton = document.querySelector('.profile__add-button');
let popupProfileNode = document.querySelector('.popup-profile');
let popupAddingNode = document.querySelector('.popup-adding');
let popupCancelProfileButton = document.querySelector('.popup__cancel-profile');
let popupCancelAddeButton = document.querySelector('.popup__cancel-adding');
let profileTitleNode = document.querySelector('.profile__title');
let profileSubTitleNode = document.querySelector('.profile__subtitle');
let saveButtonNode = document.querySelector('.popup__save-button');
let addButtonNode = document.querySelector('.popup__add-button');
let popupInputTitle = document.querySelector('.popup__data_input_title');
let popupInputUrl = document.querySelector('.popup__data_input_url');
let formEdit = document.querySelector('.popup__container');
let formAdd = document.querySelector('.popup__add');
let titleInputNode = document.querySelector('.popup__data_input_name');
let subInputNode = document.querySelector('.popup__data_input_description');

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
  addRemoveListenerToCard(newCard);
  addLikeListenerToCard(newCard);
  addImageListenerToCard(newCard);
  return newCard;
}

function addRemoveListenerToCard(item) {       
  const removeButton = item.querySelector('.element__remove-button');
  removeButton.addEventListener('click', removeCard);
}

function removeCard(event) {
  const targetCard = event.target.closest('.element');
  targetCard.remove();
}

function addLikeListenerToCard(item) {
  const likeButton = item.querySelector('.element__like-button');
  likeButton.addEventListener('click', toggleLike);
}

function addImageListenerToCard(item) {
  const imageReview = item.querySelector('.element__image-button');
  imageReview.addEventListener('click', cardReview);
}

function cardReview(event) {
  const targetCardReview = document.querySelector('.popup-preview');
  targetCardReview.classList.toggle('popup__review_visible');
  const previewImage = event.target.closest('.element__image');
  const popupImage = document.querySelector('.popup__image');
  const previewElement = event.target.closest('.element');
  const previewTitle = previewElement.querySelector('.element__title');
  const popupPreviewTitel = document.querySelector('.popup__review-title');
  popupImage.src = previewImage.src;
  popupPreviewTitel.textContent = previewTitle.textContent;
}

function toggleLike(event) {
  const targetLike = event.target.closest('.element__like-button');
  targetLike.classList.toggle('element__like-active');
}

function togglePopupVisibility() {
  popupProfileNode.classList.toggle('popup_visible');
  titleInputNode.value = profileTitleNode.textContent;
  subInputNode.value = profileSubTitleNode.textContent;
}

function togglePopupAddVisibility() {
  popupAddingNode.classList.toggle('popup_visible');
  popupInputTitle.value = '';
  popupInputUrl.value = '';
  popFormAddSubmitListener(formAdd);
}

function togglePopupEditVisibilitynone() {
  popupProfileNode.classList.toggle('popup_visible');
}

function togglePopupAddVisibilitynone() {
  popupAddingNode.classList.toggle('popup_visible');
}

function popFormSubmit(event) {
  event.preventDefault();
  profileTitleNode.textContent = titleInputNode.value;
  profileSubTitleNode.textContent = subInputNode.value;
  popupProfileNode.classList.toggle('popup_visible');
}

function popFormAddSubmitListener() {
  formAdd.addEventListener('submit', addNewCard);
}

function addNewCard(event) {
  event.preventDefault();
  let cardTitle = popupInputTitle.value;
  let cardImage = popupInputUrl.value;
  const newCard = composeItem({name:cardTitle, link:cardImage});
  cardContainerElement.prepend(newCard);
  popupAddingNode.classList.toggle('popup_visible');
}

renderCards();
profileEditButton.addEventListener('click', togglePopupVisibility);
profileAddButton.addEventListener('click', togglePopupAddVisibility);
popupCancelProfileButton.addEventListener('click', togglePopupEditVisibilitynone);
popupCancelAddeButton.addEventListener('click', togglePopupAddVisibilitynone);
formEdit.addEventListener('submit', popFormSubmit);


// все что выше - работает

/*function addNewCardListener(){
  profileAddButton.addEventListener('click', togglePopupVisibility)
}
addNewCardListener();

function addNewCard(){
  let newItem =  composeItem(item);
  cardContainerElement.prepend(newItem);
}

function removeListenersToCard(){       
  const removeButton = document.querySelector('.element__remove-button');
  removeButton.addEventListener('click', removeItem);
}


function bindAddItemListener() {
  event.preventDefault();
  const addButtonElement = document.querySelector('.button_add');
  addButtonElement.addEventListener('click', addNewItem)
}


function togglePopupVisibility() {
  popupNode.classList.toggle('popup_visible');
  titleInputNode.value = profileTitleNode.textContent;
  subInputNode.value = profileSubTitleNode.textContent;
}

function togglePopupAddVisibility() {
  popupNode.classList.toggle('popup_visible');
}





function popForm2Submit(event2) {
  event2.preventDefault();
  profileTitleNode.textContent = titleInputNode.value;
  profileSubTitleNode.textContent = subInputNode.value;
  popupNode.classList.toggle('popup_visible');
}




//form2.addEventListener('submit', popForm2Submit);





/* popupCloseButton.addEventListener('click', function(evt) {
  const targetPopup = evt.target.closest('.popup');
  targetPopup.classList.remove('popup_opened');
});*/
