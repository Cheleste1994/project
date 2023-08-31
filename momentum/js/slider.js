import weekDay from './greeting.js';

const body = document.querySelector('body');
const next = document.querySelector('.slide-next');
const prev = document.querySelector('.slide-prev');
const collection = document.querySelector('.settings-collections');
const collections = document.querySelector('div.settings-collections');
const tagsOpen = document.querySelector('.tag-text-open');
const tagsText = document.querySelector('.tag-text');
const tags = document.querySelector('.tagAPI');

const week = weekDay.slice(5);
let tagsApi = week;
let counter = 0;
const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms))
}


let i = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

async function setBgOpen () {
    await delay(300);
    if (localStorage.githubBtn === 'true') {
        setBgGitHubCollection ();
    }    
}

 setBgOpen()

 collection.addEventListener('click', () => {
    if ( event.target.classList[1] === 'githubBtn' && localStorage.githubBtn === 'false') {
        setBgGitHubCollection()

    } else if (event.target.classList[1] === 'githubBtn' && localStorage.githubBtn === 'true') {
        setBgGitHubCollection ()
    } else if (event.target.classList[1] === 'flickrBtn' && localStorage.flickrBtn === 'true') {
        setBgFlickrCollection ()
    } else if (event.target.classList[1] === 'flickrBtn' && localStorage.flickrBtn === 'false') {
        setBgGitHubCollection()
    } else if (event.target.classList[1] === 'unsplashBtn' && localStorage.unsplashBtn === 'true') {
        setBgUnsplashCollection ()
    } else if (event.target.classList[1] === 'unsplashBtn' && localStorage.unsplashBtn === 'false') {
        setBgGitHubCollection()
    } 
 })


 next.addEventListener('click', () => {
    if (localStorage.githubBtn === 'true') {
        setBgGitHubCollection(i < 20 ? i = i + 1: i = 1)
    } else if (localStorage.flickrBtn === 'true') {
        setBgFlickrCollection(i < 20 ? i = i + 1: i = 1)
    } else if (localStorage.unsplashBtn === 'true') {
        setBgUnsplashCollection()
    }   
})  

 prev.addEventListener('click', () => {
    if (localStorage.githubBtn === 'true') {
        setBgGitHubCollection(i > 1 ? i = i - 1: i = 20)
    } else if (localStorage.flickrBtn === 'true') {
        setBgFlickrCollection(i > 1 ? i = i - 1: i = 20)
    } else if (localStorage.unsplashBtn === 'true') {
        setBgUnsplashCollection()
    }      
})
 
 


function setBgGitHubCollection() {
    
    let img = new Image();
    let bgNum = i.toString().padStart(2, "0");
    
    img.src = `https://raw.githubusercontent.com/cheleste1994/stage1-tasks/assets/images/${week}/${bgNum}.jpg`;
    
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url('${img.src}')`;
    })
    localStorage.githubBtn = true;
    localStorage.flickrBtn = false;
    localStorage.unsplashBtn = false;
    collections.children[1].classList.add('switch-on');
    collections.children[3].classList.remove('switch-on');
    collections.children[5].classList.remove('switch-on');
    tagsOpen.style.display = 'none';

}
setBgGitHubCollection()




async function setBgFlickrCollection() {  
    try {
        
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6979e90a14cc8e093aa1616fb64cf006&tags=${tagsApi}&extras=url_h&format=json&nojsoncallback=1`;
        const res = await fetch(url);
        const imgFlickr = await res.json();
        let img = new Image();
        img.src = imgFlickr.photos.photo[i].url_h;
        img.addEventListener('load', () => {
            body.style.backgroundImage = `url('${img.src}')`;
            
        })
        localStorage.githubBtn = false;
        localStorage.flickrBtn = true;
        localStorage.unsplashBtn = false;
        collections.children[1].classList.remove('switch-on');
        collections.children[3].classList.add('switch-on');
        collections.children[5].classList.remove('switch-on');
        tagsOpen.style.display = 'block';
        tagsText.textContent =  'Tag for Flickr API:'
        
        tags.addEventListener('keyup', () => {
            if (event.code === 'Enter') {
                tagsApi = tags.value;
                    setBgFlickrCollection();
                  }
          })

    } catch {
        if (counter < 2) {
            counter++
            tagsApi = week;
            setBgFlickrCollection();
        }  else {
            counter = 0;
            setBgGitHubCollection();
        }

        
    }
}



async function setBgUnsplashCollection() {  
    try {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tagsApi}&client_id=5OtcZ8-ZzPrg4IKBO5rSv-_yMitdRdr6DVOdUL2Cvps`;
 

        const res = await fetch(url);
        const imgFlickr = await res.json();
        let img = new Image();
        img.src = imgFlickr.urls.regular;
        img.addEventListener('load', () => {
            body.style.backgroundImage = `url('${img.src}')`;
            
        })
        localStorage.githubBtn = false;
        localStorage.flickrBtn = false;
        localStorage.unsplashBtn = true;
        collections.children[1].classList.remove('switch-on');
        collections.children[3].classList.remove('switch-on');
        collections.children[5].classList.add('switch-on');
        tagsOpen.style.display = 'block';
        tagsText.textContent = 'Tag for Unsplash API:'

        tags.addEventListener('keyup', () => {
            if (event.code === 'Enter') {
                tagsApi = tags.value;
                setBgUnsplashCollection();
                } 
          })
    } catch {
        if (counter < 2) {
            counter++
            tagsApi = week;
            setBgUnsplashCollection ();
        }  else {
            counter = 0;
            setBgGitHubCollection ();
        }

        
    }
}

