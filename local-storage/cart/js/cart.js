'use strict';

const colorParent = document.getElementById('colorSwatch');
const sizeParent = document.getElementById('sizeSwatch');
const cartParent = document.getElementById('quick-cart');

var getColors = new XMLHttpRequest();
getColors.addEventListener("load", onLoadColors);
getColors.open("GET",
         "https://neto-api.herokuapp.com/cart/colors",
         true);
getColors.send();

var getSizes = new XMLHttpRequest();
getSizes.addEventListener("load", onLoadSizes);
getSizes.open("GET",
         "https://neto-api.herokuapp.com/cart/sizes",
         true);
getSizes.send();

var getCart = new XMLHttpRequest();
getCart.addEventListener("load", onLoadCart);
getCart.open("GET",
         "https://neto-api.herokuapp.com/cart",
         true);
getCart.send();

/* Рисуем инпуты и корзину*/
function onLoadColors() {
    const colors = JSON.parse(getColors.response);
    
    for (let color of colors) {
      
      let colorDiv = document.createElement('div');
      colorDiv.dataset.value = color.type;
      colorDiv.classList.add('swatch-element', 'color', color.type);
      if (color.isAvailable) {
        colorDiv.classList.add('available');
      } else {
        colorDiv.classList.add('soldout');
      }
      
      let tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.innerHTML = color.title;
      
      let input = document.createElement('input');
      input.setAttribute('quickbeam', 'color');
      input.setAttribute('type', 'radio');
      input.id = `swatch-${colors.indexOf(color)}-${color.type}`;
      input.name = 'color';
      input.value = color.type;
      if (!color.isAvailable) {
        input.disabled = true;
      }
      
      // лезем в локалсторадж и смотрим, не чекнутный ли инпут
      if (localStorage.checkedInputs) {
        JSON.parse(localStorage.checkedInputs).forEach(storedInput => {
          if (storedInput == input.id) {
            input.checked = true;
          }
        });
      }
      
      let label = document.createElement('label');
      label.setAttribute('for', `swatch-${colors.indexOf(color)}-${color.type}`);
      
      let span = document.createElement('span');
      span.style.backgroundColor = color.type;
      
      let img = document.createElement('img');
      img.classList.add('crossed-out');
      img.src = "https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886";
      
      colorParent.appendChild(colorDiv);
      colorDiv.appendChild(tooltip);
      colorDiv.appendChild(input);
      colorDiv.appendChild(label);
      label.appendChild(span);
      label.appendChild(img);
    }    
}

function onLoadSizes() {
    const sizes = JSON.parse(getSizes.response);

    for (let size of sizes) {
      
      let sizeDiv = document.createElement('div');
      sizeDiv.dataset.value = size.type;
      sizeDiv.classList.add('swatch-element', 'plain', size.type);
      if (size.isAvailable) {
        sizeDiv.classList.add('available');
      } else {
        sizeDiv.classList.add('soldout');
      }
      
      let input = document.createElement('input');
      input.setAttribute('type', 'radio');
      input.id = `swatch-${sizes.indexOf(size)}-${size.type}`;
      input.name = 'size';
      input.value = size.type;
      if (!size.isAvailable) {
        input.disabled = true;
      }       
      
      if (localStorage.checkedInputs) {
        JSON.parse(localStorage.checkedInputs).forEach(storedInput => {
          if (storedInput == input.id) {
            input.checked = true;
          }
        });
      }      
      
      let label = document.createElement('label');
      label.setAttribute('for', `swatch-${sizes.indexOf(size)}-${size.type}`);     
      label.innerHTML = size.type.toUpperCase();
      
      let img = document.createElement('img');
      img.classList.add('crossed-out');
      img.src = "https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886";      
      
      sizeParent.appendChild(sizeDiv);
      sizeDiv.appendChild(input);
      sizeDiv.appendChild(label);
      label.appendChild(img);      
    }
}

