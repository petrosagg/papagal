function r(e, t, n, r) {
    function c() {
        if (d) {
            delete i.style, delete i.modElem
        };
    }
    r = u(r, "undefined") ? !1 : r
    if (!u(n, "undefined")) {
        var p = a(e, n);
        if (!u(p, "undefined")) {
            return p;
        }
    }
    for (var d, h, f, m, g, v = [ "modernizr", "tspan" ]; !i.style; ) {
        d = !0;
        i.modElem = s(v.shift());
        i.style = i.modElem.style;
    }
    for (f = e.length, h = 0; f > h; h++) {
        m = e[h]
        g = i.style[m]
        if (o(m, "-")) {
            m = l(m)
        }
        if (void 0 !== i.style[m]) {
            if (r || u(n, "undefined")) {
                c();
                if (t == "pfx") {
                    return m;
                }
                return !0;
            }
            try {
                i.style[m] = n;
            } catch (b) {}
            if (i.style[m] != g) {
                c();
                if (t == "pfx") {
                    return m;
                }
                return !0;
            }
        }
    }
    c();
    return !1;
}

var o = require("./contains"), i = require("./mStyle"), s = require("./createElement"), a = require("./nativeTestProps"), u = require("./is"), l = require("./cssToDOM");

module.exports = r;