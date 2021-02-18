import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = popupSelector;
    this._form = this._popup.querySelector('.popup__form');
    this.close = this.close.bind(this);
  };

  close() {
    super.close();
    this._form.removeEventListener('click', this._cardDeleteRequest)
  }

  //добавляю слушатели для попапа с удалением
  setSubmitHandler(cardDeleteRequest) {
    super.setEventListeners();
    this._cardDeleteRequest = cardDeleteRequest;
    this._form.addEventListener('click', this._cardDeleteRequest);
  }
}