export default class Card {
  constructor(data, cardSelector, handleCardClick, api, delPopup, cardID, userID, cardDeleteRequest) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imageReview = handleCardClick;
    this._api = api;
    this._cardID = cardID;
    this._owner = data.owner;
    this._delPopup = delPopup;
    this._userID = userID;
    this._likes = data.likes;
    this._cardDeleteRequest = cardDeleteRequest;
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
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeIcon(this._cardID, this._element);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._imageReview(this._name, this._link);
      
    });
    this._element.querySelector('.element__remove-button').addEventListener('click', this._cardDeleteRequest);
  }

  //получаем пользователей, которые поставили лайк
  _checkLikeOwners() {
    const amILikeOwner = this._likes.some(owner => owner._id.includes(this._userID))
    return amILikeOwner
  };


  //добавляем событие лайка
  _handleLikeIcon(cardID, card) {
    //если лайков еще нет, то PUT лайк и сердечко и вернуть кол-во лайков с сервера
    if (this._likes.length === 0) {
      this._api
        .setLikeOnCard(cardID)
        .then((data) => {
          card.querySelector('.element__like-count').textContent = data.likes.length;
          card.querySelector('.element__like-button').classList.add('element__like-active');
        })
        .catch(err=>console.log(err))
      }
    // если уже есть лайки, то проверяем есть ли мой лайк и если моего лайка еще нет (проверить id юзеров, поставивших лайки) то PUT лайк и сердечко и вернуть количество лайков с сервера
    else if (this._likes.length = !0 && this._checkLikeOwners() === false) {
      this._api
        .setLikeOnCard(cardID)
        .then((data) => {
          card.querySelector('.element__like-count').textContent = data.likes.length;
          card.querySelector('.element__like-button').classList.add('element__like-active');
        })
        .catch(err=>console.log(err))
    }
    //лайки есть + есть мой лайк => удаляем лайк с сервера
    else {
      this._api
        .removeLikeFromCard(cardID)
        .then((data) => {
          card.querySelector('.element__like-count').textContent = data.likes.length;
          card.querySelector('.element__like-button').classList.remove('element__like-active');
        })
        .catch(err=>console.log(err))
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
      console.log(this._element.querySelector('.element__like-button'))
      this._element.querySelector('.element__like-button').classList.add('element__like-active');
    } else {
      this._element.querySelector('.element__like-button').classList.remove('element__like-active');
    }
  }

  //показать количество лайков
  _setLikesNumber() {
    this._element.querySelector('.element__like-count').textContent = this._likes.length
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
    this._setLikesNumber();
    this._setHeartOnCard(this._element);
    return this._element;
  }
}
