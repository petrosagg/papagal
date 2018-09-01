function r() {
    return exports.colors[c++ % exports.colors.length];
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
            e.useColors = exports.useColors()
        };
        if (e.color == null && e.useColors) {
            e.color = r()
        };
        var s = Array.prototype.slice.call(arguments);
        s[0] = exports.coerce(s[0]);
        if (typeof s[0] != "string") {
            s = [ "%o" ].concat(s)
        };
        var a = 0;
        s[0] = s[0].replace(/%([a-z%])/g, function(t, r) {
            if (t === "%%") {
                return t;
            }
            a++;
            var o = exports.formatters[r];
            if (typeof o == "function") {
                var i = s[a];
                t = o.call(e, i);
                s.splice(a, 1);
                a--;
            }
            return t;
        });
        if (typeof exports.formatArgs == "function") {
            s = exports.formatArgs.apply(e, s)
        };
        var u = o.log || exports.log || console.log.bind(console);
        u.apply(e, s);
    }
    t.enabled = false;
    o.enabled = true;
    var i = exports.enabled(e) ? o : t;
    i.namespace = e;
    return i;
}

function i(e) {
    exports.save(e);
    for (var t = (e || "").split(/[\s,]+/), r = t.length, o = 0; r > o; o++) {
        if (t[o]) {
            e = t[o].replace(/\*/g, ".*?");
            if (e[0] === "-") {
                exports.skips.push(new RegExp("^" + e.substr(1) + "$"));
            } else {
                exports.names.push(new RegExp("^" + e + "$"));
            }
        };
    }
}

function s() {
    exports.enable("");
}

function a(e) {
    var t, r;
    for (t = 0, r = exports.skips.length; r > t; t++) {
        if (exports.skips[t].test(e)) {
            return false;
        }
    }
    for (t = 0, r = exports.names.length; r > t; t++) {
        if (exports.names[t].test(e)) {
            return true;
        }
    }
    return false;
}

function u(e) {
    if (e instanceof Error) {
        return e.stack || e.message;
    }
    return e;
}

exports = module.exports = o;

exports.coerce = u;

exports.disable = s;

exports.enable = i;

exports.enabled = a;

exports.humanize = require("ms");

exports.names = [];

exports.skips = [];

exports.formatters = {};

var l, c = 0;
