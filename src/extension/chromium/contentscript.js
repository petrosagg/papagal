let link = document.createElement("link");
link.href = chrome.extension.getURL('resources/style.css');
link.type = "text/css";
link.rel = "stylesheet";
document.head.appendChild(link);

let s = document.createElement('script');
s.src = chrome.extension.getURL('resources/jquery-79df507d65fd38a3fb7d06c48c670ca3.js');
document.head.appendChild(s);

s = document.createElement('script');
s.src = chrome.extension.getURL('resources/owl-globals-118594c05279534c83906b1b57bbc092.js');
document.head.appendChild(s);

s = document.createElement('script');
s.src = chrome.extension.getURL('resources/bundle.js');
document.head.appendChild(s);
