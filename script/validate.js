//подсветить поле с ошибкой
function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputInvalidClass);
}
//убрать подсветку ошибки если все ок
function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputInvalidClass);
}
//кастомное значение ошибки если поле text пустое
function checkTextValidity(input, config) {
  if (input.type === 'text' && input.validity.valueMissing ) {
      input.setCustomValidity(config.customMessages.textMissmath);
  }
}
//кастомное значение ошибки если поле url пустое
function checkUrlValidity(input, config) {
  if (input.type === 'url' && input.validity.typeMismatch ) {
      input.setCustomValidity(config.customMessages.urlMissmath);
  }
}
//проверка на валидность
function checkInputValidity(form, input, config) {
  input.setCustomValidity('');
  checkTextValidity(input, config);
  checkUrlValidity(input, config);
  if (!input.validity.valid) {
      showError(form, input, config);
  } else {
      hideError(form, input, config);
  }
}
//настройка кнопки сабмит (автоматически подстраиватьется под валидность/не валидность)
function setButtonState(button, isActive, config) {
  if (isActive) {
      button.classList.remove(config.buttonInvalidClass);
      button.disabled = false;
  } else {
      button.classList.add(config.buttonInvalidClass);
      button.disabled = true; 
  }
}
//добавление слушателей 
function setEventListeners(form, config) {
  const inputsList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputsList.forEach((input) => {
      input.addEventListener('input', () => {
          checkInputValidity(form, input, config);
          setButtonState(submitButton, form.checkValidity(), config);
      });
  });
}
//включение валидации всех форм
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
      setEventListeners(form, config);

      form.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });

      const submitButton = form.querySelector(config.submitButtonSelector);
      setButtonState(submitButton, form.checkValidity(), config)
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__data',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__data_invalid',
  buttonInvalidClass: 'popup__button_invalid', 
  customMessages: {
      textMissmath: 'Вы пропустили это поле.',
      urlMissmath: 'Введите адрес сайта.',
  }
};

enableValidation(validationConfig);