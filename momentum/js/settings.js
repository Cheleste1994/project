const appSettingsOpen = document.querySelector('.app-settings');
const open = document.querySelector('.settings-none');
const appSet = document.querySelector('.app-settings');
const langAppOpen = document.querySelector('.lang-settings');
const switchBtn = document.querySelector('.switch-btn');
const pleylist = document.querySelector('.player');
const player = document.querySelector('.player-controls-active');
const playerControls = document.querySelector('.player-controls');
const weather = document.querySelector('.weather');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting-container');
const quote = document.querySelector('.quoteAll');
const links = document.querySelector('.links')
const changeQuote = document.querySelector('.change-quote');
const switchLang = document.querySelector('.switch-lang');
const ruEn = document.querySelector('.switch-lang-en-ru');
const byEn = document.querySelector('.switch-lang-en-by');
const langRU = document.querySelector('.lang-ru');
const exceptionsArr = [
    'playerBtn',
    'flickrBtn',
    'unsplashBtn'
]

const switchBtnAll = document.querySelectorAll('.switch-btn');

ruEn.classList.add('switch-lang-en-ru-active');

switchLang.addEventListener('click', () => {
    if (event.target.classList[0] === ruEn.classList[0]) {
        langRU.textContent = 'Ru';
        ruEn.classList.add('switch-lang-en-ru-active');
        byEn.classList.remove('switch-lang-en-ru-active');
    } else {
        langRU.textContent = 'Be';
        ruEn.classList.remove('switch-lang-en-ru-active');
        byEn.classList.add('switch-lang-en-ru-active');
    }
})


appSettingsOpen.addEventListener('click', () => {
    open.classList.toggle('settings-open')
    appSet.classList.toggle('app-settings-active')
    langAppOpen.classList.toggle('lang-settings-active')
    switchBtn.classList.add('switch-on');
    
})


switchBtnAll.forEach(x => {
    x.classList.add('switch-on')
    localStorage.setItem(x.classList[1], true)
    exceptionsArr.forEach(y => {
        if (y === x.classList[1]) {
            localStorage.setItem(x.classList[1], false)
            x.classList.remove('switch-on')
        } 
    })
     
    x.addEventListener('click', () => {
        if (localStorage.getItem(x.classList[1]) === 'true') {
           x.classList.remove('switch-on')
           hideSelectedBlog(x)
        } else {
           x.classList.add('switch-on')
           hideSelectedBlog(x)
        }
    })        
})
    

function hideSelectedBlog (x) {
    if (localStorage.getItem('pleylistBtn') === 'true' && x.classList[1] === 'pleylistBtn') {
        closePleylist ()
    } else if (localStorage.getItem('pleylistBtn') === 'false' && x.classList[1] === 'pleylistBtn') {
        openPleylist ()
    } else if (localStorage.getItem('playerBtn') === 'true' && x.classList[1] === 'playerBtn') {
        closePlayer ()
    } else if (localStorage.getItem('playerBtn') === 'false' && x.classList[1] === 'playerBtn') {
        openPlayer ()
    } else if (localStorage.getItem('weatherBtn') === 'true' && x.classList[1] === 'weatherBtn') {
        closeWeather ()
    } else if (localStorage.getItem('weatherBtn') === 'false' && x.classList[1] === 'weatherBtn') {
        openWeather ()
    } else if (localStorage.getItem('timeBtn') === 'true' && x.classList[1] === 'timeBtn') {
        closeTime ()
    } else if (localStorage.getItem('timeBtn') === 'false' && x.classList[1] === 'timeBtn') {
        openTime ()
    } else if (localStorage.getItem('dateBtn') === 'true' && x.classList[1] === 'dateBtn') {
        closeDate ()
    } else if (localStorage.getItem('dateBtn') === 'false' && x.classList[1] === 'dateBtn') {
        openDate ()
    } else if (localStorage.getItem('greetingBtn') === 'true' && x.classList[1] === 'greetingBtn') {
        closeGreeting ()
    } else if (localStorage.getItem('greetingBtn') === 'false' && x.classList[1] === 'greetingBtn') {
        openGreeting ()
    } else if (localStorage.getItem('quoteBtn') === 'true' && x.classList[1] === 'quoteBtn') {
        closeQuote ()
    } else if (localStorage.getItem('quoteBtn') === 'false' && x.classList[1] === 'quoteBtn') {
        openQuote ()
    }else if (localStorage.getItem('linksBtn') === 'true' && x.classList[1] === 'linksBtn') {
        closeLinks ()
    } else if (localStorage.getItem('linksBtn') === 'false' && x.classList[1] === 'linksBtn') {
        openLinks ()
    } else if (localStorage.getItem('githubBtn') === 'true' && x.classList[1] === 'githubBtn') {
        localStorage.githubBtn = false

    } else if (localStorage.getItem('githubBtn') === 'false' && x.classList[1] === 'githubBtn') {
        localStorage.githubBtn = true


    } else if (localStorage.getItem('flickrBtn') === 'true' && x.classList[1] === 'flickrBtn') {
        localStorage.flickrBtn = false

    } else if (localStorage.getItem('flickrBtn') === 'false' && x.classList[1] === 'flickrBtn') {
        localStorage.flickrBtn = true

    } else if (localStorage.getItem('unsplashBtn') === 'true' && x.classList[1] === 'unsplashBtn') {
        localStorage.unsplashBtn = false
    } else if (localStorage.getItem('unsplashBtn') === 'false' && x.classList[1] === 'unsplashBtn') {
        localStorage.unsplashBtn = true
    } 


}

