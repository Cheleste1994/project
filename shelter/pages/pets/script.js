window.addEventListener('load', () => {
  copyCardsPets()
  localStorage.setItem('pages', 0)
  localStorage.setItem('quantityPages', localStorage.media === 'desktop' ? 6 : localStorage.media === 'tablet' ? 8 : 16)
  localStorage.setItem('cards', localStorage.media === 'desktop' ? 8 : localStorage.media === 'tablet' ? 6 : 3)

})



// start paginations



const sliderNext = document.querySelector('.next-pages');
const sliderEnd = document.querySelector('.slider-end');
const sliderPrev = document.querySelector('.prev-pages');
const sliderStart = document.querySelector('.slider-start');
const petsSlider = document.querySelector('.pets-slider')
const sliderList = document.querySelectorAll('.slider-list')

const newArr = [];

async function copyCardsPets() {
  const imgHelp = '../pets.json';
  const res = await fetch(imgHelp);
  let data = await res.json();


  for (let i = 0; i < 6; i++) {
    const newPets = [...data];
    newArr.push(newPets.sort(() => Math.random() - 0.5))
  }
  paginationPets()
}

let pagintaionsArr = [];

function paginationPets() {
  let newArrPets = newArr.flat(1);
  let quantityPages = localStorage.quantityPages;
  pagintaionsArr = [];
  let isCounter = 0;
  for (let i = 0; i < quantityPages; i++) {
    pagintaionsArr.push([])
    for (let i1 = newArrPets.length / quantityPages; i1 > 0; i1--) {
      pagintaionsArr[i].push(newArrPets[isCounter]);
      isCounter++
    }
  }

  getQuotes(pagintaionsArr)


}


sliderNext.addEventListener('click', (event) => {
  if (localStorage.pages < localStorage.quantityPages - 1 ) {
    sliderNextPages()
    getQuotes(pagintaionsArr)
    pageTurningNext()
  }
})

sliderEnd.addEventListener('click', () => {
  if (localStorage.pages < localStorage.quantityPages - 1) {
    localStorage.pages = localStorage.quantityPages - 1;
    getQuotes(pagintaionsArr)
    pageTurningNext()
  }
})

sliderPrev.addEventListener('click', () => {
  if (localStorage.pages > 0) {
    sliderPrevPages()
    getQuotes(pagintaionsArr)
    pageTurningPrev()
  }
})

sliderStart.addEventListener('click', () => {
  if (localStorage.pages > 0) {
    localStorage.pages = 0;
    getQuotes(pagintaionsArr)
    pageTurningPrev()
  }
})





function getQuotes(pagintaionsArr) {
  const cardsPets = document.querySelectorAll('.slider-cards')
  const isPages = localStorage.pages;
  sliderList[0].innerHTML = Number(isPages) + 1;
  if (Number(isPages) + 1 == localStorage.quantityPages) {
    sliderNext.disabled = true;
    sliderEnd.disabled = true;
    sliderPrev.disabled = false;
    sliderStart.disabled = false;;
  } else if (Number(isPages) == 0) {
    sliderNext.disabled = false;
    sliderEnd.disabled = false;
    sliderPrev.disabled = true;
    sliderStart.disabled = true;;
  } else {
    sliderNext.disabled = false;
    sliderEnd.disabled = false;
    sliderPrev.disabled = false;
    sliderStart.disabled = false;;

  }

for(let i = 0; i < localStorage.cards; i++) {

  cardsPets[i].childNodes[1].style.background = `url('${pagintaionsArr[isPages][i].img}')`;
  cardsPets[i].childNodes[3].innerText = pagintaionsArr[isPages][i].name;
}

}


function sliderNextPages() {
  if (localStorage.pages < localStorage.quantityPages - 1) {
    ++localStorage.pages
  } else {
    localStorage.pages = 0;
  }
}

function sliderPrevPages() {
  if (localStorage.pages > 0) {
    --localStorage.pages
  } else {
    localStorage.pages = 0;
  }
}


function pageTurningNext() {
  petsSlider.classList.add('pets-slider-active-end')
  petsSlider.addEventListener('transitionend', pageTurningAnimationStart, false)

}


function pageTurningPrev() {
  petsSlider.classList.add('pets-slider-active-start')
  petsSlider.addEventListener('transitionend', pageTurningAnimationStart, false)

}


function pageTurningAnimationStart() {
  petsSlider.classList.remove('pets-slider-active-end')
  petsSlider.classList.remove('pets-slider-active-start')

}


//start block media paginations
const sizeWindow = {desktop: 'desktop',
                    tablet: 'tablet',
                    mobile: 'mobile'
                    }

const mediaPaginationsDestop = window.matchMedia('(min-width: 1211px)');
const mediaPaginationsTablet = window.matchMedia('(min-width: 601px) and (max-width: 1210px)');
const mediaPaginationsMobile = window.matchMedia('(min-width: 280px) and (max-width: 600px)');


localStorage.setItem('media', mediaPaginationsDestop.matches ? sizeWindow.desktop:
                              mediaPaginationsTablet.matches ? sizeWindow.tablet:
                              sizeWindow.mobile
                              )


mediaPaginationsDestop.addEventListener('change', () => {
  if (mediaPaginationsDestop.matches ) {
    mediaPaginations(sizeWindow.desktop)
    localStorage.quantityPages = 6;
    localStorage.cards = 8;
    if (Number(localStorage.pages) > 5) {
      localStorage.pages = 5;
    }
    paginationPets()

  }
})

mediaPaginationsTablet.addEventListener('change', () => {
  if (mediaPaginationsTablet.matches) {
    mediaPaginations(sizeWindow.tablet)
    localStorage.quantityPages = 8;
    localStorage.cards = 6;
    if (Number(localStorage.pages) > 7) {
      localStorage.pages = 7;
    }
    paginationPets()
  }
})

mediaPaginationsMobile.addEventListener('change', () => {
  if (mediaPaginationsMobile.matches) {
    mediaPaginations(sizeWindow.mobile)
    localStorage.quantityPages = 16;
    localStorage.cards = 3;
    paginationPets()
  }
})



function mediaPaginations(size) {
localStorage.media = size;
}


// end block media paginations


// end paginations



// add link map

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


/* start burger menu */

/* start burger menu */

const mediaQuery = window.matchMedia('(max-width: 767px)');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-menu');
const blur = document.querySelector('.blur-background');
const html = document.querySelector('html');
let isBurger = false;


mediaQuery.addEventListener('change', () => {
  if (!mediaQuery.matches) {
    closeMenu()
    menu.style.visibility = 'visible';
    menu.style.transform = 'translateX(0)';
  } else {
    closeMenu()
    blur.addEventListener('click', closeMenu)
    menu.addEventListener('click', closeMenu)
  }
})

burger.addEventListener('click', isOpen)




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
  html.style.overflow = 'auto';
  isBurger = false;
}

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
