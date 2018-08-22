function r(e) {
    if (e) {
        return o(e);
    }
    return;
}

function o(e) {
    for (var t in r.prototype) {
        e[t] = r.prototype[t];
    }
    return e;
}

module.exports = r;

r.prototype.on = r.prototype.addEventListener = function(e, t) {
    this._callbacks = this._callbacks || {};
    (this._callbacks[e] = this._callbacks[e] || []).push(t);
    return this;
};

r.prototype.once = function(e, t) {
    function n() {
        r.off(e, n);
        t.apply(this, arguments);
    }
    var r = this;
    this._callbacks = this._callbacks || {};
    n.fn = t;
    this.on(e, n);
    return this;
};

r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
    this._callbacks = this._callbacks || {}
    if (arguments.length == 0) {
        this._callbacks = {};
        return this;
    }
    var n = this._callbacks[e];
    if (!n) {
        return this;
    }
    if (arguments.length == 1) {
        delete this._callbacks[e];
        return this;
    }
    for (var r, o = 0; o < n.length; o++) {
        r = n[o]
        if (r === t || r.fn === t) {
            n.splice(o, 1);
            break;
        }
    }
    return this;
};

r.prototype.emit = function(e) {
    this._callbacks = this._callbacks || {};
    var t = [].slice.call(arguments, 1), n = this._callbacks[e];
    if (n) {
        n = n.slice(0);
        for (var r = 0, o = n.length; o > r; ++r) {
            n[r].apply(this, t);
        }
    }
    return this;
};

r.prototype.listeners = function(e) {
    this._callbacks = this._callbacks || {};
    return this._callbacks[e] || [];
};

r.prototype.hasListeners = function(e) {
    return !!this.listeners(e).length;
};
