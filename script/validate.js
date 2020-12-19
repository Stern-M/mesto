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
//переделать для редактирования профиля
/*function checkPhoneValidity(input, config) {
  if (input.type === 'tel' && input.validity.patternMismatch ) {
      input.setCustomValidity(config.customMessages.phoneMissmath);
  }
}*/

//проверка на валидность
function checkInputValidity(form, input, config) {
  input.setCustomValidity('');
  //checkPhoneValidity(input,config);

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

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
      setEventListeners(form, config);

      form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          console.log('отправка формы');
      });

      const submitButton = form.querySelector(config.submitButtonSelector);
      setButtonState(submitButton, form.checkValidity(), config)
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__data',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button_invalid', 
  
  customMessages: {
      phoneMissmath: 'Введите телефон в формате +7 999 999 99 99 или 8 999 999 99 99',
  }
};

enableValidation(validationConfig);