(()=>{"use strict";var n={669:(n,e,r)=>{r.d(e,{Z:()=>i});var t=r(645),o=r.n(t)()((function(n){return n[1]}));o.push([n.id,".news {\r\n  flex-grow: 1;\r\n  width: 70%;\r\n  align-items: center;\r\n}\r\n\r\n.news__item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin: 1rem auto;\r\n    margin-bottom: 1.6%;\r\n    background: #fff;\r\n    color: #333;\r\n    line-height: 1.4;\r\n    font-family: Arial, sans-serif;\r\n    border-radius: 5px;\r\n    overflow: hidden;\r\n}\r\n\r\n.news__item:hover .news__meta-photo {\r\n    transform: scale(1.3) rotate(3deg);\r\n}\r\n\r\n.news__item .news__meta {\r\n    position: relative;\r\n    height: 200px;\r\n}\r\n\r\n.news__item .news__meta-photo {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    background-size: cover;\r\n    background-position: center;\r\n    transition: transform 0.2s;\r\n}\r\n\r\n.news__item .news__meta-details,\r\n.news__item .news__meta-details ul {\r\n    margin: auto;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\n.news__item .news__meta-details {\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: -120%;\r\n    margin: auto;\r\n    transition: left 0.2s;\r\n    background: rgba(0, 0, 0, 0.6);\r\n    color: #fff;\r\n    padding: 10px;\r\n    width: 100%;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.news__item .news__description {\r\n    padding: 1rem;\r\n    background: #fff;\r\n    position: relative;\r\n    z-index: 1;\r\n}\r\n\r\n.news__item .news__description h2 {\r\n    line-height: 1;\r\n    margin: 0;\r\n    font-size: 1.7rem;\r\n}\r\n\r\n.news__item .news__description h3 {\r\n    font-size: 1rem;\r\n    font-weight: 300;\r\n    text-transform: uppercase;\r\n    color: #a2a2a2;\r\n    margin-top: 5px;\r\n}\r\n\r\n.news__item .news__description .news__read-more {\r\n    text-align: right;\r\n}\r\n\r\n.news__item .news__description .news__read-more a {\r\n    color: #5ad67d;\r\n    display: inline-block;\r\n    position: relative;\r\n    text-decoration: none;\r\n    font-weight: 800;\r\n}\r\n\r\n.news__item .news__description .news__read-more a:after {\r\n    content: '→';\r\n    margin-left: -10px;\r\n    opacity: 0;\r\n    vertical-align: middle;\r\n    transition: margin 0.3s, opacity 0.3s;\r\n}\r\n\r\n.news__item .news__description .news__read-more a:hover:after {\r\n    margin-left: 5px;\r\n    opacity: 1;\r\n}\r\n\r\n.news__item p {\r\n    margin: 1rem 0 0;\r\n}\r\n\r\n.news__item p:first-of-type {\r\n    margin-top: 1.25rem;\r\n    position: relative;\r\n}\r\n\r\n.news__item p:first-of-type:before {\r\n    content: '';\r\n    position: absolute;\r\n    height: 5px;\r\n    background: #5ad67d;\r\n    width: 35px;\r\n    top: -0.75rem;\r\n    border-radius: 3px;\r\n}\r\n\r\n.news__item:hover .news__meta-details {\r\n    left: 0%;\r\n}\r\n\r\n@media (min-width: 640px) {\r\n    .news__item {\r\n        flex-direction: row;\r\n        max-width: 700px;\r\n    }\r\n\r\n    .news__item .news__meta {\r\n        flex-basis: 40%;\r\n        height: auto;\r\n    }\r\n\r\n    .news__item .news__description {\r\n        flex-basis: 60%;\r\n    }\r\n\r\n    .news__item .news__description:before {\r\n        -webkit-transform: skewX(-3deg);\r\n        transform: skewX(-3deg);\r\n        content: '';\r\n        background: #fff;\r\n        width: 30px;\r\n        position: absolute;\r\n        left: -10px;\r\n        top: 0;\r\n        bottom: 0;\r\n        z-index: -1;\r\n    }\r\n\r\n    .news__item.alt {\r\n        flex-direction: row-reverse;\r\n    }\r\n\r\n    .news__item.alt .news__description:before {\r\n        left: inherit;\r\n        right: -10px;\r\n        -webkit-transform: skew(3deg);\r\n        transform: skew(3deg);\r\n    }\r\n\r\n    .news__item.alt .news__meta-details {\r\n        padding-left: 25px;\r\n    }\r\n}\r\n",""]);const i=o},501:(n,e,r)=>{r.d(e,{Z:()=>i});var t=r(645),o=r.n(t)()((function(n){return n[1]}));o.push([n.id,".sources {\r\n    display: flex;\r\n    flex-direction: column;\r\n    max-width: 200px;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow-y: auto;\r\n\r\n    direction: rtl;\r\n    align-items: flex-end;\r\n    font: 300 1em 'Fira Sans', sans-serif;\r\n    max-height: 1500px;\r\n}\r\n\r\n.sources::-webkit-scrollbar {\r\n  width: 12px;\r\n}\r\n\r\n.sources::-webkit-scrollbar-thumb {\r\n  background-color: rgba(133, 133, 133, 0.171);\r\n  border-radius: 20px;\r\n  border: 3px solid rgba(194, 194, 194, 0.527);\r\n}\r\n\r\n.source__item {\r\n    background: none;\r\n    border: 2px solid #30c5ff;\r\n    font: inherit;\r\n    line-height: 1;\r\n    margin: 0.5em;\r\n    padding: 0.5em 0.5em;\r\n    color: #70d6ff;\r\n    transition: 0.25s;\r\n    cursor: pointer;\r\n    width: 100%;\r\n    max-width: 150px;\r\n}\r\n\r\n.source__item:hover,\r\n.source__item:focus {\r\n    border-color: #3fcc59;\r\n    color: #69db7e;\r\n    box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\r\n    transform: translateY(-0.25em);\r\n}\r\n\r\n.source__item-name {\r\n    font-weight: 400;\r\n    word-break: break-all;\r\n}\r\n\r\n\r\n\r\n@media (max-width: 700px) {\r\n\r\n  .source__item {\r\n    width: 70%;\r\n  }\r\n  .sources::-webkit-scrollbar {\r\n    width: 3px;\r\n  }\r\n}\r\n\r\n\r\n@media (max-width: 400px) {\r\n  .sources {\r\n   font: 300 0.5em 'Fira Sans', sans-serif;\r\n  }\r\n\r\n  .source__item {\r\n    width: 70%;\r\n  }\r\n\r\n}\r\n",""]);const i=o},767:(n,e,r)=>{r.d(e,{Z:()=>i});var t=r(645),o=r.n(t)()((function(n){return n[1]}));o.push([n.id,"body {\r\n    color: #fff;\r\n    background: #17181c;\r\n    font-family: sans-serif;\r\n}\r\n\r\nheader {\r\n    padding: 10px 30px;\r\n}\r\n\r\n.menu {\r\n  display: flex;\r\n  width: 100%;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.dropdown:last-child {\r\n  margin-left: 50px;\r\n}\r\n\r\n.dropbtn {\r\n  background: none;\r\n  border: 2px solid #30c5ff;\r\n  font: inherit;\r\n  line-height: 1;\r\n  margin: 0.5em;\r\n  padding: 0.5em 0.5em;\r\n  color: #70d6ff;\r\n  transition: 0.25s;\r\n  cursor: pointer;\r\n  width: 100%;\r\n  max-width: 150px;\r\n}\r\n\r\n.dropdown {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 100%;\r\n  max-width: 150px;\r\n}\r\n\r\n.dropdown-language,\r\n.dropdown-category {\r\n  display: none;\r\n  position: absolute;\r\n  color: #70d6ff;\r\n  z-index: 10;\r\n}\r\n\r\n.dropdown:hover .dropdown-language {\r\n  display: flex;\r\n  flex-direction: column;\r\n  background: #4e5355ce;\r\n  width: 100%;\r\n  max-width: 100px;\r\n}\r\n\r\n.dropdown:hover .dropdown-category {\r\n  display: flex;\r\n  flex-direction: column;\r\n  background: #4e5355ce;\r\n  width: 100%;\r\n  max-width: 150px;\r\n}\r\n\r\n.language,\r\n.category {\r\n  border: 2px solid #30c5ff;\r\n  font: inherit;\r\n  line-height: 1;\r\n  margin: 0.5em;\r\n  padding: 0.5em 0.5em;\r\n  color: #70d6ff;\r\n  transition: 0.25s;\r\n  cursor: pointer;\r\n}\r\n\r\n.language:hover,\r\n.language:focus,\r\n.category:hover,\r\n.category:focus {\r\n    border-color: #3fcc59;\r\n    color: #69db7e;\r\n    box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\r\n    transform: translateY(-0.25em);\r\n}\r\n\r\n.dropdown:hover .dropbtn {\r\n  background-color: #3e8e41;\r\n}\r\n\r\nmain {\r\n  display: flex;\r\n}\r\n\r\nheader h1 {\r\n    font-size: 40px;\r\n    font-weight: 800;\r\n    text-align: center;\r\n}\r\n\r\nfooter {\r\n    height: 100px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\nfooter .creation {\r\n    font-size: 14px;\r\n    color: #333;\r\n    text-align: center;\r\n}\r\nfooter .creation a {\r\n    color: #444;\r\n}\r\nfooter .creation a:hover {\r\n    color: #555;\r\n}\r\nfooter .copyright:before {\r\n    content: '©';\r\n}\r\n\r\nfooter .rsschool {\r\n  margin: 0 auto 10px auto;\r\n  filter: invert(0.8);\r\n}\r\n\r\nfooter .creation img {\r\n  width: 80px;\r\n}\r\n\r\n\r\n@media (max-width: 400px) {\r\n  .dropdown-category,\r\n  .dropdown-language {\r\n   font: 300 0.5em 'Fira Sans', sans-serif;\r\n  }\r\n\r\n\r\n}\r\n",""]);const i=o},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var r=n(e);return e[2]?"@media ".concat(e[2]," {").concat(r,"}"):r})).join("")},e.i=function(n,r,t){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(t)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(o[s]=!0)}for(var a=0;a<n.length;a++){var c=[].concat(n[a]);t&&o[c[0]]||(r&&(c[2]?c[2]="".concat(r," and ").concat(c[2]):c[2]=r),e.push(c))}},e}},242:(n,e,r)=>{r.r(e),r.d(e,{default:()=>s});var t=r(379),o=r.n(t),i=r(669);o()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},595:(n,e,r)=>{r.r(e),r.d(e,{default:()=>s});var t=r(379),o=r.n(t),i=r(501);o()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},427:(n,e,r)=>{r.r(e),r.d(e,{default:()=>s});var t=r(379),o=r.n(t),i=r(767);o()(i.Z,{insert:"head",singleton:!1});const s=i.Z.locals||{}},379:(n,e,r)=>{var t,o=function(){var n={};return function(e){if(void 0===n[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}n[e]=r}return n[e]}}(),i=[];function s(n){for(var e=-1,r=0;r<i.length;r++)if(i[r].identifier===n){e=r;break}return e}function a(n,e){for(var r={},t=[],o=0;o<n.length;o++){var a=n[o],c=e.base?a[0]+e.base:a[0],d=r[c]||0,l="".concat(c," ").concat(d);r[c]=d+1;var u=s(l),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(f)):i.push({identifier:l,updater:h(f,e),references:1}),t.push(l)}return t}function c(n){var e=document.createElement("style"),t=n.attributes||{};if(void 0===t.nonce){var i=r.nc;i&&(t.nonce=i)}if(Object.keys(t).forEach((function(n){e.setAttribute(n,t[n])})),"function"==typeof n.insert)n.insert(e);else{var s=o(n.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var d,l=(d=[],function(n,e){return d[n]=e,d.filter(Boolean).join("\n")});function u(n,e,r,t){var o=r?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(n.styleSheet)n.styleSheet.cssText=l(e,o);else{var i=document.createTextNode(o),s=n.childNodes;s[e]&&n.removeChild(s[e]),s.length?n.insertBefore(i,s[e]):n.appendChild(i)}}function f(n,e,r){var t=r.css,o=r.media,i=r.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}var p=null,m=0;function h(n,e){var r,t,o;if(e.singleton){var i=m++;r=p||(p=c(e)),t=u.bind(null,r,i,!1),o=u.bind(null,r,i,!0)}else r=c(e),t=f.bind(null,r,e),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(r)};return t(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;t(n=e)}else o()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var r=a(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var t=0;t<r.length;t++){var o=s(r[t]);i[o].references--}for(var c=a(n,e),d=0;d<r.length;d++){var l=s(r[d]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}r=c}}}},717:function(n,e,r){var t=this&&this.__awaiter||function(n,e,r,t){return new(r||(r=Promise))((function(o,i){function s(n){try{c(t.next(n))}catch(n){i(n)}}function a(n){try{c(t.throw(n))}catch(n){i(n)}}function c(n){var e;n.done?o(n.value):(e=n.value,e instanceof r?e:new r((function(n){n(e)}))).then(s,a)}c((t=t.apply(n,e||[])).next())}))},o=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(r(842)),s=r(527);e.default=class{constructor(){this.controller=new i.default,this.view=new s.AppView}start(){return t(this,void 0,void 0,(function*(){const n=yield this.controller.getSources(void 0);this.view.drawSources(n),document.querySelector(".sources").addEventListener("click",(n=>t(this,void 0,void 0,(function*(){const e=yield this.controller.getNews(n);e&&this.view.drawNews(e)})))),document.querySelector(".menu").addEventListener("click",(n=>t(this,void 0,void 0,(function*(){const e=n.target;if("category"===e.className||"language"===e.className){document.querySelector(".sources").innerHTML="";const e=yield this.controller.getSources(n);this.view.drawSources(e)}}))))}))}}},853:function(n,e,r){var t=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0});const o=t(r(24));class i extends o.default{constructor(){super("https://rss-news-api.onrender.com/",{apiKey:"38b01665a9ae439a914246b4bbca0f1f"})}}e.default=i},842:function(n,e,r){var t=this&&this.__awaiter||function(n,e,r,t){return new(r||(r=Promise))((function(o,i){function s(n){try{c(t.next(n))}catch(n){i(n)}}function a(n){try{c(t.throw(n))}catch(n){i(n)}}function c(n){var e;n.done?o(n.value):(e=n.value,e instanceof r?e:new r((function(n){n(e)}))).then(s,a)}c((t=t.apply(n,e||[])).next())}))},o=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(r(853));class s extends i.default{getSources(n){const e=Object.create(null,{getResp:{get:()=>super.getResp}});return t(this,void 0,void 0,(function*(){if(!n)return yield e.getResp.call(this,{endpoint:"sources"});const r=n.target;return yield e.getResp.call(this,{endpoint:"sources",value:`${r.className}=${r.id}`})}))}getNews(n){const e=Object.create(null,{getResp:{get:()=>super.getResp}});return t(this,void 0,void 0,(function*(){let r=n.target;const t=n.currentTarget,o={endpoint:"",options:{sources:""}};for(;r!==t;){if(r.classList.contains("source__item")){const n=r.getAttribute("data-source-id");t.getAttribute("data-source")!==n&&null!==n&&(t.setAttribute("data-source",n),o.endpoint="everything",o.options.sources=n);break}r=r.parentNode}if(""!==o.endpoint)try{return yield e.getResp.call(this,o)}catch(n){return}}))}}e.default=s},24:function(n,e){var r=this&&this.__awaiter||function(n,e,r,t){return new(r||(r=Promise))((function(o,i){function s(n){try{c(t.next(n))}catch(n){i(n)}}function a(n){try{c(t.throw(n))}catch(n){i(n)}}function c(n){var e;n.done?o(n.value):(e=n.value,e instanceof r?e:new r((function(n){n(e)}))).then(s,a)}c((t=t.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(n,e){this.baseLink=n,this.options=e}getResp({endpoint:n="",options:e={},value:r=""}){return new Promise((t=>{t(this.load("GET",n,e,r))}))}errorHandler(n){if(!n.ok)throw 401!==n.status&&404!==n.status||console.log(`Sorry, but there is ${n.status} error: ${n.statusText}`),Error(n.statusText);return n}makeUrl(n,e="",r=""){const t=Object.assign(Object.assign({},this.options),n);let o=`${this.baseLink}${e}?`;return Object.keys(t).forEach((n=>{o+=`${n}=${t[n]}&`})),o+=""!==r?`${r}&`:"",o.slice(0,-1)}load(n,e,t={},o=""){return r(this,void 0,void 0,(function*(){try{const r=yield fetch(this.makeUrl(t,e,o),{method:n}),i=this.errorHandler(r);return yield i.json()}catch(n){return console.error(n)}}))}}},527:function(n,e,r){var t=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0}),e.AppView=void 0;const o=t(r(798)),i=t(r(53));class s{constructor(){this.news=new o.default,this.sources=new i.default}drawNews(n){const e=(null==n?void 0:n.articles)?null==n?void 0:n.articles:[];this.news.draw(e)}drawSources(n){const e=(null==n?void 0:n.sources)?null==n?void 0:n.sources:[];this.sources.draw(e)}}e.AppView=s,e.default=s},798:(n,e,r)=>{var t;Object.defineProperty(e,"__esModule",{value:!0}),r(242),function(n){n.NewsItem=".news__item",n.MetaPhoto=".news__meta-photo",n.MetaAuthor=".news__meta-author",n.MetaDate=".news__meta-date",n.DescriptionTitle=".news__description-title",n.DescriptionSource=".news__description-source",n.DescriptionContent=".news__description-content",n.ReadMore=".news__read-more a"}(t||(t={})),e.default=class{draw(n){const e=n.length>=10?n.filter(((n,e)=>e<10)):n,r=document.createDocumentFragment(),o=document.querySelector("#newsItemTemp");e.forEach(((n,e)=>{const i=o.content.cloneNode(!0),s=i.querySelector(t.NewsItem),a=i.querySelector(t.MetaPhoto),c=i.querySelector(t.MetaAuthor),d=i.querySelector(t.MetaDate),l=i.querySelector(t.DescriptionTitle),u=i.querySelector(t.DescriptionSource),f=i.querySelector(t.DescriptionContent),p=i.querySelector(t.ReadMore);e%2&&s.classList.add("alt"),a.style.backgroundImage=`url(${n.urlToImage||"https://ajr.org/wp-content/themes/AJR-theme/images/news-placeholder.jpg"})`,c.textContent=n.author||n.source.name,d.textContent=n.publishedAt.slice(0,10).split("-").reverse().join("-"),l.textContent=n.title,u.textContent=n.source.name,f.innerHTML=n.description,p.setAttribute("href",n.url),r.append(i)}));const i=document.querySelector(".news");i.innerHTML="",i.appendChild(r)}}},53:(n,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),r(595),e.default=class{draw(n){const e=document.createDocumentFragment(),r=document.querySelector("#sourceItemTemp");n.forEach((n=>{const t=r.content.cloneNode(!0),o=t.querySelector(".source__item-name"),i=t.querySelector(".source__item");o.textContent=n.name,i.setAttribute("data-source-id",n.id),e.append(t)})),document.querySelector(".sources").append(e)}}},607:function(n,e,r){var t=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0});const o=t(r(717));r(427),(new o.default).start()}},e={};function r(t){var o=e[t];if(void 0!==o)return o.exports;var i=e[t]={id:t,exports:{}};return n[t].call(i.exports,i,i.exports,r),i.exports}r.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return r.d(e,{a:e}),e},r.d=(n,e)=>{for(var t in e)r.o(e,t)&&!r.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},r.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),r.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.nc=void 0,r(607)})();
