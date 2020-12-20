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

function renderCards() {
  const cardItems = initialCards.map(composeItem);
  cardContainerElement.append(...cardItems);
}

function composeItem({name, link}) {
  const newCard = templateElement.content.cloneNode(true);
  const cardTitle = newCard.querySelector('.element__title');
  const cardImage = newCard.querySelector('.element__image');
  const likeButton = newCard.querySelector('.element__like-button');
  const removeButton = newCard.querySelector('.element__remove-button');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', function(){
    imageReview(name, link);
  });
  likeButton.addEventListener('click', function(){
    handleLikeIcon(likeButton);
  });
  removeButton.addEventListener('click', function(event){
    const targetCard = event.target.closest('.element');
    targetCard.remove();
  });
  return newCard;
}

//функция для добавления/снятия лайка
function handleLikeIcon(likeButton) {
  likeButton.classList.toggle('element__like-active');
}

//просмотр попап с картинкой
const imageReview = (name, link) => {
  const targetCardReview = document.querySelector('.popup_preview_form');
  const previewImage = targetCardReview.querySelector('.popup__review-image');
  const previewTitle = targetCardReview.querySelector('.popup__review-title');
  openPopup(targetCardReview);
  previewImage.src = link;
  previewImage.alt = name;
  previewTitle.textContent = name;
}

//открытие попап редактирование профиля
function togglePopupEditVisibility() {
  titleInputNode.value = profileTitleNode.textContent;
  subInputNode.value = profileSubTitleNode.textContent;
  openPopup(popupProfileNode);
}

//открытие попап для добавления новой карточки
function togglePopupAddVisibility() {
  formAdd.reset();
  openPopup(popupAddingNode);
}

//сабмит попап редактирования
function submitPopupEditForm(event) {
  event.preventDefault();
  profileTitleNode.textContent = titleInputNode.value;
  profileSubTitleNode.textContent = subInputNode.value;
  closePopup(popupProfileNode);
  formEdit.reset();
}

//сабмит попап с новой карточкой
function submitPopupAddForm(event) {
  event.preventDefault();
  const cardTitle = popupInputTitle.value;
  const cardImage = popupInputUrl.value;
  const newCard = composeItem({name:cardTitle, link:cardImage});
  cardContainerElement.prepend(newCard);
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
})

//закрытие любого попап через Esc
function popupOnEscClose(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_visible');
    closePopup(activePopup);
  }
}

//закрытие любого попап по клику на оверлей
function popupOnOverlayClose (evt) {
  if (evt.target.classList.contains('popup_visible')) {
    closePopup(evt.target);
  }
}

renderCards();
profileEditButton.addEventListener('click', togglePopupEditVisibility);
profileAddButton.addEventListener('click', togglePopupAddVisibility);
formEdit.addEventListener('submit', submitPopupEditForm);
formAdd.addEventListener('submit', submitPopupAddForm);

document.addEventListener('click', popupOnOverlayClose);