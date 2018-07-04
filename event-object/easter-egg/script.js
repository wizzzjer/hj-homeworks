'use strict';

const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
const userInput = [];

function showMenu(event) {
  if (event.ctrlKey && event.altKey && event.keyCode == 84) {
    nav.classList.toggle('visible');
  }
}

function collectInput(event) {
  userInput.push(event.code); // используется code, а не key, чтобы секретное слово воспринималось и в рус. и в англ. раскладке
  let currentInput = userInput.join('').toLowerCase().replace(/key/g, '');
  if (currentInput.indexOf('ytnjkjubz') !== -1) {
    secret.classList.add('visible');
  }
}

document.addEventListener('keydown', showMenu);
document.addEventListener('keydown', collectInput);