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
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfileNode = document.querySelector('.popup__profile_form');
const popupAddingNode = document.querySelector('.popup__adding_form');
const popupCloseButtons = [...document.querySelectorAll('.popup__cancel-button')];
const profileTitleNode = document.querySelector('.profile__title');
const profileSubTitleNode = document.querySelector('.profile__subtitle');
const popupInputTitle = document.querySelector('.popup__data_input_title');
const popupInputUrl = document.querySelector('.popup__data_input_url');
const formEdit = document.querySelector('.popup__container');
const formAdd = document.querySelector('.popup__add');
const titleInputNode = document.querySelector('.popup__data_input_name');
const subInputNode = document.querySelector('.popup__data_input_description');

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
  cardImage.alt = item.name;
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
  imageReview.addEventListener('click', reviewCard);
}

function reviewCard(event) {
  const targetCardReview = document.querySelector('.popup__preview');
  targetCardReview.classList.remove('popup__close');
  targetCardReview.classList.add('popup__review_visible');
  const previewImage = event.target.closest('.element__image');
  const popupImage = document.querySelector('.popup__review-image');
  const previewElement = event.target.closest('.element');
  const previewTitle = previewElement.querySelector('.element__title');
  const popupPreviewTitel = document.querySelector('.popup__review-title');
  popupImage.src = previewImage.src;
  popupImage.alt = previewTitle.textContent;
  popupPreviewTitel.textContent = previewTitle.textContent;
}

function toggleLike(event) {
  const targetLike = event.target.closest('.element__like-button');
  targetLike.classList.toggle('element__like-active');
}

function togglePopupEditVisibility() {
  popupProfileNode.classList.remove('popup__close');
  popupProfileNode.classList.add('popup_visible');
  titleInputNode.value = profileTitleNode.textContent;
  subInputNode.value = profileSubTitleNode.textContent;
}

function togglePopupAddVisibility() {
  popupAddingNode.classList.remove('popup__close');
  popupAddingNode.classList.add('popup_visible');
  popupInputTitle.value = '';
  popupInputUrl.value = '';
  popFormAddSubmitListener(formAdd);
}

function submitPopupEditForm(event) {
  event.preventDefault();
  profileTitleNode.textContent = titleInputNode.value;
  profileSubTitleNode.textContent = subInputNode.value;
  popupProfileNode.classList.remove('popup_visible');
  popupProfileNode.classList.add('popup__close');
}

function popFormAddSubmitListener() {
  formAdd.addEventListener('submit', addNewCard);
}

function addNewCard(event) {
  event.preventDefault();
  const cardTitle = popupInputTitle.value;
  const cardImage = popupInputUrl.value;
  const newCard = composeItem({name:cardTitle, link:cardImage});
  cardContainerElement.prepend(newCard);
  popupAddingNode.classList.remove('popup_visible');
  popupAddingNode.classList.add('popup__close');
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  popup.classList.remove('popup__review_visible');
  popup.classList.add('popup__close');
}

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'));
  });
})

renderCards();
profileEditButton.addEventListener('click', togglePopupEditVisibility);
profileAddButton.addEventListener('click', togglePopupAddVisibility);
formEdit.addEventListener('submit', submitPopupEditForm);