window.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  if (!localStorage.getItem('themes')) {
    localStorage.setItem('themes', 'dark');
  }
  localStorage.setItem('game', 'end');
});

document.querySelector('body').classList.add('body');
const body = document.querySelector('.body');

function changeTheme(theme = localStorage.themes) {
  if (theme === 'dark') {
    body.classList.remove('body-light');
    body.classList.add('body-dark');
    localStorage.themes = 'dark';
  } else {
    body.classList.remove('body-dark');
    body.classList.add('body-light');
    localStorage.themes = 'light';
  }
}

changeTheme();

const divClass = [
  ['looser', 'flags', 'bomb', 'time'],
  ['click-count', 'settings', 'footer_by'],
];

const spanClass = [
  ['open', 'closed'],
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

function addDiv(tag, rep = 0, field = 100) {
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
  } if (tag.className.includes('footer') && rep !== 3) {
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
        addHeader.className = 'header wrapper';
        addDiv(addHeader);
        body.appendChild(addHeader);
        break;
      case i === 2:
        addMain.className = 'main wrapper';
        addDiv(addMain);
        body.appendChild(addMain);
        break;
      case i === 3:
        addFooter.className = 'footer wrapper';
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
    time.innerText = `${(Number(time.innerText) + 1).toString().padStart(3, '0')}`;
    timeout = setTimeout(addTime, 1000);
  } else {
    localStorage.setItem('time', `${time.innerText}`);
    time.innerText = '000';
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
        field[row][col] = count;
      }
    }
  }
  return field;
}

/* end generate field minesweeper */

// eslint-disable-next-line default-param-last
function loadField(row = 10, col = 10, mines = 10, click) {
  const allOpen = document.querySelectorAll('.open');
  const newArr = generateField(row, col, mines, click);
  // eslint-disable-next-line no-param-reassign
  allOpen.forEach((x, i) => { x.innerText = newArr.join('').split(',').join('')[i]; });
  document.querySelector('.bomb').innerText = mines;
  addTime(true);
}

/* game begun */

function boomRelog() {
  const looser = document.querySelector('.looser');
  for (let i = 0; i < 12; i += 1) {
    const div = document.createElement('div');
    if (i === 0) {
      div.innerText = 'Game over. Try again:';
      div.className = 'looser-text';
      looser.appendChild(div);
    } else if (i === 11) {
      div.className = 'looser-relog';
      looser.appendChild(div);
    } else {
      div.className = 'looser-result';
      looser.appendChild(div);
      for (let i2 = 0; i2 < 3; i2 += 1) {
        const span = document.createElement('span');
        if (i2 === 2) {
          span.innerText = '-----';
          div.appendChild(span);
        } else if (i2 === 1) {
          span.innerText = '-----';
          div.appendChild(span);
        } else {
          span.className = `result-${i}`;
          span.innerText = i;
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

function BOOM(isBoom) {
  if (isBoom) {
    document.querySelector('.main').classList.add('boom');
    setTimeout(BOOM, 1000);
  } else {
    document.querySelector('.main').classList.remove('boom');
  }
}

function gameBegun(index) {
  const allOpen = document.querySelectorAll('.open');
  const allClosed = document.querySelectorAll('.closed');
  const allCell = document.querySelectorAll('.cell');
  const looser = document.querySelector('.looser');
  if (allOpen[index].innerHTML !== 'X' && allOpen[index].innerHTML !== '0') {
    allClosed[index].style.visibility = 'hidden';
    allOpen[index].style.visibility = 'visible';
    allCell[index].classList.add('open-active');
    addClickCount();
  } else if (allOpen[index].innerHTML === '0') {
    allCell[index].classList.add('open-active');
    addClickCount();
  } else {
    looser.classList.add('looser-active');
    addTime(false);
    BOOM(true);
    addClickCount(true);
    for (let i = 0; i < allCell.length; i += 1) {
      allClosed[i].style.visibility = 'visible';
      allOpen[i].style.visibility = 'hidden';
      allCell[i].classList.remove('open-active');
    }
    localStorage.game = 'end';
  }
}

/* start game */

document.querySelectorAll('.cell').forEach((x, index) => {
  x.addEventListener('click', () => {
    if (localStorage.game === 'end') {
      loadField(10, 10, 10, index);
      localStorage.game = 'begun';
      gameBegun(index);
      clickCount = 1;
    } else if (localStorage.game === 'begun') {
      gameBegun(index);
      clickCount += 1;
    }
  });
});

document.querySelector('.looser-relog').addEventListener('click', () => {
  document.querySelector('.looser').classList.remove('looser-active');
});
