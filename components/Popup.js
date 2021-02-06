export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._buttonClose = this._popup.querySelector('.popup__cancel-button');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOnOverlayClose = this._handleOnOverlayClose.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOnOverlayClose(evt) { 
    if (evt.target.classList.contains('popup_visible')) {
      this.close(); 
    } 
  } 

  open() {
    this._popup.classList.add('popup_visible');  
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOnOverlayClose)
    this._buttonClose.removeEventListener('click', this.close);
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOnOverlayClose);
  }
}