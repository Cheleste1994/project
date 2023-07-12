import './global.css';
import Game from './components/control/app';
import ListLevels from './assets/data/level.json';
import { WinInfo } from './assets/data/interface';

function checkSaveLevels(): void {
  const levelNumber = Number(localStorage.getItem('level'));
  const isLevelOverflow = levelNumber >= ListLevels.length;
  if (!levelNumber || isLevelOverflow) {
    localStorage.setItem('level', '0');
  }
}

function loadCollectionSaveWin(): Map<number, WinInfo> {
  const save = localStorage.getItem('saveWinCollection');
  if (save) {
    const winCollection: [number, WinInfo][] = JSON.parse(save);
    return new Map(winCollection);
  }
  const newCollection: [number, WinInfo][] = ListLevels.map((lvl, index) => [index, { isWin: false, isHelp: false }]);
  return new Map(newCollection);
}

function startGame(): void {
  try {
    const winCollection = loadCollectionSaveWin();
    checkSaveLevels();
    const game = new Game(winCollection);
    game.start();

    const body = document.querySelector('body') as HTMLElement;
    body.style.opacity = '1';
  } catch (error) {
    localStorage.clear();
  }
}

startGame();
