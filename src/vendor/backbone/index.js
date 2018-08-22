(function(t) {
    !function(r) {
        var o = typeof self == "object" && self.self == self && self || typeof t == "object" && t.global == t && t;
        if (typeof define == "function" && define.amd) {
            define([ "underscore", "jquery", "exports" ], function(e, t, n) {
                o.Backbone = r(o, n, e, t);
            });
        } else if (typeof exports != "undefined") {
            var i, s = require("underscore");
            try {
                i = require("jquery");
            } catch (a) {}
            r(o, exports, s, i);
        } else o.Backbone = r(o, {}, o._, o.jQuery || o.Zepto || o.ender || o.$);
    }(function(e, t, n, r) {
        var o = e.Backbone, i = Array.prototype.slice;
        t.VERSION = "1.2.3";
        t.$ = r;
        t.noConflict = function() {
            e.Backbone = o;
            return this;
        };
        t.emulateHTTP = !1;
        t.emulateJSON = !1;
        var s = function(e, t, r) {
            switch (e) {
              case 1:
                return function() {
                    return n[t](this[r]);
                };

              case 2:
                return function(e) {
                    return n[t](this[r], e);
                };

              case 3:
                return function(e, o) {
                    return n[t](this[r], u(e, this), o);
                };

              case 4:
                return function(e, o, i) {
                    return n[t](this[r], u(e, this), o, i);
                };

              default:
                return function() {
                    var e = i.call(arguments);
                    e.unshift(this[r]);
                    return n[t].apply(n, e);
                };
            }
        }, a = function(e, t, r) {
            n.each(t, function(t, o) {
                if (n[o]) {
                    e.prototype[o] = s(t, o, r)
                };
            });
        }, u = function(e, t) {
            if (n.isFunction(e)) {
                return e;
            }
            if (n.isObject(e) && !t._isModel(e)) {
                return l(e);
            }
            if (n.isString(e)) {
                return function(t) {
                    return t.get(e);
                };
            }
            return e;
        }, l = function(e) {
            var t = n.matches(e);
            return function(e) {
                return t(e.attributes);
            };
        }, c = t.Events = {}, p = /\s+/, d = function(e, t, r, o, i) {
            var s, a = 0;
            if (r && typeof r == "object") {
                if (void 0 !== o && "context" in i && i.context === void 0) {
                    i.context = o
                };
                for (s = n.keys(r); a < s.length; a++) {
                    t = d(e, t, s[a], r[s[a]], i);
                }
            } else if (r && p.test(r)) {
                for (s = r.split(p); a < s.length; a++) {
                    t = e(t, s[a], o, i);
                }
            } else t = e(t, r, o, i);
            return t;
        };
        c.on = function(e, t, n) {
            return h(this, e, t, n);
        };
        var h = function(e, t, n, r, o) {
            e._events = d(f, e._events || {}, t, n, {
                context: r,
                ctx: e,
                listening: o
            });
            if (o) {
                var i = e._listeners || (e._listeners = {});
                i[o.id] = o;
            }
            return e;
        };
        c.listenTo = function(e, t, r) {
            if (!e) {
                return this;
            }
            var o = e._listenId || (e._listenId = n.uniqueId("l")), i = this._listeningTo || (this._listeningTo = {}), s = i[o];
            if (!s) {
                var a = this._listenId || (this._listenId = n.uniqueId("l"));
                s = i[o] = {
                    obj: e,
                    objId: o,
                    id: a,
                    listeningTo: i,
                    count: 0
                };
            }
            h(e, t, r, this, s);
            return this;
        };
        var f = function(e, t, n, r) {
            if (n) {
                var o = e[t] || (e[t] = []), i = r.context, s = r.ctx, a = r.listening;
                if (a) {
                    a.count++
                };
                o.push({
                    callback: n,
                    context: i,
                    ctx: i || s,
                    listening: a
                });
            }
            return e;
        };
        c.off = function(e, t, n) {
            if (this._events) {
                this._events = d(m, this._events, e, t, {
                    context: n,
                    listeners: this._listeners
                });
                return this;
            }
            return this;
        };
        c.stopListening = function(e, t, r) {
            var o = this._listeningTo;
            if (!o) {
                return this;
            }
            for (var i = e ? [ e._listenId ] : n.keys(o), s = 0; s < i.length; s++) {
                var a = o[i[s]];
                if (!a) {
                    break;
                }
                a.obj.off(t, r, this);
            }
            if (n.isEmpty(o)) {
                this._listeningTo = void 0
            };
            return this;
        };
        var m = function(e, t, r, o) {
            if (e) {
                var i, s = 0, a = o.context, u = o.listeners;
                if (t || r || a) {
                    for (var l = t ? [ t ] : n.keys(e); s < l.length; s++) {
                        t = l[s];
                        var c = e[t];
                        if (!c) {
                            break;
                        }
                        for (var p = [], d = 0; d < c.length; d++) {
                            var h = c[d];
                            r && r !== h.callback && r !== h.callback._callback || a && a !== h.context ? p.push(h) : (i = h.listening, 
                            i && --i.count === 0 && (delete u[i.id], delete i.listeningTo[i.objId]));
                        }
                        p.length ? e[t] = p : delete e[t];
                    }
                    if (n.size(e)) {
                        return e;
                    }
                    return;
                }
                for (var f = n.keys(u); s < f.length; s++) {
                    i = u[f[s]];
                    delete u[i.id];
                    delete i.listeningTo[i.objId];
                }
            }
        };
        c.once = function(e, t, r) {
            var o = d(g, {}, e, t, n.bind(this.off, this));
            return this.on(o, void 0, r);
        };
        c.listenToOnce = function(e, t, r) {
            var o = d(g, {}, t, r, n.bind(this.stopListening, this, e));
            return this.listenTo(e, o);
        };
        var g = function(e, t, r, o) {
            if (r) {
                var i = e[t] = n.once(function() {
                    o(t, i);
                    r.apply(this, arguments);
                });
                i._callback = r;
            }
            return e;
        };
        c.trigger = function(e) {
            if (!this._events) {
                return this;
            }
            for (var t = Math.max(0, arguments.length - 1), n = Array(t), r = 0; t > r; r++) {
                n[r] = arguments[r + 1];
            }
            d(v, this._events, e, void 0, n);
            return this;
        };
        var v = function(e, t, n, r) {
            if (e) {
                var o = e[t], i = e.all;
                if (o && i) {
                    i = i.slice()
                };
                if (o) {
                    b(o, r)
                };
                if (i) {
                    b(i, [ t ].concat(r))
                };
            }
            return e;
        }, b = function(e, t) {
            var n, r = -1, o = e.length, i = t[0], s = t[1], a = t[2];
            switch (t.length) {
              case 0:
                for (;++r < o; ) {
                    (n = e[r]).callback.call(n.ctx);
                }
                return;

              case 1:
                for (;++r < o; ) {
                    (n = e[r]).callback.call(n.ctx, i);
                }
                return;

              case 2:
                for (;++r < o; ) {
                    (n = e[r]).callback.call(n.ctx, i, s);
                }
                return;

              case 3:
                for (;++r < o; ) {
                    (n = e[r]).callback.call(n.ctx, i, s, a);
                }
                return;

              default:
                for (;++r < o; ) {
                    (n = e[r]).callback.apply(n.ctx, t);
                }
                return;
            }
        };
        c.bind = c.on;
        c.unbind = c.off;
        n.extend(t, c);
        var y = t.Model = function(e, t) {
            var r = e || {};
            t || (t = {});
            this.cid = n.uniqueId(this.cidPrefix);
            this.attributes = {};
            if (t.collection) {
                this.collection = t.collection
            };
            if (t.parse) {
                r = this.parse(r, t) || {}
            };
            r = n.defaults({}, r, n.result(this, "defaults"));
            this.set(r, t);
            this.changed = {};
            this.initialize.apply(this, arguments);
        };
        n.extend(y.prototype, c, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            cidPrefix: "c",
            initialize: function() {},
            toJSON: function(e) {
                return n.clone(this.attributes);
            },
            sync: function() {
                return t.sync.apply(this, arguments);
            },
            get: function(e) {
                return this.attributes[e];
            },
            escape: function(e) {
                return n.escape(this.get(e));
            },
            has: function(e) {
                return this.get(e) != null;
            },
            matches: function(e) {
                return !!n.iteratee(e, this)(this.attributes);
            },
            set: function(e, t, r) {
                if (e == null) {
                    return this;
                }
                var o;
                typeof e == "object" ? (o = e, r = t) : (o = {})[e] = t;
                r || (r = {});
                if (!this._validate(o, r)) {
                    return !1;
                }
                var i = r.unset, s = r.silent, a = [], u = this._changing;
                this._changing = !0;
                u || (this._previousAttributes = n.clone(this.attributes), this.changed = {});
                var l = this.attributes, c = this.changed, p = this._previousAttributes;
                for (var d in o) {
                    t = o[d];
                    n.isEqual(l[d], t) || a.push(d);
                    n.isEqual(p[d], t) ? delete c[d] : c[d] = t;
                    i ? delete l[d] : l[d] = t;
                }
                this.id = this.get(this.idAttribute);
                if (!s) {
                    if (a.length) {
                        this._pending = r
                    };
                    for (var h = 0; h < a.length; h++) {
                        this.trigger("change:" + a[h], this, l[a[h]], r);
                    }
                }
                if (u) {
                    return this;
                }
                if (!s) {
                    for (;this._pending; ) {
                        r = this._pending;
                        this._pending = !1;
                        this.trigger("change", this, r);
                    }
                }
                this._pending = !1;
                this._changing = !1;
                return this;
            },
            unset: function(e, t) {
                return this.set(e, void 0, n.extend({}, t, {
                    unset: !0
                }));
            },
            clear: function(e) {
                var t = {};
                for (var r in this.attributes) {
                    t[r] = void 0;
                }
                return this.set(t, n.extend({}, e, {
                    unset: !0
                }));
            },
            hasChanged: function(e) {
                if (e == null) {
                    return !n.isEmpty(this.changed);
                }
                return n.has(this.changed, e);
            },
            changedAttributes: function(e) {
                if (!e) {
                    if (this.hasChanged()) {
                        return n.clone(this.changed);
                    }
                    return !1;
                }
                var t = this._changing ? this._previousAttributes : this.attributes, r = {};
                for (var o in e) {
                    var i = e[o];
                    n.isEqual(t[o], i) || (r[o] = i);
                }
                if (n.size(r)) {
                    return r;
                }
                return !1;
            },
            previous: function(e) {
                if (e != null && this._previousAttributes) {
                    return this._previousAttributes[e];
                }
                return null;
            },
            previousAttributes: function() {
                return n.clone(this._previousAttributes);
            },
            fetch: function(e) {
                e = n.extend({
                    parse: !0
                }, e);
                var t = this, r = e.success;
                e.success = function(n) {
                    var o = e.parse ? t.parse(n, e) : n;
                    if (t.set(o, e)) {
                        if (r) {
                            r.call(e.context, t, n, e)
                        };
                        return void t.trigger("sync", t, n, e);
                    }
                    return !1;
                };
                U(this, e);
                return this.sync("read", this, e);
            },
            save: function(e, t, r) {
                var o;
                e == null || typeof e == "object" ? (o = e, r = t) : (o = {})[e] = t;
                r = n.extend({
                    validate: !0,
                    parse: !0
                }, r);
                var i = r.wait;
                if (o && !i) {
                    if (!this.set(o, r)) {
                        return !1;
                    }
                } else if (!this._validate(o, r)) {
                    return !1;
                }
                var s = this, a = r.success, u = this.attributes;
                r.success = function(e) {
                    s.attributes = u;
                    var t = r.parse ? s.parse(e, r) : e;
                    if (i) {
                        t = n.extend({}, o, t)
                    };
                    if (t && !s.set(t, r)) {
                        return !1;
                    }
                    if (a) {
                        a.call(r.context, s, e, r)
                    };
                    return void s.trigger("sync", s, e, r);
                };
                U(this, r);
                if (o && i) {
                    this.attributes = n.extend({}, u, o)
                };
                var l = this.isNew() ? "create" : r.patch ? "patch" : "update";
                "patch" !== l || r.attrs || (r.attrs = o);
                var c = this.sync(l, this, r);
                this.attributes = u;
                return c;
            },
            destroy: function(e) {
                e = e ? n.clone(e) : {};
                var t = this, r = e.success, o = e.wait, i = function() {
                    t.stopListening();
                    t.trigger("destroy", t, t.collection, e);
                };
                e.success = function(n) {
                    if (o) {
                        i()
                    };
                    if (r) {
                        r.call(e.context, t, n, e)
                    };
                    t.isNew() || t.trigger("sync", t, n, e);
                };
                var s = !1;
                this.isNew() ? n.defer(e.success) : (U(this, e), s = this.sync("delete", this, e));
                o || i();
                return s;
            },
            url: function() {
                var e = n.result(this, "urlRoot") || n.result(this.collection, "url") || $();
                if (this.isNew()) {
                    return e;
                }
                var t = this.get(this.idAttribute);
                return e.replace(/[^\/]$/, "$&/") + encodeURIComponent(t);
            },
            parse: function(e, t) {
                return e;
            },
            clone: function() {
                return new this.constructor(this.attributes);
            },
            isNew: function() {
                return !this.has(this.idAttribute);
            },
            isValid: function(e) {
                return this._validate({}, n.defaults({
                    validate: !0
                }, e));
            },
            _validate: function(e, t) {
                if (!t.validate || !this.validate) {
                    return !0;
                }
                e = n.extend({}, this.attributes, e);
                var r = this.validationError = this.validate(e, t) || null;
                if (r) {
                    this.trigger("invalid", this, r, n.extend(t, {
                        validationError: r
                    }));
                    return !1;
                }
                return !0;
            }
        });
        var _ = {
            keys: 1,
            values: 1,
            pairs: 1,
            invert: 1,
            pick: 0,
            omit: 0,
            chain: 1,
            isEmpty: 1
        };
        a(y, _, "attributes");
        var w = t.Collection = function(e, t) {
            t || (t = {});
            if (t.model) {
                this.model = t.model
            };
            if (void 0 !== t.comparator) {
                this.comparator = t.comparator
            };
            this._reset();
            this.initialize.apply(this, arguments);
            if (e) {
                this.reset(e, n.extend({
                    silent: !0
                }, t))
            };
        }, k = {
            add: !0,
            remove: !0,
            merge: !0
        }, x = {
            add: !0,
            remove: !1
        }, C = function(e, t, n) {
            n = Math.min(Math.max(n, 0), e.length);
            for (var r = Array(e.length - n), o = t.length, i = 0; i < r.length; i++) {
                r[i] = e[i + n];
            }
            for (i = 0; o > i; i++) {
                e[i + n] = t[i];
            }
            for (i = 0; i < r.length; i++) {
                e[i + o + n] = r[i];
            }
        };
        n.extend(w.prototype, c, {
            model: y,
            initialize: function() {},
            toJSON: function(e) {
                return this.map(function(t) {
                    return t.toJSON(e);
                });
            },
            sync: function() {
                return t.sync.apply(this, arguments);
            },
            add: function(e, t) {
                return this.set(e, n.extend({
                    merge: !1
                }, t, x));
            },
            remove: function(e, t) {
                t = n.extend({}, t);
                var r = !n.isArray(e);
                e = r ? [ e ] : n.clone(e);
                var o = this._removeModels(e, t);
                if (!t.silent && o) {
                    this.trigger("update", this, t)
                };
                if (r) {
                    return o[0];
                }
                return o;
            },
            set: function(e, t) {
                if (e != null) {
                    t = n.defaults({}, t, k);
                    if (t.parse && !this._isModel(e)) {
                        e = this.parse(e, t)
                    };
                    var r = !n.isArray(e);
                    e = r ? [ e ] : e.slice();
                    var o = t.at;
                    if (o != null) {
                        o = +o
                    };
                    if (o < 0) {
                        o += this.length + 1
                    };
                    for (var i, s = [], a = [], u = [], l = {}, c = t.add, p = t.merge, d = t.remove, h = !1, f = this.comparator && o == null && t.sort !== !1, m = n.isString(this.comparator) ? this.comparator : null, g = 0; g < e.length; g++) {
                        i = e[g];
                        var v = this.get(i);
                        if (v) {
                            if (p && i !== v) {
                                var b = this._isModel(i) ? i.attributes : i;
                                if (t.parse) {
                                    b = v.parse(b, t)
                                };
                                v.set(b, t);
                                if (f && !h) {
                                    h = v.hasChanged(m)
                                };
                            }
                            l[v.cid] || (l[v.cid] = !0, s.push(v));
                            e[g] = v;
                        } else if (c) {
                            i = e[g] = this._prepareModel(i, t), i && (a.push(i), this._addReference(i, t), 
                            l[i.cid] = !0, s.push(i))
                        };
                    }
                    if (d) {
                        for (g = 0; g < this.length; g++) {
                            i = this.models[g];
                            l[i.cid] || u.push(i);
                        }
                        if (u.length) {
                            this._removeModels(u, t)
                        };
                    }
                    var y = !1, _ = !f && c && d;
                    s.length && _ ? (y = this.length != s.length || n.some(this.models, function(e, t) {
                        return e !== s[t];
                    }), this.models.length = 0, C(this.models, s, 0), this.length = this.models.length) : a.length && (f && (h = !0), 
                    C(this.models, a, o == null ? this.length : o), this.length = this.models.length);
                    if (h) {
                        this.sort({
                            silent: !0
                        })
                    };
                    if (!t.silent) {
                        for (g = 0; g < a.length; g++) {
                            if (o != null) {
                                t.index = o + g
                            };
                            i = a[g];
                            i.trigger("add", i, this, t);
                        }
                        if (h || y) {
                            this.trigger("sort", this, t)
                        };
                        if (a.length || u.length) {
                            this.trigger("update", this, t)
                        };
                    }
                    if (r) {
                        return e[0];
                    }
                    return e;
                }
            },
            reset: function(e, t) {
                t = t ? n.clone(t) : {};
                for (var r = 0; r < this.models.length; r++) {
                    this._removeReference(this.models[r], t);
                }
                t.previousModels = this.models;
                this._reset();
                e = this.add(e, n.extend({
                    silent: !0
                }, t));
                t.silent || this.trigger("reset", this, t);
                return e;
            },
            push: function(e, t) {
                return this.add(e, n.extend({
                    at: this.length
                }, t));
            },
            pop: function(e) {
                var t = this.at(this.length - 1);
                return this.remove(t, e);
            },
            unshift: function(e, t) {
                return this.add(e, n.extend({
                    at: 0
                }, t));
            },
            shift: function(e) {
                var t = this.at(0);
                return this.remove(t, e);
            },
            slice: function() {
                return i.apply(this.models, arguments);
            },
            get: function(e) {
                if (e == null) {
                    return void 0;
                }
                var t = this.modelId(this._isModel(e) ? e.attributes : e);
                return this._byId[e] || this._byId[t] || this._byId[e.cid];
            },
            at: function(e) {
                if (e < 0) {
                    e += this.length
                };
                return this.models[e];
            },
            where: function(e, t) {
                return this[t ? "find" : "filter"](e);
            },
            findWhere: function(e) {
                return this.where(e, !0);
            },
            sort: function(e) {
                var t = this.comparator;
                if (!t) {
                    throw new Error("Cannot sort a set without a comparator");
                }
                e || (e = {});
                var r = t.length;
                if (n.isFunction(t)) {
                    t = n.bind(t, this)
                };
                r === 1 || n.isString(t) ? this.models = this.sortBy(t) : this.models.sort(t);
                e.silent || this.trigger("sort", this, e);
                return this;
            },
            pluck: function(e) {
                return n.invoke(this.models, "get", e);
            },
            fetch: function(e) {
                e = n.extend({
                    parse: !0
                }, e);
                var t = e.success, r = this;
                e.success = function(n) {
                    var o = e.reset ? "reset" : "set";
                    r[o](n, e);
                    if (t) {
                        t.call(e.context, r, n, e)
                    };
                    r.trigger("sync", r, n, e);
                };
                U(this, e);
                return this.sync("read", this, e);
            },
            create: function(e, t) {
                t = t ? n.clone(t) : {};
                var r = t.wait;
                e = this._prepareModel(e, t);
                if (!e) {
                    return !1;
                }
                r || this.add(e, t);
                var o = this, i = t.success;
                t.success = function(e, t, n) {
                    if (r) {
                        o.add(e, n)
                    };
                    if (i) {
                        i.call(n.context, e, t, n)
                    };
                };
                e.save(null, t);
                return e;
            },
            parse: function(e, t) {
                return e;
            },
            clone: function() {
                return new this.constructor(this.models, {
                    model: this.model,
                    comparator: this.comparator
                });
            },
            modelId: function(e) {
                return e[this.model.prototype.idAttribute || "id"];
            },
            _reset: function() {
                this.length = 0;
                this.models = [];
                this._byId = {};
            },
            _prepareModel: function(e, t) {
                if (this._isModel(e)) {
                    e.collection || (e.collection = this);
                    return e;
                }
                t = t ? n.clone(t) : {};
                t.collection = this;
                var r = new this.model(e, t);
                if (r.validationError) {
                    this.trigger("invalid", this, r.validationError, t);
                    return !1;
                }
                return r;
            },
            _removeModels: function(e, t) {
                for (var n = [], r = 0; r < e.length; r++) {
                    var o = this.get(e[r]);
                    if (o) {
                        var i = this.indexOf(o);
                        this.models.splice(i, 1);
                        this.length--;
                        t.silent || (t.index = i, o.trigger("remove", o, this, t));
                        n.push(o);
                        this._removeReference(o, t);
                    }
                }
                if (n.length) {
                    return n;
                }
                return !1;
            },
            _isModel: function(e) {
                return e instanceof y;
            },
            _addReference: function(e, t) {
                this._byId[e.cid] = e;
                var n = this.modelId(e.attributes);
                if (n != null) {
                    this._byId[n] = e
                };
                e.on("all", this._onModelEvent, this);
            },
            _removeReference: function(e, t) {
                delete this._byId[e.cid];
                var n = this.modelId(e.attributes);
                if (n != null) {
                    delete this._byId[n]
                };
                if (this === e.collection) {
                    delete e.collection
                };
                e.off("all", this._onModelEvent, this);
            },
            _onModelEvent: function(e, t, n, r) {
                if ("add" !== e && "remove" !== e || n === this) {
                    if (e === "destroy") {
                        this.remove(t, r)
                    };
                    if (e === "change") {
                        var o = this.modelId(t.previousAttributes()), i = this.modelId(t.attributes);
                        if (o !== i) {
                            o != null && delete this._byId[o], i != null && (this._byId[i] = t)
                        };
                    }
                    this.trigger.apply(this, arguments);
                }
            }
        });
        var E = {
            forEach: 3,
            each: 3,
            map: 3,
            collect: 3,
            reduce: 4,
            foldl: 4,
            inject: 4,
            reduceRight: 4,
            foldr: 4,
            find: 3,
            detect: 3,
            filter: 3,
            select: 3,
            reject: 3,
            every: 3,
            all: 3,
            some: 3,
            any: 3,
            include: 3,
            includes: 3,
            contains: 3,
            invoke: 0,
            max: 3,
            min: 3,
            toArray: 1,
            size: 1,
            first: 3,
            head: 3,
            take: 3,
            initial: 3,
            rest: 3,
            tail: 3,
            drop: 3,
            last: 3,
            without: 0,
            difference: 0,
            indexOf: 3,
            shuffle: 1,
            lastIndexOf: 3,
            isEmpty: 1,
            chain: 1,
            sample: 3,
            partition: 3,
            groupBy: 3,
            countBy: 3,
            sortBy: 3,
            indexBy: 3
        };
        a(w, E, "models");
        var T = t.View = function(e) {
            this.cid = n.uniqueId("view");
            n.extend(this, n.pick(e, D));
            this._ensureElement();
            this.initialize.apply(this, arguments);
        }, S = /^(\S+)\s*(.*)$/, D = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
        n.extend(T.prototype, c, {
            tagName: "div",
            $: function(e) {
                return this.$el.find(e);
            },
            initialize: function() {},
            render: function() {
                return this;
            },
            remove: function() {
                this._removeElement();
                this.stopListening();
                return this;
            },
            _removeElement: function() {
                this.$el.remove();
            },
            setElement: function(e) {
                this.undelegateEvents();
                this._setElement(e);
                this.delegateEvents();
                return this;
            },
            _setElement: function(e) {
                this.$el = e instanceof t.$ ? e : t.$(e);
                this.el = this.$el[0];
            },
            delegateEvents: function(e) {
                e || (e = n.result(this, "events"));
                if (!e) {
                    return this;
                }
                this.undelegateEvents();
                for (var t in e) {
                    var r = e[t];
                    n.isFunction(r) || (r = this[r]);
                    if (r) {
                        var o = t.match(S);
                        this.delegate(o[1], o[2], n.bind(r, this));
                    }
                }
                return this;
            },
            delegate: function(e, t, n) {
                this.$el.on(e + ".delegateEvents" + this.cid, t, n);
                return this;
            },
            undelegateEvents: function() {
                if (this.$el) {
                    this.$el.off(".delegateEvents" + this.cid)
                };
                return this;
            },
            undelegate: function(e, t, n) {
                this.$el.off(e + ".delegateEvents" + this.cid, t, n);
                return this;
            },
            _createElement: function(e) {
                return document.createElement(e);
            },
            _ensureElement: function() {
                if (this.el) {
                    this.setElement(n.result(this, "el"));
                } else {
                    var e = n.extend({}, n.result(this, "attributes"));
                    if (this.id) {
                        e.id = n.result(this, "id")
                    };
                    if (this.className) {
                        e["class"] = n.result(this, "className")
                    };
                    this.setElement(this._createElement(n.result(this, "tagName")));
                    this._setAttributes(e);
                }
            },
            _setAttributes: function(e) {
                this.$el.attr(e);
            }
        });
        t.sync = function(e, r, o) {
            var i = A[e];
            n.defaults(o || (o = {}), {
                emulateHTTP: t.emulateHTTP,
                emulateJSON: t.emulateJSON
            });
            var s = {
                type: i,
                dataType: "json"
            };
            o.url || (s.url = n.result(r, "url") || $());
            o.data != null || !r || "create" !== e && "update" !== e && "patch" !== e || (s.contentType = "application/json", 
            s.data = JSON.stringify(o.attrs || r.toJSON(o)));
            if (o.emulateJSON) {
                s.contentType = "application/x-www-form-urlencoded", s.data = s.data ? {
                    model: s.data
                } : {}
            };
            if (o.emulateHTTP && (i === "PUT" || i === "DELETE" || i === "PATCH")) {
                s.type = "POST";
                if (o.emulateJSON) {
                    s.data._method = i
                };
                var a = o.beforeSend;
                o.beforeSend = function(e) {
                    e.setRequestHeader("X-HTTP-Method-Override", i);
                    if (a) {
                        return a.apply(this, arguments);
                    }
                    return;
                };
            }
            s.type === "GET" || o.emulateJSON || (s.processData = !1);
            var u = o.error;
            o.error = function(e, t, n) {
                o.textStatus = t;
                o.errorThrown = n;
                if (u) {
                    u.call(o.context, e, t, n)
                };
            };
            var l = o.xhr = t.ajax(n.extend(s, o));
            r.trigger("request", r, l, o);
            return l;
        };
        var A = {
            create: "POST",
            update: "PUT",
            patch: "PATCH",
            delete: "DELETE",
            read: "GET"
        };
        t.ajax = function() {
            return t.$.ajax.apply(t.$, arguments);
        };
        var M = t.Router = function(e) {
            e || (e = {});
            if (e.routes) {
                this.routes = e.routes
            };
            this._bindRoutes();
            this.initialize.apply(this, arguments);
        }, F = /\((.*?)\)/g, N = /(\(\?)?:\w+/g, O = /\*\w+/g, I = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        n.extend(M.prototype, c, {
            initialize: function() {},
            route: function(e, r, o) {
                n.isRegExp(e) || (e = this._routeToRegExp(e));
                if (n.isFunction(r)) {
                    o = r, r = ""
                };
                o || (o = this[r]);
                var i = this;
                t.history.route(e, function(n) {
                    var s = i._extractParameters(e, n);
                    if (i.execute(o, s, r) !== !1) {
                        i.trigger.apply(i, [ "route:" + r ].concat(s)), i.trigger("route", r, s), t.history.trigger("route", i, r, s)
                    };
                });
                return this;
            },
            execute: function(e, t, n) {
                if (e) {
                    e.apply(this, t)
                };
            },
            navigate: function(e, n) {
                t.history.navigate(e, n);
                return this;
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = n.result(this, "routes");
                    for (var e, t = n.keys(this.routes); (e = t.pop()) != null; ) {
                        this.route(e, this.routes[e]);
                    }
                }
            },
            _routeToRegExp: function(e) {
                e = e.replace(I, "\\$&").replace(F, "(?:$1)?").replace(N, function(e, t) {
                    if (t) {
                        return e;
                    }
                    return "([^/?]+)";
                }).replace(O, "([^?]*?)");
                return new RegExp("^" + e + "(?:\\?([\\s\\S]*))?$");
            },
            _extractParameters: function(e, t) {
                var r = e.exec(t).slice(1);
                return n.map(r, function(e, t) {
                    if (t === r.length - 1) {
                        return e || null;
                    }
                    if (e) {
                        return decodeURIComponent(e);
                    }
                    return null;
                });
            }
        });
        var P = t.History = function() {
            this.handlers = [];
            this.checkUrl = n.bind(this.checkUrl, this);
            if (typeof window != "undefined") {
                this.location = window.location, this.history = window.history
            };
        }, L = /^[#\/]|\s+$/g, R = /^\/+|\/+$/g, B = /#.*$/;
        P.started = !1;
        n.extend(P.prototype, c, {
            interval: 50,
            atRoot: function() {
                var e = this.location.pathname.replace(/[^\/]$/, "$&/");
                return e === this.root && !this.getSearch();
            },
            matchRoot: function() {
                var e = this.decodeFragment(this.location.pathname), t = e.slice(0, this.root.length - 1) + "/";
                return t === this.root;
            },
            decodeFragment: function(e) {
                return decodeURI(e.replace(/%25/g, "%2525"));
            },
            getSearch: function() {
                var e = this.location.href.replace(/#.*/, "").match(/\?.+/);
                if (e) {
                    return e[0];
                }
                return "";
            },
            getHash: function(e) {
                var t = (e || this).location.href.match(/#(.*)$/);
                if (t) {
                    return t[1];
                }
                return "";
            },
            getPath: function() {
                var e = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
                if (e.charAt(0) === "/") {
                    return e.slice(1);
                }
                return e;
            },
            getFragment: function(e) {
                if (e == null) {
                    e = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash()
                };
                return e.replace(L, "");
            },
            start: function(e) {
                if (P.started) {
                    throw new Error("Backbone.history has already been started");
                }
                P.started = !0;
                this.options = n.extend({
                    root: "/"
                }, this.options, e);
                this.root = this.options.root;
                this._wantsHashChange = this.options.hashChange !== !1;
                this._hasHashChange = "onhashchange" in window && (document.documentMode === void 0 || document.documentMode > 7);
                this._useHashChange = this._wantsHashChange && this._hasHashChange;
                this._wantsPushState = !!this.options.pushState;
                this._hasPushState = !(!this.history || !this.history.pushState);
                this._usePushState = this._wantsPushState && this._hasPushState;
                this.fragment = this.getFragment();
                this.root = ("/" + this.root + "/").replace(R, "/");
                if (this._wantsHashChange && this._wantsPushState) {
                    if (!this._hasPushState && !this.atRoot()) {
                        var t = this.root.slice(0, -1) || "/";
                        this.location.replace(t + "#" + this.getPath());
                        return !0;
                    }
                    if (this._hasPushState && this.atRoot()) {
                        this.navigate(this.getHash(), {
                            replace: !0
                        })
                    };
                }
                if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                    this.iframe = document.createElement("iframe");
                    this.iframe.src = "javascript:0";
                    this.iframe.style.display = "none";
                    this.iframe.tabIndex = -1;
                    var r = document.body, o = r.insertBefore(this.iframe, r.firstChild).contentWindow;
                    o.document.open();
                    o.document.close();
                    o.location.hash = "#" + this.fragment;
                }
                var i = window.addEventListener || function(e, t) {
                    return attachEvent("on" + e, t);
                };
                this._usePushState ? i("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe ? i("hashchange", this.checkUrl, !1) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval));
                if (this.options.silent) {
                    return void 0;
                }
                return this.loadUrl();
            },
            stop: function() {
                var e = window.removeEventListener || function(e, t) {
                    return detachEvent("on" + e, t);
                };
                this._usePushState ? e("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe && e("hashchange", this.checkUrl, !1);
                if (this.iframe) {
                    document.body.removeChild(this.iframe), this.iframe = null
                };
                if (this._checkUrlInterval) {
                    clearInterval(this._checkUrlInterval)
                };
                P.started = !1;
            },
            route: function(e, t) {
                this.handlers.unshift({
                    route: e,
                    callback: t
                });
            },
            checkUrl: function(e) {
                var t = this.getFragment();
                if (t === this.fragment && this.iframe) {
                    t = this.getHash(this.iframe.contentWindow)
                };
                if (t === this.fragment) {
                    return !1;
                }
                if (this.iframe) {
                    this.navigate(t)
                };
                return void this.loadUrl();
            },
            loadUrl: function(e) {
                if (this.matchRoot()) {
                    e = this.fragment = this.getFragment(e);
                    return n.some(this.handlers, function(t) {
                        if (t.route.test(e)) {
                            t.callback(e);
                            return !0;
                        }
                        return;
                    });
                }
                return !1;
            },
            navigate: function(e, t) {
                if (!P.started) {
                    return !1;
                }
                t && t !== !0 || (t = {
                    trigger: !!t
                });
                e = this.getFragment(e || "");
                var n = this.root;
                if (e === "" || e.charAt(0) === "?") {
                    n = n.slice(0, -1) || "/"
                };
                var r = n + e;
                e = this.decodeFragment(e.replace(B, ""));
                if (this.fragment !== e) {
                    this.fragment = e;
                    if (this._usePushState) {
                        this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, r);
                    } else {
                        if (!this._wantsHashChange) {
                            return this.location.assign(r);
                        }
                        this._updateHash(this.location, e, t.replace);
                        if (this.iframe && e !== this.getHash(this.iframe.contentWindow)) {
                            var o = this.iframe.contentWindow;
                            t.replace || (o.document.open(), o.document.close());
                            this._updateHash(o.location, e, t.replace);
                        }
                    }
                    if (t.trigger) {
                        return this.loadUrl(e);
                    }
                    return;
                }
            },
            _updateHash: function(e, t, n) {
                if (n) {
                    var r = e.href.replace(/(javascript:|#).*$/, "");
                    e.replace(r + "#" + t);
                } else e.hash = "#" + t;
            }
        });
        t.history = new P();
        var j = function(e, t) {
            var r, o = this;
            r = e && n.has(e, "constructor") ? e.constructor : function() {
                return o.apply(this, arguments);
            };
            n.extend(r, o, t);
            var i = function() {
                this.constructor = r;
            };
            i.prototype = o.prototype;
            r.prototype = new i();
            if (e) {
                n.extend(r.prototype, e)
            };
            r.__super__ = o.prototype;
            return r;
        };
        y.extend = w.extend = M.extend = T.extend = P.extend = j;
        var $ = function() {
            throw new Error('A "url" property or function must be specified');
        }, U = function(e, t) {
            var n = t.error;
            t.error = function(r) {
                if (n) {
                    n.call(t.context, e, r, t)
                };
                e.trigger("error", e, r, t);
            };
        };
        return t;
    });
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
