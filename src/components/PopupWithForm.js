import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._popup = popupSelector;
    this._buttonClose = this._popup.querySelector('.popup__cancel-button');
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
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  //добавляю слушатели для попапа с удалением
  setDeleteEventListener(element, id) {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(element, id);
    });
  }

  /*deleteSubmitHandler() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //handleDelete(element, id);
    });
  }*/

  close(){
    super.close();
    this._form.reset();
  }
}