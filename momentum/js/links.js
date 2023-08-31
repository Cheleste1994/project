import linksDate from './linksDate.js';

const tagLinks = document.querySelector('.tag-links');
const menu = document.querySelector('.links-menu');
const addLinks = document.querySelector('.add-links');
const addLinksMenu = document.querySelector('.add-links-menu');
const back = document.querySelector('.back-links-create');
const create = document.querySelector('.add-links-create'); 
const createName = document.querySelector('.add-links-name-btn');
const createAddLinks = document.querySelector('.add-links-site-btn');
const linksAll = document.querySelector('.links-all');

const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms))
}

let isLinksMenu = false;
let isAddMenu = false;


function openMenuLink () {
    tagLinks.addEventListener('click', () => {
        if (isLinksMenu === false) {
            tagLinks.classList.add('tag-links-active'); 
            menuOpen ();
        } else {
            tagLinks.classList.remove('tag-links-active');   
            menuClosed ();
            addLinksMenuClosed();
        }       
    })
}

openMenuLink ()


function menuOpen () {
    menu.style.visibility = 'visible';
    menu.style.opacity = 0.97;
    isLinksMenu = true;
}

addLinks.addEventListener('click', () => {
    isAddMenu === false ? addLinksMenuOpen(): addLinksMenuClosed();
})


function menuClosed () {
    menu.style.visibility = 'hidden';
    menu.style.opacity = 0;
    isLinksMenu = false;
}


function addLinksMenuOpen() {  
    addLinksMenu.style.visibility = 'visible'; 
    addLinksMenu.style.transform = 'rotateY(90deg)';
    addLinksMenu.style.transform = 'translateX(1px)';
}


back.addEventListener('click',() => {addLinksMenuClosed()})


function addLinksMenuClosed() {
    addLinksMenu.style.visibility = 'hidden';  
    addLinksMenu.style.transform = 'rotateY(-90deg)';
    addLinksMenu.style.transform = 'translateX(-1px)';
    isAddMenu = false;
}



 function createLinks () {
    for (let i = 0; i < linksDate.length; i++) {
     let li = document.createElement('li');
     li.classList.add('link');
     createFavicon(i, li);
     createAHref(i, li);
     
     
     linksAll.append(li)
    }  
 }
 
 createLinks()


 function createFavicon(i, li) {
    let img = new Image();
    img.src = `${linksDate[i].favicon.src}`;
    img.alt = `${linksDate[i].favicon.alt}`;
    img.classList.add(`${linksDate[i].favicon.class}`);
    li.append(img)
 }


 function createAHref(i, li) {
    let a = document.createElement('a');
    a.href = `${linksDate[i].site.link}`;
    a.classList.add(`${linksDate[i].site.class}`);
    a.textContent = `${linksDate[i].site.name}`;

    li.append(a)
 }


function createSpan(li) {
    let div = document.createElement('div');
    div.classList.add('links-closed');
    li.append(div)

}


 create.addEventListener('click', () => {
    linksDate.push(JSON.parse(JSON.stringify(linksDate[0])));
    let newLink = linksDate[linksDate.length - 1];
    let li = document.createElement('li');
    li.classList.add('link');

    newLink.site.name = createName.value === '' ? newLink.site.name: createName.value;
    newLink.site.link = createAddLinks.value === '' ? newLink.site.link: createAddLinks.value;
    if (createAddLinks.value === '') {
        newLink.favicon.src
    } else {
        newLink.favicon.src = `http://www.google.com/s2/favicons?domain=${(createAddLinks.value).replace('https://', '')}`;
    }
    
    createFavicon(linksDate.length - 1, li)
    createAHref(linksDate.length - 1, li)
    createSpan(li)
    
    linksAll.append(li)
    addLinksMenuClosed()
    deliteLinks()
})




function deliteLinks() {
const linksClosedAll = document.querySelectorAll('.links-closed');
linksClosedAll.forEach( (x, i) => {
            x.addEventListener('click', () => {
                (linksClosedAll[i].parentNode).remove()  
            })
        })

}

    
