window.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  if (!localStorage.getItem('themes')) {
    localStorage.setItem('themes', 'dark');
  }
  localStorage.setItem('game', 'start');
});

const levelField = {
  easy: {
    rows: 10,
    cols: 10,
    bombs: 10,
    bombsLimit: 30,
    times: 999,
    get field() { return this.rows * this.cols; },
  },
  medium: {
    rows: 15,
    cols: 15,
    bombs: 40,
    bombsLimit: 99,
    times: 500,
    get field() { return this.rows * this.cols; },
  },
  hard: {
    rows: 25,
    cols: 25,
    bombs: 99,
    bombsLimit: 200,
    times: 300,
    get field() { return this.rows * this.cols; },
  },
};

localStorage.setItem('level', 'easy');
localStorage.setItem('bombs', levelField[localStorage.level].bombs);
localStorage.setItem('timeLevel', levelField[localStorage.level].times);

document.querySelector('body').classList.add('body');
const body = document.querySelector('.body');

function changeTheme(theme = localStorage.themes) {
  const html = document.querySelector('html');
  if (theme === 'dark') {
    body.classList.remove('body-light');
    body.classList.add('body-dark');
    localStorage.themes = 'dark';
    html.style.setProperty('--themes-background', 'hsla(300, 4%, 27%, 0.8)');
    html.style.setProperty('--themes-color', 'rgba(255, 255, 255, 0.863)');
  } else {
    body.classList.remove('body-dark');
    body.classList.add('body-light');
    localStorage.themes = 'light';
    html.style.setProperty('--themes-background', 'hsla(300, 17%, 92%, 0.8)');
    html.style.setProperty('--themes-color', 'rgba(0, 0, 0, 0.8)');
  }
}

changeTheme();

const divClass = [
  ['looser', 'flags', 'bomb', 'time'],
  ['click-count', 'settings', 'settings__icon', 'relog'],
];

const spanClass = [
  ['open', 'closed'],
  ['setting__text', 'switch-btn'],
  ['easy', 'medium', 'hard'],
];

const settingsText = [
  ['Themes: dark or light'],
  ['Level:', 'Easy', 'Medium', 'Hard'],
  ['Mines:'],
  ['Game board:'],
  ['Time:'],
];

function addSpan(div, i = 0) {
  const span = document.createElement('span');
  if (i !== 2) {
    span.className = spanClass[0][i];
    div.appendChild(span);
    return addSpan(div, i + 1);
  }
  return false;
}

function addDiv(tag, rep = 0, field = levelField[localStorage.level].field) {
  const div = document.createElement('div');
  if (tag.className.includes('header') && rep !== 4) {
    // eslint-disable-next-line no-param-reassign
    div.className = divClass[0][rep];
    tag.appendChild(div);
    return addDiv(tag, rep + 1);
  } if (tag.className.includes('main') && rep !== field) {
    // eslint-disable-next-line no-param-reassign
    div.className = `cell cell-${rep + 1}`;
    tag.appendChild(div);
    addSpan(div);
    return addDiv(tag, rep + 1);
  } if (tag.className.includes('footer') && rep !== 4) {
    // eslint-disable-next-line no-param-reassign
    div.className = divClass[1][rep];
    tag.appendChild(div);
    return addDiv(tag, rep + 1);
  }
  return false;
}

function addFrame() {
  for (let i = 1; i <= 3; i += 1) {
    const addHeader = document.createElement('header');
    const addMain = document.createElement('main');
    const addFooter = document.createElement('footer');
    switch (i <= 5) {
      case i === 1:
        addHeader.className = `header wrapper-${localStorage.level}`;
        addDiv(addHeader);
        body.appendChild(addHeader);
        break;
      case i === 2:
        addMain.className = `main wrapper-${localStorage.level} main-${localStorage.level}`;
        addDiv(addMain);
        body.appendChild(addMain);
        break;
      case i === 3:
        addFooter.className = `footer wrapper-${localStorage.level}`;
        addDiv(addFooter);
        body.appendChild(addFooter);
        break;
      default:
        return;
    }
  }
}

addFrame();

/* start timer */

let timeout;

function addTime(isStart = true) {
  const time = document.querySelector('.time');
  if (isStart) {
    time.innerText = `${(Number(time.innerText) - 1).toString().padStart(3, '0')}`;
    timeout = setTimeout(addTime, 1000);
    // eslint-disable-next-line no-use-before-define
    if (time.innerText === '000') { addBOOM(); }
  } else {
    localStorage.setItem('time', `${time.innerText}`);
    time.innerText = `${localStorage.timeLevel.toString().padStart(3, '0')}`;
    clearTimeout(timeout);
  }
}

