import _throttle from 'lodash.throttle';

const FORM_CONTENT_KEY_STORAGE = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
let previousFormContent = localStorage.getItem(FORM_CONTENT_KEY_STORAGE);

const unsentFormData = function () {
  if (previousFormContent) {
    Object.entries(JSON.parse(previousFormContent)).forEach(([key, value]) => {
      formEl.elements[key].value = value;
    });
  }
};

const onInputText = e => {
  const formContent = previousFormContent
    ? JSON.parse(previousFormContent)
    : {};
  formContent[e.target.name] = e.target.value;
  localStorage.setItem(FORM_CONTENT_KEY_STORAGE, JSON.stringify(formContent));
};

const onFormSubmit = e => {
  e.preventDefault();

  const formData = localStorage.getItem(FORM_CONTENT_KEY_STORAGE);
  e.currentTarget.reset();
  formData && console.log(JSON.parse(formData));
  localStorage.removeItem(FORM_CONTENT_KEY_STORAGE);
};

formEl.addEventListener('input', _throttle(onInputText, 500));
formEl.addEventListener('submit', onFormSubmit);
unsentFormData();
