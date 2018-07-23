'use strict';

const signInForm = document.getElementsByClassName('sign-in-htm')[0];
const signInData = new FormData(signInForm);
const signInButton = document.querySelector('.sign-in-htm .button');
const signInError = document.querySelector('.sign-in-htm .error-message');

const signUpForm = document.getElementsByClassName('sign-up-htm')[0];
const signUpData = new FormData(signUpForm);
const signUpButton = document.querySelector('.sign-up-htm .button');
const signUpError = document.querySelector('.sign-up-htm .error-message');

function signMeIn(event) {
  event.preventDefault();
  
  const signIn = new XMLHttpRequest();
  signIn.open('POST', 'https://neto-api.herokuapp.com/signin');
  signIn.setRequestHeader('Content-Type', 'application/json');
  signIn.send(JSON.stringify(signInData));
  signIn.addEventListener('load', (e) => {
    try {
      let response = JSON.parse(signIn.response);
      if (response.error == true) {
        signInError.value = response.message;
      } else {
        signInError.value = `Пользователь ${response.name} успешно авторизован`;
      }  
    } catch {
      console.log('Некорректный JSON');
    } 
  });
}

function signMeUp(event) {
  event.preventDefault();  
  
  const signUp = new XMLHttpRequest();
  signUp.open('POST', 'https://neto-api.herokuapp.com/signup');
  signUp.setRequestHeader('Content-Type', 'application/json');
  signUp.send(JSON.stringify(signUpData));
  signUp.addEventListener('load', (e) => {
    try {
      let response = JSON.parse(signUp.response);
      if (response.error == true) {
        signUpError.value = response.message;
      } else {
        signUpError.value = `Пользователь ${response.name} успешно авторизован`;
      }  
    } catch {
      console.log('Некорректный JSON');
    } 
  });
}

signInButton.addEventListener('click', signMeIn);
signUpButton.addEventListener('click', signMeUp);