let profileEditButton = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCancelButtonNode = document.querySelector('.popup__cancel-button');
let profileTitleNode = document.querySelector('.profile__title');
let profileSubTitleNode = document.querySelector('.profile__subtitle');
let saveButtonNode = document.querySelector('.popup__save-button');
let forms = document.querySelector('.popup__container');
let titleInputNode = document.querySelector('.popup__data_name');
let subInputNode = document.querySelector('.popup__data_description');

function togglePopupVisibility() {
  popupNode.classList.toggle('popup_visible');
  titleInputNode.value = profileTitleNode.textContent;
  subInputNode.value = profileSubTitleNode.textContent;
}

function togglePopupVisibilitynone() {
  popupNode.classList.toggle('popup_visible');
}

function popFormSubmit(event) {
  event.preventDefault();
  profileTitleNode.textContent = titleInputNode.value;
  profileSubTitleNode.textContent = subInputNode.value;
  popupNode.classList.toggle('popup_visible');
}

profileEditButton.addEventListener('click', togglePopupVisibility);
popupCancelButtonNode.addEventListener('click', togglePopupVisibilitynone);
forms.addEventListener('submit', popFormSubmit);





