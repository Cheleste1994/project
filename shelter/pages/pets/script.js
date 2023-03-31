window.addEventListener('load', () => {
  getQuotes()
  copyCardsPets()
})


async function copyCardsPets() {
const cardsPets = document.querySelectorAll('.slider-cards')

const imgHelp = '../pets.json';
const res = await fetch(imgHelp);
const data = await res.json();

console.log(data)


}


async function getQuotes() {
  const cardsPets = document.querySelectorAll('.slider-cards')
  const petsName = document.querySelectorAll('.cards-name')
  const petsImg = document.querySelectorAll('.cards-img')

  const imgHelp = '../pets.json';
  const res = await fetch(imgHelp);

  const data = await res.json();



  cardsPets.forEach((x, i) => {
    x.childNodes[1].style.background = `url('${data[i].img}')`;
    x.childNodes[3].innerText = data[i].name;
  })

}

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
