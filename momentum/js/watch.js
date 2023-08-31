const timeClass = document.querySelector('.time');
const dateClass = document.querySelector('.date');
const langGreeting = document.querySelector('.lang-settings')

let isLangWatch = 'en-US';

langGreeting.addEventListener('click', () => {
  if (event.target.textContent === 'Ru' || event.target.textContent === 'Be') {
    isLangWatch = 'ru';
    showTime ()
  } else {
    isLangWatch = 'en-US'
    showTime ()
  }
  
})


function showTime() {
    const dateAll = new Date();
    const currentTime = dateAll.toLocaleTimeString();
    const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = dateAll.toLocaleDateString(isLangWatch, options);
    timeClass.textContent = currentTime;
    dateClass.textContent = currentDate;
    setTimeout(showTime, 1000);
    

  }
  
  showTime();


