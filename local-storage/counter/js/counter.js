'use strict';

let counterElem = document.getElementById('counter');
let controls = Array.from(document.getElementsByTagName('button'));

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.storagedCounter) {
    localStorage.storagedCounter = 0;
  }
  counterElem.innerHTML = Number(localStorage.storagedCounter);
});

controls.forEach(control => control.addEventListener('click', event => {
  let counter = Number(localStorage.storagedCounter);
  if (event.target.id == 'increment') {
    counter += 1;
  }
  if (event.target.id == 'decrement') {
    counter -= 1;
  }
  if (event.target.id == 'reset') {
    counter = 0;
  }  
  localStorage.storagedCounter = counter;
  counterElem.innerHTML = localStorage.storagedCounter;
}));