import Popup from './Popup.js';

export default class PopupWithDeleteForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = popupSelector;
    this._form = this._popup.querySelector('.popup__form');
    this.close = this.close.bind(this);
  };

  //добавляю слушатели для попапа с удалением
  setSubmitHandler() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._setSubmitHandler();
    });
  }
}