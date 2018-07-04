'use strict';

const anchors = Array.from(document.getElementById('nav').getElementsByTagName('a'));
const image = document.getElementById('view');

function showPhoto() {
  event.preventDefault();
  for (let anchor of anchors) {
    anchor.classList.remove('gallery-current');
  }  
  this.classList.add('gallery-current');
  image.src = this.href.replace('thumb', 'full');
}

for (let anchor of anchors) {
  anchor.addEventListener('click', showPhoto);
}