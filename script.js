const ProfileEditButton = document.querySelector('.profile__edit_button');
const PopupNode = document.querySelector('.popup');
const PopupCancelButtonNode = document.querySelector('.popup__cancel_button');

const ProfileTitleNode = document.querySelector('.profile__title');
const ProfileSubTitleNode = document.querySelector('.profile__subtitle');
const SaveButtonNode = document.querySelector('.popup__save_button');



ProfileEditButton.addEventListener('click', togglePopupVisibility);
PopupCancelButtonNode.addEventListener('click', togglePopupVisibility);
SaveButtonNode.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
  PopupNode.classList.toggle('popup_visible');
}

const form1 = document.querySelector('.popup__container');
const form2 = document.querySelector('.popup__container');

form1.addEventListener('submit', NameFormSubmit) & ('click', togglePopupVisibility);
form2.addEventListener('submit', descriptionFormSubmit);

function NameFormSubmit(event) {
  console.log(event.currentTarget);
  event.preventDefault();
  const TitleInputNode = event.currentTarget.querySelector('.popup__name');
  ProfileTitleNode.textContent = TitleInputNode.value;
}

function descriptionFormSubmit(event) {
  console.log(event.currentTarget);
  event.preventDefault();
  const SubInputNode = event.currentTarget.querySelector('.popup__description');
  ProfileSubTitleNode.textContent = SubInputNode.value;
}
