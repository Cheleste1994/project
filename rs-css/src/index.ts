import './global.css';
import Game from './components/control/app';

localStorage.setItem('level', '0');

const game = new Game();
game.start();

window.addEventListener('load', (event) => {
  const { body } = event.target as Document;
  body.style.opacity = '1';
  // listener.listeners();
});
