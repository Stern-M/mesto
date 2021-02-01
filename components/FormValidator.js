export default class FormValidator {
  constructor(validationConfig, element) {
    this._validationConfig = validationConfig;
    this._element = element;
    this._formSelector = element.querySelector(this._validationConfig.formSelector);
    this._inputSelector = [...element.querySelectorAll(this._validationConfig.inputSelector)];
    this._submitButtonSelector = element.querySelector(this._validationConfig.submitButtonSelector); 
  }
  
    //подсветить поле с ошибкой
  _showError(input) {
    const error = this._element.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._validationConfig.inputErrorClass);
  }

  //убрать подсветку ошибки если все ок
  _hideError(input) {
    const error = this._element.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._validationConfig.inputErrorClass);
  }

  //кастомное значение ошибки если поле text пустое
  _checkTextValidity(input) {
    if (input.type === 'text' && input.validity.valueMissing ) {
      input.setCustomValidity(this._validationConfig.customMessages.textValueMissing);
    }
  }

  //кастомное значение ошибки если поле url пустое
  _checkUrlValidity(input) {
    if (input.type === 'url' && input.validity.typeMismatch ) {
      input.setCustomValidity(this._validationConfig.customMessages.urlMissmath);
    }
    if (input.type === 'url' && input.validity.valueMissing) {
      input.setCustomValidity(this._validationConfig.customMessages.urlValueMissing);
    }
  }

  //проверка на валидность
  _checkInputValidity(input) {
    input.setCustomValidity("");
    this._checkTextValidity(input);
    this._checkUrlValidity(input);
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  //настройка кнопки сабмит (автоматически подстраивается под валидность/не валидность)
  _setButtonState() {
    if (this._formSelector.checkValidity()) {
      this._submitButtonSelector.classList.remove(this._validationConfig.inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    } else {
      this._submitButtonSelector.classList.add(this._validationConfig.inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    }
  }

  //добавление слушателей 
  _setEventListeners() {
    this._inputSelector.forEach((input) => { 
      input.addEventListener('input', () => { 
        this._checkInputValidity(input); 
        this._setButtonState(); 
      }); 
    }); 
  }

  //проверяем валидность полей (актуально для попап редактирования), убираем сообщение об ошибке, валидирование кнопки сабмит)
  resetValidation() {
    this._inputSelector.forEach((input) => {
      this._checkInputValidity(input);
      this._hideError(input);
      this._setButtonState();
    }); 
  }

  //включение валидации всех форм
  enableValidation() { 
    this._formSelector.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    });
    this._setEventListeners();
  }
}
