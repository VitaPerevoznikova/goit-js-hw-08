import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const KEY_FORM_INPUT = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, 500));

showData();

const onFormData = {};
function onInputData(evt) {
  onFormData[evt.target.name] = evt.target.value;
  localStorage.setItem(KEY_FORM_INPUT, JSON.stringify(onFormData));
}

function showData() {
  let dataForm = JSON.parse(localStorage.getItem(KEY_FORM_INPUT));
  if (dataForm) {
    const {
      elements: { email, message },
    } = form;
    email.value = dataForm.email;
    message.value = dataForm.message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;

  if (email.value.trim() === '' || message.value.trim() === '') {
    return alert("Fill in all fields");
  }
  console.log({ email: email.value.trim(), message: message.value.trim() });

  evt.currentTarget.reset();
  localStorage.removeItem(KEY_FORM_INPUT);
}
