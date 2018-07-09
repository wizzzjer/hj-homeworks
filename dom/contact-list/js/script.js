'use strict';

// затереть старое
const contactsList = document.getElementsByClassName('contacts-list')[0];
contactsList.innerHTML = '';

// добавить новое
const loadingContacts = loadContacts();

  if (loadingContacts) {
    try {
      const loadedContacts = JSON.parse(loadingContacts);
      for (let loadedContact of loadedContacts) {
        let contact = document.createElement('li');
        contact.dataset.email = loadedContact.email;
        contact.dataset.phone = loadedContact.phone;
        contact.innerHTML = `<strong>${loadedContact.name}</strong>`;
        contactsList.appendChild(contact);
      } 
    } catch(err) {
      console.log(`Возникла ошибка: ${err.name}, ${err.message}`);
    }
  }


