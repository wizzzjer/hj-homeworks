'use strict';

const content = document.getElementById('content');
const preloader = document.getElementById('loader');
const to = document.getElementById('to');
const from = document.getElementById('from');
const source = document.getElementById('source');
const result = document.getElementById('result');

preloader.classList.remove('hidden');

var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoad);
  xhr.open("GET",
  "https://neto-api.herokuapp.com/currency",
  true);
  xhr.send();

function onLoad() {
  if (xhr.responseText) {
      try {
        var currencies = JSON.parse(xhr.responseText);
      } catch(err) {
        console.log(`Возникла ошибка: ${err.name}, ${err.message}`);
      }
    }
  
  preloader.classList.add('hidden');
  content.classList.remove('hidden');
  
  for (let currency of currencies) {
    let itemTo = document.createElement('option');
    let itemFrom = document.createElement('option'); // нельзя один и тот же элемент вставить в два родителя, пришлось создавать два о_0
    itemTo.innerText = currency.code;
    itemTo.value = currency.value;
    itemTo.dataset.title = currency.title;
    itemFrom.innerText = currency.code;
    itemFrom.value = currency.value;
    itemFrom.dataset.title = currency.title;
    to.appendChild(itemTo);    
    from.appendChild(itemFrom);    
  }
}

function convert() {
  let optionsFrom = Array.from(from.getElementsByTagName('option'));
  let optionsTo = Array.from(to.getElementsByTagName('option'));
  let fromRate = optionsFrom[from.selectedIndex].value;
  let toRate = optionsTo[to.selectedIndex].value;
  
  result.innerText = ((source.value / fromRate) * toRate).toFixed(2);
}

source.addEventListener('input', convert);
to.addEventListener('change', convert);
from.addEventListener('change', convert);