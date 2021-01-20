const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__data',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__data_invalid',
  inactiveButtonClass: 'popup__button_invalid', 
  customMessages: {
      textValueMissing: 'Вы пропустили это поле.',
      urlMissmath: 'Введите адрес изображения.',
      urlValueMissing: 'Вы пропустили это поле.'
  }
};

export class formValidator {
  constructor(validationParameters, element) {
    this._validationParameters = validationParameters;
    this._element = element;
  }


  _showError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }
  
  //убрать подсветку ошибки если все ок
  _hideError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(inputErrorClass);
  }
  
  //кастомное значение ошибки если поле text пустое
  _checkTextValidity(input) {
    if (input.type === 'text' && input.validity.valueMissing ) {
        input.setCustomValidity(customMessages.textValueMissing);
    }
  }
  
  //кастомное значение ошибки если поле url пустое
  _checkUrlValidity(input) {
    if (input.type === 'url' && input.validity.typeMismatch ) {
        input.setCustomValidity(customMessages.urlMissmath);
    }
    if (input.type === 'url' && input.validity.valueMissing) {
      input.setCustomValidity(customMessages.urlValueMissing);
    }
  }

  _checkInputValidity(form, input) {
    this._input.setCustomValidity('');
    _checkTextValidity(input);
    _checkUrlValidity(input);
    if (!input.validity.valid) {
        _showError(form, input);
    } else {
        _hideError(form, input);
    }
  }
  
  _setButtonState () {
    if (isActive) {
        this._button.classList.remove(inactiveButtonClass);
        this._button.disabled = false;
    } else {
        this._button.classList.add(inactiveButtonClass);
        this._button.disabled = true;
    }
  }

  _setEventListeners() {
    const inputsList = [...this._element.querySelectorAll('.popup__data')];
    inputsList.forEach.addEventListener('input', () => {
            this._checkInputValidity(form, input);
            this._setButtonState(submitButton, form.checkValidity());
          });
    }

  enableValidation() {
      this._setEventListeners();
      this._validationParameters.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    const submitButton = this._element.querySelector('.popup__button');
    _setButtonState(submitButton, form.checkValidity());
  }
}