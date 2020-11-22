let profileEditButton = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCancelButtonNode = document.querySelector('.popup__cancel-button');
let profileTitleNode = document.querySelector('.profile__title');
let profileSubTitleNode = document.querySelector('.profile__subtitle');
let saveButtonNode = document.querySelector('.popup__save-button');
let form = document.querySelector('.popup__container');

profileEditButton.addEventListener('click', togglePopupVisibility);
popupCancelButtonNode.addEventListener('click', togglePopupVisibility);
saveButtonNode.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
  popupNode.classList.toggle('popup_visible');
}

document.getElementById("1").value = profileTitleNode.textContent;
document.getElementById("2").value = profileSubTitleNode.textContent;


form.addEventListener('submit', NameFormSubmit) & ('click', togglePopupVisibility);
form2.addEventListener('submit', descriptionFormSubmit);

function NameFormSubmit(event) {
  console.log(event.currentTarget);
  event.preventDefault();
  let titleInputNode = event.currentTarget.querySelector('.popup__data_name');
  profileTitleNode.textContent = titleInputNode.value;
}

function descriptionFormSubmit(event) {
  console.log(event.currentTarget);
  event.preventDefault();
  let subInputNode = event.currentTarget.querySelector('.popup__data_description');
  profileSubTitleNode.textContent = subInputNode.value;
}