//playlist start

function closePleylist () {
    pleylist.style.visibility = 'hidden';
    pleylist.style.transform = 'translateX(-200%)'; 
    localStorage.pleylistBtn = false;
}

function openPleylist () {
    pleylist.style.visibility = 'visible';
    pleylist.style.transform = 'translateX(0)';
    localStorage.pleylistBtn = true;
}

//playlist end

//player start

function closePlayer () {
    player.style.visibility = 'hidden';

    player.style.opacity = 0;
    playerControls.style.visibility = 'visible';
    playerControls.style.opacity = 1;
    localStorage.playerBtn = false;
}

function openPlayer () {
    player.style.visibility = 'visible';
    player.style.opacity = 0.8;
    playerControls.style.visibility = 'hidden';
    playerControls.style.opacity = 0;

    localStorage.playerBtn = true;
}

//player end 

//weather start

function closeWeather () {
    weather.style.visibility = 'hidden';
    weather.style.opacity = 0;
    localStorage.weatherBtn = false;
}

function openWeather () {
    weather.style.visibility = 'visible';
    weather.style.opacity = 1;
    localStorage.weatherBtn = true;
}

//weather end 

//time start

function closeTime () {
    time.style.visibility = 'hidden';
    time.style.opacity = 0;
    localStorage.timeBtn = false;
}

function openTime () {
    time.style.visibility = 'visible';
    time.style.opacity = 1;
    
    localStorage.timeBtn = true;
}

//time end 

//date start

function closeDate () {
    date.style.visibility = 'hidden';
    date.style.opacity = 0;
    localStorage.dateBtn = false;
}

function openDate () {
    date.style.visibility = 'visible';
    date.style.opacity = 1;
    
    localStorage.dateBtn = true;
}

//date end 

//greeting start

function closeGreeting () {
    greeting.style.visibility = 'hidden';
    greeting.style.opacity = 0;
    localStorage.greetingBtn = false;
}

function openGreeting () {
    greeting.style.visibility = 'visible';
    greeting.style.opacity = 1;
    
    localStorage.greetingBtn = true;
}

//date end 

//quote start

function closeQuote () {
    quote.style.visibility = 'hidden';
    quote.style.opacity = 0;
    changeQuote.style.visibility = 'hidden';
    changeQuote.style.opacity = 0;
    localStorage.quoteBtn = false;
}

function openQuote () {
    quote.style.visibility = 'visible';
    quote.style.opacity = 1;
    changeQuote.style.visibility = 'visible';
    changeQuote.style.opacity = 1;
    localStorage.quoteBtn = true;
}

//quote end 

//links start

function closeLinks () {
    links.style.visibility = 'hidden';
    links.style.opacity = 0;
    localStorage.linksBtn = false;
}

function openLinks () {
    links.style.visibility = 'visible';
    links.style.opacity = 1;
    localStorage.linksBtn = true;
}