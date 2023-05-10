window.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  if (!localStorage.getItem('themes')) {
    localStorage.setItem('themes', 'dark');
  }
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
  ['flags', 'bomb', 'time'],
  ['footer__content', 'settings', 'footer_by'],
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
  if (tag.className.includes('header') && rep !== 3) {
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

function addTime(isStart = true) {
  const time = document.querySelector('.time');
  if (isStart) {
    time.innerText = `${(Number(time.innerText) + 1).toString().padStart(3, '0')}`;
    setTimeout(addTime, 1000);
  } else {
    time.innerText = '000';
  }
}

addTime(false);

// function createField(rows, cols) {
//   let field = [];

//   for (let row = 0; row < rows; row++) {
//     let newRow = [];

//     for (let col = 0; col < cols; col++) {
//       newRow.push({
//         hasMine: false,
//         isRevealed: false,
//         mineCount: 0,
//       });
//     }

//     field.push(newRow);
//   }

//   return field;
// }

// let field = createField(10, 10);
// console.log(field);