addTime(false);

/* end timer */

/* start generate field minesweeper */
let field = [];

function generateField(r, c, m, indexClick) {
  const ROWS = r;
  const COLS = c;
  const MINES = m;

  field = [];
  for (let row = 0; row < ROWS; row += 1) {
    field[row] = [];
    for (let col = 0; col < COLS; col += 1) {
      field[row][col] = 0;
    }
  }

  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    // eslint-disable-next-line max-len, no-nested-ternary
    const indexRow = row * COLS + col;
    if (field[row][col] !== 'X' && indexRow !== indexClick) {
      field[row][col] = 'X';
      minesPlaced += 1;
    }
  }

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      if (field[row][col] !== 'X') {
        let count = 0;
        if (row > 0 && field[row - 1][col] === 'X') {
          count += 1;
        }
        if (row < ROWS - 1 && field[row + 1][col] === 'X') {
          count += 1;
        }
        if (col > 0 && field[row][col - 1] === 'X') {
          count += 1;
        }
        if (col < COLS - 1 && field[row][col + 1] === 'X') {
          count += 1;
        }
        if (row > 0 && col > 0 && field[row - 1][col - 1] === 'X') {
          count += 1;
        }
        if (row > 0 && col < COLS - 1 && field[row - 1][col + 1] === 'X') {
          count += 1;
        }
        if (row < ROWS - 1 && col > 0 && field[row + 1][col - 1] === 'X') {
          count += 1;
        }
        if (row < ROWS - 1 && col < COLS - 1 && field[row + 1][col + 1] === 'X') {
          count += 1;
        }
        // eslint-disable-next-line max-len
        if (row * COLS + col === indexClick && count > 0) { return generateField(r, c, m, indexClick); }
        field[row][col] = count === 0 ? ' ' : count;
      }
    }
  }
  localStorage.setItem('field', field.join('').split(',').join(''));
  return field;
}

function openEmptyCells(index, fieldString) {
  const rowSize = levelField[localStorage.level].rows;
  const colSize = levelField[localStorage.level].cols;
  const openedField = new Array(rowSize * colSize).fill(false);

  function openCell(indexCell) {
    const cell = document.querySelectorAll('.cell');
    if (openedField[indexCell] === true || cell[indexCell].classList.contains('open-active')) {
      return;
    }
    openedField[indexCell] = true;
    cell[indexCell].classList.add('open-active');
    // eslint-disable-next-line no-use-before-define
    gameBegun(indexCell);
    if (fieldString[indexCell] === ' ') {
      const row = Math.floor(indexCell / rowSize);
      const col = indexCell % colSize;

      if (row > 0) {
        const neighborIndex = indexCell - rowSize;
        openCell(neighborIndex);
      }

      if (row < rowSize - 1) {
        const neighborIndex = indexCell + rowSize;
        openCell(neighborIndex);
      }

      if (col > 0) {
        const neighborIndex = indexCell - 1;
        if (col !== 1 || row !== 0) {
          openCell(neighborIndex);
        }
      }

      if (col < colSize - 1) {
        const neighborIndex = indexCell + 1;
        if (col !== colSize - 2 || row !== rowSize - 1) {
          openCell(neighborIndex);
        }
      }
    }
  }

  openCell(index);
}

/* end generate field minesweeper */

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const colorRandom = `rgb(${red}, ${green}, ${blue})`;
  return colorRandom;
}

const color = {
  1: generateRandomColor(),
  2: generateRandomColor(),
  3: generateRandomColor(),
  4: generateRandomColor(),
  5: generateRandomColor(),
  6: generateRandomColor(),
  7: generateRandomColor(),
  8: generateRandomColor(),
  9: generateRandomColor(),
};

// eslint-disable-next-line default-param-last
function loadField(row, col, mines, click) {
  const allOpen = document.querySelectorAll('.open');
  const newArr = generateField(row, col, mines, click);
  allOpen.forEach((x, i) => {
    const arr = newArr.join('').split(',').join('')[i];
    if (arr > 0) {
      // eslint-disable-next-line no-param-reassign
      x.style.color = color[arr];
    }
    // eslint-disable-next-line no-param-reassign
    x.innerText = arr;
  });
  document.querySelector('.bomb').innerText = mines;
  addTime(true);
}

