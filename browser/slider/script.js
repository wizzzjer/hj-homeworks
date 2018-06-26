'use strict';
const slider = document.getElementById('slider');
const images = ['i/airmax.png', 'i/airmax-jump.png', 'i/airmax-on-foot.png', 'i/airmax-playground.png', 'i/airmax-top-view.png'];
let step = 0;

function changeSrc() {
  step += 1;
  if (step == images.length) { step = 0 };
  slider.src = images[step];
}

setInterval(changeSrc, 5000);
