function r(e, t, n, r) {
    function c() {
        if (d) {
            delete i.style, delete i.modElem
        };
    }
    if (u(r, "undefined")) {
        r = false;
    } else {
        r = r;
    }
    if (!u(n, "undefined")) {
        var p = a(e, n);
        if (!u(p, "undefined")) {
            return p;
        }
    }
    for (var d, h, f, m, g, v = [ "modernizr", "tspan" ]; !i.style; ) {
        d = true;
        i.modElem = s(v.shift());
        i.style = i.modElem.style;
    }
    for (f = e.length, h = 0; f > h; h++) {
        m = e[h];
        g = i.style[m];
        if (o(m, "-")) {
            m = l(m)
        };
        if (undefined !== i.style[m]) {
            if (r || u(n, "undefined")) {
                c();
                if (t == "pfx") {
                    return m;
                }
                return true;
            }
            try {
                i.style[m] = n;
            } catch (b) {}
            if (i.style[m] != g) {
                c();
                if (t == "pfx") {
                    return m;
                }
                return true;
            }
        }
    }
    c();
    return false;
}

var o = require("./contains"), i = require("./mStyle"), s = require("./createElement"), a = require("./nativeTestProps"), u = require("./is"), l = require("./cssToDOM");

module.exports = r;
