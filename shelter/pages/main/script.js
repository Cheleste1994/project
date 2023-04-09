window.addEventListener('load', () => {
  getQuotes()
  copyCardsPets()
  localStorage.setItem('size', 'desktop')
})
const html = document.querySelector('html');

/* start slider block */

const btnPrev = document.querySelector('.slider-prev');
const btnNext = document.querySelector('.slider-next');
const petsSlider = document.querySelector('.pets-slider-cards')
const petsSliderContainer = document.querySelector('.pets-slider-container')



const newArr = {
  desktop: [],
  tablet: [],
  mobile: []
};

async function copyCardsPets() {
  const imgHelp = '../pets.json';
  const res = await fetch(imgHelp);
  let data = await res.json();
  const newPets = [...data];
  newPets.sort(() => Math.random() - 0.5)
  for (let i = 0; i < 9; i++) {
    if (newArr.desktop.length < 8) {
      newArr.desktop.push(newPets[i])
    } else {
      newArr.desktop.push(newPets[0])
    }

    if (newArr.tablet.length < 6) {
      newArr.tablet.push(newPets[i])
    }

    if (newArr.mobile.length < 3) {
      newArr.mobile.push(newPets[i])
    }
  }

  fillCards()

}


let size = localStorage.size === 'desktop' ? newArr.desktop :
  localStorage.size === 'tablet' ? newArr.tablet : newArr.mobile;


function fillCards() {
  const cardsPets = document.querySelectorAll('.slider-cards')

  for (let i = 0; i < cardsPets.length; i++) {
    cardsPets[i].childNodes[1].style.background = `url('${size[i].img}')`;
    cardsPets[i].childNodes[3].innerText = size[i].name;
  }
}

const nextSlid = () => {
  petsSlider.classList.add('transition-right');
}

const prevSlid = () => {
  petsSlider.classList.add('transition-left');
}


btnNext.addEventListener('click', nextSlid);

btnPrev.addEventListener('click', prevSlid);



petsSlider.addEventListener('animationend', (AnimationEvent) => {
  if (AnimationEvent.animationName === 'move-right') {
    petsSlider.classList.remove('transition-right')
    moveSlider('move-right')
  } else {
    petsSlider.classList.remove('transition-left')
    moveSlider('move-left')

  }

})


function moveSlider(move) {
  const petsSliderPrev = document.querySelector('.pets-slider-prev')
  const petsSliderActive = document.querySelector('.pets-slider-active')
  const petsSliderNext = document.querySelector('.pets-slider-next')
  let changedItem;
  if (move === 'move-right') {
    changedItem = petsSliderNext.innerHTML;
    petsSliderPrev.innerHTML = petsSliderActive.innerHTML;
    petsSliderActive.innerHTML = petsSliderNext.innerHTML;
    petsSliderNext.remove();

    randomCards('move-right')
  } else {
    petsSliderNext.innerHTML = petsSliderActive.innerHTML;

    petsSliderActive.innerHTML = petsSliderPrev.innerHTML;
    petsSliderPrev.remove();

    randomCards('move-left')
  }

}


function randomCards(move) {
  if (move === 'move-right') {
    petsSlider.insertAdjacentHTML('beforeEnd', `
    <div class="pets-slider-next">
    <div class="slider-cards">
      <div class="cards-img"></div>
      <div class="cards-name"></div>
      <div class="cards-btn"><button class="cards-btn-click">Learn more</button></div>
    </div>
    <div class="slider-cards">
      <div class="cards-img"></div>
      <div class="cards-name"></div>
      <div class="cards-btn"><button class="cards-btn-click">Learn more</button></div>
    </div>
    <div class="slider-cards">
      <div class="cards-img"></div>
      <div class="cards-name"></div>
      <div class="cards-btn"><button class="cards-btn-click">Learn more</button></div>
    </div>
  </div>`)
    fillCardsNext()
  }

  if (move === 'move-left') {
    petsSlider.insertAdjacentHTML('afterbegin', `
    <div class="pets-slider-prev">
    <div class="slider-cards">
      <div class="cards-img"></div>
      <div class="cards-name"></div>
      <div class="cards-btn"><button class="cards-btn-click">Learn more</button></div>
    </div>
    <div class="slider-cards">
      <div class="cards-img"></div>
      <div class="cards-name"></div>
      <div class="cards-btn"><button class="cards-btn-click">Learn more</button></div>
    </div>
    <div class="slider-cards">
      <div class="cards-img"></div>
      <div class="cards-name"></div>
      <div class="cards-btn"><button class="cards-btn-click">Learn more</button></div>
    </div>
  </div>`)
    fillCardsPrev()
  }

}


