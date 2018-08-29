function r(e) {
    if (r.enabled(e)) {
        return function(t) {
            t = o(t);
            var n = new Date(), i = n - (r[e] || n);
            r[e] = n;
            t = e + " " + t + " +" + r.humanize(i);
            if (window.console && console.log) {
                Function.prototype.apply.call(console.log, console, arguments)
            };
        };
    }
    return function() {};
}

function o(e) {
    if (e instanceof Error) {
        return e.stack || e.message;
    }
    return e;
}

module.exports = r;

r.names = [];

r.skips = [];

r.enable = function(e) {
    try {
        localStorage.debug = e;
    } catch (t) {}
    for (var n = (e || "").split(/[\s,]+/), o = n.length, i = 0; o > i; i++) {
        e = n[i].replace("*", ".*?");
        if (e[0] === "-") {
            r.skips.push(new RegExp("^" + e.substr(1) + "$"));
        } else {
            r.names.push(new RegExp("^" + e + "$"));
        }
    }
};

r.disable = function() {
    r.enable("");
};

r.humanize = function(e) {
    var t = 1e3, n = 6e4, r = 60 * n;
    if (e >= r) {
        return (e / r).toFixed(1) + "h";
    }
    if (e >= n) {
        return (e / n).toFixed(1) + "m";
    }
    if (e >= t) {
        return (e / t | 0) + "s";
    }
    return e + "ms";
};

r.enabled = function(e) {
    for (var t = 0, n = r.skips.length; n > t; t++) {
        if (r.skips[t].test(e)) {
            return false;
        }
    }
    for (var t = 0, n = r.names.length; n > t; t++) {
        if (r.names[t].test(e)) {
            return true;
        }
    }
    return false;
};

try {
    if (window.localStorage) {
        r.enable(localStorage.debug)
    };
} catch (i) {}
