const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const langGreeting = document.querySelector('.lang-settings')
let isLang = 'data';

langGreeting.addEventListener('click', () => {
    if (event.target.textContent === 'Ru' || event.target.textContent === 'Be') {
      isLang = 'dataRu';
      getQuotes ()
    } else {
      isLang = 'data';
      getQuotes ()
    } 
  })
  
async function getQuotes() {
    
    const quotes = `js/${isLang}.json`;
    const res = await fetch(quotes);
    const data = await res.json(); 

    let numberQuote = Math.floor(Math.random() * data.length);
    if (Number(localStorage.getItem('number')) === numberQuote) {
        while (Number(localStorage.getItem('number')) === numberQuote) {
            numberQuote = Math.floor(Math.random() * data.length);
        }
    }
    localStorage.setItem('number', numberQuote);
    quote.textContent = data[numberQuote].text;
    author.textContent = data[numberQuote].author;
 }
 
getQuotes();

changeQuote.addEventListener('click', () => {getQuotes()})