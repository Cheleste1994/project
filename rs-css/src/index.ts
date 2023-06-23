import './global.css';
import Game from './components/control/app';
import ListLevels from './assets/data/level.json';

function loadGameSave(): Promise<void> {
  return new Promise((resolve) => {
    if (!localStorage.getItem('level')) {
      localStorage.setItem('level', '0');
    }

    if (localStorage.getItem('save')) {
      const save = localStorage.getItem('save');
      save?.split(',').forEach((value, index) => {
        ListLevels[index].win = value === 'true';
      });
    }

    resolve();
  });
}

async function startGame(): Promise<void> {
  try {
    await loadGameSave();
    const game = new Game();
    game.start();

    window.addEventListener('load', (event) => {
      const { body } = event.target as Document;
      body.style.opacity = '1';
    });
  } catch (error) {
    localStorage.clear();
    document.location.reload();
  }
}

startGame();
