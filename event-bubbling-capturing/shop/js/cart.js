'use strict';

function handleItem(event) {
  event.preventDefault(); // чтобы страница не прыгала наверх, когда кликаешь на один из последних товаров
  if (event.target.classList.contains('add-to-cart')) {
    let addThisItem = {
      title: event.target.dataset.title,
      price: event.target.dataset.price
    };
    addToCart(addThisItem);
  }
}

let itemsList = document.getElementsByClassName('items-list')[0];
itemsList.addEventListener('click', handleItem);