const dropMenus = document.getElementsByClassName('wrapper-dropdown');

function toggleMenu() {
  this.classList.toggle('active');
}

for (const dropMenu of dropMenus) {
  dropMenu.onclick = toggleMenu;
}