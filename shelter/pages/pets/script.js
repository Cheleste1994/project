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
      if (pagintaionsArr[i].length >= Number(localStorage.cards) ) {

        break
      }
      if ( !(pagintaionsArr[i].includes(newArrPets[isCounter])) ) {
        pagintaionsArr[i].push(newArrPets[isCounter]);
      } else {
        newArr[0].forEach((x) => {
         if  ( !pagintaionsArr[i].includes(x) ) {
          pagintaionsArr[i].push(x);

          return
         }

        })
      }

      isCounter++
    }
  }
  getQuotes(pagintaionsArr)

}


sliderNext.addEventListener('click', (event) => {
  if (localStorage.pages < localStorage.quantityPages - 1) {
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

  for (let i = 0; i < localStorage.cards; i++) {

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
const sizeWindow = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile'
}

const mediaPaginationsDestop = window.matchMedia('(min-width: 1211px)');
const mediaPaginationsTablet = window.matchMedia('(min-width: 601px) and (max-width: 1210px)');
const mediaPaginationsMobile = window.matchMedia('(min-width: 280px) and (max-width: 600px)');


localStorage.setItem('media', mediaPaginationsDestop.matches ? sizeWindow.desktop :
  mediaPaginationsTablet.matches ? sizeWindow.tablet :
    sizeWindow.mobile
)


mediaPaginationsDestop.addEventListener('change', () => {
  if (mediaPaginationsDestop.matches) {
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

const mediaQuery = window.matchMedia('(max-width: 767px)');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-menu');
const menuLi = document.querySelectorAll('.nav-li')
const blur = document.querySelector('.blur-background');
const html = document.querySelector('html');
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
  if (mediaQuery.matches) {closeMenu()}
})

menuLi.forEach((x) => {
  x.addEventListener('click', () => {
    if (mediaQuery.matches) { closeMenu() }
  })
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




/* start popap block */
const cardsClick = document.querySelector('.pets-slider')
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
  popap.addEventListener('click', () => {
    if (event.target === popap) {openPopap()}
  })
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


  console.log(`Согласно ТЗ выполнены все пунткы: оценка 110/110`)
