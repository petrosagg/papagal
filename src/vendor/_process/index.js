function r() {
    throw new Error("setTimeout has not been defined");
}

function o() {
    throw new Error("clearTimeout has not been defined");
}

function i(e) {
    if (p === setTimeout) {
        return setTimeout(e, 0);
    }
    if ((p === r || !p) && setTimeout) {
        p = setTimeout;
        return setTimeout(e, 0);
    }
    try {
        return p(e, 0);
    } catch (t) {
        try {
            return p.call(null, e, 0);
        } catch (t) {
            return p.call(this, e, 0);
        }
    }
}

function s(e) {
    if (d === clearTimeout) {
        return clearTimeout(e);
    }
    if ((d === o || !d) && clearTimeout) {
        d = clearTimeout;
        return clearTimeout(e);
    }
    try {
        return d(e);
    } catch (t) {
        try {
            return d.call(null, e);
        } catch (t) {
            return d.call(this, e);
        }
    }
}

function a() {
    if (g && f) {
        g = false, f.length ? m = f.concat(m) : v = -1, m.length && u()
    };
}

function u() {
    if (!g) {
        var e = i(a);
        g = true;
        for (var t = m.length; t; ) {
            for (f = m, m = []; ++v < t; ) {
                if (f) {
                    f[v].run()
                };
            }
            v = -1;
            t = m.length;
        }
        f = null;
        g = false;
        s(e);
    }
}

function l(e, t) {
    this.fun = e;
    this.array = t;
}

function c() {}

var p, d, h = module.exports = {};

!function() {
    try {
        if (typeof setTimeout == "function") {
            p = setTimeout;
        } else {
            p = r;
        }
    } catch (e) {
        p = r;
    }
    try {
        if (typeof clearTimeout == "function") {
            d = clearTimeout;
        } else {
            d = o;
        }
    } catch (e) {
        d = o;
    }
}();

var f, m = [], g = false, v = -1;

h.nextTick = function(e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var n = 1; n < arguments.length; n++) {
            t[n - 1] = arguments[n];
        }
    }
    m.push(new l(e, t));
    if (!(m.length !== 1 || g)) {
        i(u)
    };
};

l.prototype.run = function() {
    this.fun.apply(null, this.array);
};

h.title = "browser";

h.browser = true;

h.env = {};

h.argv = [];

h.version = "";

h.versions = {};

h.on = c;

h.addListener = c;

h.once = c;

h.off = c;

h.removeListener = c;

h.removeAllListeners = c;

h.emit = c;

h.prependListener = c;

h.prependOnceListener = c;

h.listeners = function(e) {
    return [];
};

h.binding = function(e) {
    throw new Error("process.binding is not supported");
};

h.cwd = function() {
    return "/";
};

h.chdir = function(e) {
    throw new Error("process.chdir is not supported");
};

h.umask = function() {
    return 0;
};
