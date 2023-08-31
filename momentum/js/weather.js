const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error')
const langGreeting = document.querySelector('.lang-settings')
const langRu = document.querySelector('.lang-ru');
const langEn = document.querySelector('.lang-en');

let isLang = 'en';
const arrLang = [
  {
    wind: 'Wind speed',
    humidity: 'Humidity',
    error: 'Error! city not found for',
    city: 'Minsk'
  },
  {
    wind: 'Скорость ветра',
    humidity: 'Влажность',
    error: 'Ошибка! Не существует города',
    city: 'Минск'
  }
]

let isArr = 0;
langEn.classList.add('lang-active');

langGreeting.addEventListener('click', () => {
  
  if (event.target.textContent === 'Ru' || event.target.textContent === 'Be') {
    isLang = 'ru';
    isArr = 1;
    langRu.classList.add('lang-active');
    langEn.classList.remove('lang-active');
    localStorage.removeItem('city')
    getWeather ()
    openLocalStorage()
  } else {
    isLang = 'en';
    isArr = 0;
    langRu.classList.remove('lang-active');
    langEn.classList.add('lang-active');
    localStorage.removeItem('city')
    getWeather ()
    openLocalStorage()
  }
  
})


async function getWeather() {  
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${isLang}&appid=934c01a41d47b89f7d5e4dfaef021882&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = '';

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${arrLang[isArr].wind}: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `${arrLang[isArr].humidity}: ${data.main.humidity}%`
  } catch {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    weatherError.textContent = `${arrLang[isArr].error} '${city.value}'!`;
  }
  }
  
//save city in local storage
function cityLocalStorage() {
    localStorage.setItem('city', city.value);
    city.value !== '' ? getWeather(): false;    
  }

city.addEventListener('keyup', () => {
  if (event.code === 'Enter') {
          cityLocalStorage();
        }
})

city.addEventListener('blur', cityLocalStorage)

//open city from local storage

function openLocalStorage() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    cityLocalStorage();
  } else {
    localStorage.setItem('city', 'Minsk');
    city.value = arrLang[isArr].city;
    cityLocalStorage();
  }
}
window.addEventListener('load', openLocalStorage)
