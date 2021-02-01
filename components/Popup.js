export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._escapeHandleBinding = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_visible');
    document.addEventListener('keydown', this._escapeHandleBinding);
  }

  close() {
    this._popupSelector.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._escapeHandleBinding);
  }
  setEventListeners() {
    document.querySelector('.popup__cancel-button').addEventListener('click', this.close.bind(this));
  }
}