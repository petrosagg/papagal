!function(e) {
    function r(e, t) {
        this.list = e;
        this.options = t = t || {};
        var n, o, i, s;
        for (n = 0, s = [ "sort", "includeScore", "shouldSort" ], o = s.length; o > n; n++) {
            i = s[n];
            this.options[i] = i in t ? t[i] : r.defaultOptions[i];
        }
        for (n = 0, s = [ "searchFn", "sortFn", "keys", "getFn" ], o = s.length; o > n; n++) {
            i = s[n];
            this.options[i] = t[i] || r.defaultOptions[i];
        }
    }
    var o = function(e, t) {
        t = t || {};
        this.options = t;
        this.options.location = t.location || o.defaultOptions.location;
        this.options.distance = "distance" in t ? t.distance : o.defaultOptions.distance;
        this.options.threshold = "threshold" in t ? t.threshold : o.defaultOptions.threshold;
        this.options.maxPatternLength = t.maxPatternLength || o.defaultOptions.maxPatternLength;
        this.pattern = t.caseSensitive ? e : e.toLowerCase();
        this.patternLen = e.length;
        if (this.patternLen > this.options.maxPatternLength) {
            throw new Error("Pattern length is too long");
        }
        this.matchmask = 1 << this.patternLen - 1;
        this.patternAlphabet = this._calculatePatternAlphabet();
    };
    o.defaultOptions = {
        location: 0,
        distance: 100,
        threshold: .6,
        maxPatternLength: 32
    };
    o.prototype._calculatePatternAlphabet = function() {
        var e = {}, t = 0;
        for (t = 0; t < this.patternLen; t++) {
            e[this.pattern.charAt(t)] = 0;
        }
        for (t = 0; t < this.patternLen; t++) {
            e[this.pattern.charAt(t)] |= 1 << this.pattern.length - t - 1;
        }
        return e;
    };
    o.prototype._bitapScore = function(e, t) {
        var n = e / this.patternLen, r = Math.abs(this.options.location - t);
        if (this.options.distance) {
            return n + r / this.options.distance;
        }
        if (r) {
            return 1;
        }
        return n;
    };
    o.prototype.search = function(e) {
        e = this.options.caseSensitive ? e : e.toLowerCase();
        if (this.pattern === e) {
            return {
                isMatch: true,
                score: 0
            };
        }
        var t, n, r, o, i, s, a, u, l, c = e.length, p = this.options.location, d = this.options.threshold, h = e.indexOf(this.pattern, p), f = this.patternLen + c, m = 1, g = [];
        for (h != -1 && (d = Math.min(this._bitapScore(0, h), d), h = e.lastIndexOf(this.pattern, p + this.patternLen), 
        h != -1 && (d = Math.min(this._bitapScore(0, h), d))), h = -1, t = 0; t < this.patternLen; t++) {
            for (r = 0, o = f; o > r; ) {
                if (this._bitapScore(t, p + o) <= d) {
                    r = o;
                } else {
                    f = o;
                }
                o = Math.floor((f - r) / 2 + r);
            }
            for (f = o, i = Math.max(1, p - o + 1), s = Math.min(p + o, c) + this.patternLen, 
            a = Array(s + 2), a[s + 1] = (1 << t) - 1, n = s; n >= i; n--) {
                l = this.patternAlphabet[e.charAt(n - 1)];
                if (t === 0) {
                    a[n] = (a[n + 1] << 1 | 1) & l;
                } else {
                    a[n] = (a[n + 1] << 1 | 1) & l | ((u[n + 1] | u[n]) << 1 | 1) | u[n + 1];
                }
                if (a[n] & this.matchmask && (m = this._bitapScore(t, n - 1), d >= m)) {
                    d = m;
                    h = n - 1;
                    g.push(h);
                    if (!(h > p)) {
                        break;
                    }
                    i = Math.max(1, 2 * p - h);
                }
            }
            if (this._bitapScore(t + 1, p) > d) {
                break;
            }
            u = a;
        }
        return {
            isMatch: h >= 0,
            score: m
        };
    };
    var i = function(e, t, n) {
        var r, o, a;
        if (t) {
            a = t.indexOf(".");
            if (-1 !== a) {
                r = t.slice(0, a);
                o = t.slice(a + 1);
            } else {
                r = t;
            }
            var u = e[r];
            if (u) {
                if (o || typeof u != "string" && typeof u != "number") {
                    if (s.isArray(u)) {
                        for (var l = 0, c = u.length; c > l; l++) {
                            i(u[l], o, n);
                        }
                    } else {
                        if (o) {
                            i(u, o, n)
                        };
                    }
                } else {
                    n.push(u);
                }
            }
        } else {
            n.push(e);
        }
        return n;
    }, s = {
        deepValue: function(e, t) {
            return i(e, t, []);
        },
        isArray: function(e) {
            return Object.prototype.toString.call(e) === "[object Array]";
        }
    };
    r.defaultOptions = {
        id: null,
        caseSensitive: false,
        includeScore: false,
        shouldSort: true,
        searchFn: o,
        sortFn: function(e, t) {
            return e.score - t.score;
        },
        getFn: s.deepValue,
        keys: []
    };
    r.prototype.search = function(e) {
        var t, n, r, o, i = new this.options.searchFn(e, this.options), a = this.list, u = a.length, l = this.options, c = this.options.keys, p = c.length, d = [], h = {}, f = [], m = function(e, t, n) {
            if (undefined !== e && null !== e) {
                if (typeof e == "string") {
                    r = i.search(e);
                    if (r.isMatch) {
                        o = h[n], o ? o.score = Math.min(o.score, r.score) : (h[n] = {
                            item: t,
                            score: r.score
                        }, d.push(h[n]))
                    };
                } else if (s.isArray(e)) {
                    for (var a = 0; a < e.length; a++) {
                        m(e[a], t, n);
                    }
                }
            }
        };
        if (typeof a[0] == "string") {
            for (var g = 0; u > g; g++) {
                m(a[g], g, g);
            }
        } else {
            for (var g = 0; u > g; g++) {
                for (n = a[g], t = 0; p > t; t++) {
                    m(l.getFn(n, c[t]), n, g);
                }
            }
        }
        if (l.shouldSort) {
            d.sort(l.sortFn)
        };
        for (var v = l.includeScore ? function(e) {
            return d[e];
        } : function(e) {
            return d[e].item;
        }, b = l.id ? function(e) {
            d[e].item = l.getFn(d[e].item, l.id)[0];
        } : function() {}, g = 0, y = d.length; y > g; g++) {
            b(g);
            f.push(v(g));
        }
        return f;
    };
    if (typeof exports == "object") {
        module.exports = r;
    } else {
        if (typeof define == "function" && define.amd) {
            define(function() {
                return r;
            });
        } else {
            e.Fuse = r;
        }
    }
}(this);
