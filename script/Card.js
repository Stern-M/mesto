import {openPopup} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    
    this._cardSelector = cardSelector;
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
      this._imageReview();
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
    const targetCard = event.target.closest('.element');
    targetCard.remove();
  }

  _imageReview () {
    openPopup(document.querySelector('.popup_preview_form'));
    document.querySelector('.popup__review-image').src = this._link;
    document.querySelector('.popup__review-image').alt = this._name;
    document.querySelector('.popup__review-title').textContent = this._name;
  }

  //добавление данных в разметку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    
    return this._element;
  }
}
