'use strict';

const content = document.getElementById('content');

content.innerHTML = ''; // убираем "рыбу"

var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoad);
  xhr.open("GET",
  "https://neto-api.herokuapp.com/book/",
  true);
  xhr.send();

function onLoad() {
  var books = JSON.parse(xhr.responseText);
  console.log(books);
  
  for (const book of books) {
    let item = document.createElement('li');
    item.dataset.title = book.title;
    item.dataset.author = book.author.name;
    item.dataset.info = book.info;
    item.dataset.price = book.price;
    item.innerHTML = `<img src="${book.cover.small}" alt="Обложка книги ${book.title}">`;
    content.appendChild(item);  
  }
 
}