export default class Card {
  constructor(data, cardSelector, handleCardClick, api, deletePopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imageReview = handleCardClick;
    this._api = api;
    this._id = data.id;
    this._owner = data.owner;
    this._delPopup = deletePopup;
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
      this._handleDeleteIcon();
    });
  }

  //добавляем события
  _handleLikeIcon() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-active');
  }

  _setDelButtonState() {
    this._api
      .getUserData()
      .then((data) => {
        //console.log(this._owner._id)
        if (data._id === this._owner._id) {
          this._element.querySelector('.element__remove-button').classList.add('element__remove-button_visible');
        }
      })
  }

  _cardDeleteRequest() {
    console.log(this._element)
    this._delPopup.open();
    document.querySelector('.popup__delete-button').addEventListener('submit', this._handleDeleteIcon())
  }

  //удаление карточки
  _handleDeleteIcon() {
    this._api
      .removeCard(this._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
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
