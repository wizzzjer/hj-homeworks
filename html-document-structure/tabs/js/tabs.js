'use strict';

const tabsNav = document.getElementsByClassName('tabs-nav')[0];
const articles = Array.from(document.querySelectorAll('.tabs-content *[data-tab-title]'));
const tempTab = tabsNav.firstElementChild;

// прячем статьи и строим табы из их данных
articles.forEach(article => {
  article.classList.add('hidden');
  
  let newTab = tempTab.cloneNode(true);
  newTab.firstElementChild.classList.add(article.dataset.tabIcon);
  newTab.firstElementChild.innerHTML = article.dataset.tabTitle;
  if (articles.indexOf(article) == 0) {
    // показываем первую статью
    newTab.firstElementChild.classList.add('ui-tabs-active');
    article.classList.remove('hidden');
  }
  tabsNav.appendChild(newTab);
  
});

// удаляем временный таб
tabsNav.removeChild(tempTab);

// переключаем табы
const tabs = Array.from(document.querySelectorAll('.tabs-nav li a'));

function makeActive(event) {
  tabs.forEach(tab => tab.classList.remove('ui-tabs-active'));
  articles.forEach(article => article.classList.add('hidden'));  
  
  event.target.classList.add('ui-tabs-active');
  articles.find(article => article.dataset.tabTitle == event.target.innerHTML).classList.remove('hidden');
}

tabs.forEach(tab => tab.addEventListener('click', makeActive));