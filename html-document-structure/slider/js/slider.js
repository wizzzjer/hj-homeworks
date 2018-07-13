'use strict';

const controls = Array.from(document.querySelectorAll('.slider-nav a'));
const slides = Array.from(document.getElementsByClassName('slide'));

document.addEventListener('DOMContentLoaded', () => slides[0].classList.add('slide-current'));
document.addEventListener('DOMContentLoaded', shouldIDisable);

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

function shouldIDisable() {
  controls.forEach(item => item.classList.remove('disabled'));
  
  if (slides[0].classList.contains('slide-current')) {
    controls.find(control => control.dataset.action == 'prev').classList.add('disabled');
    controls.find(control => control.dataset.action == 'first').classList.add('disabled');
  }
  if (slides[slides.length - 1].classList.contains('slide-current')) {
    controls.find(control => control.dataset.action == 'next').classList.add('disabled');
    controls.find(control => control.dataset.action == 'last').classList.add('disabled');
  }
  // насколько такая конструкция c Array.find "дорогая"? наверное, "дешевле" было бы контролы по индексу находить?
  // но полагаться на неизменность индексов тоже как-то нехорошо. как оптимально будет поступить?
}

controls.forEach(item => {
  item.addEventListener('click', slider);
  item.addEventListener('click', shouldIDisable);
});