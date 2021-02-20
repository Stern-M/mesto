import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popup = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this.close = this.close.bind(this);
  };

  _getInputValues() {
    const inputList = this._form.querySelectorAll('.popup__data');
    const inputValues = {};
    inputList.forEach((item) => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  //добавляю слушатели
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setAvatarListners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }

  close(){
    super.close();
    this._form.reset();
  }
}