/* game begun */

const writeResult = [];

function boomRelog() {
  const looser = document.querySelector('.looser');
  for (let i = 0; i < 13; i += 1) {
    const div = document.createElement('div');
    if (i === 0) {
      div.innerText = 'Game over. Try again!';
      div.className = 'looser__text';
      looser.appendChild(div);
    } else if (i === 1) {
      for (let i2 = 0; i2 < 3; i2 += 1) {
        const span = document.createElement('span');
        if (i2 === 2) {
          span.innerText = 'Click';
          div.appendChild(span);
        } else if (i2 === 1) {
          span.innerText = 'Time';
          div.appendChild(span);
        } else {
          span.innerText = '№';
          div.appendChild(span);
        }
      }
      div.className = 'looser__table';
      looser.appendChild(div);
    } else if (i === 12) {
      div.className = 'looser-relog';
      looser.appendChild(div);
    } else {
      div.className = 'looser-result';
      looser.appendChild(div);
      for (let i2 = 0; i2 < 3; i2 += 1) {
        const span = document.createElement('span');
        if (i2 === 2) {
          span.innerText = '';
          div.appendChild(span);
        } else if (i2 === 1) {
          span.innerText = '';
          div.appendChild(span);
        } else {
          span.className = `result-${i - 1}`;
          span.innerText = i - 1;
          div.appendChild(span);
        }
      }
    }
  }
}

boomRelog();

/* start click count */

let clickCount = 0;

function addClickCount(boom = false) {
  const CLICK = document.querySelector('.click-count');
  if (clickCount === 0 || boom) {
    clickCount = 0;
    CLICK.innerText = '000';
  } else {
    CLICK.innerText = `${clickCount.toString().padStart(3, '0')}`;
  }
}

addClickCount();

/* end click count */

function loadResult(win = false, indexArr = 0) {
  const looserResult = document.querySelectorAll('.looser-result');
  let index = indexArr;
  if (writeResult.length >= 11) {
    index = writeResult.length % 10;
    // eslint-disable-next-line no-param-reassign
    indexArr = index;
  }
  if (win) {
    document.querySelector('.looser__text').innerHTML = `Hooray! You found all mines in ${writeResult[writeResult.length - 1][1]} seconds and ${writeResult[writeResult.length - 1][2]} moves!`;
  } else {
    document.querySelector('.looser__text').innerHTML = 'Game over. Try again:';
  }
  for (let i = 0; i < writeResult.length - index; i += 1) {
    looserResult[i].childNodes[1].innerHTML = `${Number(writeResult[indexArr][1])}s`;
    looserResult[i].childNodes[2].innerHTML = `${writeResult[indexArr][2]}`;
    // eslint-disable-next-line no-param-reassign
    indexArr += 1;
  }
}

function BOOM(isBoom) {
  if (isBoom) {
    document.querySelector('.main').classList.add('boom');
    setTimeout(BOOM, 1000);
  } else {
    document.querySelector('.main').classList.remove('boom');
  }
}

function addBOOM(start = false, relog = false) {
  const allOpen = document.querySelectorAll('.open');
  const allClosed = document.querySelectorAll('.closed');
  const allCell = document.querySelectorAll('.cell');
  const looser = document.querySelector('.looser');
  const bombs = document.querySelector('.bomb');
  if (!relog) {
    writeResult.push(
      [
        bombs.innerText,
        `${(Number(localStorage.timeLevel) - Number(document.querySelector('.time').innerText)).toString().padStart(3, '0')}`,
        clickCount,
      ],
    );
    loadResult();
    looser.classList.add('looser-active');
    addTime(false);
    BOOM(true);
    addClickCount(true);
    bombs.innerText = '';
  }

  if (start) {
    for (let i = 0; i < allCell.length; i += 1) {
      allClosed[i].style.visibility = 'visible';
      allOpen[i].style.visibility = 'hidden';
      allCell[i].classList.remove('open-active');
      allOpen[i].classList.remove('load-bomb');
      allCell[i].classList.remove('add-flag');
    }
  } else {
    for (let i = 0; i < allCell.length; i += 1) {
      if (allOpen[i].innerHTML === 'X') {
        allOpen[i].innerHTML = '';
        allOpen[i].classList.add('load-bomb');
      }
      allClosed[i].style.visibility = 'hidden';
      allOpen[i].style.visibility = 'visible';
      allCell[i].classList.add('open-active');
    }
  }
  localStorage.game = 'end';
}

