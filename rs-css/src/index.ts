import './global.css';
import Help from './components/help/control/help';
import Game from './components/game/control/app';

const help = new Help();
const game = new Game();

help.start();
game.start();
game.listeners();

window.addEventListener('load', (event) => {
  const { body } = event.target as Document;
  body.style.opacity = '1';
});
