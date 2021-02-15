export default class Card {
  constructor(data, cardSelector, handleCardClick, api, delPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imageReview = handleCardClick;
    this._api = api;
    this._id = data.id;
    this._owner = data.owner;
    this._delPopup = delPopup;
    //this._openDelPopup = openDeletePopup;
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
      this._handleLikeIcon();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._imageReview(this._name, this._link);
      
    });
    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._cardDeleteRequest(this._element, this._id);
    });
  }

  //добавляем событие лайка
  _handleLikeIcon() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-active');
  }

  //стату корзинки (показать/скрыть)
  _setDelButtonState() {
    this._api
      .getUserData()
      .then((data) => {
        if (data._id === this._owner._id) {
          console.log('можешь удалить меня!')
          this._element.querySelector('.element__remove-button').classList.add('element__remove-button_visible');
        }
      })
      .catch(err=>console.log(err))
  }

  //открытие попапа подтверждения удаления карточки
  _cardDeleteRequest(element, id) {
    this._delPopup.open();
    this._delPopup.setDeleteEventListener(element, id);
    //document.querySelector('.popup__delete-button').addEventListener('submit', this._handleDelete(element))
  }

  //удаление карточки после подтверждения
  handleDelete(element) {
    this._api
      .removeCard(this._id)
      .then(console.log('я все удалил!!'))
      .then(() => {
        element.remove();
        element = null;
      })
      .catch(err=>console.log(err))
  }

  //показать количество лайков
  _setLikeNumber() {
    this._api
      .getLikeNumber()
      .then((data) => {
        console.log(data.likes)
        this._element.querySelector('.element__like-count').value = data.likes
      })
      .catch(err=>console.log(err))
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
    return this._element;
  }
}