function gameBegun(index) {
  const allOpen = document.querySelectorAll('.open');
  const allClosed = document.querySelectorAll('.closed');
  const allCell = document.querySelectorAll('.cell');
  if (allOpen[index].innerHTML !== 'X' && allOpen[index].innerHTML !== ' ') {
    allClosed[index].style.visibility = 'hidden';
    allOpen[index].style.visibility = 'visible';
    allCell[index].classList.add('open-active');
    addClickCount();
  } else if (allOpen[index].innerHTML === ' ') {
    // allCell[index].classList.add('open-active');
    addClickCount();
    openEmptyCells(index, localStorage.field);
  } else {
    addBOOM();
  }
}

// eslint-disable-next-line consistent-return
function gameWin() {
  const cellAll = document.querySelectorAll('.cell');
  let count = 1;
  const { bombs } = levelField[localStorage.level];
  for (let i = 0; i < cellAll.length; i += 1) {
    if (cellAll[i].classList.contains('open-active')) {
      count += 1;
      if (cellAll.length - count === bombs) {
        localStorage.game = 'start';
        addBOOM(false, false, true);
        return loadResult(true);
      }
    }
  }
}

function addFlag(index) {
  const cell = document.querySelectorAll('.cell');
  const flags = document.querySelector('.bomb');
  if (cell[index].classList.contains('add-flag')) {
    cell[index].classList.remove('add-flag');
    flags.innerHTML = Number(flags.innerHTML) + 1;
  } else {
    cell[index].classList.add('add-flag');
    flags.innerHTML = Number(flags.innerHTML) - 1;
  }
}

/* end game */

function addSettings() {
  const settings = document.querySelector('.settings');

  for (let i = 0; i < 8; i += 1) {
    const div = document.createElement('div');
    div.className = 'setting';
    if (i === 0) {
      const span = document.createElement('span');
      span.className = 'setting__title';
      span.innerText = 'Settings:';
      div.appendChild(span);
    } else if (i === 2) {
      const span = document.createElement('span');
      span.className = 'setting__level';
      span.innerText = `${settingsText[1][0]}`;
      div.appendChild(span);
    } else if (i === 3) {
      for (let i2 = 0; i2 < 3; i2 += 1) {
        const span = document.createElement('span');
        span.className = 'setting__level-text';
        span.innerText = `${settingsText[1][i2 + 1]}`;
        div.appendChild(span);
      }
    } else if (i === 4) {
      for (let i2 = 0; i2 < 3; i2 += 1) {
        const span = document.createElement('span');
        span.className = `setting__level-${spanClass[2][i2]} ${spanClass[1][1]}`;
        div.appendChild(span);
      }
    } else if (i === 5) {
      const span = document.createElement('span');
      const input = document.createElement('input');
      span.className = `${spanClass[1][0]}`;
      span.innerText = `${settingsText[2][0]}`;
      input.type = 'number';
      input.min = 1;
      input.max = levelField[localStorage.level].bombsLimit;
      input.className = 'settings__mines';
      input.value = Number(levelField[localStorage.level].bombs);
      div.appendChild(span);
      div.appendChild(input);
    } else if (i === 6) {
      const span = document.createElement('span');
      const input = document.createElement('input');
      span.className = `${spanClass[1][0]}`;
      span.innerText = `${settingsText[4][0]}`;
      input.type = 'text';
      input.className = 'settings__time';
      input.min = 1;
      input.max = 999;
      input.type = 'number';
      input.value = Number(levelField[localStorage.level].times);
      div.appendChild(span);
      div.appendChild(input);
    } else {
      for (let i2 = 0; i2 < 2; i2 += 1) {
        const span = document.createElement('span');
        if (i === 1 && i2 === 0) {
          span.className = `${spanClass[1][i2]}`;
          span.innerText = `${settingsText[0][0]}`;
          div.appendChild(span);
        } else {
          span.className = `${spanClass[1][i2]}`;
          div.appendChild(span);
        }
      }
    }

    settings.appendChild(div);
  }
}

addSettings();

function saveBomb(event) {
  event.classList.add('save-bomb');
  const { bombsLimit } = levelField[localStorage.level];
  // eslint-disable-next-line no-unused-expressions, no-param-reassign, no-nested-ternary, max-len
  Number(event.value) > bombsLimit ? event.value = bombsLimit : event.value = Math.floor(Math.abs(Number(event.value)));
  localStorage.bombs = event.value;
}

