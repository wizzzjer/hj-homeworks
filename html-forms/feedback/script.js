'use strict';

const formItself = document.getElementsByClassName('contentform')[0];
const fields = Array.from(document.querySelectorAll('.contentform input, .contentform textarea'));
const sendButton = document.querySelector('form .button-contact');
const changeButton = document.querySelector('main .button-contact');
const postIndex = document.getElementsByName('zip')[0];
const message = document.getElementsByTagName('main')[0];

function checkForm() {
  sendButton.disabled = true;
  if (fields.every(field => field.value !== '')) {
    sendButton.disabled = false;
  }  
}

function checkPostIndex(event) {
  if (event.keyCode < 48 || event.keyCode > 57) {
    event.preventDefault(); // честно, нагуглила! Сама бы долго догадывалась
    return false;
  }
}

function pretendToSend(event) {
  event.preventDefault();
  if (sendButton.disabled == false) {
    formItself.classList.toggle('hidden');
    message.classList.toggle('hidden');
  }
}

function backToForm(event) {
  event.preventDefault();
  formItself.classList.toggle('hidden');
  message.classList.toggle('hidden');
}

function fillMessage() {
  let outputs = document.querySelectorAll('main output');
  for (let output of outputs) {
    output.value = fields.find((field) => (field.name == output.id)).value;
  }
}

// Обработчики
for (let field of fields) {
  field.addEventListener('input', checkForm);
  field.addEventListener('change', fillMessage);
}

postIndex.addEventListener('keypress', checkPostIndex);
sendButton.addEventListener('click', pretendToSend);
changeButton.addEventListener('click', backToForm);