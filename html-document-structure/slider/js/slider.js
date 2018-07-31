'use strict';

const controls = Array.from(document.querySelectorAll('.slider-nav a'));
const slides = Array.from(document.getElementsByClassName('slide'));

document.addEventListener('DOMContentLoaded', () => { slides[0].classList.add('slide-current'); shouldIDisable(); });

function slider(event) {
  event.preventDefault();
  
  if (event.target.classList.contains('disabled')) {
      return false;
  }
  
  let currentSlide = document.getElementsByClassName('slide-current')[0];
  currentSlide.classList.remove('slide-current');
  
  switch (event.target.dataset.action) {
    case 'next':
      currentSlide.nextElementSibling.classList.add('slide-current');
      break;
    case 'prev':
      currentSlide.previousElementSibling.classList.add('slide-current');
      break;
    case 'first':
      slides[0].classList.add('slide-current');
      break;
    case 'last':
      slides[slides.length - 1].classList.add('slide-current');
      break;      
  }
}

function disableControl(name) {
  controls.find(control => control.dataset.action == name).classList.add('disabled');
}

function shouldIDisable() {
  controls.forEach(item => item.classList.remove('disabled'));
  
  if (slides[0].classList.contains('slide-current')) {
    disableControl('prev');
    disableControl('first');
  }
  if (slides[slides.length - 1].classList.contains('slide-current')) {
    disableControl('next');
    disableControl('last');
  }
}

controls.forEach(item => {
  item.addEventListener('click', slider);
  item.addEventListener('click', shouldIDisable);
});