function fillCardsNext() {
  const petsSliderNext = document.querySelector('.pets-slider-next')
  const cardsName = document.querySelectorAll('.pets-slider-active .cards-name')
  const addArr = [];
  let addArrRan = [];

  cardsName.forEach((x) => {
    addArr.push(x.innerText)
  })

  newArr.desktop.forEach((x) => {
    x.name !== addArr[0] && x.name !== addArr[1] && x.name !== addArr[2] ?
      addArrRan.push(x) : false;
  })
  addArrRan = new Set(addArrRan);
  addArrRan = Array.from(addArrRan).sort(() => Math.random() - 0.5);

  let i = 0
  petsSliderNext.childNodes.forEach((x) => {
    if (x.className) {
      x.childNodes[1].style.background = `url('${addArrRan[i].img}')`;
      x.childNodes[3].innerText = addArrRan[i].name;
      i++
    }
  })

}


function fillCardsPrev() {
  const petsSliderPrev = document.querySelector('.pets-slider-prev')
  const cardsName = document.querySelectorAll('.pets-slider-active .cards-name')
  const addArr = [];
  let addArrRan = [];

  cardsName.forEach((x) => {
    addArr.push(x.innerText)
  })

  newArr.desktop.forEach((x) => {
    x.name !== addArr[0] && x.name !== addArr[1] && x.name !== addArr[2] ?
      addArrRan.push(x) : false;
  })
  addArrRan = new Set(addArrRan);
  addArrRan = Array.from(addArrRan).sort(() => Math.random() - 0.5);

  let i = 0
  petsSliderPrev.childNodes.forEach((x) => {
    if (x.className) {
      x.childNodes[1].style.background = `url('${addArrRan[i].img}')`;
      x.childNodes[3].innerText = addArrRan[i].name;
      i++
    }
  })

}


/* end slider block */

/* start popap block */
const cardsClick = document.querySelector('.pets-slider-active')
const popapName = document.querySelector('.popap-name-h3')
const popapType = document.querySelector('.popap-type')
const popapBreed = document.querySelector('.popap-breed')
const popapText = document.querySelector('.popap-text')
const age = document.querySelector('.age-text')
const inoculations = document.querySelector('.inoculations-text')
const diseases = document.querySelector('.diseases-text')
const parasites = document.querySelector('.parasites-text')
const popapImages = document.querySelector('.popap-images-pets')
const popap = document.querySelector('.popap')


async function popapLoad(nameCards) {
  const imgHelp = '../pets.json';
  const res = await fetch(imgHelp);
  let data = await res.json();

  data.forEach((x, i) => {
    if (x.name === nameCards) {
      popapImages.style.cssText = `background: url('${x.img}');
                                 background-repeat: no-repeat;
                                 background-size: cover;
                                 `
      popapName.innerHTML = x.name;
      popapType.innerHTML = x.type;
      popapBreed.innerHTML = x.breed;
      popapText.innerHTML = x.description;
      age.innerHTML = x.age;
      inoculations.innerHTML = x.inoculations;
      diseases.innerHTML = x.diseases;
      parasites.innerHTML = x.parasites;

    }
  })

  openPopap()

}


function openPopap() {
  const popapCLosed = document.querySelector('.popap-closed')
  popap.classList.toggle('popap-open');
  html.classList.toggle('html-hidden')
  popapCLosed.addEventListener('click', openPopap)
}




cardsClick.addEventListener('click', (event) => {

  if (event.eventPhase === 1) {
    const cards = document.querySelectorAll('.slider-cards')

    cards.forEach((x) => {
      x.addEventListener('click', () => {
        if (event.currentTarget) {
          popapLoad(event.currentTarget.children[1].innerText)
        }
      })
    })
  }
}, true)





/*end popap block */

/* start help block */

async function getQuotes() {
  const listContainer = document.querySelectorAll('.list-container')
  const imgHelp = '../help.json';
  const res = await fetch(imgHelp);

  const data = await res.json();

  listContainer.forEach((x, i) => {
    x.childNodes[1].style.cssText = `background-image: url('${data[i].icon}'); background-size: 100% 100%;`;
    x.childNodes[3].innerText = data[i].text

  })

}

/*end help block */

/* start footer map */

const mapLink = document.querySelectorAll('.locations-street');
const mapOpen = document.querySelector('.footer-map');
let isMap = false;

mapLink.forEach(x => {
  x.addEventListener('click', () => { mapAdd() })
})


function mapAdd() {
  if (!isMap) {
    mapOpen.style.visibility = 'visible';
    mapOpen.style.opacity = 1;
    window.open("https://www.google.com/maps?ll=53.964405,27.668914&z=12&t=m&hl=ru&gl=BY&mapclient=embed&q=%D1%83%D0%BB%D0%B8%D1%86%D0%B0+%D0%92%D0%B8%D0%BA%D0%B5%D0%BD%D1%82%D0%B8%D1%8F+%D0%9A%D0%B0%D1%80%D0%BF%D0%BE%D0%B2%D0%B8%D1%87%D0%B0", "hello", "width=1000,height=1000,top=")
    isMap = true;
  } else {
    mapOpen.style.visibility = 'hidden';
    mapOpen.style.opacity = 0;
    isMap = false;
    window.open("https://www.google.com/maps?ll=53.964405,27.668914&z=12&t=m&hl=ru&gl=BY&mapclient=embed&q=%D1%83%D0%BB%D0%B8%D1%86%D0%B0+%D0%92%D0%B8%D0%BA%D0%B5%D0%BD%D1%82%D0%B8%D1%8F+%D0%9A%D0%B0%D1%80%D0%BF%D0%BE%D0%B2%D0%B8%D1%87%D0%B0", "hello", "width=1000,height=1000,top=")

  }

}

