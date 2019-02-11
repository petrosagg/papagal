let link = document.createElement("link");
link.href = chrome.extension.getURL('resources/style.css');
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link);

let s = document.createElement('script');
s.src = chrome.extension.getURL('resources/jquery-79df507d65fd38a3fb7d06c48c670ca3.js');
document.head.appendChild(s);

s = document.createElement('script');
s.src = chrome.extension.getURL('resources/owl-globals-239ae89a2c9995e21675bb37d0a1a3cb.js');
document.head.appendChild(s);

s = document.createElement('script');
s.src = chrome.extension.getURL('resources/bundle.js');
document.head.appendChild(s);
