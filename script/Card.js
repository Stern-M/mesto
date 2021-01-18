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

  //добавление данных в разметку
  generate() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}