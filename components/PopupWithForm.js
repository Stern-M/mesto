import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popup = popupSelector;
    this._buttonClose = this._popup.querySelector('.popup__cancel-button');
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  };

  _getInputValues() {
    const inputValues = {};
    this._form.querySelectorAll('.popup__data').forEach((item) => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    }
    );
  }

  close(){
    super.close();
    this._form.reset();
  }
}