function r() {
    return 1;
}

function o(e) {
    if (this instanceof o) {
        if (typeof e == "number") {
            e = {
                max: e
            }
        };
        if (!e) {
            e = {}
        };
        this._max = e.max;
        if (!this._max || typeof this._max != "number" || this._max <= 0) {
            this._max = 1 / 0
        };
        this._lengthCalculator = e.length || r;
        if (typeof this._lengthCalculator != "function") {
            this._lengthCalculator = r
        };
        this._allowStale = e.stale || false;
        this._maxAge = e.maxAge || null;
        this._dispose = e.dispose;
        return void this.reset();
    }
    return new o(e);
}

function i(e) {
    var t = e.size, n = new Array(t), r = t;
    e.forEach(function(e, t) {
        n[--r] = t;
    });
    return n;
}

function s(e, t, n, r) {
    if (u(e, n)) {
        d(e, n), e._allowStale || (n = undefined)
    };
    if (n) {
        t.call(r, n.value, n.key, e)
    };
}

function a(e, t, n) {
    var r = e._cache.get(t);
    if (r) {
        u(e, r) ? (d(e, r), e._allowStale || (r = undefined)) : n && l(e, r), r && (r = r.value)
    };
    return r;
}

function u(e, t) {
    if (!t || !t.maxAge && !e._maxAge) {
        return false;
    }
    var n = false, r = Date.now() - t.now;
    return n = t.maxAge ? r > t.maxAge : e._maxAge && r > e._maxAge;
}

function l(e, t) {
    p(e, t);
    t.lu = e._mru;
    m(e);
    e._lruList.set(t.lu, t);
}

function c(e) {
    if (e._length > e._max) {
        for (var t = i(e._lruList), n = t.length - 1; e._length > e._max; n--) {
            e._lru = t[n - 1];
            d(e, e._lruList.get(t[n]));
        }
    }
}

function p(e, t) {
    e._lruList["delete"](t.lu);
    if (t.lu === e._lru) {
        e._lru = i(e._lruList).pop()
    };
}

function d(e, t) {
    if (t) {
        e._dispose && e._dispose(t.key, t.value), e._length -= t.length, e._cache["delete"](t.key), 
        p(e, t)
    };
}

function h(e, t, n, r, o, i) {
    this.key = e;
    this.value = t;
    this.lu = n;
    this.length = r;
    this.now = o;
    if (i) {
        this.maxAge = i
    };
}

function f(e) {
    if (e === v) {
        return 0;
    }
    return e + 1;
}

function m(e) {
    do {
        e._mru = f(e._mru);
    } while (e._lruList.has(e._mru));
}

module.exports = o;

var g = require("pseudomap");

Object.defineProperty(o.prototype, "max", {
    set: function(e) {
        if (!e || typeof e != "number" || e <= 0) {
            e = 1 / 0
        };
        this._max = e;
        if (this._length > this._max) {
            c(this)
        };
    },
    get: function() {
        return this._max;
    },
    enumerable: true
});

Object.defineProperty(o.prototype, "lengthCalculator", {
    set: function(e) {
        if (typeof e != "function") {
            this._lengthCalculator = r;
            this._length = this._lruList.size;
            this._cache.forEach(function(e, t) {
                e.length = 1;
            });
        } else {
            this._lengthCalculator = e;
            this._length = 0;
            this._cache.forEach(function(e, t) {
                e.length = this._lengthCalculator(e.value, t);
                this._length += e.length;
            }, this);
        }
        if (this._length > this._max) {
            c(this)
        };
    },
    get: function() {
        return this._lengthCalculator;
    },
    enumerable: true
});

Object.defineProperty(o.prototype, "length", {
    get: function() {
        return this._length;
    },
    enumerable: true
});

Object.defineProperty(o.prototype, "itemCount", {
    get: function() {
        return this._lruList.size;
    },
    enumerable: true
});

o.prototype.rforEach = function(e, t) {
    t = t || this;
    this._lruList.forEach(function(n) {
        s(this, e, n, t);
    }, this);
};

o.prototype.forEach = function(e, t) {
    t = t || this;
    for (var n = i(this._lruList), r = 0; r < n.length; r++) {
        var o = this._lruList.get(n[r]);
        s(this, e, o, t);
    }
};

o.prototype.keys = function() {
    return i(this._lruList).map(function(e) {
        return this._lruList.get(e).key;
    }, this);
};

o.prototype.values = function() {
    return i(this._lruList).map(function(e) {
        return this._lruList.get(e).value;
    }, this);
};

o.prototype.reset = function() {
    if (this._dispose && this._cache) {
        this._cache.forEach(function(e, t) {
            this._dispose(t, e.value);
        }, this)
    };
    this._cache = new g();
    this._lruList = new g();
    this._mru = 0;
    this._lru = 0;
    this._length = 0;
};

o.prototype.dump = function() {
    this._lruList.size;
    return i(this._lruList).map(function(e) {
        var t = this._lruList.get(e);
        if (u(this, t)) {
            return undefined;
        }
        return {
            k: t.key,
            v: t.value,
            e: t.now + (t.maxAge || 0)
        };
    }, this).filter(function(e) {
        return e;
    });
};

o.prototype.dumpLru = function() {
    return this._lruList;
};

o.prototype.set = function(e, t, n) {
    n = n || this._maxAge;
    var r = n ? Date.now() : 0, o = this._lengthCalculator(t, e);
    if (this._cache.has(e)) {
        if (o > this._max) {
            d(this, this._cache.get(e));
            return false;
        }
        var i = this._cache.get(e);
        if (this._dispose) {
            this._dispose(e, i.value)
        };
        i.now = r;
        i.maxAge = n;
        i.value = t;
        this._length += o - i.length;
        i.length = o;
        this.get(e);
        if (this._length > this._max) {
            c(this)
        };
        return true;
    }
    var s = new h(e, t, this._mru, o, r, n);
    m(this);
    if (s.length > this._max) {
        if (this._dispose) {
            this._dispose(e, t)
        };
        return false;
    }
    this._length += s.length;
    this._cache.set(e, s);
    this._lruList.set(s.lu, s);
    if (this._length > this._max) {
        c(this)
    };
    return true;
};

o.prototype.has = function(e) {
    if (!this._cache.has(e)) {
        return false;
    }
    var t = this._cache.get(e);
    if (u(this, t)) {
        return false;
    }
    return true;
};

o.prototype.get = function(e) {
    return a(this, e, true);
};

o.prototype.peek = function(e) {
    return a(this, e, false);
};

o.prototype.pop = function() {
    var e = this._lruList.get(this._lru);
    d(this, e);
    return e || null;
};

o.prototype.del = function(e) {
    d(this, this._cache.get(e));
};

o.prototype.load = function(e) {
    this.reset();
    for (var t = Date.now(), n = e.length - 1; n >= 0; n--) {
        var r = e[n], o = r.e || 0;
        if (o === 0) {
            this.set(r.k, r.v);
        } else {
            var i = o - t;
            if (i > 0) {
                this.set(r.k, r.v, i)
            };
        }
    }
};

var v = Number.MAX_SAFE_INTEGER || 9007199254740991;
