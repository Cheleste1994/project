import './global.css';
import App from './components/appController/app';

function loadBody(): HTMLElement {
  const body = document.querySelector('body');
  const header = document.createElement('header');
  const main = document.createElement('main');
  const btnGarage = document.createElement('button');
  const btnWinner = document.createElement('button');
  header.classList.add('header');
  main.classList.add('main');
  btnGarage.classList.add('garage__btn');
  btnGarage.innerText = 'TO GARAGE';
  btnGarage.setAttribute('type', 'button');
  btnWinner.classList.add('winner__btn');
  btnWinner.innerText = 'TO WINNER';
  btnWinner.setAttribute('type', 'button');
  header.appendChild(btnGarage);
  header.appendChild(btnWinner);
  body?.appendChild(header);
  body?.appendChild(main);
  return main;
}

const app = new App(loadBody());
app.start();
