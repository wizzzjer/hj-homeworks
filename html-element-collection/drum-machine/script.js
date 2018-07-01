const keys = document.getElementsByClassName('drum-kit__drum');

function hitDaButton () {
  let thisPlayer = this.getElementsByTagName('audio');
  thisPlayer[0].play();
}

for (const key of keys) {
  key.onclick = hitDaButton;
}