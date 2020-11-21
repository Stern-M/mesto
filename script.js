let ProfileEditButton = document.querySelector('.profile__edit_button');
let PopupNode = document.querySelector('.popup');
let PopupCancelButtonNode = document.querySelector('.popup__cancel_button');
let ProfileTitleNode = document.querySelector('.profile__title');
let ProfileSubTitleNode = document.querySelector('.profile__subtitle');
let SaveButtonNode = document.querySelector('.popup__save_button');

ProfileEditButton.addEventListener('click', togglePopupVisibility);
PopupCancelButtonNode.addEventListener('click', togglePopupVisibility);
SaveButtonNode.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
  PopupNode.classList.toggle('popup_visible');
}

document.getElementById("1").value = ProfileTitleNode.textContent;
document.getElementById("2").value = ProfileSubTitleNode.textContent;

let form1 = document.querySelector('.popup__container');
let form2 = document.querySelector('.popup__container');

form1.addEventListener('submit', NameFormSubmit) & ('click', togglePopupVisibility);
form2.addEventListener('submit', descriptionFormSubmit);

function NameFormSubmit(event) {
  console.log(event.currentTarget);
  event.preventDefault();
  let TitleInputNode = event.currentTarget.querySelector('.popup__name');
  ProfileTitleNode.textContent = TitleInputNode.value;
}

function descriptionFormSubmit(event) {
  console.log(event.currentTarget);
  event.preventDefault();
  let SubInputNode = event.currentTarget.querySelector('.popup__description');
  ProfileSubTitleNode.textContent = SubInputNode.value;
}

