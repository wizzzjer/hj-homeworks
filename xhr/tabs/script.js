'use sctrict';

const tabs = document.querySelectorAll('.tabs nav a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');

function loadData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",
    url,
    true);
  xhr.send();
  
  xhr.addEventListener(
    "readystatechange",
    onReadyStateChange
  );
  function onReadyStateChange() {
    if (xhr.readyState !== 4) return;
    // При успешном получении данных прячем прелоадер и показываем данные
    preloader.classList.add('hidden');
    content.innerHTML = xhr.responseText;
  }
}

function toggleTab(event) {
  event.preventDefault();
  
  // Показываем прелоадер
  preloader.classList.remove('hidden');
  
  // Просим данные
  loadData(this.href);
  
  // Визуально показываем активность вкладки
  for (const tab of tabs) {
    tab.classList.remove('active');
  }
  this.classList.add('active');
}

for (const tab of tabs) {
  tab.addEventListener('click', toggleTab);
}

document.addEventListener('DOMContentLoaded', () => {
  const email = document.querySelector('.tabs nav a');
  loadData(email.href);
});