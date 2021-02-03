export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._buttonClose = this._popup.querySelector('.popup__cancel-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleCrossClose(evt) {

  }

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close);
    this._buttonClose.addEventListener('click', console.log(this._buttonClose));
  }
}