import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._popup = popupSelector;
    this._buttonClose = this._popup.querySelector('.popup__cancel-button');
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  };

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__data');
    this._inputValues = {};
    this._inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
    
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._handleFormSubmit(this._inputValues.place_name, this._inputValues.place_url);
      this.close();
    }
    );
  }

  close(){
    super.close();
    this._form.reset();
  }
}