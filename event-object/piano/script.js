'use strict';

const sounds = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];
const buttonsList = document.getElementsByClassName('set')[0];
const buttons = Array.from(buttonsList.getElementsByTagName('li'));

// add basic sources
function addSources(mode = 'middle') {
  for (const button of buttons) {
    button.getElementsByTagName('audio')[0].src = 'sounds/' + mode + '/' + sounds[buttons.indexOf(button)]; //как это сделать менее коряво?
  }  
}
addSources();

// switch mode
function updateMode(event) {
  
  if (!(event.altKey || event.shiftKey)) {
    return;
  }
  
  if (!event.repeat) {

    if (event.altKey) {
      buttonsList.classList.add('lower');
      addSources('lower');
    }
    if (event.shiftKey) {
      buttonsList.classList.add('higher');
      addSources('higher');    
    }   
    
  } else {
    return;
  }   
}

function toBasicMode(event) {
  buttonsList.classList.remove('higher');
  buttonsList.classList.remove('lower');
  addSources();
}

//make sound
function playPiano() {
  let player = this.getElementsByTagName('audio')[0];
  player.currentTime = 0;
  player.play();
}

// add event listeners
for (const button of buttons) {
  button.addEventListener('click', playPiano);
}

document.addEventListener('keydown', updateMode);
document.addEventListener('keyup', toBasicMode);