export default class Card {
  constructor(data, cardSelector, handleCardClick, delPopup, userID, cardDeleteRequest, putLikeOnCard, deleteLikeFromCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imageReview = handleCardClick;
    this._cardID = data._id;
    this._owner = data.owner;
    this._delPopup = delPopup;
    this._userID = userID;
    this._likes = data.likes;
    this._cardDeleteRequest = cardDeleteRequest;
    this._putLike = putLikeOnCard;
    this._deleteLike = deleteLikeFromCard;
    this._handleLikeIcon = this._handleLikeIcon.bind(this);
  }

  getCardID() {
    return this._cardID;
  }

  // возврат разметки
  _getTemplate() {
    const cardItems = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardItems;
  }

  //добавляем слушатели
  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeIcon);
    this._element.querySelector('.element__image').addEventListener('click', () => {this._imageReview(this._name, this._link)});
    this._element.querySelector('.element__remove-button').addEventListener('click', this._cardDeleteRequest);
  }

  //получаем пользователей, которые поставили лайк
  _checkLikeOwners() {
    const amILikeOwner = this._likes.some(owner => owner._id === this._userID);
    return amILikeOwner
  };


  //добавляем событие лайка
  _handleLikeIcon(evt) {
    if (!evt.target.classList.contains('element__like-active')) {
      this._putLike();
      this._element.querySelector('.element__like-button').classList.add('element__like-active');
    } else {
      this._deleteLike();
      this._element.querySelector('.element__like-button').classList.remove('element__like-active');
    }
  }

  //делаем корзину видимой если юзер = создатель карточки
  _setDelButtonState() {
    if (this._userID === this._owner._id) {
      this._element.querySelector('.element__remove-button').classList.add('element__remove-button_visible');
    }
  }

  //сердечко на лайкнутой карточке ЗАКОНЧИТЬ!!
  _setHeartOnCard() {
    if (this._checkLikeOwners() === true) {
      this._element.querySelector('.element__like-button').classList.add('element__like-active');
    } else {
      this._element.querySelector('.element__like-button').classList.remove('element__like-active');
    }
  }

  //обновить количество лайков
  setLikesNumber(number) {
    this._element.querySelector('.element__like-count').textContent = number;
  }

  //показать количество лайков
  _showLikesOnCard() {
    this._element.querySelector('.element__like-count').textContent = this._likes.length;
  }

  //открытие попапа подтверждения удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //добавление данных в разметку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._image = this._element.querySelector('.element__image')
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setDelButtonState();
    this._showLikesOnCard();
    this._setHeartOnCard(this._element);
    return this._element;
  }
}
