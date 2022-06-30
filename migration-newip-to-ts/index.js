(()=>{"use strict";var e,n={363:(e,n,t)=>{t.d(n,{Z:()=>i});var r=t(645),o=t.n(r)()((function(e){return e[1]}));o.push([e.id,".categories{\n    display: flex;\n    flex-wrap: wrap;\n    max-width: 100%;\n}\n.category__item{\n    margin: 5px;\n    cursor: pointer;\n    background-color: #303030;\n    min-width: 20px;\n    min-height: 30px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0px 8px;\n    border-radius: 10px;\n    font-weight: bold;\n    color: #b8b8b8;\n\n}\n.category__item:hover{\n    background-color: #ffffff;\n    color: #303030;\n\n}\n\n@media screen and (max-width: 425px) {\n    .categories{\n        justify-content: center;\n    }\n}",""]);const i=o},669:(e,n,t)=>{t.d(n,{Z:()=>i});var r=t(645),o=t.n(r)()((function(e){return e[1]}));o.push([e.id,".news__item {\n    display: flex;\n    flex-direction: column;\n    margin: 1rem auto;\n    margin-bottom: 1.6%;\n    background: #fff;\n    color: #333;\n    line-height: 1.4;\n    font-family: Arial, sans-serif;\n    border-radius: 20px;\n    overflow: hidden;\n}\n\n.news__item:hover .news__meta-photo {\n    transform: scale(1.3) rotate(3deg);\n}\n\n.news__item .news__meta {\n    position: relative;\n    height: 200px;\n}\n\n.news__item .news__meta-photo {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-size: cover;\n    background-position: center;\n    transition: transform 0.2s;\n}\n\n.news__item .news__meta-details,\n.news__item .news__meta-details ul {\n    margin: auto;\n    padding: 0;\n    list-style: none;\n}\n.news__item_no-image .news__meta{\n    display: none;\n}\n.news__item .news__meta-details {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: -120%;\n    margin: auto;\n    transition: left 0.2s;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    padding: 10px;\n    width: 100%;\n    font-size: 0.9rem;\n}\n\n.news__item .news__description {\n    padding: 1rem;\n    background: #fff;\n    position: relative;\n    z-index: 1;\n}\n\n.news__item .news__description h2 {\n    line-height: 1;\n    margin: 0;\n    font-size: 1.7rem;\n}\n\n.news__item .news__description h3 {\n    font-size: 1rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a2a2a2;\n    margin-top: 5px;\n}\n\n.news__item .news__description .news__read-more {\n    display: flex;\n    justify-content: flex-end;\n}\n.news__item .news__description .news__read-more_alt {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-end;\n}\n.news__read-more_alt span{\n    color: #a2a2a2;\n}\n\n.news__item .news__description .news__read-more a {\n    color: #5ad67d;\n    display: inline-block;\n    position: relative;\n    text-decoration: none;\n    font-weight: 800;\n}\n\n.news__item .news__description .news__read-more a:after {\n    content: '→';\n    margin-left: -10px;\n    opacity: 0;\n    vertical-align: middle;\n    transition: margin 0.3s, opacity 0.3s;\n}\n\n.news__item .news__description .news__read-more a:hover:after {\n    margin-left: 5px;\n    opacity: 1;\n}\n\n.news__item p {\n    margin: 1rem 0 0;\n}\n\n.news__item p:first-of-type {\n    margin-top: 1.25rem;\n    position: relative;\n}\n\n.news__item p:first-of-type:before {\n    content: '';\n    position: absolute;\n    height: 5px;\n    background: #5ad67d;\n    width: 35px;\n    top: -0.75rem;\n    border-radius: 3px;\n}\n\n.news__item:hover .news__meta-details {\n    left: 0%;\n}\n\n@media (min-width: 640px) {\n    .news__item {\n        flex-direction: row;\n        max-width: 700px;\n    }\n.news__item .news__meta {\n        flex-basis: 40%;\n        height: auto;\n    }\n\n    .news__item .news__description {\n        flex-basis: 60%;\n    }\n\n    .news__item .news__description:before {\n        -webkit-transform: skewX(-3deg);\n        transform: skewX(-3deg);\n        content: '';\n        background: #fff;\n        width: 30px;\n        position: absolute;\n        left: -10px;\n        top: 0;\n        bottom: 0;\n        z-index: -1;\n    }\n\n    .news__item.alt {\n        flex-direction: row-reverse;\n    }\n    \n    .news__item_no-image,\n    .news__item_no-image.alt\n    {\n        flex-direction: column;\n    }\n    .news__item.alt .news__description:before {\n        left: inherit;\n        right: -10px;\n        -webkit-transform: skew(3deg);\n        transform: skew(3deg);\n    }\n\n    .news__item.alt .news__meta-details {\n        padding-left: 25px;\n    }\n\n    .news__item_no-image .news__meta{\n        display: none;\n    }\n\n    .news__item .news__description .news__read-more_alt {\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between;\n    }\n    .news__read-more_alt span{\n        color: #a2a2a2;\n    }\n}\n",""]);const i=o},945:(e,n,t)=>{t.d(n,{Z:()=>i});var r=t(645),o=t.n(r)()((function(e){return e[1]}));o.push([e.id,".title-container{\r\n    display: none;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 10px;\r\n}\r\n.source-title{\r\n    font-size: 3em;\r\n}\r\n.favorite-btn{\r\n    width: 25px;\r\n    height: 25px;\r\n    padding: 0px;\r\n    border: none;\r\n    fill: gray;\r\n    background: none;\r\n    cursor: pointer;\r\n}\r\n.favorite-btn_active{\r\n    fill: #5ad67d;\r\n}\r\n\r\n\r\n@media screen and (min-width: 769px) {\r\n    .favorite-btn:hover{\r\n        fill: #a2f5ba;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 768px) {\r\n    .title-container{\r\n        justify-content: flex-start;\r\n    }\r\n    .source-title {\r\n        font-size: 2.5em;\r\n        padding: 0px;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 425px) {\r\n    .title-container{\r\n        justify-content: flex-start;\r\n    }\r\n    .source-title {\r\n        font-size: 2em;\r\n        padding: 0px;\r\n    }\r\n}\r\n",""]);const i=o},501:(e,n,t)=>{t.d(n,{Z:()=>i});var r=t(645),o=t.n(r)()((function(e){return e[1]}));o.push([e.id,".sources {\n    display: flex;\n    flex-wrap: nowrap;\n    width: 100%;\n    height: 120px;\n    overflow: auto;\n    align-items: center;\n    font: 300 1em 'Fira Sans', sans-serif;\n}\n\n.source__item {\n    background: #d3d3d3;\n    color: #303030;\n    line-height: 1;\n    margin: 0.5em;\n    padding: 1em 2em;\n    border-radius: 2em;\n    font-weight: bold;\n    transition: 0.25s; \n    cursor: pointer;\n}\n\n.source__item:hover,\n.source__item:focus {\n    background: #5ad67d;\n    color: white;\n\n    box-shadow: 0 0.5em 1em -0.4em #5ad67d;\n    transform: translateY(-0.25em);\n}\n\n.source__item-name {\n    white-space: nowrap;\n}\n",""]);const i=o},767:(e,n,t)=>{t.d(n,{Z:()=>i});var r=t(645),o=t.n(r)()((function(e){return e[1]}));o.push([e.id,"body {\n    color: #fff;\n    background: #17181c;\n    font-family: sans-serif;\n}\n\nheader {\n    padding: 10px 30px;\n}\n\nheader h1 {\n    font-size: 50px;\n    font-weight: 800;\n}\n\nfooter {\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n    margin-top: 50px;\n}\nfooter .copyright {\n    font-size: 14px;\n    color: #333;\n    text-align: center;\n}\nfooter .copyright a {\n    color: #444;\n}\nfooter .copyright a:hover {\n    color: #555;\n}\nfooter .copyright:before {\n    content: '©';\n}\n.logo-link{\n    display: block;\n    max-width: 200px;\n    width: 80%;\n}\n.author-link{\n    color: #333;\n}\n.author-link a{\n    color: #444;\n}\n.author-link a:hover {\n    color: #555;\n}\n@media screen and (max-width: 768px) {\n    header h1 {\n        text-align: center;\n    }\n    footer{\n        flex-direction: column;\n        justify-content: center;\n        margin-top: 100px;\n    }\n}\n\n@media screen and (max-width: 425px) {\n    header {\n        padding: 5px 30px;\n    }\n    header h1 {\n        margin: 0 0 10px 0;\n        font-size: 30px;\n\n        text-align: center;\n    }\n}\n",""]);const i=o},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=e(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);r&&o[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),n.push(c))}},n}},913:(e,n,t)=>{t.r(n),t.d(n,{default:()=>a});var r=t(379),o=t.n(r),i=t(363);o()(i.Z,{insert:"head",singleton:!1});const a=i.Z.locals||{}},242:(e,n,t)=>{t.r(n),t.d(n,{default:()=>a});var r=t(379),o=t.n(r),i=t(669);o()(i.Z,{insert:"head",singleton:!1});const a=i.Z.locals||{}},102:(e,n,t)=>{t.r(n),t.d(n,{default:()=>a});var r=t(379),o=t.n(r),i=t(945);o()(i.Z,{insert:"head",singleton:!1});const a=i.Z.locals||{}},595:(e,n,t)=>{t.r(n),t.d(n,{default:()=>a});var r=t(379),o=t.n(r),i=t(501);o()(i.Z,{insert:"head",singleton:!1});const a=i.Z.locals||{}},427:(e,n,t)=>{t.r(n),t.d(n,{default:()=>a});var r=t(379),o=t.n(r),i=t(767);o()(i.Z,{insert:"head",singleton:!1});const a=i.Z.locals||{}},379:(e,n,t)=>{var r,o=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),i=[];function a(e){for(var n=-1,t=0;t<i.length;t++)if(i[t].identifier===e){n=t;break}return n}function s(e,n){for(var t={},r=[],o=0;o<e.length;o++){var s=e[o],c=n.base?s[0]+n.base:s[0],u=t[c]||0,l="".concat(c," ").concat(u);t[c]=u+1;var d=a(l),p={css:s[1],media:s[2],sourceMap:s[3]};-1!==d?(i[d].references++,i[d].updater(p)):i.push({identifier:l,updater:m(p,n),references:1}),r.push(l)}return r}function c(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=t.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var u,l=(u=[],function(e,n){return u[e]=n,u.filter(Boolean).join("\n")});function d(e,n,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=l(n,o);else{var i=document.createTextNode(o),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(i,a[n]):e.appendChild(i)}}function p(e,n,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var f=null,h=0;function m(e,n){var t,r,o;if(n.singleton){var i=h++;t=f||(f=c(n)),r=d.bind(null,t,i,!1),o=d.bind(null,t,i,!0)}else t=c(n),r=p.bind(null,t,n),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var t=s(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var o=a(t[r]);i[o].references--}for(var c=s(e,n),u=0;u<t.length;u++){var l=a(t[u]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}t=c}}}},717:(e,n,t)=>{n.__esModule=!0;var r=t(842),o=t(527),i=function(){function e(){this.controller=new r.default,this.view=new o.AppView}return e.prototype.applyEvents=function(){var e=this;document.querySelector(".categories").addEventListener("click",(function(n){return e.controller.switchCategory(n,(function(n){e.view.drawSources(n)}))})),document.querySelector(".sources").addEventListener("click",(function(n){return e.controller.getNews(n,(function(n){e.view.drawNews(n)}))})),document.querySelector("#addToFavoriteBtn").addEventListener("click",(function(){var n=e.controller.toggleCurrentSourceInFavorites();n&&e.view.updateFavoriteSources(n)}))},e.prototype.updateSources=function(e){var n=this.view.drawCategories(e,this.controller.getFavoriteSources());this.view.drawSources(n)},e.prototype.start=function(){var e=this;this.applyEvents(),this.controller.getSources((function(n){e.updateSources(n)}))},e}();n.default=i},853:function(e,n,t){var r,o=this&&this.__extends||(r=function(e,n){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])},r(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=e}r(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)});n.__esModule=!0;var i=function(e){function n(){return e.call(this,"https://nodenews.herokuapp.com/",{apiKey:"a716cebce9c94d59b9158a8208390022"})||this}return o(n,e),n}(t(24).default);n.default=i},842:function(e,n,t){var r,o=this&&this.__extends||(r=function(e,n){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])},r(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=e}r(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)});n.__esModule=!0;var i=t(853),a=t(272),s=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.currentSource=null,n.localStorage=new a.default,n}return o(n,e),n.prototype.switchCategory=function(e,n){var t=e.target;t!==e.currentTarget&&n(t.closest(".category__item").getAttribute("data-category-char"))},n.prototype.toggleCurrentSourceInFavorites=function(){return this.currentSource&&this.localStorage.toggleSourceInFavorites(this.currentSource),this.currentSource},n.prototype.getFavoriteSources=function(){return this.localStorage.read("favoriteSources")||[]},n.prototype.getSources=function(n){e.prototype.getResp.call(this,{endpoint:"sources"},n)},n.prototype.getNews=function(n,t){for(var r=n.target,o=n.currentTarget;r!==o;){if(r.classList.contains("source__item")){var i=r.getAttribute("data-source-id");return void(null!=i&&(null==o?void 0:o.getAttribute("data-source"))!==i&&(null==o||o.setAttribute("data-source",i),this.currentSource=i,e.prototype.getResp.call(this,{endpoint:"everything",options:{sources:i}},t)))}r=r.parentNode}},n}(i.default);n.default=s},24:function(e,n){var t,r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},r.apply(this,arguments)};n.__esModule=!0,function(e){e[e["Bad Request"]=400]="Bad Request",e[e.Unauthorized=401]="Unauthorized",e[e["Payment Required"]=402]="Payment Required",e[e.Forbidden=403]="Forbidden",e[e["Not Found"]=404]="Not Found",e[e["Method Not Allowed"]=405]="Method Not Allowed",e[e["Not Acceptable"]=406]="Not Acceptable",e[e["Proxy Authentication Required"]=407]="Proxy Authentication Required",e[e["Request Timeout"]=408]="Request Timeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e["Length Required"]=411]="Length Required",e[e["Precondition Failed"]=412]="Precondition Failed",e[e["Request Entity Too Large"]=413]="Request Entity Too Large",e[e["Request-URI Too Long"]=414]="Request-URI Too Long",e[e["Unsupported Media Type"]=415]="Unsupported Media Type",e[e["Requested Range Not Satisfiable"]=416]="Requested Range Not Satisfiable",e[e["Expectation Failed"]=417]="Expectation Failed"}(t||(t={}));var o=function(){function e(e,n){this.baseLink=e,this.options=n}return e.prototype.getResp=function(e,n){var t=e.endpoint,r=e.options,o=void 0===r?{}:r;void 0===n&&(n=function(){console.error("No callback for GET response")}),this.load("GET",t,n,o)},e.prototype.errorHandler=function(e){if(!e.ok)throw t[e.status]&&console.log("Sorry, but there is ".concat(e.status," error: ").concat(t[e.status])),Error(e.statusText);return e},e.prototype.makeUrl=function(e,n){var t=r(r({},this.options),e),o="".concat(this.baseLink).concat(n,"?");return Object.keys(t).forEach((function(e){o+="".concat(e,"=").concat(t[e],"&")})),o.slice(0,-1)},e.prototype.load=function(e,n,t,r){void 0===r&&(r={}),fetch(this.makeUrl(r,n),{method:e}).then(this.errorHandler).then((function(e){return e.json()})).then((function(e){var n={sources:e.sources,articles:e.articles,sourceId:r.sources};t(n)})).catch((function(e){return console.error(e)}))},e}();n.default=o},267:(e,n)=>{var t;n.__esModule=!0,n.Chars=void 0,(t=n.Chars||(n.Chars={}))[t.A=1]="A",t[t.B=2]="B",t[t.C=3]="C",t[t.D=4]="D",t[t.E=5]="E",t[t.F=6]="F",t[t.G=7]="G",t[t.H=8]="H",t[t.I=9]="I",t[t.J=10]="J",t[t.K=11]="K",t[t.L=12]="L",t[t.M=13]="M",t[t.N=14]="N",t[t.O=15]="O",t[t.P=16]="P",t[t.Q=17]="Q",t[t.R=18]="R",t[t.S=19]="S",t[t.T=20]="T",t[t.U=21]="U",t[t.V=22]="V",t[t.W=23]="W",t[t.X=24]="X",t[t.Y=25]="Y",t[t.Z=26]="Z"},272:(e,n)=>{n.__esModule=!0;var t=function(){function e(){return e._singleton||(e._singleton=this),e._singleton}return e.prototype.read=function(e){var n=window.localStorage.getItem(e);return n?JSON.parse(n):null},e.prototype.set=function(e,n){window.localStorage.setItem(e,JSON.stringify(n))},e.prototype.toggleSourceInFavorites=function(e){var n=this.read("favoriteSources");if(n){var t=n.indexOf(e);-1===t?n.push(e):n.splice(t,1),this.set("favoriteSources",n)}else this.set("favoriteSources",[e])},e}();n.default=t},527:(e,n,t)=>{n.__esModule=!0,n.AppView=void 0;var r=t(798),o=t(53),i=t(201),a=t(749),s=function(){function e(){this.news=new r.default,this.sources=new o.default,this.categories=new i.default,this.title=new a.default}return e.prototype.drawTitle=function(e){var n=this.categories.getSourceDescription(null==e?void 0:e.sourceId);this.title.draw(n)},e.prototype.drawNews=function(e){this.drawTitle(e);var n=(null==e?void 0:e.articles)?null==e?void 0:e.articles:[];this.news.draw(n)},e.prototype.drawCategories=function(e,n){var t=(null==e?void 0:e.sources)?null==e?void 0:e.sources:[];return this.categories.draw(t,n)},e.prototype.drawSources=function(e){var n;n="string"==typeof e?this.categories.getSourcesByCategory(e):(null==e?void 0:e.sources)?null==e?void 0:e.sources:[],this.sources.draw(n)},e.prototype.updateFavoriteSources=function(e){var n=this.categories.toggleFavoriteSource(e);this.title.updateFavoriteButton(n),"Favorites"===this.categories.getCurrentCategory()&&this.drawSources("Favorites")},e}();n.AppView=s,n.default=s},201:(e,n,t)=>{n.__esModule=!0;var r=t(267);t(913);var o=function(){function e(){this.current="A",this.categories={Favorites:[]},this.all=[]}return e.prototype.isAlphabetChar=function(e){return!!isNaN(+e)&&e in r.Chars},e.prototype.isSourceInFavorite=function(e){return this.categories.Favorites.some((function(n){return n.id===e}))},e.prototype.draw=function(e,n){var t=this;void 0===n&&(n=[]),e.forEach((function(e){t.all.push(e),n.includes(e.id)&&t.categories.Favorites.push(e);var r=e.name[0].toUpperCase(),o=t.isAlphabetChar(r)?r:"Other";t.categories[o]||(t.categories[o]=[]),t.categories[o].push(e)}));var r=document.createDocumentFragment(),o=document.querySelector("#categoryItemTemp"),i=Object.keys(this.categories);return i.forEach((function(e){var n=o.content.cloneNode(!0);n.querySelector(".category__item-name").textContent=e,n.querySelector(".category__item").setAttribute("data-category-char",e),r.append(n)})),this.current=this.categories.Favorites.length>0?"Favorites":i[1],document.querySelector(".categories").append(r),this.current},e.prototype.getSourcesByCategory=function(e){return this.current=e,this.categories[e]},e.prototype.toggleFavoriteSource=function(e){var n=this.categories.Favorites.findIndex((function(n){return n.id===e}));if(n>=0)return this.categories.Favorites.splice(n,1),!1;var t=this.all.find((function(n){return n.id===e}));return t&&this.categories.Favorites.push(t),!0},e.prototype.getCurrentCategory=function(){return this.current},e.prototype.getSourceDescription=function(e){if(!e)return null;var n=this.all.find((function(n){return n.id===e}));return n?{name:n.name,inFavorite:this.isSourceInFavorite(e)}:null},e}();n.default=o},798:(e,n,t)=>{n.__esModule=!0,t(242);var r=function(){function e(){}return e.prototype.draw=function(e){var n=e.length>=10?e.filter((function(e,n){return n<10})):e,t=document.createDocumentFragment(),r=document.querySelector("#newsItemTemp");n.forEach((function(e,n){var o,i,a=r.content.cloneNode(!0);if(n%2&&(null===(o=a.querySelector(".news__item"))||void 0===o||o.classList.add("alt")),e.urlToImage&&(a.querySelector(".news__meta-photo").style.backgroundImage="url(".concat(e.urlToImage||"img/news_placeholder.jpg",")")),a.querySelector(".news__meta-author").textContent=e.author||e.source.name,a.querySelector(".news__meta-date").textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"),a.querySelector(".news__description-title").textContent=e.title,a.querySelector(".news__description-source").textContent=e.source.name,a.querySelector(".news__description-content").textContent=e.description,a.querySelector(".news__read-more a").setAttribute("href",e.url),!e.urlToImage){null===(i=a.querySelector(".news__item"))||void 0===i||i.classList.add("news__item_no-image");var s=a.querySelector(".news__read-more");s.classList.add("news__read-more_alt");var c=document.createElement("span"),u="";e.author&&(u+="".concat(e.author," | ")),u+=e.publishedAt.slice(0,10).split("-").reverse().join("-"),c.innerHTML=u,s.prepend(c)}t.append(a)}));var o=document.querySelector(".news");o.innerHTML="",o.appendChild(t)},e}();n.default=r},749:(e,n,t)=>{n.__esModule=!0,t(102);var r=function(){function e(){}return e.prototype.draw=function(e){var n=document.querySelector(".title-container");e?(this.updateFavoriteButton(e.inFavorite),n.style.display="flex",document.querySelector(".source-title").innerHTML=e.name):n.style.display="none"},e.prototype.updateFavoriteButton=function(e){var n=document.querySelector("#addToFavoriteBtn");e?n.classList.add("favorite-btn_active"):n.classList.remove("favorite-btn_active")},e}();n.default=r},53:(e,n,t)=>{n.__esModule=!0,t(595);var r=function(){function e(){}return e.prototype.draw=function(e){var n=document.createDocumentFragment(),t=document.querySelector("#sourceItemTemp");e.forEach((function(e){var r=t.content.cloneNode(!0);r.querySelector(".source__item-name").textContent=e.name,r.querySelector(".source__item").setAttribute("data-source-id",e.id),n.append(r)}));var r=document.querySelector(".sources");r.innerHTML="",r.append(n)},e}();n.default=r}},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={id:e,exports:{}};return n[e].call(i.exports,i,i.exports,r),i.exports}r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e=r(717),r(427),(new e.default).start()})();