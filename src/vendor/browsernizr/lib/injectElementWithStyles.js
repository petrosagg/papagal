function r(e, t, n, r) {
    var a, u, l, c, p = "modernizr", d = i("div"), h = s();
    if (parseInt(n, 10)) {
        for (;n--; ) {
            l = i("div");
            l.id = r ? r[n] : p + (n + 1);
            d.appendChild(l);
        }
    }
    a = i("style");
    a.type = "text/css";
    a.id = "s" + p;
    (h.fake ? h : d).appendChild(a);
    h.appendChild(d);
    a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e));
    d.id = p;
    if (h.fake) {
        h.style.background = "", h.style.overflow = "hidden", c = o.style.overflow, o.style.overflow = "hidden", 
        o.appendChild(h)
    };
    u = t(d, e);
    h.fake ? (h.parentNode.removeChild(h), o.style.overflow = c, o.offsetHeight) : d.parentNode.removeChild(d);
    return !!u;
}

var o = (require("./ModernizrProto"), require("./docElement")), i = require("./createElement"), s = require("./getBody");

module.exports = r;