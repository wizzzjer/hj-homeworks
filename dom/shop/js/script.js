'use strict';

const addButtons = Array.from(document.querySelectorAll('.box button.add')),
      cartCount = document.getElementById('cart-count'),
      cartTotal = document.getElementById('cart-total-price');
      
const cart = {
  count: 0,
  total: 0
};


function addItem() {
  cart.count += 1;
  cart.total += Number(this.dataset.price);
  cartCount.innerHTML = cart.count;
  cartTotal.innerHTML = getPriceFormatted(cart.total);
}

for (const addButton of addButtons) {
  addButton.addEventListener('click', addItem);
}