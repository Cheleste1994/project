import './global.css';
import Help from './components/help/control/help';
import Listeners from './components/game/control/listeners';

localStorage.setItem('level', '0');

const help = new Help();
const listener = new Listeners();

help.start();
listener.start();

window.addEventListener('load', (event) => {
  const { body } = event.target as Document;
  body.style.opacity = '1';
  listener.listeners();
});
