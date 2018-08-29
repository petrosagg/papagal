"use strict";

function r() {
    this.__rules__ = [];
    this.__cache__ = null;
}

r.prototype.__find__ = function(e) {
    for (var t = 0; t < this.__rules__.length; t++) {
        if (this.__rules__[t].name === e) {
            return t;
        }
    }
    return -1;
};

r.prototype.__compile__ = function() {
    var e = this, t = [ "" ];
    e.__rules__.forEach(function(e) {
        if (e.enabled) {
            e.alt.forEach(function(e) {
                if (t.indexOf(e) < 0) {
                    t.push(e)
                };
            })
        };
    });
    e.__cache__ = {};
    t.forEach(function(t) {
        e.__cache__[t] = [];
        e.__rules__.forEach(function(n) {
            if (n.enabled) {
                t && n.alt.indexOf(t) < 0 || e.__cache__[t].push(n.fn)
            };
        });
    });
};

r.prototype.at = function(e, t, n) {
    var r = this.__find__(e), o = n || {};
    if (r === -1) {
        throw new Error("Parser rule not found: " + e);
    }
    this.__rules__[r].fn = t;
    this.__rules__[r].alt = o.alt || [];
    this.__cache__ = null;
};

r.prototype.before = function(e, t, n, r) {
    var o = this.__find__(e), i = r || {};
    if (o === -1) {
        throw new Error("Parser rule not found: " + e);
    }
    this.__rules__.splice(o, 0, {
        name: t,
        enabled: true,
        fn: n,
        alt: i.alt || []
    });
    this.__cache__ = null;
};

r.prototype.after = function(e, t, n, r) {
    var o = this.__find__(e), i = r || {};
    if (o === -1) {
        throw new Error("Parser rule not found: " + e);
    }
    this.__rules__.splice(o + 1, 0, {
        name: t,
        enabled: true,
        fn: n,
        alt: i.alt || []
    });
    this.__cache__ = null;
};

r.prototype.push = function(e, t, n) {
    var r = n || {};
    this.__rules__.push({
        name: e,
        enabled: true,
        fn: t,
        alt: r.alt || []
    });
    this.__cache__ = null;
};

r.prototype.enable = function(e, t) {
    Array.isArray(e) || (e = [ e ]);
    var n = [];
    e.forEach(function(e) {
        var r = this.__find__(e);
        if (r < 0) {
            if (t) {
                return;
            }
            throw new Error("Rules manager: invalid rule name " + e);
        }
        this.__rules__[r].enabled = true;
        n.push(e);
    }, this);
    this.__cache__ = null;
    return n;
};

r.prototype.enableOnly = function(e, t) {
    Array.isArray(e) || (e = [ e ]);
    this.__rules__.forEach(function(e) {
        e.enabled = false;
    });
    this.enable(e, t);
};

r.prototype.disable = function(e, t) {
    Array.isArray(e) || (e = [ e ]);
    var n = [];
    e.forEach(function(e) {
        var r = this.__find__(e);
        if (r < 0) {
            if (t) {
                return;
            }
            throw new Error("Rules manager: invalid rule name " + e);
        }
        this.__rules__[r].enabled = false;
        n.push(e);
    }, this);
    this.__cache__ = null;
    return n;
};

r.prototype.getRules = function(e) {
    if (this.__cache__ === null) {
        this.__compile__()
    };
    return this.__cache__[e] || [];
};

module.exports = r;
