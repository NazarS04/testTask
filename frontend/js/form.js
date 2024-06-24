const form = document.querySelector(".form");
const btn = form.querySelector("button");

const errorClassForInputCont = "form__input_error";
const errors = {
  required: "Поле обязательно для заполнения",
  email: "Неверно введён электронный адрес",
  phone: "Неверно введён номер телефона"
};
const domElements = {
  name: {
    cont: document.querySelector(".form__input-cont-name-js"),
    input: document.querySelector(".form__input-cont-name-js input"),
    error: document.querySelector(".form__input-cont-name-js p")
  }, phone: {
    cont: document.querySelector(".form__input-cont-phone-js"),
    input: document.querySelector(".form__input-cont-phone-js input"),
    error: document.querySelector(".form__input-cont-phone-js p")
  }, email: {
    cont: document.querySelector(".form__input-cont-email-js"),
    input: document.querySelector(".form__input-cont-email-js input"),
    error: document.querySelector(".form__input-cont-email-js p")
  }
};

function validateIsEmpty(key) {
  const obj = {
    value: domElements[key].input.value, error: domElements[key].error.textContent
  };

  if (obj.value.length < 1 && !obj.error) {
    domElements[key].error.textContent = errors.required;
    domElements[key].cont.classList.add(errorClassForInputCont);
  } else if (obj.value.length > 0 && obj.error === errors.required) {
    domElements[key].error.textContent = "";
    domElements[key].cont.classList.remove(errorClassForInputCont);
  }
}

async function validateIsCorrectPhone() {
  const value = domElements.phone.input.value;

  if (value.length < 1) {
    return;
  }

  const obj = {
    value: countries[activeCountryIndex].tel + value, error: domElements.phone.error.textContent
  };
  const response = await fetch(`https://lookups.twilio.com/v2/PhoneNumbers/${obj.value}`, {
    method: 'GET', headers: {
      'Authorization': 'Basic ' + btoa(`AC55d59bbb8a99a445a740adac35a4661e:110d31bd77131ba3e30bb3fa9ceceab9`)
    }
  });
  const data = await response.json();

  if (!data.valid && !obj.error) {
    domElements.phone.error.textContent = errors.phone;
    domElements.phone.cont.classList.add(errorClassForInputCont);
  } else if (data.valid && obj.error) {
    domElements.phone.error.textContent = "";
    domElements.phone.cont.classList.remove(errorClassForInputCont);
  }
}

function validateIsCorrectEmail() {
  const obj = {
    value: domElements.email.input.value, error: domElements.email.error.textContent
  };

  if (obj.value.length < 1) {
    return;
  }

  const isValid = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+)@(?:[a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}$/.test(obj.value);

  if (!isValid && !obj.error) {
    domElements.email.error.textContent = errors.email;
    domElements.email.cont.classList.add(errorClassForInputCont);
  } else if (isValid && obj.error) {
    domElements.email.error.textContent = "";
    domElements.email.cont.classList.remove(errorClassForInputCont);
  }
}

async function submit() {
  const obj = {
    name: domElements.name.input.value,
    phone: countries[activeCountryIndex].tel + domElements.phone.input.value,
    email: domElements.email.input.value
  };
  domElements.name.input.disabled = true;
  domElements.phone.input.disabled = true;
  domElements.email.input.disabled = true;

  const h3 = form.children[0].cloneNode();
  h3.style.marginBottom = "0";

  try {
    await fetch("http://127.0.0.1:3000", {
      method: "POST", body: JSON.stringify(obj)
    });
    h3.textContent = "Форма успешно отправлена.";
  } catch (e) {
    h3.textContent = "Что-то пошло не так. Пожалуйста обновите страницу.";
  } finally {
    form.innerHTML = "";
    form.insertAdjacentElement("beforeend", h3);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  btn.disabled = true;
  btn.textContent = "Отправка...";

  validateIsEmpty("name");
  validateIsEmpty("phone");
  validateIsEmpty("email");

  validateIsCorrectPhone().then(() => {
    validateIsCorrectEmail();

    const status = ["name", "phone", "email"].every((key) => {
      return !!domElements[key].input.value && !domElements[key].error.textContent;
    })
    if (!status) {
      btn.disabled = false;
      btn.textContent = "Записаться бесплатно";
      return;
    }

    submit();
  }).catch(e => {
    validateIsCorrectEmail();
    btn.disabled = false;
    btn.textContent = "Записаться бесплатно";
  });
})