var r;

(r = function(e) {
    var t, n;
    n = e.prototype;
    t = n.parseFromString;
    try {
        if (new e().parseFromString("", "text/html")) {
            return;
        }
    } catch (r) {}
    return n.parseFromString = function(e, n) {
        var r;
        if (/^\s*text\/html\s*(?:;|$)/i.test(n)) {
            r = document.implementation.createHTMLDocument("");
            if (e.toLowerCase().indexOf("<!doctype") > -1) {
                r.documentElement.innerHTML = e;
            } else {
                r.body.innerHTML = e;
            }
            return r;
        }
        return t.apply(this, arguments);
    };
})(window.DOMParser);