function onLoadCart() {
  console.log(getCart.response);

  const goods = JSON.parse(getCart.response);
  let letsCountTotalCount = 0;

  for (let good of goods) {
    
    let goodDiv = document.createElement('div');
    goodDiv.classList.add('quick-cart-product', 'quick-cart-product-static');
    goodDiv.id = `quick-cart-product-${good.id}`;
    goodDiv.style.opacity = 1;
    
    let goodWrap = document.createElement('div');
    goodWrap.classList.add('quick-cart-product-wrap');
    
    let img = document.createElement('img');
    img.src = good.pic;
    
    let span1 = document.createElement('span');
    span1.style.backgroundColor = '#000';
    span1.style.opacity = 0.5;
    span1.innerHTML = good.price;
    
    letsCountTotalCount += good.price;
    
    let span2 = document.createElement('span');
    
    let spanCount = document.createElement('span');
    spanCount.classList.add('count', 'hide', 'fadeup');
    spanCount.id = `quick-cart-product-${good.id}`;
    let count = 0;
    goods.forEach(item => {
      if (good.id == item.id) {
        count += 1;
      }
    });
    spanCount.innerHTML = count;
    
    let spanRemove = document.createElement('span');
    spanRemove.classList.add('quick-cart-product-remove', 'remove');
    spanRemove.dataset.id = good.id;
    spanRemove.addEventListener('click', deleteGood);
    
    cartParent.appendChild(goodDiv);
    goodDiv.appendChild(goodWrap);
    goodWrap.appendChild(img);
    goodWrap.appendChild(span1);
    goodWrap.appendChild(span2);
    goodDiv.appendChild(spanCount);
    goodDiv.appendChild(spanRemove);
  };
  
  let cartItself = document.createElement('a');
  cartItself.id = 'quick-cart-pay';
  cartItself.setAttribute('quickbeam', 'cart-pay');
  cartItself.classList.add('cart-ico');
  if (goods.length !== 0) {
    cartItself.classList.add('open');
  }
  
  let spanAgain = document.createElement('span');
  
  let order = document.createElement('strong');
  order.classList.add('quick-cart-text');
  order.innerHTML = 'Оформить заказ';
  
  let prico = document.createElement('span');
  prico.id = 'quick-cart-price';
  prico.innerHTML = letsCountTotalCount;
  
  cartParent.appendChild(cartItself);
  cartItself.appendChild(spanAgain);
  spanAgain.appendChild(order);
  spanAgain.appendChild(prico);
}

/* Отправляем выбранные размер и цвет на хранение по клику в область */
const inputs = document.getElementsByClassName('swatches')[0];
function storeIt(event) {
  let currentInputs = Array.from(inputs.getElementsByTagName('input'));
  let checkedInputs = [];  
  
  currentInputs.forEach(input => {
    if (input.checked) {
      checkedInputs.push(input.id);
    }
  });
 
  localStorage.checkedInputs = JSON.stringify(checkedInputs);        
}
inputs.addEventListener('click', storeIt);

/* Шлём товар в корзину */
const goodForm = document.getElementById('AddToCartForm');
const goodData = new FormData(goodForm);
const addGoodButton = document.getElementById('AddToCart');


function addGood(event) {
  event.preventDefault();
  
  goodData.append('productId', goodForm.getAttribute('data-product-id'));
  
  const addingGood = new XMLHttpRequest();
  addingGood.open('POST', 'https://neto-api.herokuapp.com/cart');
  addingGood.setRequestHeader('Content-Type', 'application/json');
  addingGood.send(JSON.stringify(goodData));
  addingGood.addEventListener('load', (e) => {
    try {
      let response = JSON.parse(addingGood.response);
      if (response.error !== true) {
        getCart.send();
      } else {
        console.log(response.message);
      }
    } catch {
      console.log('Некорректный JSON');
    } 
  });
}

function deleteGood() {
  const deleteData = new FormData();
  deleteData.append('productId', goodForm.getAttribute('data-product-id'));
  
  const deletingGood = new XMLHttpRequest();
  deletingGood.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
  deletingGood.setRequestHeader('Content-Type', 'application/json');
  deletingGood.send(JSON.stringify(deleteData));
  deletingGood.addEventListener('load', (e) => {
    try {
      let response = JSON.parse(deletingGood.response);
      if (response.error !== true) {
        getCart.send();
      } else {
        console.log(response.message);
      }
    } catch {
      console.log('Некорректный JSON');
    } 
  });  
  
}

addGoodButton.addEventListener('click', addGood);