function saveTime(event) {
  event.classList.add('save-bomb');
  // eslint-disable-next-line no-unused-expressions, no-param-reassign, no-nested-ternary
  event.value > 999 ? event.value = 999 : event.value < 1 ? event.value = 1 : event.value;
  document.querySelector('.time').innerHTML = `${event.value.toString().padStart(3, '0')}`;
  localStorage.timeLevel = event.value;
}

/* START GAME */

async function startGame() {
  document.querySelectorAll('.cell').forEach((x, index) => {
    x.addEventListener('click', (event) => {
      if (x.classList.contains('add-flag')) {
        event.preventDefault();
      } else if (localStorage.game === 'start') {
        const { rows, cols } = levelField[localStorage.level];
        loadField(rows, cols, localStorage.bombs, index);
        localStorage.game = 'begun';
        clickCount = 1;
        gameBegun(index);
        gameWin();
      } else if (localStorage.game === 'begun') {
        if (!x.classList.contains('open-active')) {
          gameWin();
          gameBegun(index);
          clickCount += 1;
        }
      }
    });
  });

  document.querySelector('.looser-relog').addEventListener('click', () => {
    document.querySelector('.looser').classList.remove('looser-active');
  });

  document.querySelector('.settings__icon').addEventListener('click', () => {
    const settings = document.querySelector('.settings');
    if (settings.style.visibility === 'visible') {
      settings.style.visibility = 'hidden';
      settings.style.opacity = 0;
    } else {
      settings.style.visibility = 'visible';
      settings.style.opacity = 1;
    }

    document.querySelector('.settings__icon').classList.toggle('settings__icon-open');
  });

  document.querySelectorAll('.cell').forEach((x, index) => {
    x.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (localStorage.game === 'begun' && !x.classList.contains('open-active')) {
        addFlag(index);
      }
    });
  });

  document.querySelector('.relog').addEventListener('click', () => {
    if (localStorage.game === 'begun') {
      addBOOM(true);
      localStorage.game = 'start';
    } else if (localStorage.game === 'end') {
      addBOOM(true, true);
      localStorage.game = 'start';
    }
  });

  document.querySelector('.settings__mines').addEventListener('change', (event) => saveBomb(event.target));

  document.querySelector('.settings__time').addEventListener('change', (event) => saveTime(event.target));

  const reloadGame = async () => {
    localStorage.timeLevel = levelField[localStorage.level].times;
    localStorage.bombs = levelField[localStorage.level].bombs;
    changeTheme();
    addFrame();
    addTime(false);
    boomRelog();
    addClickCount(true);
    addSettings();
    startGame();
  };

  document.querySelectorAll('.setting')[4].childNodes.forEach((x, index) => {
    x.addEventListener('click', () => {
      const btn = document.querySelectorAll('.setting')[4].childNodes;
      const BODY = document.querySelector('.body');
      if (localStorage.game === 'begun') {
        addBOOM(true);
        localStorage.game = 'start';
      } else if (localStorage.game === 'end') {
        addBOOM(true, true);
        localStorage.game = 'start';
      }
      if (index === 0) {
        btn[0].classList.add('switch-on');
        btn[1].classList.remove('switch-on');
        btn[2].classList.remove('switch-on');
        localStorage.level = 'easy';
        BODY.innerHTML = '';
        reloadGame();
      } else if (index === 1) {
        btn[0].classList.remove('switch-on');
        btn[1].classList.add('switch-on');
        btn[2].classList.remove('switch-on');
        localStorage.level = 'medium';
        BODY.innerHTML = '';
        reloadGame();
      } else {
        btn[0].classList.remove('switch-on');
        btn[1].classList.remove('switch-on');
        btn[2].classList.add('switch-on');
        localStorage.level = 'hard';
        BODY.innerHTML = '';
        reloadGame();
      }
    });
  });

  const switchBtn = document.querySelectorAll('.switch-btn');

  switchBtn[0].addEventListener('click', (event) => {
    if (localStorage.themes === 'dark') {
      localStorage.themes = 'light';
      changeTheme();
      event.target.classList.remove('switch-on');
    } else {
      localStorage.themes = 'dark';
      changeTheme();
      event.target.classList.add('switch-on');
    }
  });

  // eslint-disable-next-line no-unused-expressions
  localStorage.themes === 'light' ? switchBtn[0].classList.remove('switch-on') : switchBtn[0].classList.add('switch-on');

  document.querySelector(`.setting__level-${localStorage.level}`).classList.add('switch-on');
}

startGame();
