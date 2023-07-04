import './global.css';
import Game from './components/control/app';
import ListLevels from './assets/data/level.json';
import { WinInfo } from './assets/data/interface';

function loadSaveLevels(): void {
  if (!localStorage.getItem('level')) {
    localStorage.setItem('level', '0');
  } else if (!Number(localStorage.getItem('level'))) {
    localStorage.setItem('level', '0');
  } else if (Number(localStorage.level) >= ListLevels.length) {
    localStorage.setItem('level', '0');
  } else if (localStorage.getItem('level') === '') {
    localStorage.setItem('level', '0');
  }
}

function loadCollectionSaveWin(): [number, WinInfo][] {
  const save = localStorage.getItem('saveWinCollection');
  if (save) {
    const winCollection: [number, WinInfo][] = JSON.parse(save);
    return winCollection;
  }
  const newCollection: [number, WinInfo][] = [];
  ListLevels.forEach((lvl, index) => {
    newCollection.push([index, { isWin: false, isHelp: false }]);
  });
  return newCollection;
}

function startGame(): void {
  try {
    const saveWin = loadCollectionSaveWin();
    const winCollection: Map<number, WinInfo> = new Map(saveWin);
    loadSaveLevels();
    const game = new Game(winCollection);
    game.start();

    const body = document.querySelector('body') as HTMLElement;
    body.style.opacity = '1';
  } catch (error) {
    localStorage.clear();
  }
}

startGame();
