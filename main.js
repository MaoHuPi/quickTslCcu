/*
 * 2022 © MaoHuPi
 * quickTslCcu/main.js
 */


// basic
// src https://tab-studio.github.io/TSJSlib/basic.js
// version 2.0.3

function $(e, f = document){return(f.querySelector(e));}
function $$(e, f = document){return(f.querySelectorAll(e));}
function $e(n){return(document.createElement(n));}
function vw(){return(window.innerWidth/100);}
function vh(){return(window.innerHeight/100);}
function random(min, max){return(Math.floor(Math.random()*(max+1-min))+min);}
const keys = {}, 
$_GET = {}, 
$_COOKIE = {};
if(location.href.indexOf('?') > -1){
    location.href.split('?')[1].split('&').forEach(kv => {
        kv = kv.split('=');
        $_GET[kv[0]] = kv[1];
    });
}
if(document.cookie !== ''){
    document.cookie.split('; ').forEach(kv => {
        kv = kv.split('=');
        $_COOKIE[kv[0]] = kv[1];
    });
}
function getGet(key = false){
    let get = {};
    if(location.href.indexOf('?') > -1){
        location.href.split('?')[1].split('&').forEach(kv => {
            kv = kv.split('=');
            get[kv[0]] = kv[1];
        });
    }
    if(key !== false){
        return(get[key]);
    }
    else{
        return(get);
    }
}
function getCookie(key = false){
    let cookie = {};
    if(document.cookie !== ''){
        document.cookie.split('; ').forEach(kv => {
            kv = kv.split('=');
            cookie[kv[0]] = kv[1];
        });
    }
    if(key !== false){
        return(cookie[key]);
    }
    else{
        return(cookie);
    }
}
function setCookie(key = undefined, value = undefined, expire = undefined, path = undefined, domain = undefined, secure = undefined){
    let cookie = '';
    if(key !== undefined && value !== undefined){
        cookie = `${key}=${value}`;
        if(expire !== undefined){
            cookie += `; expires=${expire}`;
        }
        if(path !== undefined){
            cookie += `; path=${path}`;
        }
        if(domain !== undefined){
            cookie += `; domain=${domain}`;
        }
        if(secure !== undefined){
            cookie += `; secure`;
        }
        document.cookie = cookie;
    }
}
function sendXmlhttp(name = '', value = '', responseFunction = t => {console.log(t);}, type = 'get'){
    let xmlhttp = new XMLHttpRequest();
    let rf = function (){
        if (xmlhttp.readyState==4) {
            responseFunction(xmlhttp.responseText);
        }
    }
    type = type.toLowerCase();
    xmlhttp.addEventListener("readystatechange", rf);
    if(type == 'get'){
        xmlhttp.open("GET", name+value);
        xmlhttp.send();
    }
    else if(type == 'post'){
        xmlhttp.open("POST", name,true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(value);
    }
}
function webLoad(link){
    if(keys['Control']){
        window.open(link);
    }
    else{
        location.href = link;
    }
}
function webOpen(link){
    window.open(link);
}
function radians(deg){
    return(deg * (Math.PI / 180));
}
function deg(radians){
    return(radians / (Math.PI / 180));
}

// start
// let logoUrl = chrome.runtime.getURL('image/logo.ico');
// fetch(logoUrl).then((json) => console.log(json));
// console.log(logoUrl);
// let logoElement = $e('link');
// logoSettings = {
//     rel: 'icon', 
//     type: 'image/x-icon', 
//     href: logoUrl
// };
// for(let key in logoSettings){
//     logoElement.setAttribute(key, logoSettings[key]);
// }
// $('head').appendChild(logoElement);

// variable
const api = 'https://twtsl.ccu.edu.tw/TSL//lib/api.php';
const idMin = 1, idMax = 3118;

// start
let body = document.body;

function callTop(script){
    let scriptElement = $e('script');
    scriptElement.innerHTML = script;
    body.appendChild(scriptElement);
}

let box = $e('div');
box.style.display = 'flex';
box.style.flexDirection = 'column';
box.style.alignItems = 'flex-start';
box.style.margin = '0px';
box.style.padding = '0.5vw';
box.style.position = 'fixed';
box.style.top = '1vw';
box.style.right = '1vw';
box.style.borderRadius = '0.5vw';
box.style.color = 'black';
box.style.backgroundColor = '#0d6efd55';
body.appendChild(box);
let input = $e('input');
input.type = 'number';
input.style.outline = 'none';
input.style.fontWeight = 'bold';
window.addEventListener('keydown', event => {
    if(event.key == '/'){
        event.stopPropagation();
        event.preventDefault();
        input.focus();
    }
});
input.addEventListener('keyup', event => {
    event.stopPropagation();
    let search = false;
    if(event.key == 'Enter'){
        event.preventDefault();
        callTop(`window.querySearch(${input.value});`);
    }
    if(event.key == 'ArrowLeft' || event.key == 'ArrowDown'){
        event.preventDefault();
        if(input.value > idMin){
            input.value--;
        }
        search = true;
    }
    if(event.key == 'ArrowRight' || event.key == 'ArrowUp'){
        event.preventDefault();
        if(input.value < idMax){
            input.value++;
        }
        search = true;
    }
    if(input.value != input.lastValue){
        input.lastValue = input.value;
        search = true;
    }
    if(search){
        fetch(api + `?fname=querySearch&id=${input.value}&lang=zh_tw`)
        .then(json => json.json())
        .then(data => data['Record'][0])
        .then(record => record['name'])
        .then(output => {console.log(output); name.innerText = output; return(output);})
        .catch(error => name.innerText = '-----');
    }
});
box.appendChild(input);
let name = $e('a');
name.style.fontWeight = 'bold';
name.style.color = 'black';
name.style.textShadow = '0.1vw 0.1vw 0px white';
box.appendChild(name);