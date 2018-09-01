function r(e) {
    var t = e.match(c);
    return t && t[1].toLowerCase();
}

function o(e, t) {
    var n = l;
    u(!!l);
    var o = r(e), i = o && a(o);
    if (i) {
        n.innerHTML = i[1] + e + i[2];
        for (var c = i[0]; c--; ) {
            n = n.lastChild;
        }
    } else {
        n.innerHTML = e;
    }
    var p = n.getElementsByTagName("script");
    if (p.length) {
        u(t);
        s(p).forEach(t);
    };
    for (var d = s(n.childNodes); n.lastChild; ) {
        n.removeChild(n.lastChild);
    }
    return d;
}

var i = require("./ExecutionEnvironment"), s = require("./createArrayFromMixed"), a = require("./getMarkupWrap"), u = require("./invariant"), l = i.canUseDOM ? document.createElement("div") : null, c = /^\s*<(\w+)/;

module.exports = o;
