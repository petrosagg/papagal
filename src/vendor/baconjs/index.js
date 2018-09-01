(function(e) {
    (function() {
        var n, r, o, i, s, a, u, l, c, p, d, h, f, m, g, v, b, y, _, w, k, x, C, E, T, S, D, A, M, F, N, O, I, P, L, R, B, j, $, U, V, H, z, q, W, G, Y, K, Z, J, Q, X, ee, te, ne, re, oe, ie, se, ae, ue, le, ce, pe, de, he, fe, me, ge, ve, be, ye, _e, we = {}.hasOwnProperty, ke = function(e, t) {
            function n() {
                this.constructor = e;
            }
            for (var r in t) {
                if (we.call(t, r)) {
                    e[r] = t[r]
                };
            }
            n.prototype = t.prototype;
            e.prototype = new n();
            e.__super__ = t.prototype;
            return e;
        }, xe = [].slice, Ce = function(e, t) {
            return function() {
                return e.apply(t, arguments);
            };
        };
        n = {
            toString: function() {
                return "Bacon";
            }
        };
        n.version = "0.7.73";
        h = (typeof e != "undefined" && e !== null ? e : this).Error;
        se = function() {};
        Q = function(e, t) {
            return t;
        };
        W = function(e, t) {
            return e;
        };
        P = function(e) {
            return e.slice(0);
        };
        S = function(e, t) {
            if (!t) {
                throw new h(e);
            }
        };
        O = function(e) {
            if (e instanceof v && !(e instanceof b)) {
                throw new h("Observable is not a Property : " + e);
            }
        };
        A = function(e) {
            if (!(e instanceof d)) {
                throw new h("not an EventStream : " + e);
            }
        };
        N = function(e) {
            if (!(e instanceof v)) {
                throw new h("not an Observable : " + e);
            }
        };
        M = function(e) {
            return S("not a function : " + e, x.isFunction(e));
        };
        K = function(e) {
            return e instanceof Array;
        };
        J = function(e) {
            return e instanceof v;
        };
        D = function(e) {
            if (!K(e)) {
                throw new h("not an array : " + e);
            }
        };
        F = function(e) {
            return S("no arguments supported", e.length === 0);
        };
        I = function(e) {
            if (typeof e != "string") {
                throw new h("not a string : " + e);
            }
        };
        x = {
            indexOf: Array.prototype.indexOf ? function(e, t) {
                return e.indexOf(t);
            } : function(e, t) {
                var n, r, o, i;
                for (n = r = 0, o = e.length; o > r; n = ++r) {
                    i = e[n];
                    if (t === i) {
                        return n;
                    }
                }
                return -1;
            },
            indexWhere: function(e, t) {
                var n, r, o, i;
                for (n = r = 0, o = e.length; o > r; n = ++r) {
                    i = e[n];
                    if (t(i)) {
                        return n;
                    }
                }
                return -1;
            },
            head: function(e) {
                return e[0];
            },
            always: function(e) {
                return function() {
                    return e;
                };
            },
            negate: function(e) {
                return function(t) {
                    return !e(t);
                };
            },
            empty: function(e) {
                return e.length === 0;
            },
            tail: function(e) {
                return e.slice(1, e.length);
            },
            filter: function(e, t) {
                var n, r, o, i;
                for (n = [], r = 0, o = t.length; o > r; r++) {
                    i = t[r];
                    if (e(i)) {
                        n.push(i)
                    };
                }
                return n;
            },
            map: function(e, t) {
                var n, r, o, i;
                for (o = [], n = 0, r = t.length; r > n; n++) {
                    i = t[n];
                    o.push(e(i));
                }
                return o;
            },
            each: function(e, t) {
                var n, r;
                for (n in e) {
                    if (we.call(e, n)) {
                        r = e[n], t(n, r)
                    };
                }
                return undefined;
            },
            toArray: function(e) {
                if (K(e)) {
                    return e;
                }
                return [ e ];
            },
            contains: function(e, t) {
                return x.indexOf(e, t) !== -1;
            },
            id: function(e) {
                return e;
            },
            last: function(e) {
                return e[e.length - 1];
            },
            all: function(e, t) {
                var n, r, o;
                for (t == null && (t = x.id), n = 0, r = e.length; r > n; n++) {
                    o = e[n];
                    if (!t(o)) {
                        return false;
                    }
                }
                return true;
            },
            any: function(e, t) {
                var n, r, o;
                for (t == null && (t = x.id), n = 0, r = e.length; r > n; n++) {
                    o = e[n];
                    if (t(o)) {
                        return true;
                    }
                }
                return false;
            },
            without: function(e, t) {
                return x.filter(function(t) {
                    return t !== e;
                }, t);
            },
            remove: function(e, t) {
                var n;
                n = x.indexOf(t, e);
                if (n >= 0) {
                    return t.splice(n, 1);
                }
                return;
            },
            fold: function(e, t, n) {
                var r, o, i;
                for (r = 0, o = e.length; o > r; r++) {
                    i = e[r];
                    t = n(t, i);
                }
                return t;
            },
            flatMap: function(e, t) {
                return x.fold(t, [], function(t, n) {
                    return t.concat(e(n));
                });
            },
            cached: function(e) {
                var t;
                t = g;
                return function() {
                    if (t === g) {
                        t = e(), e = undefined
                    };
                    return t;
                };
            },
            isFunction: function(e) {
                return typeof e == "function";
            },
            toString: function(e) {
                var t, n, r, o;
                try {
                    ue++;
                    if (e == null) {
                        return "undefined";
                    }
                    if (x.isFunction(e)) {
                        return "function";
                    }
                    if (K(e)) {
                        if (ue > 5) {
                            return "[..]";
                        }
                        return "[" + x.map(x.toString, e).toString() + "]";
                    }
                    if ((e != null ? e.toString : undefined) != null && e.toString !== Object.prototype.toString) {
                        return e.toString();
                    }
                    if (typeof e == "object") {
                        if (ue > 5) {
                            return "{..}";
                        }
                        n = function() {
                            var n;
                            n = [];
                            for (r in e) {
                                if (we.call(e, r)) {
                                    o = function() {
                                        try {
                                            return e[r];
                                        } catch (n) {
                                            return t = n;
                                        }
                                    }(), n.push(x.toString(r) + ":" + x.toString(o))
                                };
                            }
                            return n;
                        }();
                        return "{" + n + "}";
                    }
                    return e;
                } finally {
                    ue--;
                }
            }
        };
        ue = 0;
        n._ = x;
        k = n.UpdateBarrier = function() {
            var e, t, r, o, i, s, a, u, l, c, p, d, h, f;
            c = undefined;
            p = [];
            d = {};
            t = [];
            r = 0;
            e = function(e) {
                if (c) {
                    return t.push(e);
                }
                return e();
            };
            h = function(e, t) {
                var n;
                if (c) {
                    n = d[e.id];
                    if (n == null) {
                        n = d[e.id] = [ t ];
                        return p.push(e);
                    }
                    return n.push(t);
                }
                return t();
            };
            i = function() {
                for (;p.length > 0; ) {
                    a(0);
                }
                return undefined;
            };
            a = function(e) {
                var t, n, r, o, i, a;
                for (o = p[e], i = o.id, a = d[i], p.splice(e, 1), delete d[i], s(o), n = 0, r = a.length; r > n; n++) {
                    (t = a[n])();
                }
                return undefined;
            };
            s = function(e) {
                var t, n, r, o, i;
                for (n = e.internalDeps(), o = 0, i = n.length; i > o; o++) {
                    t = n[o];
                    s(t);
                    if (d[t.id]) {
                        r = x.indexOf(p, t), a(r)
                    };
                }
                return undefined;
            };
            l = function(e, n, o, s) {
                var a, u;
                if (c) {
                    return o.apply(n, s);
                }
                c = e;
                try {
                    u = o.apply(n, s);
                    i();
                } finally {
                    for (c = void 0; r < t.length; ) a = t[r], r++, a();
                    r = 0, t = [];
                }
                return u;
            };
            o = function() {
                if (c) {
                    return c.id;
                }
                return;
            };
            f = function(t, r) {
                var o, i, s, a;
                a = false;
                i = false;
                o = function() {
                    return i = true;
                };
                s = function() {
                    a = true;
                    return o();
                };
                o = t.dispatcher.subscribe(function(t) {
                    return e(function() {
                        var e;
                        if (a || (e = r(t), e !== n.noMore)) {
                            return undefined;
                        }
                        return s();
                    });
                });
                if (i) {
                    o()
                };
                return s;
            };
            u = function() {
                return p.length > 0;
            };
            return {
                whenDoneWith: h,
                hasWaiters: u,
                inTransaction: l,
                currentEventId: o,
                wrappedSubscribe: f,
                afterTransaction: e
            };
        }();
        w = function() {
            function e(e, t, n) {
                this.obs = e;
                this.sync = t;
                if (n != null) {
                    this.lazy = n;
                } else {
                    this.lazy = false;
                }
                this.queue = [];
            }
            e.prototype.subscribe = function(e) {
                return this.obs.dispatcher.subscribe(e);
            };
            e.prototype.toString = function() {
                return this.obs.toString();
            };
            e.prototype.markEnded = function() {
                return this.ended = true;
            };
            e.prototype.consume = function() {
                if (this.lazy) {
                    return {
                        value: x.always(this.queue[0])
                    };
                }
                return this.queue[0];
            };
            e.prototype.push = function(e) {
                return this.queue = [ e ];
            };
            e.prototype.mayHave = function() {
                return true;
            };
            e.prototype.hasAtLeast = function() {
                return this.queue.length;
            };
            e.prototype.flatten = true;
            return e;
        }();
        s = function(e) {
            function t() {
                return t.__super__.constructor.apply(this, arguments);
            }
            ke(t, e);
            t.prototype.consume = function() {
                return this.queue.shift();
            };
            t.prototype.push = function(e) {
                return this.queue.push(e);
            };
            t.prototype.mayHave = function(e) {
                return !this.ended || this.queue.length >= e;
            };
            t.prototype.hasAtLeast = function(e) {
                return this.queue.length >= e;
            };
            t.prototype.flatten = false;
            return t;
        }(w);
        r = function(e) {
            function t(e) {
                t.__super__.constructor.call(this, e, true);
            }
            ke(t, e);
            t.prototype.consume = function() {
                var e;
                e = this.queue;
                this.queue = [];
                return {
                    value: function() {
                        return e;
                    }
                };
            };
            t.prototype.push = function(e) {
                return this.queue.push(e.value());
            };
            t.prototype.hasAtLeast = function() {
                return true;
            };
            return t;
        }(w);
        w.isTrigger = function(e) {
            if (e instanceof w) {
                return e.sync;
            }
            return e instanceof d;
        };
        w.fromObservable = function(e) {
            if (e instanceof w) {
                return e;
            }
            if (e instanceof b) {
                return new w(e, false);
            }
            return new s(e, true);
        };
        a = function() {
            function e(e, t, n) {
                this.context = e;
                this.method = t;
                this.args = n;
            }
            e.prototype.deps = function() {
                return this.cached || (this.cached = H([ this.context ].concat(this.args)));
            };
            e.prototype.toString = function() {
                return x.toString(this.context) + "." + x.toString(this.method) + "(" + x.map(x.toString, this.args) + ")";
            };
            return e;
        }();
        j = function() {
            var e, t, n;
            t = arguments[0];
            n = arguments[1];
            if (arguments.length >= 3) {
                e = xe.call(arguments, 2);
            } else {
                e = [];
            }
            if ((t || n) instanceof a) {
                return t || n;
            }
            return new a(t, n, e);
        };
        ye = function(e, t) {
            t.desc = e;
            return t;
        };
        H = function(e) {
            if (K(e)) {
                return x.flatMap(H, e);
            }
            if (J(e)) {
                return [ e ];
            }
            if (e instanceof w) {
                return [ e.obs ];
            }
            return [];
        };
        n.Desc = a;
        n.Desc.empty = new n.Desc("", "", []);
        _e = function(e) {
            return function() {
                var t, n, r, o;
                r = arguments[0];
                if (arguments.length >= 2) {
                    t = xe.call(arguments, 1);
                } else {
                    t = [];
                }
                if (typeof r == "object" && t.length) {
                    n = r, o = t[0], r = function() {
                        return n[o].apply(n, arguments);
                    }, t = t.slice(1)
                };
                return e.apply(null, [ r ].concat(xe.call(t)));
            };
        };
        te = function(e) {
            e = Array.prototype.slice.call(e);
            return ne.apply(null, e);
        };
        ae = function(e, t) {
            return function() {
                var n;
                if (arguments.length >= 1) {
                    n = xe.call(arguments, 0);
                } else {
                    n = [];
                }
                return e.apply(null, t.concat(n));
            };
        };
        ve = function(e) {
            return function(t) {
                return function(n) {
                    var r;
                    if (n == null) {
                        return undefined;
                    }
                    r = n[t];
                    if (x.isFunction(r)) {
                        return r.apply(n, e);
                    }
                    return r;
                };
            };
        };
        fe = function(e, t) {
            var n, r;
            r = e.slice(1).split(".");
            n = x.map(ve(t), r);
            return function(t) {
                var r, o;
                for (r = 0, o = n.length; o > r; r++) {
                    e = n[r];
                    t = e(t);
                }
                return t;
            };
        };
        Z = function(e) {
            return typeof e == "string" && e.length > 1 && e.charAt(0) === ".";
        };
        ne = _e(function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            if (x.isFunction(t)) {
                if (e.length) {
                    return ae(t, e);
                }
                return t;
            }
            if (Z(t)) {
                return fe(t, e);
            }
            return x.always(t);
        });
        ee = function(e, t) {
            return ne.apply(null, [ e ].concat(xe.call(t)));
        };
        B = function(e, t, n, r) {
            var o;
            if (t instanceof b) {
                o = t.sampledBy(e, function(e, t) {
                    return [ e, t ];
                });
                return r.call(o, function(e) {
                    var t, n;
                    t = e[0];
                    n = e[1];
                    return t;
                }).map(function(e) {
                    var t, n;
                    t = e[0];
                    return n = e[1];
                });
            }
            t = ee(t, n);
            return r.call(e, t);
        };
        de = function(e) {
            var t;
            if (x.isFunction(e)) {
                return e;
            }
            if (Z(e)) {
                t = me(e);
                return function(e, n) {
                    return e[t](n);
                };
            }
            throw new h("not a function or a field key: " + e);
        };
        me = function(e) {
            return e.slice(1);
        };
        _ = function() {
            function e(e) {
                this.value = e;
            }
            e.prototype.getOrElse = function() {
                return this.value;
            };
            e.prototype.get = function() {
                return this.value;
            };
            e.prototype.filter = function(t) {
                if (t(this.value)) {
                    return new e(this.value);
                }
                return g;
            };
            e.prototype.map = function(t) {
                return new e(t(this.value));
            };
            e.prototype.forEach = function(e) {
                return e(this.value);
            };
            e.prototype.isDefined = true;
            e.prototype.toArray = function() {
                return [ this.value ];
            };
            e.prototype.inspect = function() {
                return "Some(" + this.value + ")";
            };
            e.prototype.toString = function() {
                return this.inspect();
            };
            return e;
        }();
        g = {
            getOrElse: function(e) {
                return e;
            },
            filter: function() {
                return g;
            },
            map: function() {
                return g;
            },
            forEach: function() {},
            isDefined: false,
            toArray: function() {
                return [];
            },
            inspect: function() {
                return "None";
            },
            toString: function() {
                return this.inspect();
            }
        };
        ge = function(e) {
            if (e instanceof _ || e === g) {
                return e;
            }
            return new _(e);
        };
        n.noMore = [ "<no-more>" ];
        n.more = [ "<more>" ];
        U = 0;
        p = function() {
            function e() {
                this.id = ++U;
            }
            e.prototype.isEvent = function() {
                return true;
            };
            e.prototype.isEnd = function() {
                return false;
            };
            e.prototype.isInitial = function() {
                return false;
            };
            e.prototype.isNext = function() {
                return false;
            };
            e.prototype.isError = function() {
                return false;
            };
            e.prototype.hasValue = function() {
                return false;
            };
            e.prototype.filter = function() {
                return true;
            };
            e.prototype.inspect = function() {
                return this.toString();
            };
            e.prototype.log = function() {
                return this.toString();
            };
            return e;
        }();
        m = function(e) {
            function t(e, n) {
                if (this instanceof t) {
                    t.__super__.constructor.call(this);
                    return void (!n && x.isFunction(e) || e instanceof t ? (this.valueF = e, this.valueInternal = undefined) : (this.valueF = undefined, 
                    this.valueInternal = e));
                }
                return new t(e, n);
            }
            ke(t, e);
            t.prototype.isNext = function() {
                return true;
            };
            t.prototype.hasValue = function() {
                return true;
            };
            t.prototype.value = function() {
                if (this.valueF instanceof t) {
                    this.valueInternal = this.valueF.value();
                    this.valueF = undefined;
                } else {
                    if (this.valueF) {
                        this.valueInternal = this.valueF(), this.valueF = undefined
                    };
                }
                return this.valueInternal;
            };
            t.prototype.fmap = function(e) {
                var t, n;
                if (this.valueInternal) {
                    n = this.valueInternal;
                    return this.apply(function() {
                        return e(n);
                    });
                }
                t = this;
                return this.apply(function() {
                    return e(t.value());
                });
            };
            t.prototype.apply = function(e) {
                return new t(e);
            };
            t.prototype.filter = function(e) {
                return e(this.value());
            };
            t.prototype.toString = function() {
                return x.toString(this.value());
            };
            t.prototype.log = function() {
                return this.value();
            };
            return t;
        }(p);
        f = function(e) {
            function t(e, n) {
                if (this instanceof t) {
                    return void t.__super__.constructor.call(this, e, n);
                }
                return new t(e, n);
            }
            ke(t, e);
            t.prototype.isInitial = function() {
                return true;
            };
            t.prototype.isNext = function() {
                return false;
            };
            t.prototype.apply = function(e) {
                return new t(e);
            };
            t.prototype.toNext = function() {
                return new m(this);
            };
            return t;
        }(m);
        l = function(e) {
            function t() {
                if (this instanceof t) {
                    return undefined;
                }
                return new t();
            }
            ke(t, e);
            t.prototype.isEnd = function() {
                return true;
            };
            t.prototype.fmap = function() {
                return this;
            };
            t.prototype.apply = function() {
                return this;
            };
            t.prototype.toString = function() {
                return "<end>";
            };
            return t;
        }(p);
        c = function(e) {
            function t(e) {
                if (this instanceof t) {
                    return void (this.error = e);
                }
                return new t(e);
            }
            ke(t, e);
            t.prototype.isError = function() {
                return true;
            };
            t.prototype.fmap = function() {
                return this;
            };
            t.prototype.apply = function() {
                return this;
            };
            t.prototype.toString = function() {
                return "<error> " + x.toString(this.error);
            };
            return t;
        }(p);
        n.Event = p;
        n.Initial = f;
        n.Next = m;
        n.End = l;
        n.Error = c;
        Y = function(e) {
            return new f(e, true);
        };
        ie = function(e) {
            return new m(e, true);
        };
        $ = function() {
            return new l();
        };
        he = function(e) {
            if (e instanceof p) {
                return e;
            }
            return ie(e);
        };
        G = 0;
        ce = function() {};
        v = function() {
            function e(e) {
                this.desc = e;
                this.id = ++G;
                this.initialDesc = this.desc;
            }
            e.prototype.subscribe = function(e) {
                return k.wrappedSubscribe(this, e);
            };
            e.prototype.subscribeInternal = function(e) {
                return this.dispatcher.subscribe(e);
            };
            e.prototype.onValue = function() {
                var e;
                e = te(arguments);
                return this.subscribe(function(t) {
                    if (t.hasValue()) {
                        return e(t.value());
                    }
                    return;
                });
            };
            e.prototype.onValues = function(e) {
                return this.onValue(function(t) {
                    return e.apply(null, t);
                });
            };
            e.prototype.onError = function() {
                var e;
                e = te(arguments);
                return this.subscribe(function(t) {
                    if (t.isError()) {
                        return e(t.error);
                    }
                    return;
                });
            };
            e.prototype.onEnd = function() {
                var e;
                e = te(arguments);
                return this.subscribe(function(t) {
                    if (t.isEnd()) {
                        return e();
                    }
                    return;
                });
            };
            e.prototype.name = function(e) {
                this._name = e;
                return this;
            };
            e.prototype.withDescription = function() {
                this.desc = j.apply(null, arguments);
                return this;
            };
            e.prototype.toString = function() {
                if (this._name) {
                    return this._name;
                }
                return this.desc.toString();
            };
            e.prototype.internalDeps = function() {
                return this.initialDesc.deps();
            };
            return e;
        }();
        v.prototype.assign = v.prototype.onValue;
        v.prototype.forEach = v.prototype.onValue;
        v.prototype.inspect = v.prototype.toString;
        n.Observable = v;
        i = function() {
            function e(e) {
                var t, n, r;
                for (e == null && (e = []), this.unsubscribe = Ce(this.unsubscribe, this), this.unsubscribed = false, 
                this.subscriptions = [], this.starting = [], t = 0, n = e.length; n > t; t++) {
                    r = e[t];
                    this.add(r);
                }
            }
            e.prototype.add = function(e) {
                var t, n, r;
                if (!this.unsubscribed) {
                    t = false;
                    n = se;
                    this.starting.push(e);
                    r = function(r) {
                        return function() {
                            if (r.unsubscribed) {
                                return undefined;
                            }
                            t = true;
                            r.remove(n);
                            return x.remove(e, r.starting);
                        };
                    }(this);
                    n = e(this.unsubscribe, r);
                    if (this.unsubscribed || t) {
                        n();
                    } else {
                        this.subscriptions.push(n);
                    }
                    x.remove(e, this.starting);
                    return n;
                }
            };
            e.prototype.remove = function(e) {
                if (this.unsubscribed) {
                    return undefined;
                }
                if (x.remove(e, this.subscriptions) !== undefined) {
                    return e();
                }
                return;
            };
            e.prototype.unsubscribe = function() {
                var e, t, n, r;
                if (!this.unsubscribed) {
                    for (this.unsubscribed = true, n = this.subscriptions, e = 0, t = n.length; t > e; e++) {
                        (r = n[e])();
                    }
                    this.subscriptions = [];
                    return this.starting = [];
                }
            };
            e.prototype.count = function() {
                if (this.unsubscribed) {
                    return 0;
                }
                return this.subscriptions.length + this.starting.length;
            };
            e.prototype.empty = function() {
                return this.count() === 0;
            };
            return e;
        }();
        n.CompositeUnsubscribe = i;
        u = function() {
            function e(e, t) {
                this._subscribe = e;
                this._handleEvent = t;
                this.subscribe = Ce(this.subscribe, this);
                this.handleEvent = Ce(this.handleEvent, this);
                this.subscriptions = [];
                this.queue = [];
            }
            e.prototype.pushing = false;
            e.prototype.ended = false;
            e.prototype.prevError = undefined;
            e.prototype.unsubSrc = undefined;
            e.prototype.hasSubscribers = function() {
                return this.subscriptions.length > 0;
            };
            e.prototype.removeSub = function(e) {
                return this.subscriptions = x.without(e, this.subscriptions);
            };
            e.prototype.push = function(e) {
                if (e.isEnd()) {
                    this.ended = true
                };
                return k.inTransaction(e, this, this.pushIt, [ e ]);
            };
            e.prototype.pushToSubscriptions = function(e) {
                var t, r, o, i, s, a;
                try {
                    for (a = this.subscriptions, r = 0, o = a.length; o > r; r++) {
                        s = a[r];
                        i = s.sink(e);
                        if (i === n.noMore || e.isEnd()) {
                            this.removeSub(s)
                        };
                    }
                    return true;
                } catch (u) {
                    throw t = u, this.pushing = !1, this.queue = [], t;
                }
            };
            e.prototype.pushIt = function(e) {
                if (this.pushing) {
                    this.queue.push(e);
                    return n.more;
                }
                if (e !== this.prevError) {
                    for (e.isError() && (this.prevError = e), this.pushing = true, this.pushToSubscriptions(e), 
                    this.pushing = false; this.queue.length; ) {
                        e = this.queue.shift();
                        this.push(e);
                    }
                    if (this.hasSubscribers()) {
                        return n.more;
                    }
                    this.unsubscribeFromSource();
                    return n.noMore;
                }
            };
            e.prototype.handleEvent = function(e) {
                if (this._handleEvent) {
                    return this._handleEvent(e);
                }
                return this.push(e);
            };
            e.prototype.unsubscribeFromSource = function() {
                if (this.unsubSrc) {
                    this.unsubSrc()
                };
                return this.unsubSrc = undefined;
            };
            e.prototype.subscribe = function(e) {
                var t;
                if (this.ended) {
                    e($());
                    return se;
                }
                M(e);
                t = {
                    sink: e
                };
                this.subscriptions.push(t);
                if (this.subscriptions.length === 1) {
                    this.unsubSrc = this._subscribe(this.handleEvent), M(this.unsubSrc)
                };
                return function(e) {
                    return function() {
                        e.removeSub(t);
                        if (e.hasSubscribers()) {
                            return undefined;
                        }
                        return e.unsubscribeFromSource();
                    };
                }(this);
            };
            return e;
        }();
        n.Dispatcher = u;
        d = function(e) {
            function t(e, n, r) {
                if (this instanceof t) {
                    if (x.isFunction(e)) {
                        r = n, n = e, e = a.empty
                    };
                    t.__super__.constructor.call(this, e);
                    M(n);
                    this.dispatcher = new u(n, r);
                    return void ce(this);
                }
                return new t(e, n, r);
            }
            ke(t, e);
            t.prototype.toProperty = function(e) {
                var t, r;
                if (arguments.length === 0) {
                    r = g;
                } else {
                    r = ge(function() {
                        return e;
                    });
                }
                t = this.dispatcher;
                return new b(new n.Desc(this, "toProperty", [ e ]), function(e) {
                    var o, i, s, a;
                    o = false;
                    a = se;
                    i = n.more;
                    s = function() {
                        if (o) {
                            return undefined;
                        }
                        return r.forEach(function(t) {
                            o = true;
                            i = e(new f(t));
                            if (i === n.noMore) {
                                a();
                                return a = se;
                            }
                            return;
                        });
                    };
                    a = t.subscribe(function(t) {
                        if (t.hasValue()) {
                            if (o && t.isInitial()) {
                                return n.more;
                            }
                            if (!t.isInitial()) {
                                s()
                            };
                            o = true;
                            r = new _(t);
                            return e(t);
                        }
                        if (t.isEnd()) {
                            i = s()
                        };
                        if (i !== n.noMore) {
                            return e(t);
                        }
                        return;
                    });
                    s();
                    return a;
                });
            };
            t.prototype.toEventStream = function() {
                return this;
            };
            t.prototype.withHandler = function(e) {
                return new t(new n.Desc(this, "withHandler", [ e ]), this.dispatcher.subscribe, e);
            };
            return t;
        }(v);
        n.EventStream = d;
        n.never = function() {
            return new d(j(n, "never"), function(e) {
                e($());
                return se;
            });
        };
        n.when = function() {
            var e, t, r, o, i, s, a, u, l, c, p, h, f, m, g, v, b, y, _, C;
            if (arguments.length === 0) {
                return n.never();
            }
            for (a = arguments.length, C = "when: expecting arguments in the form (Observable+,function)+", 
            S(C, a % 2 === 0), y = [], f = [], t = 0, m = []; a > t; ) {
                for (m[t] = arguments[t], m[t + 1] = arguments[t + 1], h = x.toArray(arguments[t]), 
                e = L(arguments[t + 1]), p = {
                    f: e,
                    ixs: []
                }, _ = false, i = 0, u = h.length; u > i; i++) {
                    for (b = h[i], r = x.indexOf(y, b), _ || (_ = w.isTrigger(b)), r < 0 && (y.push(b), 
                    r = y.length - 1), g = p.ixs, s = 0, l = g.length; l > s; s++) {
                        o = g[s];
                        if (o.index === r) {
                            o.count++
                        };
                    }
                    p.ixs.push({
                        index: r,
                        count: 1
                    });
                }
                S("At least one EventStream required", _ || !h.length);
                if (h.length > 0) {
                    f.push(p)
                };
                t += 2;
            }
            if (y.length) {
                y = x.map(w.fromObservable, y);
                c = x.any(y, function(e) {
                    return e.flatten;
                }) && R(x.map(function(e) {
                    return e.obs;
                }, y));
                return v = new d(new n.Desc(n, "when", m), function(e) {
                    var r, o, i, s, a, u, l;
                    l = [];
                    i = false;
                    s = function(e) {
                        var n, r, o;
                        for (o = e.ixs, n = 0, r = o.length; r > n; n++) {
                            t = o[n];
                            if (!y[t.index].hasAtLeast(t.count)) {
                                return false;
                            }
                        }
                        return true;
                    };
                    o = function(e) {
                        return !e.sync || e.ended;
                    };
                    r = function(e) {
                        var n, r, o;
                        for (o = e.ixs, n = 0, r = o.length; r > n; n++) {
                            t = o[n];
                            if (!y[t.index].mayHave(t.count)) {
                                return true;
                            }
                        }
                    };
                    a = function(e) {
                        return !e.source.flatten;
                    };
                    u = function(u) {
                        return function(p) {
                            var d, h, m;
                            h = function() {
                                return k.whenDoneWith(v, d);
                            };
                            m = function() {
                                var r, o, i, u, c, p;
                                if (!(l.length > 0)) {
                                    return n.more;
                                }
                                for (c = n.more, p = l.pop(), o = 0, i = f.length; i > o; o++) {
                                    u = f[o];
                                    if (s(u)) {
                                        r = function() {
                                            var e, n, r, o;
                                            for (r = u.ixs, o = [], n = 0, e = r.length; e > n; n++) {
                                                t = r[n];
                                                o.push(y[t.index].consume());
                                            }
                                            return o;
                                        }();
                                        c = e(p.e.apply(function() {
                                            var e, t;
                                            t = function() {
                                                var t, n, o;
                                                for (o = [], n = 0, t = r.length; t > n; n++) {
                                                    e = r[n];
                                                    o.push(e.value());
                                                }
                                                return o;
                                            }();
                                            return u.f.apply(u, t);
                                        }));
                                        if (l.length) {
                                            l = x.filter(a, l)
                                        };
                                        if (c === n.noMore) {
                                            return c;
                                        }
                                        return m();
                                    }
                                }
                            };
                            d = function() {
                                var t;
                                t = m();
                                if (i && (x.all(y, o) || x.all(f, r))) {
                                    t = n.noMore, e($())
                                };
                                if (t === n.noMore) {
                                    p()
                                };
                                return t;
                            };
                            return u.subscribe(function(t) {
                                var r;
                                if (t.isEnd()) {
                                    i = true;
                                    u.markEnded();
                                    h();
                                } else {
                                    if (t.isError()) {
                                        r = e(t);
                                    } else {
                                        u.push(t);
                                        if (u.sync) {
                                            l.push({
                                                source: u,
                                                e: t
                                            }), c || k.hasWaiters() ? h() : d()
                                        };
                                    }
                                }
                                if (r === n.noMore) {
                                    p()
                                };
                                return r || n.more;
                            });
                        };
                    };
                    return new n.CompositeUnsubscribe(function() {
                        var e, t, n;
                        for (n = [], e = 0, t = y.length; t > e; e++) {
                            b = y[e];
                            n.push(u(b));
                        }
                        return n;
                    }()).unsubscribe;
                });
            }
            return n.never();
        };
        R = function(e, t) {
            var n;
            if (t == null) {
                t = []
            };
            n = function(e) {
                var r;
                if (x.contains(t, e)) {
                    return true;
                }
                r = e.internalDeps();
                if (r.length) {
                    t.push(e);
                    return x.any(r, n);
                }
                t.push(e);
                return false;
            };
            return x.any(e, n);
        };
        L = function(e) {
            if (x.isFunction(e)) {
                return e;
            }
            return x.always(e);
        };
        n.groupSimultaneous = function() {
            var e, t, o;
            if (arguments.length >= 1) {
                o = xe.call(arguments, 0);
            } else {
                o = [];
            }
            if (o.length === 1 && K(o[0])) {
                o = o[0]
            };
            t = function() {
                var t, n, i;
                for (i = [], t = 0, n = o.length; n > t; t++) {
                    e = o[t];
                    i.push(new r(e));
                }
                return i;
            }();
            return ye(new n.Desc(n, "groupSimultaneous", o), n.when(t, function() {
                var e;
                return e = arguments.length >= 1 ? xe.call(arguments, 0) : [];
            }));
        };
        y = function(e) {
            function t(e, n, r) {
                this.property = e;
                this.subscribe = Ce(this.subscribe, this);
                t.__super__.constructor.call(this, n, r);
                this.current = g;
                this.currentValueRootId = undefined;
                this.propertyEnded = false;
            }
            ke(t, e);
            t.prototype.push = function(e) {
                if (e.isEnd()) {
                    this.propertyEnded = true
                };
                if (e.hasValue()) {
                    this.current = new _(e), this.currentValueRootId = k.currentEventId()
                };
                return t.__super__.push.call(this, e);
            };
            t.prototype.maybeSubSource = function(e, t) {
                if (t === n.noMore) {
                    return se;
                }
                if (this.propertyEnded) {
                    e($());
                    return se;
                }
                return u.prototype.subscribe.call(this, e);
            };
            t.prototype.subscribe = function(e) {
                var t, r, o, i;
                r = false;
                o = n.more;
                if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
                    t = k.currentEventId();
                    i = this.currentValueRootId;
                    if (!this.propertyEnded && i && t && t !== i) {
                        k.whenDoneWith(this.property, function(t) {
                            return function() {
                                if (t.currentValueRootId === i) {
                                    return e(Y(t.current.get().value()));
                                }
                                return;
                            };
                        }(this));
                        return this.maybeSubSource(e, o);
                    }
                    k.inTransaction(undefined, this, function() {
                        return o = e(Y(this.current.get().value()));
                    }, []);
                    return this.maybeSubSource(e, o);
                }
                return this.maybeSubSource(e, o);
            };
            return t;
        }(u);
        b = function(e) {
            function t(e, n, r) {
                t.__super__.constructor.call(this, e);
                M(n);
                this.dispatcher = new y(this, n, r);
                ce(this);
            }
            ke(t, e);
            t.prototype.changes = function() {
                return new d(new n.Desc(this, "changes", []), function(e) {
                    return function(t) {
                        return e.dispatcher.subscribe(function(e) {
                            if (e.isInitial()) {
                                return undefined;
                            }
                            return t(e);
                        });
                    };
                }(this));
            };
            t.prototype.withHandler = function(e) {
                return new t(new n.Desc(this, "withHandler", [ e ]), this.dispatcher.subscribe, e);
            };
            t.prototype.toProperty = function() {
                F(arguments);
                return this;
            };
            t.prototype.toEventStream = function() {
                return new d(new n.Desc(this, "toEventStream", []), function(e) {
                    return function(t) {
                        return e.dispatcher.subscribe(function(e) {
                            if (e.isInitial()) {
                                e = e.toNext()
                            };
                            return t(e);
                        });
                    };
                }(this));
            };
            return t;
        }(v);
        n.Property = b;
        n.constant = function(e) {
            return new b(new n.Desc(n, "constant", [ e ]), function(t) {
                t(Y(e));
                t($());
                return se;
            });
        };
        n.fromBinder = function(e, t) {
            if (t == null) {
                t = x.id
            };
            return new d(new n.Desc(n, "fromBinder", [ e, t ]), function(r) {
                var o, i, s, a;
                a = false;
                o = false;
                i = function() {
                    if (a) {
                        return undefined;
                    }
                    if (typeof s != "undefined" && s !== null) {
                        s();
                        return a = true;
                    }
                    return o = true;
                };
                s = e(function() {
                    var e, o, s, a, u, l;
                    for (e = arguments.length >= 1 ? xe.call(arguments, 0) : [], l = t.apply(this, e), 
                    K(l) && x.last(l) instanceof p || (l = [ l ]), u = n.more, s = 0, a = l.length; a > s; s++) {
                        o = l[s];
                        u = r(o = he(o));
                        if (u === n.noMore || o.isEnd()) {
                            i();
                            return u;
                        }
                    }
                    return u;
                });
                if (o) {
                    i()
                };
                return i;
            });
        };
        V = [ [ "addEventListener", "removeEventListener" ], [ "addListener", "removeListener" ], [ "on", "off" ], [ "bind", "unbind" ] ];
        z = function(e) {
            var t, n, r, o;
            for (t = 0, n = V.length; n > t; t++) {
                o = V[t];
                r = [ e[o[0]], e[o[1]] ];
                if (r[0] && r[1]) {
                    return r;
                }
            }
            throw new c("No suitable event methods in " + e);
        };
        n.fromEventTarget = function(e, t, r) {
            var o, i, s;
            o = z(e);
            i = o[0];
            s = o[1];
            return ye(new n.Desc(n, "fromEvent", [ e, t ]), n.fromBinder(function(n) {
                i.call(e, t, n);
                return function() {
                    return s.call(e, t, n);
                };
            }, r));
        };
        n.fromEvent = n.fromEventTarget;
        n.Observable.prototype.map = function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            return B(this, t, e, function(e) {
                return ye(new n.Desc(this, "map", [ e ]), this.withHandler(function(t) {
                    return this.push(t.fmap(e));
                }));
            });
        };
        E = function(e) {
            if (K(e[0])) {
                return e[0];
            }
            return Array.prototype.slice.call(e);
        };
        T = function(e) {
            if (x.isFunction(e[0])) {
                return [ E(Array.prototype.slice.call(e, 1)), e[0] ];
            }
            return [ E(Array.prototype.slice.call(e, 0, e.length - 1)), x.last(e) ];
        };
        n.combineAsArray = function() {
            var e, t, r, o, i, s, a;
            for (a = E(arguments), e = t = 0, r = a.length; r > t; e = ++t) {
                s = a[e];
                if (!J(s)) {
                    a[e] = n.constant(s)
                };
            }
            if (a.length) {
                i = function() {
                    var e, t, n;
                    for (n = [], e = 0, t = a.length; t > e; e++) {
                        o = a[e];
                        n.push(new w(o, true));
                    }
                    return n;
                }();
                return ye(new n.Desc(n, "combineAsArray", a), n.when(i, function() {
                    var e;
                    return e = arguments.length >= 1 ? xe.call(arguments, 0) : [];
                }).toProperty());
            }
            return n.constant([]);
        };
        n.onValues = function() {
            var e, t, r;
            if (arguments.length >= 2) {
                r = xe.call(arguments, 0, t = arguments.length - 1);
            } else {
                r = (t = 0, []);
            }
            e = arguments[t++];
            return n.combineAsArray(r).onValues(e);
        };
        n.combineWith = function() {
            var e, t, r;
            t = T(arguments);
            r = t[0];
            e = t[1];
            return ye(new n.Desc(n, "combineWith", [ e ].concat(xe.call(r))), n.combineAsArray(r).map(function(t) {
                return e.apply(null, t);
            }));
        };
        n.Observable.prototype.combine = function(e, t) {
            var r;
            r = de(t);
            return ye(new n.Desc(this, "combine", [ e, t ]), n.combineAsArray(this, e).map(function(e) {
                return r(e[0], e[1]);
            }));
        };
        n.Observable.prototype.withStateMachine = function(e, t) {
            var r;
            r = e;
            return ye(new n.Desc(this, "withStateMachine", [ e, t ]), this.withHandler(function(e) {
                var o, i, s, a, u, l, c;
                for (o = t(r, e), a = o[0], l = o[1], r = a, c = n.more, i = 0, s = l.length; s > i; i++) {
                    u = l[i];
                    c = this.push(u);
                    if (c === n.noMore) {
                        return c;
                    }
                }
                return c;
            }));
        };
        n.Observable.prototype.skipDuplicates = function(e) {
            if (e == null) {
                e = function(e, t) {
                    return e === t;
                }
            };
            return ye(new n.Desc(this, "skipDuplicates", []), this.withStateMachine(g, function(t, n) {
                if (n.hasValue()) {
                    if (n.isInitial() || t === g || !e(t.get(), n.value())) {
                        return [ new _(n.value()), [ n ] ];
                    }
                    return [ t, [] ];
                }
                return [ t, [ n ] ];
            }));
        };
        n.Observable.prototype.awaiting = function(e) {
            return ye(new n.Desc(this, "awaiting", [ e ]), n.groupSimultaneous(this, e).map(function(e) {
                var t, n;
                t = e[0];
                n = e[1];
                return n.length === 0;
            }).toProperty(false).skipDuplicates());
        };
        n.Observable.prototype.not = function() {
            return ye(new n.Desc(this, "not", []), this.map(function(e) {
                return !e;
            }));
        };
        n.Property.prototype.and = function(e) {
            return ye(new n.Desc(this, "and", [ e ]), this.combine(e, function(e, t) {
                return e && t;
            }));
        };
        n.Property.prototype.or = function(e) {
            return ye(new n.Desc(this, "or", [ e ]), this.combine(e, function(e, t) {
                return e || t;
            }));
        };
        n.scheduler = {
            setTimeout: function(e, t) {
                return setTimeout(e, t);
            },
            setInterval: function(e, t) {
                return setInterval(e, t);
            },
            clearInterval: function(e) {
                return clearInterval(e);
            },
            clearTimeout: function(e) {
                return clearTimeout(e);
            },
            now: function() {
                return new Date().getTime();
            }
        };
        n.EventStream.prototype.bufferWithTime = function(e) {
            return ye(new n.Desc(this, "bufferWithTime", [ e ]), this.bufferWithTimeOrCount(e, Number.MAX_VALUE));
        };
        n.EventStream.prototype.bufferWithCount = function(e) {
            return ye(new n.Desc(this, "bufferWithCount", [ e ]), this.bufferWithTimeOrCount(undefined, e));
        };
        n.EventStream.prototype.bufferWithTimeOrCount = function(e, t) {
            var r;
            r = function(n) {
                if (n.values.length === t) {
                    return n.flush();
                }
                if (e !== undefined) {
                    return n.schedule();
                }
                return;
            };
            return ye(new n.Desc(this, "bufferWithTimeOrCount", [ e, t ]), this.buffer(e, r, r));
        };
        n.EventStream.prototype.buffer = function(e, t, r) {
            var o, i, s;
            if (t == null) {
                t = se
            };
            if (r == null) {
                r = se
            };
            o = {
                scheduled: null,
                end: undefined,
                values: [],
                flush: function() {
                    var e, t;
                    if (this.scheduled) {
                        n.scheduler.clearTimeout(this.scheduled), this.scheduled = null
                    };
                    if (this.values.length > 0) {
                        t = this.values;
                        this.values = [];
                        e = this.push(ie(t));
                        if (this.end != null) {
                            return this.push(this.end);
                        }
                        if (e !== n.noMore) {
                            return r(this);
                        }
                    } else if (this.end != null) {
                        return this.push(this.end);
                    }
                },
                schedule: function() {
                    if (this.scheduled) {
                        return undefined;
                    }
                    return this.scheduled = e(function(e) {
                        return function() {
                            return e.flush();
                        };
                    }(this));
                }
            };
            s = n.more;
            if (!x.isFunction(e)) {
                i = e, e = function(e) {
                    return n.scheduler.setTimeout(e, i);
                }
            };
            return ye(new n.Desc(this, "buffer", []), this.withHandler(function(e) {
                o.push = function(e) {
                    return function(t) {
                        return e.push(t);
                    };
                }(this);
                if (e.isError()) {
                    s = this.push(e);
                } else {
                    if (e.isEnd()) {
                        o.end = e;
                        if (!o.scheduled) {
                            o.flush()
                        };
                    } else {
                        o.values.push(e.value());
                        t(o);
                    }
                }
                return s;
            }));
        };
        n.Observable.prototype.filter = function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            O(t);
            return B(this, t, e, function(e) {
                return ye(new n.Desc(this, "filter", [ e ]), this.withHandler(function(t) {
                    if (t.filter(e)) {
                        return this.push(t);
                    }
                    return n.more;
                }));
            });
        };
        n.once = function(e) {
            return new d(new a(n, "once", [ e ]), function(t) {
                t(he(e));
                t($());
                return se;
            });
        };
        n.EventStream.prototype.concat = function(e) {
            var t;
            t = this;
            return new d(new n.Desc(t, "concat", [ e ]), function(n) {
                var r, o;
                o = se;
                r = t.dispatcher.subscribe(function(t) {
                    if (t.isEnd()) {
                        return o = e.dispatcher.subscribe(n);
                    }
                    return n(t);
                });
                return function() {
                    r();
                    return o();
                };
            });
        };
        n.Observable.prototype.flatMap = function() {
            return q(this, oe(arguments));
        };
        n.Observable.prototype.flatMapFirst = function() {
            return q(this, oe(arguments), true);
        };
        q = function(e, t, r, o) {
            var s, a, u;
            u = [ e ];
            s = [];
            a = new d(new n.Desc(e, "flatMap" + (r ? "First" : ""), [ t ]), function(a) {
                var u, l, c, p, d;
                c = new i();
                p = [];
                d = function(e) {
                    var r;
                    r = re(t(e.value()));
                    s.push(r);
                    return c.add(function(e, t) {
                        return r.dispatcher.subscribe(function(o) {
                            var i;
                            if (o.isEnd()) {
                                x.remove(r, s);
                                l();
                                u(t);
                                return n.noMore;
                            }
                            if (o instanceof f) {
                                o = o.toNext()
                            };
                            i = a(o);
                            if (i === n.noMore) {
                                e()
                            };
                            return i;
                        });
                    });
                };
                l = function() {
                    var e;
                    e = p.shift();
                    if (e) {
                        return d(e);
                    }
                    return;
                };
                u = function(e) {
                    e();
                    if (c.empty()) {
                        return a($());
                    }
                    return;
                };
                c.add(function(t, i) {
                    return e.dispatcher.subscribe(function(e) {
                        if (e.isEnd()) {
                            return u(i);
                        }
                        if (e.isError()) {
                            return a(e);
                        }
                        if (r && c.count() > 1) {
                            return n.more;
                        }
                        if (c.unsubscribed) {
                            return n.noMore;
                        }
                        if (o && c.count() > o) {
                            return p.push(e);
                        }
                        return d(e);
                    });
                });
                return c.unsubscribe;
            });
            a.internalDeps = function() {
                if (s.length) {
                    return u.concat(s);
                }
                return u;
            };
            return a;
        };
        oe = function(e) {
            if (e.length === 1 && J(e[0])) {
                return x.always(e[0]);
            }
            return te(e);
        };
        re = function(e) {
            if (J(e)) {
                return e;
            }
            return n.once(e);
        };
        n.Observable.prototype.flatMapWithConcurrencyLimit = function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            return ye(new n.Desc(this, "flatMapWithConcurrencyLimit", [ t ].concat(xe.call(e))), q(this, oe(e), false, t));
        };
        n.Observable.prototype.flatMapConcat = function() {
            return ye(new n.Desc(this, "flatMapConcat", Array.prototype.slice.call(arguments, 0)), this.flatMapWithConcurrencyLimit.apply(this, [ 1 ].concat(xe.call(arguments))));
        };
        n.later = function(e, t) {
            return ye(new n.Desc(n, "later", [ e, t ]), n.fromBinder(function(r) {
                var o, i;
                i = function() {
                    return r([ t, $() ]);
                };
                o = n.scheduler.setTimeout(i, e);
                return function() {
                    return n.scheduler.clearTimeout(o);
                };
            }));
        };
        n.Observable.prototype.bufferingThrottle = function(e) {
            return ye(new n.Desc(this, "bufferingThrottle", [ e ]), this.flatMapConcat(function(t) {
                return n.once(t).concat(n.later(e).filter(false));
            }));
        };
        n.Property.prototype.bufferingThrottle = function() {
            return n.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
        };
        o = function(e) {
            function t() {
                this.guardedSink = Ce(this.guardedSink, this);
                this.subscribeAll = Ce(this.subscribeAll, this);
                this.unsubAll = Ce(this.unsubAll, this);
                if (this instanceof t) {
                    this.sink = undefined;
                    this.subscriptions = [];
                    this.ended = false;
                    return void t.__super__.constructor.call(this, new n.Desc(n, "Bus", []), this.subscribeAll);
                }
                return new t();
            }
            ke(t, e);
            t.prototype.unsubAll = function() {
                var e, t, n, r;
                for (n = this.subscriptions, e = 0, t = n.length; t > e; e++) {
                    r = n[e];
                    if (typeof r.unsub == "function") {
                        r.unsub()
                    };
                }
                return undefined;
            };
            t.prototype.subscribeAll = function(e) {
                var t, n, r, o;
                if (this.ended) {
                    e($());
                } else {
                    for (this.sink = e, r = P(this.subscriptions), t = 0, n = r.length; n > t; t++) {
                        o = r[t];
                        this.subscribeInput(o);
                    }
                }
                return this.unsubAll;
            };
            t.prototype.guardedSink = function(e) {
                return function(t) {
                    return function(r) {
                        if (r.isEnd()) {
                            t.unsubscribeInput(e);
                            return n.noMore;
                        }
                        return t.sink(r);
                    };
                }(this);
            };
            t.prototype.subscribeInput = function(e) {
                return e.unsub = e.input.dispatcher.subscribe(this.guardedSink(e.input));
            };
            t.prototype.unsubscribeInput = function(e) {
                var t, n, r, o, i;
                for (o = this.subscriptions, t = n = 0, r = o.length; r > n; t = ++n) {
                    i = o[t];
                    if (i.input === e) {
                        if (typeof i.unsub == "function") {
                            i.unsub()
                        };
                        return void this.subscriptions.splice(t, 1);
                    }
                }
            };
            t.prototype.plug = function(e) {
                var t;
                N(e);
                if (this.ended) {
                    return undefined;
                }
                t = {
                    input: e
                };
                this.subscriptions.push(t);
                if (this.sink != null) {
                    this.subscribeInput(t)
                };
                return function(t) {
                    return function() {
                        return t.unsubscribeInput(e);
                    };
                }(this);
            };
            t.prototype.end = function() {
                this.ended = true;
                this.unsubAll();
                if (typeof this.sink == "function") {
                    return this.sink($());
                }
                return;
            };
            t.prototype.push = function(e) {
                if (this.ended) {
                    return undefined;
                }
                if (typeof this.sink == "function") {
                    return this.sink(ie(e));
                }
                return;
            };
            t.prototype.error = function(e) {
                if (typeof this.sink == "function") {
                    return this.sink(new c(e));
                }
                return;
            };
            return t;
        }(d);
        n.Bus = o;
        X = function(e, t) {
            return _e(function() {
                var r, o, i;
                o = arguments[0];
                if (arguments.length >= 2) {
                    r = xe.call(arguments, 1);
                } else {
                    r = [];
                }
                i = ae(t, [ function(e, t) {
                    return o.apply(null, xe.call(e).concat([ t ]));
                } ]);
                return ye(new n.Desc(n, e, [ o ].concat(xe.call(r))), n.combineAsArray(r).flatMap(i));
            });
        };
        n.fromCallback = X("fromCallback", function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            return n.fromBinder(function(n) {
                ee(t, e)(n);
                return se;
            }, function(e) {
                return [ e, $() ];
            });
        });
        n.fromNodeCallback = X("fromNodeCallback", function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            return n.fromBinder(function(n) {
                ee(t, e)(n);
                return se;
            }, function(e, t) {
                if (e) {
                    return [ new c(e), $() ];
                }
                return [ t, $() ];
            });
        });
        n.combineTemplate = function(e) {
            var t, r, o, i, s, a, u, l, c, p, d;
            u = [];
            d = [];
            a = function(e) {
                return e[e.length - 1];
            };
            p = function(e, t, n) {
                return a(e)[t] = n;
            };
            t = function(e, t) {
                return function(n, r) {
                    return p(n, e, r[t]);
                };
            };
            s = function(e, t) {
                return function(n) {
                    return p(n, e, t);
                };
            };
            l = function(e) {
                if (K(e)) {
                    return [];
                }
                return {};
            };
            c = function(e, t) {
                return function(n) {
                    var r;
                    r = l(t);
                    p(n, e, r);
                    return n.push(r);
                };
            };
            o = function(e, n) {
                var r;
                if (J(n)) {
                    d.push(n);
                    return u.push(t(e, d.length - 1));
                }
                if (n !== Object(n) || typeof n == "function" || n instanceof RegExp || n instanceof Date) {
                    return u.push(s(e, n));
                }
                r = function(e) {
                    return e.pop();
                };
                u.push(c(e, n));
                i(n);
                return u.push(r);
            };
            i = function(e) {
                return x.each(e, o);
            };
            i(e);
            r = function(t) {
                var n, r, o, i, s;
                for (s = l(e), n = [ s ], o = 0, i = u.length; i > o; o++) {
                    (r = u[o])(n, t);
                }
                return s;
            };
            return ye(new n.Desc(n, "combineTemplate", [ e ]), n.combineAsArray(d).map(r));
        };
        C = function(e, t) {
            var r;
            r = new d(j(e, "justInitValue"), function(t) {
                var o, i;
                i = undefined;
                o = e.dispatcher.subscribe(function(e) {
                    if (!e.isEnd()) {
                        i = e
                    };
                    return n.noMore;
                });
                k.whenDoneWith(r, function() {
                    if (i != null) {
                        t(i)
                    };
                    return t($());
                });
                return o;
            });
            return r.concat(t).toProperty();
        };
        n.Observable.prototype.mapEnd = function() {
            var e;
            e = te(arguments);
            return ye(new n.Desc(this, "mapEnd", [ e ]), this.withHandler(function(t) {
                if (t.isEnd()) {
                    this.push(ie(e(t)));
                    this.push($());
                    return n.noMore;
                }
                return this.push(t);
            }));
        };
        n.Observable.prototype.skipErrors = function() {
            return ye(new n.Desc(this, "skipErrors", []), this.withHandler(function(e) {
                if (e.isError()) {
                    return n.more;
                }
                return this.push(e);
            }));
        };
        n.EventStream.prototype.takeUntil = function(e) {
            var t;
            t = {};
            return ye(new n.Desc(this, "takeUntil", [ e ]), n.groupSimultaneous(this.mapEnd(t), e.skipErrors()).withHandler(function(r) {
                var o, i, s, a, u, l;
                if (r.hasValue()) {
                    a = r.value();
                    o = a[0];
                    e = a[1];
                    if (e.length) {
                        return this.push($());
                    }
                    for (u = n.more, i = 0, s = o.length; s > i; i++) {
                        l = o[i];
                        if (l === t) {
                            u = this.push($());
                        } else {
                            u = this.push(ie(l));
                        }
                    }
                    return u;
                }
                return this.push(r);
            }));
        };
        n.Property.prototype.takeUntil = function(e) {
            var t;
            t = this.changes().takeUntil(e);
            return ye(new n.Desc(this, "takeUntil", [ e ]), C(this, t));
        };
        n.Observable.prototype.flatMapLatest = function() {
            var e, t;
            e = oe(arguments);
            t = this.toEventStream();
            return ye(new n.Desc(this, "flatMapLatest", [ e ]), t.flatMap(function(n) {
                return re(e(n)).takeUntil(t);
            }));
        };
        n.Property.prototype.delayChanges = function(e, t) {
            return ye(e, C(this, t(this.changes())));
        };
        n.EventStream.prototype.delay = function(e) {
            return ye(new n.Desc(this, "delay", [ e ]), this.flatMap(function(t) {
                return n.later(e, t);
            }));
        };
        n.Property.prototype.delay = function(e) {
            return this.delayChanges(new n.Desc(this, "delay", [ e ]), function(t) {
                return t.delay(e);
            });
        };
        n.EventStream.prototype.debounce = function(e) {
            return ye(new n.Desc(this, "debounce", [ e ]), this.flatMapLatest(function(t) {
                return n.later(e, t);
            }));
        };
        n.Property.prototype.debounce = function(e) {
            return this.delayChanges(new n.Desc(this, "debounce", [ e ]), function(t) {
                return t.debounce(e);
            });
        };
        n.EventStream.prototype.debounceImmediate = function(e) {
            return ye(new n.Desc(this, "debounceImmediate", [ e ]), this.flatMapFirst(function(t) {
                return n.once(t).concat(n.later(e).filter(false));
            }));
        };
        n.Observable.prototype.decode = function(e) {
            return ye(new n.Desc(this, "decode", [ e ]), this.combine(n.combineTemplate(e), function(e, t) {
                return t[e];
            }));
        };
        n.Observable.prototype.scan = function(e, t) {
            var r, o, i, s;
            t = de(t);
            r = ge(e);
            o = false;
            s = function(e) {
                return function(s) {
                    var a, u, l, c;
                    a = false;
                    c = se;
                    u = n.more;
                    l = function() {
                        if (a) {
                            return undefined;
                        }
                        return r.forEach(function(e) {
                            a = o = true;
                            u = s(new f(function() {
                                return e;
                            }));
                            if (u === n.noMore) {
                                c();
                                return c = se;
                            }
                            return;
                        });
                    };
                    c = e.dispatcher.subscribe(function(e) {
                        var i, c;
                        if (e.hasValue()) {
                            if (o && e.isInitial()) {
                                return n.more;
                            }
                            if (!e.isInitial()) {
                                l()
                            };
                            a = o = true;
                            c = r.getOrElse(undefined);
                            i = t(c, e.value());
                            r = new _(i);
                            return s(e.apply(function() {
                                return i;
                            }));
                        }
                        if (e.isEnd()) {
                            u = l()
                        };
                        if (u !== n.noMore) {
                            return s(e);
                        }
                        return;
                    });
                    k.whenDoneWith(i, l);
                    return c;
                };
            }(this);
            return i = new b(new n.Desc(this, "scan", [ e, t ]), s);
        };
        n.Observable.prototype.diff = function(e, t) {
            t = de(t);
            return ye(new n.Desc(this, "diff", [ e, t ]), this.scan([ e ], function(e, n) {
                return [ n, t(e[0], n) ];
            }).filter(function(e) {
                return e.length === 2;
            }).map(function(e) {
                return e[1];
            }));
        };
        n.Observable.prototype.doAction = function() {
            var e;
            e = te(arguments);
            return ye(new n.Desc(this, "doAction", [ e ]), this.withHandler(function(t) {
                if (t.hasValue()) {
                    e(t.value())
                };
                return this.push(t);
            }));
        };
        n.Observable.prototype.doError = function() {
            var e;
            e = te(arguments);
            return ye(new n.Desc(this, "doError", [ e ]), this.withHandler(function(t) {
                if (t.isError()) {
                    e(t.error)
                };
                return this.push(t);
            }));
        };
        n.Observable.prototype.doLog = function() {
            var e;
            if (arguments.length >= 1) {
                e = xe.call(arguments, 0);
            } else {
                e = [];
            }
            return ye(new n.Desc(this, "doLog", e), this.withHandler(function(t) {
                if (typeof console != "undefined" && console !== null && typeof console.log == "function") {
                    console.log.apply(console, xe.call(e).concat([ t.log() ]))
                };
                return this.push(t);
            }));
        };
        n.Observable.prototype.endOnError = function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            if (t == null) {
                t = true
            };
            return B(this, t, e, function(e) {
                return ye(new n.Desc(this, "endOnError", []), this.withHandler(function(t) {
                    if (t.isError() && e(t.error)) {
                        this.push(t);
                        return this.push($());
                    }
                    return this.push(t);
                }));
            });
        };
        v.prototype.errors = function() {
            return ye(new n.Desc(this, "errors", []), this.filter(function() {
                return false;
            }));
        };
        be = function(e) {
            return [ e, $() ];
        };
        n.fromPromise = function(e, t, r) {
            if (r == null) {
                r = be
            };
            return ye(new n.Desc(n, "fromPromise", [ e ]), n.fromBinder(function(n) {
                var r;
                if ((r = e.then(n, function(e) {
                    return n(new c(e));
                })) != null && typeof r.done == "function") {
                    r.done()
                };
                return function() {
                    if (t && typeof e.abort == "function") {
                        return e.abort();
                    }
                    return;
                };
            }, r));
        };
        n.Observable.prototype.mapError = function() {
            var e;
            e = te(arguments);
            return ye(new n.Desc(this, "mapError", [ e ]), this.withHandler(function(t) {
                if (t.isError()) {
                    return this.push(ie(e(t.error)));
                }
                return this.push(t);
            }));
        };
        n.Observable.prototype.flatMapError = function(e) {
            return ye(new n.Desc(this, "flatMapError", [ e ]), this.mapError(function(e) {
                return new c(e);
            }).flatMap(function(t) {
                if (t instanceof c) {
                    return e(t.error);
                }
                return n.once(t);
            }));
        };
        n.EventStream.prototype.sampledBy = function(e, t) {
            return ye(new n.Desc(this, "sampledBy", [ e, t ]), this.toProperty().sampledBy(e, t));
        };
        n.Property.prototype.sampledBy = function(e, t) {
            var r, o, i, s, a;
            if (t != null) {
                t = de(t);
            } else {
                r = true;
                t = function(e) {
                    return e.value();
                };
            }
            a = new w(this, false, r);
            i = new w(e, true, r);
            s = n.when([ a, i ], t);
            if (e instanceof b) {
                o = s.toProperty();
            } else {
                o = s;
            }
            return ye(new n.Desc(this, "sampledBy", [ e, t ]), o);
        };
        n.Property.prototype.sample = function(e) {
            return ye(new n.Desc(this, "sample", [ e ]), this.sampledBy(n.interval(e, {})));
        };
        n.Observable.prototype.map = function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            if (t instanceof b) {
                return t.sampledBy(this, W);
            }
            return B(this, t, e, function(e) {
                return ye(new n.Desc(this, "map", [ e ]), this.withHandler(function(t) {
                    return this.push(t.fmap(e));
                }));
            });
        };
        n.Observable.prototype.fold = function(e, t) {
            return ye(new n.Desc(this, "fold", [ e, t ]), this.scan(e, t).sampledBy(this.filter(false).mapEnd().toProperty()));
        };
        v.prototype.reduce = v.prototype.fold;
        n.fromPoll = function(e, t) {
            return ye(new n.Desc(n, "fromPoll", [ e, t ]), n.fromBinder(function(t) {
                var r;
                r = n.scheduler.setInterval(t, e);
                return function() {
                    return n.scheduler.clearInterval(r);
                };
            }, t));
        };
        n.Observable.prototype.groupBy = function(e, t) {
            var r, o;
            if (t == null) {
                t = n._.id
            };
            o = {};
            r = this;
            return r.filter(function(t) {
                return !o[e(t)];
            }).map(function(i) {
                var s, a, u, l;
                a = e(i);
                l = r.filter(function(t) {
                    return e(t) === a;
                });
                s = n.once(i).concat(l);
                u = t(s, i).withHandler(function(e) {
                    this.push(e);
                    if (e.isEnd()) {
                        return delete o[a];
                    }
                    return;
                });
                return o[a] = u;
            });
        };
        n.fromArray = function(e) {
            var t;
            D(e);
            if (e.length) {
                t = 0;
                return new d(new n.Desc(n, "fromArray", [ e ]), function(r) {
                    var o, i, s, a, u;
                    u = false;
                    a = n.more;
                    s = false;
                    i = false;
                    o = function() {
                        var l;
                        i = true;
                        if (!s) {
                            for (s = true; i; ) {
                                i = false;
                                if (!(a === n.noMore || u)) {
                                    l = e[t++], a = r(he(l)), a !== n.noMore && (t === e.length ? r($()) : k.afterTransaction(o))
                                };
                            }
                            return s = false;
                        }
                    };
                    o();
                    return function() {
                        return u = true;
                    };
                });
            }
            return ye(new n.Desc(n, "fromArray", e), n.never());
        };
        n.EventStream.prototype.holdWhen = function(e) {
            var t, r, o;
            r = false;
            t = [];
            o = this;
            return new d(new n.Desc(this, "holdWhen", [ e ]), function(n) {
                var s, a, u;
                s = new i();
                u = false;
                a = function(e) {
                    if (typeof e == "function") {
                        e()
                    };
                    if (s.empty() && u) {
                        return n($());
                    }
                    return;
                };
                s.add(function(o, i) {
                    return e.subscribeInternal(function(e) {
                        var o, s, u, l, c;
                        if (!e.hasValue()) {
                            if (e.isEnd()) {
                                return a(i);
                            }
                            return n(e);
                        }
                        r = e.value();
                        if (!r) {
                            for (l = t, t = [], u = [], o = 0, s = l.length; s > o; o++) {
                                c = l[o];
                                u.push(n(ie(c)));
                            }
                            return u;
                        }
                    });
                });
                s.add(function(e, i) {
                    return o.subscribeInternal(function(e) {
                        if (r && e.hasValue()) {
                            return t.push(e.value());
                        }
                        if (e.isEnd() && t.length) {
                            return a(i);
                        }
                        return n(e);
                    });
                });
                u = true;
                a();
                return s.unsubscribe;
            });
        };
        n.interval = function(e, t) {
            if (t == null) {
                t = {}
            };
            return ye(new n.Desc(n, "interval", [ e, t ]), n.fromPoll(e, function() {
                return ie(t);
            }));
        };
        n.$ = {};
        n.$.asEventStream = function(e, t, r) {
            var o;
            if (x.isFunction(t)) {
                o = [ t, undefined ], r = o[0], t = o[1]
            };
            return ye(new n.Desc(this.selector || this, "asEventStream", [ e ]), n.fromBinder(function(n) {
                return function(r) {
                    n.on(e, t, r);
                    return function() {
                        return n.off(e, t, r);
                    };
                };
            }(this), r));
        };
        if ((le = typeof jQuery != "undefined" && jQuery !== null ? jQuery : typeof Zepto != "undefined" && Zepto !== null ? Zepto : undefined) != null) {
            le.fn.asEventStream = n.$.asEventStream
        };
        n.Observable.prototype.log = function() {
            var e;
            if (arguments.length >= 1) {
                e = xe.call(arguments, 0);
            } else {
                e = [];
            }
            this.subscribe(function(t) {
                if (typeof console != "undefined" && console !== null && typeof console.log == "function") {
                    return console.log.apply(console, xe.call(e).concat([ t.log() ]));
                }
                return;
            });
            return this;
        };
        n.EventStream.prototype.merge = function(e) {
            var t;
            A(e);
            t = this;
            return ye(new n.Desc(t, "merge", [ e ]), n.mergeAll(this, e));
        };
        n.mergeAll = function() {
            var e;
            e = E(arguments);
            if (e.length) {
                return new d(new n.Desc(n, "mergeAll", e), function(t) {
                    var r, o, i;
                    r = 0;
                    i = function(o) {
                        return function(i) {
                            return o.dispatcher.subscribe(function(o) {
                                var s;
                                if (o.isEnd()) {
                                    r++;
                                    if (r === e.length) {
                                        return t($());
                                    }
                                    return n.more;
                                }
                                s = t(o);
                                if (s === n.noMore) {
                                    i()
                                };
                                return s;
                            });
                        };
                    };
                    o = x.map(i, e);
                    return new n.CompositeUnsubscribe(o).unsubscribe;
                });
            }
            return n.never();
        };
        n.repeatedly = function(e, t) {
            var r;
            r = 0;
            return ye(new n.Desc(n, "repeatedly", [ e, t ]), n.fromPoll(e, function() {
                return t[r++ % t.length];
            }));
        };
        n.repeat = function(e) {
            var t;
            t = 0;
            return n.fromBinder(function(r) {
                var o, i, s, a, u;
                o = false;
                s = n.more;
                u = function() {};
                i = function(e) {
                    if (e.isEnd()) {
                        if (o) {
                            return a();
                        }
                        return o = true;
                    }
                    return s = r(e);
                };
                a = function() {
                    var a;
                    for (o = true; o && s !== n.noMore; ) {
                        a = e(t++);
                        o = false;
                        if (a) {
                            u = a.subscribeInternal(i);
                        } else {
                            r($());
                        }
                    }
                    return o = true;
                };
                a();
                return function() {
                    return u();
                };
            });
        };
        n.retry = function(e) {
            var t, r, o, i, s, a, u;
            if (!x.isFunction(e.source)) {
                throw new h("'source' option has to be a function");
            }
            u = e.source;
            a = e.retries || 0;
            s = e.maxRetries || a;
            t = e.delay || function() {
                return 0;
            };
            i = e.isRetryable || function() {
                return true;
            };
            o = false;
            r = null;
            return ye(new n.Desc(n, "retry", [ e ]), n.repeat(function() {
                var e, l, c;
                if (o) {
                    return null;
                }
                c = function() {
                    return u().endOnError().withHandler(function(e) {
                        if (e.isError()) {
                            r = e;
                            if (i(r.error) && a > 0) {
                                return undefined;
                            }
                            o = true;
                            return this.push(e);
                        }
                        if (e.hasValue()) {
                            r = null, o = true
                        };
                        return this.push(e);
                    });
                };
                if (r) {
                    e = {
                        error: r.error,
                        retriesDone: s - a
                    };
                    l = n.later(t(e)).filter(false);
                    a -= 1;
                    return l.concat(n.once().flatMap(c));
                }
                return c();
            }));
        };
        n.sequentially = function(e, t) {
            var r;
            r = 0;
            return ye(new n.Desc(n, "sequentially", [ e, t ]), n.fromPoll(e, function() {
                var e;
                e = t[r++];
                if (r < t.length) {
                    return e;
                }
                if (r === t.length) {
                    return [ e, $() ];
                }
                return $();
            }));
        };
        n.Observable.prototype.skip = function(e) {
            return ye(new n.Desc(this, "skip", [ e ]), this.withHandler(function(t) {
                if (t.hasValue() && e > 0) {
                    e--;
                    return n.more;
                }
                return this.push(t);
            }));
        };
        n.Observable.prototype.take = function(e) {
            if (e <= 0) {
                return n.never();
            }
            return ye(new n.Desc(this, "take", [ e ]), this.withHandler(function(t) {
                if (t.hasValue()) {
                    e--;
                    if (e > 0) {
                        return this.push(t);
                    }
                    if (e === 0) {
                        this.push(t)
                    };
                    this.push($());
                    return n.noMore;
                }
                return this.push(t);
            }));
        };
        n.EventStream.prototype.skipUntil = function(e) {
            var t;
            t = e.take(1).map(true).toProperty(false);
            return ye(new n.Desc(this, "skipUntil", [ e ]), this.filter(t));
        };
        n.EventStream.prototype.skipWhile = function() {
            var e, t, r;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            O(t);
            r = false;
            return B(this, t, e, function(e) {
                return ye(new n.Desc(this, "skipWhile", [ e ]), this.withHandler(function(t) {
                    if (!r && t.hasValue() && e(t.value())) {
                        return n.more;
                    }
                    if (t.hasValue()) {
                        r = true
                    };
                    return this.push(t);
                }));
            });
        };
        n.Observable.prototype.slidingWindow = function(e, t) {
            if (t == null) {
                t = 0
            };
            return ye(new n.Desc(this, "slidingWindow", [ e, t ]), this.scan([], function(t, n) {
                return t.concat([ n ]).slice(-e);
            }).filter(function(e) {
                return e.length >= t;
            }));
        };
        n.spy = function(e) {
            return pe.push(e);
        };
        pe = [];
        ce = function(e) {
            var t, n, r;
            if (pe.length && !ce.running) {
                try {
                    for (ce.running = true, t = 0, n = pe.length; n > t; t++) {
                        (r = pe[t])(e);
                    }
                } finally {
                    delete ce.running;
                }
            }
            return undefined;
        };
        n.Property.prototype.startWith = function(e) {
            return ye(new n.Desc(this, "startWith", [ e ]), this.scan(e, function(e, t) {
                return t;
            }));
        };
        n.EventStream.prototype.startWith = function(e) {
            return ye(new n.Desc(this, "startWith", [ e ]), n.once(e).concat(this));
        };
        n.Observable.prototype.takeWhile = function() {
            var e, t;
            t = arguments[0];
            if (arguments.length >= 2) {
                e = xe.call(arguments, 1);
            } else {
                e = [];
            }
            O(t);
            return B(this, t, e, function(e) {
                return ye(new n.Desc(this, "takeWhile", [ e ]), this.withHandler(function(t) {
                    if (t.filter(e)) {
                        return this.push(t);
                    }
                    this.push($());
                    return n.noMore;
                }));
            });
        };
        n.update = function() {
            var e, t, r, o;
            for (t = arguments[0], o = arguments.length >= 2 ? xe.call(arguments, 1) : [], r = function(e) {
                return function() {
                    var t;
                    if (arguments.length >= 1) {
                        t = xe.call(arguments, 0);
                    } else {
                        t = [];
                    }
                    return function(n) {
                        return e.apply(null, [ n ].concat(t));
                    };
                };
            }, e = o.length - 1; e > 0; ) {
                if (!(o[e] instanceof Function)) {
                    o[e] = function(e) {
                        return function() {
                            return e;
                        };
                    }(o[e])
                };
                o[e] = r(o[e]);
                e -= 2;
            }
            return ye(new n.Desc(n, "update", [ t ].concat(xe.call(o))), n.when.apply(n, o).scan(t, function(e, t) {
                return t(e);
            }));
        };
        n.zipAsArray = function() {
            var e;
            e = E(arguments);
            return ye(new n.Desc(n, "zipAsArray", e), n.zipWith(e, function() {
                var e;
                return e = arguments.length >= 1 ? xe.call(arguments, 0) : [];
            }));
        };
        n.zipWith = function() {
            var e, t, r;
            t = T(arguments);
            r = t[0];
            e = t[1];
            r = x.map(function(e) {
                return e.toEventStream();
            }, r);
            return ye(new n.Desc(n, "zipWith", [ e ].concat(xe.call(r))), n.when(r, e));
        };
        n.Observable.prototype.zip = function(e, t) {
            if (t == null) {
                t = Array
            };
            return ye(new n.Desc(this, "zip", [ e ]), n.zipWith([ this, e ], t));
        };
        n.Observable.prototype.first = function() {
            return ye(new n.Desc(this, "first", []), this.take(1));
        };
        n.Observable.prototype.last = function() {
            var e;
            return ye(new n.Desc(this, "last", []), this.withHandler(function(t) {
                if (t.isEnd()) {
                    if (e) {
                        this.push(e)
                    };
                    this.push($());
                    return n.noMore;
                }
                return void (e = t);
            }));
        };
        n.EventStream.prototype.throttle = function(e) {
            return ye(new n.Desc(this, "throttle", [ e ]), this.bufferWithTime(e).map(function(e) {
                return e[e.length - 1];
            }));
        };
        n.Property.prototype.throttle = function(e) {
            return this.delayChanges(new n.Desc(this, "throttle", [ e ]), function(t) {
                return t.throttle(e);
            });
        };
        v.prototype.firstToPromise = function(e) {
            var t = this;
            if (typeof e != "function") {
                if (typeof Promise != "function") {
                    throw new h("There isn't default Promise, use shim or parameter");
                }
                e = Promise;
            }
            return new e(function(e, r) {
                return t.subscribe(function(t) {
                    if (t.hasValue()) {
                        e(t.value())
                    };
                    if (t.isError()) {
                        r(t.error)
                    };
                    return n.noMore;
                });
            });
        };
        v.prototype.toPromise = function(e) {
            return this.last().firstToPromise(e);
        };
        if (typeof define != "undefined" && define !== null && define.amd != null) {
            define([], function() {
                return n;
            });
            if (typeof this != "undefined" && this !== null) {
                this.Bacon = n
            };
        } else {
            if (typeof module != "undefined" && module !== null && module.exports != null) {
                module.exports = n;
                n.Bacon = n;
            } else {
                this.Bacon = n;
            }
        }
    }).call(this);
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
