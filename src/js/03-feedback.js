import _throttle from 'lodash.throttle';

const FORM_KEY_STORAGE = 'feedback-form-state';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('.feedback-form [name="email"]'),
  textareaEl: document.querySelector('.feedback-form [name="message"]'),
};
const savedDataInStorage = localStorage.getItem(FORM_KEY_STORAGE);
let formData = savedDataInStorage ? JSON.parse(savedDataInStorage) : {};

const unsentFormData = function () {
  Object.entries(formData).forEach(([key, value]) => {
    refs.formEl.elements[key].value = value;
  });
};

const onFormSave = e => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_KEY_STORAGE, JSON.stringify(formData));
};

const onFormSubmit = e => {
  e.preventDefault();

  if (!refs.emailEl.value || !refs.textareaEl.value) {
    alert('Please fill in all text fields');
    return;
  }

  e.currentTarget.reset();
  localStorage.removeItem(FORM_KEY_STORAGE);
  console.log(formData);
  formData = {};
};

refs.formEl.addEventListener('input', _throttle(onFormSave, 500));
refs.formEl.addEventListener('submit', onFormSubmit);
unsentFormData();
