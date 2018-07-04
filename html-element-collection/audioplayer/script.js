const playerContainer = document.getElementsByClassName('mediaplayer')[0];
const player = playerContainer.getElementsByTagName('audio')[0];
const title = playerContainer.getElementsByClassName('title')[0];

const play = document.getElementsByClassName('playstate')[0];
const stop = document.getElementsByClassName('stop')[0];
const next = document.getElementsByClassName('next')[0];
const back = document.getElementsByClassName('back')[0];

const songs = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];
let song = 0;

function playMusic () {
  if (!playerContainer.classList.contains('play')) {
    playerContainer.classList.add('play');
    player.play();
  } else {
    playerContainer.classList.remove('play');
    player.pause();
  }
}

function stopMusic () {
  if (playerContainer.classList.contains('play')) {
    playerContainer.classList.remove('play');
    player.pause();
    player.currentTime = 0;
  }
}

function playNext() {
  song += 1;
  if (song == songs.length) { song = 0 };
  player.src = 'mp3/' + songs[song] + '.mp3';
  if (playerContainer.classList.contains('play')) {
    player.play();  
  }
  title.title = songs[song];
}

function playBack() {
  song -= 1;
  if (song == -1) { song = songs.length - 1 };
  player.src = 'mp3/' + songs[song] + '.mp3';
  if (playerContainer.classList.contains('play')) {
    player.play();  
  }
  title.title = songs[song];
}

play.onclick = playMusic;
stop.onclick = stopMusic;
next.onclick = playNext;
back.onclick = playBack;