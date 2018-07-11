'use strict';

const list = document.getElementsByClassName('list-block')[0];
const fields = Array.from(document.querySelectorAll('.list-block input[type="checkbox"]'));
const output = document.querySelector('h3 output');

function countDeals() {
  let done = 0;
  
  for (let field of fields) {
    if (field.checked) {
      list.classList.remove('complete');
      
      done += 1;
      
      if (done === 4) {
        list.classList.add('complete');
      }      
    }
  }
  output.value = `${done} из ${fields.length}`;
}

for (let field of fields) {
  field.addEventListener('click', countDeals); // клика ведь достаточно? 
}

document.addEventListener('DOMContentLoaded', countDeals);