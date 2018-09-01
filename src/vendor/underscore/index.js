(function() {
    function e(e) {
        function t(t, n, r, o, i, s) {
            for (;i >= 0 && s > i; i += e) {
                var a = o ? o[i] : i;
                r = n(r, t[a], a, t);
            }
            return r;
        }
        return function(n, r, o, i) {
            r = w(r, i, 4);
            var s = !D(n) && _.keys(n), a = (s || n).length, u = e > 0 ? 0 : a - 1;
            if (arguments.length < 3) {
                o = n[s ? s[u] : u], u += e
            };
            return t(n, r, o, s, u, a);
        };
    }
    function r(e) {
        return function(t, n, r) {
            n = k(n, r);
            for (var o = S(t), i = e > 0 ? 0 : o - 1; i >= 0 && o > i; i += e) {
                if (n(t[i], i, t)) {
                    return i;
                }
            }
            return -1;
        };
    }
    function o(e, t, n) {
        return function(r, o, i) {
            var s = 0, a = S(r);
            if (typeof i == "number") {
                if (e > 0) {
                    if (i >= 0) {
                        s = i;
                    } else {
                        s = Math.max(i + a, s);
                    }
                } else {
                    if (i >= 0) {
                        a = Math.min(i + 1, a);
                    } else {
                        a = i + a + 1;
                    }
                }
            } else if (n && i && a) {
                i = n(r, o);
                if (r[i] === o) {
                    return i;
                }
                return -1;
            }
            if (o !== o) {
                i = t(d.call(r, s, a), _.isNaN);
                if (i >= 0) {
                    return i + s;
                }
                return -1;
            }
            for (i = e > 0 ? s : a - 1; i >= 0 && a > i; i += e) {
                if (r[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }
    function i(e, t) {
        var n = O.length, r = e.constructor, o = _.isFunction(r) && r.prototype || l, i = "constructor";
        for (_.has(e, i) && !_.contains(t, i) && t.push(i); n--; ) {
            i = O[n];
            if (i in e && e[i] !== o[i] && !_.contains(t, i)) {
                t.push(i)
            };
        }
    }
    var s = this, a = s._, u = Array.prototype, l = Object.prototype, c = Function.prototype, p = u.push, d = u.slice, h = l.toString, f = l.hasOwnProperty, m = Array.isArray, g = Object.keys, v = c.bind, b = Object.create, y = function() {}, _ = function(e) {
        if (e instanceof _) {
            return e;
        }
        if (this instanceof _) {
            return void (this._wrapped = e);
        }
        return new _(e);
    };
    if (typeof exports != "undefined") {
        if (typeof module != "undefined" && module.exports) {
            exports = module.exports = _
        };
        exports._ = _;
    } else {
        s._ = _;
    }
    _.VERSION = "1.8.3";
    var w = function(e, t, n) {
        if (t === undefined) {
            return e;
        }
        switch (null == n ? 3 : n) {
          case 1:
            return function(n) {
                return e.call(t, n);
            };

          case 2:
            return function(n, r) {
                return e.call(t, n, r);
            };

          case 3:
            return function(n, r, o) {
                return e.call(t, n, r, o);
            };

          case 4:
            return function(n, r, o, i) {
                return e.call(t, n, r, o, i);
            };
        }
        return function() {
            return e.apply(t, arguments);
        };
    }, k = function(e, t, n) {
        if (e == null) {
            return _.identity;
        }
        if (_.isFunction(e)) {
            return w(e, t, n);
        }
        if (_.isObject(e)) {
            return _.matcher(e);
        }
        return _.property(e);
    };
    _.iteratee = function(e, t) {
        return k(e, t, 1 / 0);
    };
    var x = function(e, t) {
        return function(n) {
            var r = arguments.length;
            if (r < 2 || n == null) {
                return n;
            }
            for (var o = 1; r > o; o++) {
                for (var i = arguments[o], s = e(i), a = s.length, u = 0; a > u; u++) {
                    var l = s[u];
                    if (!(t && n[l] !== undefined)) {
                        n[l] = i[l]
                    };
                }
            }
            return n;
        };
    }, C = function(e) {
        if (!_.isObject(e)) {
            return {};
        }
        if (b) {
            return b(e);
        }
        y.prototype = e;
        var t = new y();
        y.prototype = null;
        return t;
    }, E = function(e) {
        return function(t) {
            if (t == null) {
                return undefined;
            }
            return t[e];
        };
    }, T = Math.pow(2, 53) - 1, S = E("length"), D = function(e) {
        var t = S(e);
        return typeof t == "number" && t >= 0 && T >= t;
    };
    _.each = _.forEach = function(e, t, n) {
        t = w(t, n);
        var r, o;
        if (D(e)) {
            for (r = 0, o = e.length; o > r; r++) {
                t(e[r], r, e);
            }
        } else {
            var i = _.keys(e);
            for (r = 0, o = i.length; o > r; r++) {
                t(e[i[r]], i[r], e);
            }
        }
        return e;
    };
    _.map = _.collect = function(e, t, n) {
        t = k(t, n);
        for (var r = !D(e) && _.keys(e), o = (r || e).length, i = Array(o), s = 0; o > s; s++) {
            var a = r ? r[s] : s;
            i[s] = t(e[a], a, e);
        }
        return i;
    };
    _.reduce = _.foldl = _.inject = e(1);
    _.reduceRight = _.foldr = e(-1);
    _.find = _.detect = function(e, t, n) {
        var r;
        if (D(e)) {
            r = _.findIndex(e, t, n);
        } else {
            r = _.findKey(e, t, n);
        }
        if (r !== undefined && r !== -1) {
            return e[r];
        }
        return;
    };
    _.filter = _.select = function(e, t, n) {
        var r = [];
        t = k(t, n);
        _.each(e, function(e, n, o) {
            if (t(e, n, o)) {
                r.push(e)
            };
        });
        return r;
    };
    _.reject = function(e, t, n) {
        return _.filter(e, _.negate(k(t)), n);
    };
    _.every = _.all = function(e, t, n) {
        t = k(t, n);
        for (var r = !D(e) && _.keys(e), o = (r || e).length, i = 0; o > i; i++) {
            var s = r ? r[i] : i;
            if (!t(e[s], s, e)) {
                return false;
            }
        }
        return true;
    };
    _.some = _.any = function(e, t, n) {
        t = k(t, n);
        for (var r = !D(e) && _.keys(e), o = (r || e).length, i = 0; o > i; i++) {
            var s = r ? r[i] : i;
            if (t(e[s], s, e)) {
                return true;
            }
        }
        return false;
    };
    _.contains = _.includes = _.include = function(e, t, n, r) {
        if (!D(e)) {
            e = _.values(e)
        };
        if (typeof n != "number" || r) {
            n = 0
        };
        return _.indexOf(e, t, n) >= 0;
    };
    _.invoke = function(e, t) {
        var n = d.call(arguments, 2), r = _.isFunction(t);
        return _.map(e, function(e) {
            var o = r ? t : e[t];
            if (o == null) {
                return o;
            }
            return o.apply(e, n);
        });
    };
    _.pluck = function(e, t) {
        return _.map(e, _.property(t));
    };
    _.where = function(e, t) {
        return _.filter(e, _.matcher(t));
    };
    _.findWhere = function(e, t) {
        return _.find(e, _.matcher(t));
    };
    _.max = function(e, t, n) {
        var r, o, i = -(1 / 0), s = -(1 / 0);
        if (t == null && e != null) {
            if (D(e)) {
                e = e;
            } else {
                e = _.values(e);
            }
            for (var a = 0, u = e.length; u > a; a++) {
                r = e[a];
                if (r > i) {
                    i = r
                };
            }
        } else {
            t = k(t, n);
            _.each(e, function(e, n, r) {
                o = t(e, n, r);
                if (o > s || o === -(1 / 0) && i === -(1 / 0)) {
                    i = e, s = o
                };
            });
        }
        return i;
    };
    _.min = function(e, t, n) {
        var r, o, i = 1 / 0, s = 1 / 0;
        if (t == null && e != null) {
            if (D(e)) {
                e = e;
            } else {
                e = _.values(e);
            }
            for (var a = 0, u = e.length; u > a; a++) {
                r = e[a];
                if (i > r) {
                    i = r
                };
            }
        } else {
            t = k(t, n);
            _.each(e, function(e, n, r) {
                o = t(e, n, r);
                if (s > o || o === 1 / 0 && i === 1 / 0) {
                    i = e, s = o
                };
            });
        }
        return i;
    };
    _.shuffle = function(e) {
        for (var t, n = D(e) ? e : _.values(e), r = n.length, o = Array(r), i = 0; r > i; i++) {
            t = _.random(0, i);
            if (t !== i) {
                o[i] = o[t]
            };
            o[t] = n[i];
        }
        return o;
    };
    _.sample = function(e, t, n) {
        if (t == null || n) {
            if (!D(e)) {
                e = _.values(e)
            };
            return e[_.random(e.length - 1)];
        }
        return _.shuffle(e).slice(0, Math.max(0, t));
    };
    _.sortBy = function(e, t, n) {
        t = k(t, n);
        return _.pluck(_.map(e, function(e, n, r) {
            return {
                value: e,
                index: n,
                criteria: t(e, n, r)
            };
        }).sort(function(e, t) {
            var n = e.criteria, r = t.criteria;
            if (n !== r) {
                if (n > r || n === undefined) {
                    return 1;
                }
                if (r > n || r === undefined) {
                    return -1;
                }
            }
            return e.index - t.index;
        }), "value");
    };
    var A = function(e) {
        return function(t, n, r) {
            var o = {};
            n = k(n, r);
            _.each(t, function(r, i) {
                var s = n(r, i, t);
                e(o, r, s);
            });
            return o;
        };
    };
    _.groupBy = A(function(e, t, n) {
        if (_.has(e, n)) {
            e[n].push(t);
        } else {
            e[n] = [ t ];
        }
    });
    _.indexBy = A(function(e, t, n) {
        e[n] = t;
    });
    _.countBy = A(function(e, t, n) {
        if (_.has(e, n)) {
            e[n]++;
        } else {
            e[n] = 1;
        }
    });
    _.toArray = function(e) {
        if (e) {
            if (_.isArray(e)) {
                return d.call(e);
            }
            if (D(e)) {
                return _.map(e, _.identity);
            }
            return _.values(e);
        }
        return [];
    };
    _.size = function(e) {
        if (e == null) {
            return 0;
        }
        if (D(e)) {
            return e.length;
        }
        return _.keys(e).length;
    };
    _.partition = function(e, t, n) {
        t = k(t, n);
        var r = [], o = [];
        _.each(e, function(e, n, i) {
            (t(e, n, i) ? r : o).push(e);
        });
        return [ r, o ];
    };
    _.first = _.head = _.take = function(e, t, n) {
        if (e == null) {
            return undefined;
        }
        if (t == null || n) {
            return e[0];
        }
        return _.initial(e, e.length - t);
    };
    _.initial = function(e, t, n) {
        return d.call(e, 0, Math.max(0, e.length - (t == null || n ? 1 : t)));
    };
    _.last = function(e, t, n) {
        if (e == null) {
            return undefined;
        }
        if (t == null || n) {
            return e[e.length - 1];
        }
        return _.rest(e, Math.max(0, e.length - t));
    };
    _.rest = _.tail = _.drop = function(e, t, n) {
        return d.call(e, t == null || n ? 1 : t);
    };
    _.compact = function(e) {
        return _.filter(e, _.identity);
    };
    var M = function(e, t, n, r) {
        for (var o = [], i = 0, s = r || 0, a = S(e); a > s; s++) {
            var u = e[s];
            if (D(u) && (_.isArray(u) || _.isArguments(u))) {
                if (!t) {
                    u = M(u, t, n)
                };
                var l = 0, c = u.length;
                for (o.length += c; c > l; ) {
                    o[i++] = u[l++];
                }
            } else {
                if (!n) {
                    o[i++] = u
                };
            }
        }
        return o;
    };
    _.flatten = function(e, t) {
        return M(e, t, false);
    };
    _.without = function(e) {
        return _.difference(e, d.call(arguments, 1));
    };
    _.uniq = _.unique = function(e, t, n, r) {
        if (!_.isBoolean(t)) {
            r = n, n = t, t = false
        };
        if (n != null) {
            n = k(n, r)
        };
        for (var o = [], i = [], s = 0, a = S(e); a > s; s++) {
            var u = e[s], l = n ? n(u, s, e) : u;
            if (t) {
                if (!(s && i === l)) {
                    o.push(u)
                };
                i = l;
            } else {
                if (n) {
                    if (!_.contains(i, l)) {
                        i.push(l), o.push(u)
                    };
                } else {
                    if (!_.contains(o, u)) {
                        o.push(u)
                    };
                }
            }
        }
        return o;
    };
    _.union = function() {
        return _.uniq(M(arguments, true, true));
    };
    _.intersection = function(e) {
        for (var t = [], n = arguments.length, r = 0, o = S(e); o > r; r++) {
            var i = e[r];
            if (!_.contains(t, i)) {
                for (var s = 1; n > s && _.contains(arguments[s], i); s++) {
                }
                if (s === n) {
                    t.push(i)
                };
            }
        }
        return t;
    };
    _.difference = function(e) {
        var t = M(arguments, true, true, 1);
        return _.filter(e, function(e) {
            return !_.contains(t, e);
        });
    };
    _.zip = function() {
        return _.unzip(arguments);
    };
    _.unzip = function(e) {
        for (var t = e && _.max(e, S).length || 0, n = Array(t), r = 0; t > r; r++) {
            n[r] = _.pluck(e, r);
        }
        return n;
    };
    _.object = function(e, t) {
        for (var n = {}, r = 0, o = S(e); o > r; r++) {
            if (t) {
                n[e[r]] = t[r];
            } else {
                n[e[r][0]] = e[r][1];
            }
        }
        return n;
    };
    _.findIndex = r(1);
    _.findLastIndex = r(-1);
    _.sortedIndex = function(e, t, n, r) {
        n = k(n, r, 1);
        for (var o = n(t), i = 0, s = S(e); s > i; ) {
            var a = Math.floor((i + s) / 2);
            if (n(e[a]) < o) {
                i = a + 1;
            } else {
                s = a;
            }
        }
        return i;
    };
    _.indexOf = o(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = o(-1, _.findLastIndex);
    _.range = function(e, t, n) {
        if (t == null) {
            t = e || 0, e = 0
        };
        n = n || 1;
        for (var r = Math.max(Math.ceil((t - e) / n), 0), o = Array(r), i = 0; r > i; i++, 
        e += n) {
            o[i] = e;
        }
        return o;
    };
    var F = function(e, t, n, r, o) {
        if (!(r instanceof t)) {
            return e.apply(n, o);
        }
        var i = C(e.prototype), s = e.apply(i, o);
        if (_.isObject(s)) {
            return s;
        }
        return i;
    };
    _.bind = function(e, t) {
        if (v && e.bind === v) {
            return v.apply(e, d.call(arguments, 1));
        }
        if (!_.isFunction(e)) {
            throw new TypeError("Bind must be called on a function");
        }
        var n = d.call(arguments, 2), r = function() {
            return F(e, r, t, this, n.concat(d.call(arguments)));
        };
        return r;
    };
    _.partial = function(e) {
        var t = d.call(arguments, 1), n = function() {
            for (var r = 0, o = t.length, i = Array(o), s = 0; o > s; s++) {
                if (t[s] === _) {
                    i[s] = arguments[r++];
                } else {
                    i[s] = t[s];
                }
            }
            for (;r < arguments.length; ) {
                i.push(arguments[r++]);
            }
            return F(e, n, this, this, i);
        };
        return n;
    };
    _.bindAll = function(e) {
        var t, n, r = arguments.length;
        if (r <= 1) {
            throw new Error("bindAll must be passed function names");
        }
        for (t = 1; r > t; t++) {
            n = arguments[t];
            e[n] = _.bind(e[n], e);
        }
        return e;
    };
    _.memoize = function(e, t) {
        var n = function(r) {
            var o = n.cache, i = "" + (t ? t.apply(this, arguments) : r);
            if (!_.has(o, i)) {
                o[i] = e.apply(this, arguments)
            };
            return o[i];
        };
        n.cache = {};
        return n;
    };
    _.delay = function(e, t) {
        var n = d.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null, n);
        }, t);
    };
    _.defer = _.partial(_.delay, _, 1);
    _.throttle = function(e, t, n) {
        var r, o, i, s = null, a = 0;
        if (!n) {
            n = {}
        };
        var u = function() {
            if (n.leading === false) {
                a = 0;
            } else {
                a = _.now();
            }
            s = null;
            i = e.apply(r, o);
            if (!s) {
                r = o = null
            };
        };
        return function() {
            var l = _.now();
            if (!(a || n.leading !== false)) {
                a = l
            };
            var c = t - (l - a);
            r = this;
            o = arguments;
            if (c <= 0 || c > t) {
                if (s) {
                    clearTimeout(s), s = null
                };
                a = l;
                i = e.apply(r, o);
                if (!s) {
                    r = o = null
                };
            } else {
                if (!(s || n.trailing === false)) {
                    s = setTimeout(u, c)
                };
            }
            return i;
        };
    };
    _.debounce = function(e, t, n) {
        var r, o, i, s, a, u = function() {
            var l = _.now() - s;
            if (t > l && l >= 0) {
                r = setTimeout(u, t - l);
            } else {
                r = null;
                if (!n) {
                    a = e.apply(i, o), r || (i = o = null)
                };
            }
        };
        return function() {
            i = this;
            o = arguments;
            s = _.now();
            var l = n && !r;
            if (!r) {
                r = setTimeout(u, t)
            };
            if (l) {
                a = e.apply(i, o), i = o = null
            };
            return a;
        };
    };
    _.wrap = function(e, t) {
        return _.partial(t, e);
    };
    _.negate = function(e) {
        return function() {
            return !e.apply(this, arguments);
        };
    };
    _.compose = function() {
        var e = arguments, t = e.length - 1;
        return function() {
            for (var n = t, r = e[t].apply(this, arguments); n--; ) {
                r = e[n].call(this, r);
            }
            return r;
        };
    };
    _.after = function(e, t) {
        return function() {
            if (--e < 1) {
                return t.apply(this, arguments);
            }
            return;
        };
    };
    _.before = function(e, t) {
        var n;
        return function() {
            if (--e > 0) {
                n = t.apply(this, arguments)
            };
            if (e <= 1) {
                t = null
            };
            return n;
        };
    };
    _.once = _.partial(_.before, 2);
    var N = !{
        toString: null
    }.propertyIsEnumerable("toString"), O = [ "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString" ];
    _.keys = function(e) {
        if (!_.isObject(e)) {
            return [];
        }
        if (g) {
            return g(e);
        }
        var t = [];
        for (var n in e) {
            if (_.has(e, n)) {
                t.push(n)
            };
        }
        if (N) {
            i(e, t)
        };
        return t;
    };
    _.allKeys = function(e) {
        if (!_.isObject(e)) {
            return [];
        }
        var t = [];
        for (var n in e) {
            t.push(n);
        }
        if (N) {
            i(e, t)
        };
        return t;
    };
    _.values = function(e) {
        for (var t = _.keys(e), n = t.length, r = Array(n), o = 0; n > o; o++) {
            r[o] = e[t[o]];
        }
        return r;
    };
    _.mapObject = function(e, t, n) {
        t = k(t, n);
        for (var r, o = _.keys(e), i = o.length, s = {}, a = 0; i > a; a++) {
            r = o[a];
            s[r] = t(e[r], r, e);
        }
        return s;
    };
    _.pairs = function(e) {
        for (var t = _.keys(e), n = t.length, r = Array(n), o = 0; n > o; o++) {
            r[o] = [ t[o], e[t[o]] ];
        }
        return r;
    };
    _.invert = function(e) {
        for (var t = {}, n = _.keys(e), r = 0, o = n.length; o > r; r++) {
            t[e[n[r]]] = n[r];
        }
        return t;
    };
    _.functions = _.methods = function(e) {
        var t = [];
        for (var n in e) {
            if (_.isFunction(e[n])) {
                t.push(n)
            };
        }
        return t.sort();
    };
    _.extend = x(_.allKeys);
    _.extendOwn = _.assign = x(_.keys);
    _.findKey = function(e, t, n) {
        t = k(t, n);
        for (var r, o = _.keys(e), i = 0, s = o.length; s > i; i++) {
            r = o[i];
            if (t(e[r], r, e)) {
                return r;
            }
        }
    };
    _.pick = function(e, t, n) {
        var r, o, i = {}, s = e;
        if (s == null) {
            return i;
        }
        if (_.isFunction(t)) {
            o = _.allKeys(s);
            r = w(t, n);
        } else {
            o = M(arguments, false, false, 1);
            r = function(e, t, n) {
                return t in n;
            };
            s = Object(s);
        }
        for (var a = 0, u = o.length; u > a; a++) {
            var l = o[a], c = s[l];
            if (r(c, l, s)) {
                i[l] = c
            };
        }
        return i;
    };
    _.omit = function(e, t, n) {
        if (_.isFunction(t)) {
            t = _.negate(t);
        } else {
            var r = _.map(M(arguments, false, false, 1), String);
            t = function(e, t) {
                return !_.contains(r, t);
            };
        }
        return _.pick(e, t, n);
    };
    _.defaults = x(_.allKeys, true);
    _.create = function(e, t) {
        var n = C(e);
        if (t) {
            _.extendOwn(n, t)
        };
        return n;
    };
    _.clone = function(e) {
        if (_.isObject(e)) {
            if (_.isArray(e)) {
                return e.slice();
            }
            return _.extend({}, e);
        }
        return e;
    };
    _.tap = function(e, t) {
        t(e);
        return e;
    };
    _.isMatch = function(e, t) {
        var n = _.keys(t), r = n.length;
        if (e == null) {
            return !r;
        }
        for (var o = Object(e), i = 0; r > i; i++) {
            var s = n[i];
            if (t[s] !== o[s] || !(s in o)) {
                return false;
            }
        }
        return true;
    };
    var I = function(e, t, n, r) {
        if (e === t) {
            return e !== 0 || 1 / e === 1 / t;
        }
        if (e == null || t == null) {
            return e === t;
        }
        if (e instanceof _) {
            e = e._wrapped
        };
        if (t instanceof _) {
            t = t._wrapped
        };
        var o = h.call(e);
        if (o !== h.call(t)) {
            return false;
        }
        switch (o) {
          case "[object RegExp]":
          case "[object String]":
            return "" + e == "" + t;

          case "[object Number]":
            if (+e !== +e) {
                return +t !== +t;
            }
            if (+e === 0) {
                return 1 / +e === 1 / t;
            }
            return +e === +t;

          case "[object Date]":
          case "[object Boolean]":
            return +e === +t;
        }
        var i = o === "[object Array]";
        if (!i) {
            if (typeof e != "object" || typeof t != "object") {
                return false;
            }
            var s = e.constructor, a = t.constructor;
            if (s !== a && !(_.isFunction(s) && s instanceof s && _.isFunction(a) && a instanceof a) && "constructor" in e && "constructor" in t) {
                return false;
            }
        }
        n = n || [];
        r = r || [];
        for (var u = n.length; u--; ) {
            if (n[u] === e) {
                return r[u] === t;
            }
        }
        n.push(e);
        r.push(t);
        if (i) {
            u = e.length;
            if (u !== t.length) {
                return false;
            }
            for (;u--; ) {
                if (!I(e[u], t[u], n, r)) {
                    return false;
                }
            }
        } else {
            var l, c = _.keys(e);
            u = c.length;
            if (_.keys(t).length !== u) {
                return false;
            }
            for (;u--; ) {
                l = c[u];
                if (!_.has(t, l) || !I(e[l], t[l], n, r)) {
                    return false;
                }
            }
        }
        n.pop();
        r.pop();
        return true;
    };
    _.isEqual = function(e, t) {
        return I(e, t);
    };
    _.isEmpty = function(e) {
        if (e == null) {
            return true;
        }
        if (D(e) && (_.isArray(e) || _.isString(e) || _.isArguments(e))) {
            return e.length === 0;
        }
        return _.keys(e).length === 0;
    };
    _.isElement = function(e) {
        return !(!e || e.nodeType !== 1);
    };
    _.isArray = m || function(e) {
        return h.call(e) === "[object Array]";
    };
    _.isObject = function(e) {
        var t = typeof e;
        return t === "function" || t === "object" && !!e;
    };
    _.each([ "Arguments", "Function", "String", "Number", "Date", "RegExp", "Error" ], function(e) {
        _["is" + e] = function(t) {
            return h.call(t) === "[object " + e + "]";
        };
    });
    if (!_.isArguments(arguments)) {
        _.isArguments = function(e) {
            return _.has(e, "callee");
        }
    };
    if (typeof /./ != "function" && typeof Int8Array != "object") {
        _.isFunction = function(e) {
            return typeof e == "function" || false;
        }
    };
    _.isFinite = function(e) {
        return isFinite(e) && !isNaN(parseFloat(e));
    };
    _.isNaN = function(e) {
        return _.isNumber(e) && e !== +e;
    };
    _.isBoolean = function(e) {
        return e === true || e === false || h.call(e) === "[object Boolean]";
    };
    _.isNull = function(e) {
        return e === null;
    };
    _.isUndefined = function(e) {
        return e === undefined;
    };
    _.has = function(e, t) {
        return e != null && f.call(e, t);
    };
    _.noConflict = function() {
        s._ = a;
        return this;
    };
    _.identity = function(e) {
        return e;
    };
    _.constant = function(e) {
        return function() {
            return e;
        };
    };
    _.noop = function() {};
    _.property = E;
    _.propertyOf = function(e) {
        if (e == null) {
            return function() {};
        }
        return function(t) {
            return e[t];
        };
    };
    _.matcher = _.matches = function(e) {
        e = _.extendOwn({}, e);
        return function(t) {
            return _.isMatch(t, e);
        };
    };
    _.times = function(e, t, n) {
        var r = Array(Math.max(0, e));
        t = w(t, n, 1);
        for (var o = 0; e > o; o++) {
            r[o] = t(o);
        }
        return r;
    };
    _.random = function(e, t) {
        if (t == null) {
            t = e, e = 0
        };
        return e + Math.floor(Math.random() * (t - e + 1));
    };
    _.now = Date.now || function() {
        return new Date().getTime();
    };
    var P = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, L = _.invert(P), R = function(e) {
        var t = function(t) {
            return e[t];
        }, n = "(?:" + _.keys(e).join("|") + ")", r = RegExp(n), o = RegExp(n, "g");
        return function(e) {
            if (e == null) {
                e = "";
            } else {
                e = "" + e;
            }
            if (r.test(e)) {
                return e.replace(o, t);
            }
            return e;
        };
    };
    _.escape = R(P);
    _.unescape = R(L);
    _.result = function(e, t, n) {
        var r = e == null ? undefined : e[t];
        if (r === undefined) {
            r = n
        };
        if (_.isFunction(r)) {
            return r.call(e);
        }
        return r;
    };
    var B = 0;
    _.uniqueId = function(e) {
        var t = ++B + "";
        if (e) {
            return e + t;
        }
        return t;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var j = /(.)^/, $ = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, U = /\\|'|\r|\n|\u2028|\u2029/g, V = function(e) {
        return "\\" + $[e];
    };
    _.template = function(e, t, n) {
        if (!t && n) {
            t = n
        };
        t = _.defaults({}, t, _.templateSettings);
        var r = RegExp([ (t.escape || j).source, (t.interpolate || j).source, (t.evaluate || j).source ].join("|") + "|$", "g"), o = 0, i = "__p+='";
        e.replace(r, function(t, n, r, s, a) {
            i += e.slice(o, a).replace(U, V);
            o = a + t.length;
            if (n) {
                i += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'";
            } else {
                if (r) {
                    i += "'+\n((__t=(" + r + "))==null?'':__t)+\n'";
                } else {
                    if (s) {
                        i += "';\n" + s + "\n__p+='"
                    };
                }
            }
            return t;
        });
        i += "';\n";
        if (!t.variable) {
            i = "with(obj||{}){\n" + i + "}\n"
        };
        i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var s = new Function(t.variable || "obj", "_", i);
        } catch (a) {
            throw a.source = i, a;
        }
        var u = function(e) {
            return s.call(this, e, _);
        }, l = t.variable || "obj";
        u.source = "function(" + l + "){\n" + i + "}";
        return u;
    };
    _.chain = function(e) {
        var t = _(e);
        t._chain = true;
        return t;
    };
    var H = function(e, t) {
        if (e._chain) {
            return _(t).chain();
        }
        return t;
    };
    _.mixin = function(e) {
        _.each(_.functions(e), function(t) {
            var n = _[t] = e[t];
            _.prototype[t] = function() {
                var e = [ this._wrapped ];
                p.apply(e, arguments);
                return H(this, n.apply(_, e));
            };
        });
    };
    _.mixin(_);
    _.each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(e) {
        var t = u[e];
        _.prototype[e] = function() {
            var n = this._wrapped;
            t.apply(n, arguments);
            if (!(e !== "shift" && e !== "splice" || n.length !== 0)) {
                delete n[0]
            };
            return H(this, n);
        };
    });
    _.each([ "concat", "join", "slice" ], function(e) {
        var t = u[e];
        _.prototype[e] = function() {
            return H(this, t.apply(this._wrapped, arguments));
        };
    });
    _.prototype.value = function() {
        return this._wrapped;
    };
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
    _.prototype.toString = function() {
        return "" + this._wrapped;
    };
    if (typeof define == "function" && define.amd) {
        define("underscore", [], function() {
            return _;
        })
    };
}).call(this);
