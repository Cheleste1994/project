window.addEventListener('load', () => {
  getQuotes()
})


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
