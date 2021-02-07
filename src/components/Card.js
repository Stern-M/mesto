export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imageReview = handleCardClick;
  }

  // возврат разметки
  _getTemplate() { 
    const cardItems = document 

    .querySelector('.template') 
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

  _handleDeleteIcon() {
    this._element.remove();
    this._element = null;
  }

  //добавление данных в разметку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}
