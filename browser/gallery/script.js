'use strict';
const slider = document.getElementById('currentPhoto');
const forward = document.getElementById('nextPhoto');
const backward = document.getElementById('prevPhoto');

const images = ['i/breuer-building.jpg', 'i/guggenheim-museum.jpg', 'i/headquarters.jpg', 'i/IAC.jpg', 'i/new-museum.jpg'];
let step = 0;

function showNext() {
  step += 1;
  if (step == images.length) { step = 0 };
  slider.src = images[step];
}

function showPrev() {
  step -= 1;
  if (step == -1) { step = images.length - 1 };
  slider.src = images[step];
}

forward.onclick = showNext;
backward.onclick = showPrev;