/* end footer map */

/* start burger menu */

const mediaQuery = window.matchMedia('(min-width: 200px) and (max-width: 767px)');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-menu');
const blur = document.querySelector('.blur-background');

let isBurger = false;


mediaQuery.addEventListener('change', () => {
  if (!mediaQuery.matches) {
    closeMenu()
    menu.style.transform = 'translateX(0)';
    menu.style.visibility = 'visible';

  } else {
    closeMenu()
  }
})




burger.addEventListener('click', isOpen)

blur.addEventListener('click', () => {
  if (mediaQuery.matches) { closeMenu() }
})

menu.addEventListener('click', () => {
  if (mediaQuery.matches) { closeMenu() }
})

function isOpen() {
  isBurger === false ? openMenu() : closeMenu();
}

function openMenu() {
  burger.classList.add('burger-open')
  blur.style.visibility = 'visible';
  menu.style.visibility = 'visible';
  menu.style.transform = 'translateX(0)';
  html.style.overflow = 'hidden';
  isBurger = true;
}

function closeMenu() {
  burger.classList.remove('burger-open')
  blur.style.visibility = 'hidden';
  menu.style.visibility = 'hidden';
  menu.style.transform = 'translateX(500px)';
  if (html.classList.value !== 'html-hidden') {
    html.style.overflow = '';
  }

  isBurger = false;
}


/* end burger menu */

/*
console.log(`Ваша оценка - 100 баллов
Отзыв по пунктам ТЗ:
Выполненные все пункты:
1) верстка страницы валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/  Валидной вёрстке соответствует надпись 'Document checking completed. No errors or warnings to show.' В таком случае баллы за пункт требований выставляем полностью. Если есть предупреждения - warnings, но нет ошибок - errors, выставляем половину баллов за пункт требований
2) логотип в хедере состоит из текстовых элементов
3) страница содержит ровно один элемент 'h1'
4) добавлен favicon
5) блок 'header'
6) блок 'Not only'
7) блок 'About'
8) блок 'Our Friends'
9) блок 'Help'
10) блок 'In addition'
11) блок 'footer'
12) для позиционирования элементов блока Help использована сеточная верстка (flexbox или grid)
13) при уменьшении масштаба страницы браузера или увеличении ширины страницы (>1280px). вёрстка размещается по центру, а не сдвигается в сторону и не растягивается по всей ширине
14) фоновый цвет тянется на всю ширину страницы
15) элемент 'About the Shelter' в навигации подсвечен и неинтерактивен, остальные элементы навигации интерактивны
16) каждая карточка с питомцем в блоке 'Our Friends' интерактивна при наведении на любую область этой карточки
17) плавная прокрутка по якорям
18) выполняются все ссылочные связи согласно Перечню ссылочных связей для страницы 'Main'
19) выполнена интерактивность ссылок и кнопок. Интерактивность заключается не только в изменении внешнего вида курсора, например, при помощи свойства 'cursor: pointer', но и в использовании и других визуальных эффектов, например, изменение цвета фона или цвета шрифта, согласно стайлгайду в макете. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета
20) обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике, не влияющее на соседние элементы
21) верстка страницы валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ . +4 Валидной вёрстке соответствует надпись 'Document checking completed. No errors or warnings to show.' В таком случае баллы за пункт требований выставляем полностью. Если есть предупреждения - warnings, но нет ошибок - errors, выставляем половину баллов за пункт требований
22) логотип в хедере состоит из текстовых элементов
23) страница содержит ровно один элемент 'h1'
24) добавлен favicon
25) блок 'header'
26) блок 'Our Friends'
27) блок 'footer'
28) при уменьшении масштаба страницы браузера или увеличении ширины страницы (>1280px) вёрстка размещается по центру, а не сдвигается в сторону и не растягивается по всей ширине
29) фоновый цвет тянется на всю ширину страницы
30) элемент 'Our pets' в навигации подсвечен и неинтерактивен, остальные элементы навигации интерактивны
31) доступные кнопки пагинации (вправо) активны, недоступные (влево) - неактивны (disabled)
32) каждая карточка с питомцем в блоке 'Our Friends' интерактивна при наведении на любую область этой карточки
33) плавная прокрутка по якорям
34) выполняются все ссылочные связи согласно Перечню ссылочных связей для страницы 'Pets'
35) выполнена интерактивность ссылок и кнопок. Интерактивность заключается не только в изменении внешнего вида курсора, например, при помощи свойства 'cursor: pointer', но и в использовании и других визуальных эффектов, например, изменение цвета фона или цвета шрифта, согласно стайлгайду в макете. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета
36) обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике, не влияющее на соседние элементы  `)
*/
