import './global.css';
import Choice from './components/choice/choice';
import Game from './components/control/app';

localStorage.setItem('level', '0');

const game = new Game();
const choice = new Choice();

game.start();
choice.start();

window.addEventListener('load', (event) => {
  const { body } = event.target as Document;
  body.style.opacity = '1';
  // listener.listeners();
});
