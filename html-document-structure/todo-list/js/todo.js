'use strict';

const inputs = Array.from(document.getElementsByTagName('input'));

function completeThis(event) {
  let deal = event.target;
  let dealLabel = event.target.parentNode;

  if (deal.checked) {
    deal.checked = true;
    dealLabel.parentNode.previousElementSibling.appendChild(dealLabel);
  } else {
    deal.checked = false;
    dealLabel.parentNode.nextElementSibling.appendChild(dealLabel);
  }  
}


inputs.forEach(input => input.addEventListener('click', completeThis));