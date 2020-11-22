let profileEditButton = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCancelButtonNode = document.querySelector('.popup__cancel-button');
let profileTitleNode = document.querySelector('.profile__title');
let profileSubTitleNode = document.querySelector('.profile__subtitle');
let saveButtonNode = document.querySelector('.popup__save-button');
let forms = document.querySelector('.popup__data');
let titleInputNode = document.querySelector('.popup__data_name');
let subInputNode = document.querySelector('.popup__data_description');

function togglePopupVisibility() {
  popupNode.classList.toggle('popup_visible');
}

profileEditButton.addEventListener('click', togglePopupVisibility);
popupCancelButtonNode.addEventListener('click', togglePopupVisibility);
/*saveButtonNode.addEventListener('submit', togglePopupVisibility);*/

/*forms.forEach((formNode) => {
    formNode.addEventListener('submit', popFormSubmit);
});*/

forms.addEventListener('submit', popFormSubmit);

function popFormSubmit(event) {
  event.preventDefault();
  titleInputNode.value = profileTitleNode.textContent;
  subInputNode.value = profileSubTitleNode.textContent;
  profileTitleNode.textContent = event.currentTarget.titleInputNode.value;
  profileSubTitleNode.textContent = event.currentTarget.subInputNode.value;
}



