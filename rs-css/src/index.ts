import './global.css';
import Game from './components/control/app';
import ListLevels from './assets/data/level.json';

function loadGameSave(): void {
  if (!localStorage.getItem('level')) {
    localStorage.setItem('level', '0');
  }

  const save = localStorage.getItem('save');
  if (save) {
    save?.split(',').forEach((value, index) => {
      ListLevels[index].isWin = value === 'true';
    });
  }
}

function startGame(): void {
  loadGameSave();
  const game = new Game();
  game.start();

  window.addEventListener('load', (event) => {
    try {
      const { body } = event.target as Document;
      body.style.opacity = '1';
    } catch (error) {
      localStorage.clear();
      document.location.reload();
    }
  });
}

startGame();
