import './global.css';
import Game from './components/control/app';
import ListLevels from './assets/data/level.json';
import { WinInfo } from './assets/data/interface';

function loadGameSave(winCollection: Map<number, WinInfo>): void {
  if (!localStorage.getItem('level')) {
    localStorage.setItem('level', '0');
  } else if (!Number(localStorage.getItem('level'))) {
    localStorage.setItem('level', '0');
  } else if (Number(localStorage.level) >= ListLevels.length) {
    localStorage.setItem('level', '0');
  } else if (localStorage.getItem('level') === '') {
    localStorage.setItem('level', '0');
  }

  const saveWin = localStorage.getItem('saveWin');
  const saveHelp = localStorage.getItem('saveHelp');

  if (saveWin && saveHelp) {
    for (let index = 0; index < ListLevels.length; index += 1) {
      winCollection.set(index, {
        level: index,
        isWin: saveWin.split(',')[index] === 'true',
        isHelp: saveHelp.split(',')[index] === 'true',
      });
    }
  } else {
    ListLevels.forEach((lvl, index) => {
      winCollection.set(index, { level: index, isWin: false, isHelp: false });
    });
  }
}

function startGame(): void {
  try {
    const winCollection: Map<number, WinInfo> = new Map();
    loadGameSave(winCollection);

    const game = new Game(winCollection);
    game.start();

    const body = document.querySelector('body') as HTMLElement;
    body.style.opacity = '1';
  } catch (error) {
    localStorage.clear();
  }
}

startGame();
