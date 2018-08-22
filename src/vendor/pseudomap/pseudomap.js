function r(e) {
    if (!(this instanceof r)) {
        throw new TypeError("Constructor PseudoMap requires 'new'");
    }
    this.clear()
    if (e) {
        if (e instanceof r || typeof Map == "function" && e instanceof Map) {
            e.forEach(function(e, t) {
                this.set(t, e);
            }, this);
        } else {
            if (!Array.isArray(e)) {
                throw new TypeError("invalid argument");
            }
            e.forEach(function(e) {
                this.set(e[0], e[1]);
            }, this);
        }
    }
}

function o(e, t) {
    return e === t || e !== e && t !== t;
}

function i(e, t, n) {
    this.key = e;
    this.value = t;
    this._index = n;
}

function s(e, t) {
    for (var n = 0, r = "_" + t, i = r; u.call(e, i); i = r + n++) {
        if (o(e[i].key, t)) {
            return e[i];
        }
    }
}

function a(e, t, n) {
    for (var r = 0, s = "_" + t, a = s; u.call(e, a); a = s + r++) {
        if (o(e[a].key, t)) {
            return void (e[a].value = n);
        }
    }
    e.size++;
    e[a] = new i(t, n, a);
}

var u = Object.prototype.hasOwnProperty;

module.exports = r;

r.prototype.forEach = function(e, t) {
    t = t || this;
    Object.keys(this._data).forEach(function(n) {
        if ("size" !== n) {
            e.call(t, this._data[n].value, this._data[n].key)
        };
    }, this);
};

r.prototype.has = function(e) {
    return !!s(this._data, e);
};

r.prototype.get = function(e) {
    var t = s(this._data, e);
    return t && t.value;
};

r.prototype.set = function(e, t) {
    a(this._data, e, t);
};

r.prototype["delete"] = function(e) {
    var t = s(this._data, e);
    if (t) {
        delete this._data[t._index], this._data.size--
    };
};

r.prototype.clear = function() {
    var e = Object.create(null);
    e.size = 0;
    Object.defineProperty(this, "_data", {
        value: e,
        enumerable: !1,
        configurable: !0,
        writable: !1
    });
};

Object.defineProperty(r.prototype, "size", {
    get: function() {
        return this._data.size;
    },
    set: function(e) {},
    enumerable: !0,
    configurable: !0
});

r.prototype.values = r.prototype.keys = r.prototype.entries = function() {
    throw new Error("iterators are not implemented in this version");
};
