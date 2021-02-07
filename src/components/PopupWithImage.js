import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = popupSelector.querySelector('.popup__review-image');
    this._description = popupSelector.querySelector('.popup__review-title')
  };

  open(name, link) {
    super.open();
    this._photo.src = link; 
    this._photo.alt = name; 
    this._description.textContent = name;
  }
}