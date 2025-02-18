
!(function () {
    const form = document.getElementById("form-m");
    const username = document.getElementById("name");
    const email = document.getElementById("mail");
  
    // Показываем ошибку под полем
    function showError(input, message) {
      const formControl = input.parentElement;
      formControl.className = "form-control error";
      const small = formControl.querySelector("small");
      small.innerText = message;
    }
  
    // Показываем, что поле заполнено верно
    function showSuccess(input) {
      const formControl = input.parentElement;
      formControl.className = "form-control success";
    }
  
    // Проверяем адрес электронной почты на правильность
    function checkEmail(input) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(input.value.trim())) {
        showSuccess(input);
      } else {
        showError(input, "Адрес электронной почты имеет неверный формат");
      }
    }
  
    // Проверка обязательных полей
    /**
     *
     * @param {HTMLElement[]} inputElements
     * @returns {boolean}
     */
    function checkRequired(inputElements) {
      let isRequired = false;
      inputElements.forEach(function (input) {
        if (input.value.trim() === "") {
          showError(input, `Требуется задать значение для поля ${getFieldName(input)}`);
          isRequired = true;
        } else {
          showSuccess(input);
        }
      });
  
      return isRequired;
    }
  
    // Проверяем значение поля на соответствие минимальной и максимальной длине
    function checkLength(input, min, max) {
      if (input.value.length < min) {
        showError(
          input,
          `Поле ${getFieldName(input)} должно быть длиной не менее ${min} символов`
        );
      } else if (input.value.length > max) {
        showError(
          input,
          `Поле ${getFieldName(input)} не должно быть длиной более ${max} символов`
        );
      } else {
        showSuccess(input);
      }
    }
  
    // Получаем имя поля
    function getFieldName(input) {
      return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }
  
    // Устанавливаем слушатели событий на форму
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      if (checkRequired([username, email, password, password2])) {
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPasswordsMatch(password, password2);
      }
    });
  
  })();