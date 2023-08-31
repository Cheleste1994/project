import greetingTranslation from './greeting lang.js';

const langGreeting = document.querySelector('.lang-settings')
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const settings = document.querySelector('.settings-text');
const pleylist = document.querySelector('.pleylist-text');
const player = document.querySelector('.player-text');
const weather = document.querySelector('.weather-text');
const time = document.querySelector('.time-text');
const dateText = document.querySelector('.date-text');
const greetingText = document.querySelector('.greeting-text');
const quote = document.querySelector('.quote-text');
const collections = document.querySelector('.settings-collections-text');
const github = document.querySelector('.github-text');
const tagsText = document.querySelector('.tag-text');
const tagLinks = document.querySelector('.tag-links');
const addLinks = document.querySelector('.add-links');
const backLinks = document.querySelector('.back-links-create');
const linksName = document.querySelector('.add-links-text')
const inputLink = document.querySelectorAll('.add-links-text');
const create = document.querySelector('.add-links-create');
const linksText = document.querySelector('.links-text');

const date = new Date();
const hours = date.getHours();
let isLang = 0;
let weekDay = '';

name.placeholder = '[Enter name]'

langGreeting.addEventListener('click', () => {
  if (event.target.textContent === 'Ru' || event.target.textContent === 'Be') {
    isLang = 1;
    name.placeholder = '[Введите имя]'
    getTimeOfDay ()
    settingTranslation ()
  } else {
    name.placeholder = '[Enter name]'
    isLang = 0;
    getTimeOfDay ()
    settingTranslation ()
  } 
})

function settingTranslation () {
    settings.textContent = greetingTranslation[isLang].settings;
    pleylist.textContent = greetingTranslation[isLang].pleylist;
    player.textContent = greetingTranslation[isLang].player;
    weather.textContent = greetingTranslation[isLang].weather;
    time.textContent = greetingTranslation[isLang].time;
    dateText.textContent = greetingTranslation[isLang].date;
    greetingText.textContent = greetingTranslation[isLang].greeting;
    quote.textContent = greetingTranslation[isLang].quote;
    collections.textContent = greetingTranslation[isLang].collections;
    github.textContent = greetingTranslation[isLang].github;
    tagsText.textContent = tagsText.textContent.replace('Tag for ', greetingTranslation[isLang].tags)
    tagLinks.textContent = greetingTranslation[isLang].links;
    addLinks.textContent = greetingTranslation[isLang].addLinks;
    backLinks.textContent = greetingTranslation[isLang].back;
    linksName.textContent = greetingTranslation[isLang].linksName;
    inputLink[1].textContent = greetingTranslation[isLang].inputLink;
    create.textContent = greetingTranslation[isLang].create;
    linksText.textContent = greetingTranslation[isLang].links;
}


// Greeting

function getTimeOfDay () {
if (hours < 12) {
    weekDay = greetingTranslation[isLang].morning;
} else if (hours < 17) {
    weekDay = greetingTranslation[isLang].afternoon;
} else if (hours < 20) {
    weekDay = greetingTranslation[isLang].evening;
} else {
    weekDay = greetingTranslation[isLang].night;
}
greeting.textContent = `${weekDay}`;
setTimeout(getTimeOfDay, 10000);
}

getTimeOfDay()


// name save in local storage 

function setLocalStorage() {
    localStorage.setItem('name', name.value);
  }
window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
window.addEventListener('load', getLocalStorage)


export default weekDay;