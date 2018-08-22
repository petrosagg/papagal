function r() {
    return global.colors[c++ % global.colors.length];
}

function o(e) {
    function t() {}
    function o() {
        var e = o, t = +new Date(), i = t - (l || t);
        e.diff = i;
        e.prev = l;
        e.curr = t;
        l = t;
        if (e.useColors == null) {
            e.useColors = global.useColors()
        };
        if (e.color == null && e.useColors) {
            e.color = r()
        };
        var s = Array.prototype.slice.call(arguments);
        s[0] = global.coerce(s[0]);
        if (typeof s[0] != "string") {
            s = [ "%o" ].concat(s)
        };
        var a = 0;
        s[0] = s[0].replace(/%([a-z%])/g, function(t, r) {
            if (t === "%%") {
                return t;
            }
            a++;
            var o = global.formatters[r];
            if (typeof o == "function") {
                var i = s[a];
                t = o.call(e, i);
                s.splice(a, 1);
                a--;
            }
            return t;
        });
        if (typeof global.formatArgs == "function") {
            s = global.formatArgs.apply(e, s)
        };
        var u = o.log || global.log || console.log.bind(console);
        u.apply(e, s);
    }
    t.enabled = !1;
    o.enabled = !0;
    var i = global.enabled(e) ? o : t;
    i.namespace = e;
    return i;
}

function i(e) {
    global.save(e);
    for (var t = (e || "").split(/[\s,]+/), r = t.length, o = 0; r > o; o++) {
        if (t[o]) {
            e = t[o].replace(/\*/g, ".*?"), e[0] === "-" ? global.skips.push(new RegExp("^" + e.substr(1) + "$")) : global.names.push(new RegExp("^" + e + "$"))
        };
    }
}

function s() {
    global.enable("");
}

function a(e) {
    var t, r;
    for (t = 0, r = global.skips.length; r > t; t++) {
        if (global.skips[t].test(e)) {
            return !1;
        }
    }
    for (t = 0, r = global.names.length; r > t; t++) {
        if (global.names[t].test(e)) {
            return !0;
        }
    }
    return !1;
}

function u(e) {
    if (e instanceof Error) {
        return e.stack || e.message;
    }
    return e;
}

global = module.exports = o;

global.coerce = u;

global.disable = s;

global.enable = i;

global.enabled = a;

global.humanize = require("ms");

global.names = [];

global.skips = [];

global.formatters = {};

var l, c = 0;