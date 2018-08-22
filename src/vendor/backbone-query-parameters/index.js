!function(r, o) {
    typeof exports == "object" && r.require ? module.exports = o(require("underscore"), require("backbone")) : typeof define == "function" && define.amd ? define([ "underscore", "backbone" ], function(e, t) {
        return o(e || r._, t || r.Backbone);
    }) : o(_, Backbone);
}(this, function(e, t) {
    function n(r, o) {
        function i(e) {
            return String(e).replace(s, encodeURIComponent(s));
        }
        var s = t.Router.arrayValueSplit;
        if (!r) {
            return "";
        }
        o = o || "";
        var a = [];
        e.each(r, function(t, r) {
            r = o + r
            if (e.isString(t) || e.isNumber(t) || e.isBoolean(t) || e.isDate(t)) {
                if (t != null) {
                    a.push(r + "=" + i(encodeURIComponent(t)))
                };
            } else if (e.isArray(t)) {
                for (var u = "", l = 0; l < t.length; l++) {
                    var c = t[l];
                    if (c != null) {
                        u += s + i(c)
                    };
                }
                if (u) {
                    a.push(r + "=" + u)
                };
            } else {
                var p = n(t, r + ".");
                if (p) {
                    a.push(p)
                };
            }
        });
        return a.join("&");
    }
    function r(e) {
        try {
            return decodeURIComponent(e.replace(/\+/g, " "));
        } catch (t) {
            return e;
        }
    }
    function o(t, n) {
        var r = t.split("&");
        e.each(r, function(e) {
            var t = e.split("=");
            n(t.shift(), t.join("="));
        });
    }
    var i = /^\?(.*)/, s = /\((.*?)\)/g, a = /(\(\?)?:\w+/g, u = /\*\w+/g, l = /[\-{}\[\]+?.,\\\^$|#\s]/g, c = /^([^\?]*)/, p = /[\:\*]([^\:\?\/]+)/g, d = /^[#\/]|\s+$/g, h = /\/$/;
    t.Router.arrayValueSplit = "|";
    e.extend(t.History.prototype, {
        getFragment: function(e, t) {
            if (e == null) {
                if (this._hasPushState || !this._wantsHashChange || t) {
                    e = this.location.pathname;
                    var n = this.root.replace(h, ""), r = this.location.search;
                    e.indexOf(n) || (e = e.substr(n.length));
                    if (r && this._hasPushState) {
                        e += r
                    };
                } else e = this.getHash();
            }
            return e.replace(d, "");
        },
        getQueryParameters: function(t, n) {
            t = this.getFragment(t, n);
            var s = t.replace(c, ""), a = s.match(i);
            if (a) {
                s = a[1];
                var u = {};
                o(s, function(t, n) {
                    n = r(n);
                    u[t] ? e.isString(u[t]) ? u[t] = [ u[t], n ] : u[t].push(n) : u[t] = n;
                });
                return u;
            }
            return {};
        }
    });
    e.extend(t.Router.prototype, {
        initialize: function(e) {
            this.encodedSplatParts = e && e.encodedSplatParts;
        },
        _routeToRegExp: function(t) {
            var n = u.exec(t) || {
                index: -1
            }, r = a.exec(t) || {
                index: -1
            }, o = t.match(p) || [];
            t = t.replace(l, "\\$&").replace(s, "(?:$1)?").replace(a, function(e, t) {
                if (t) {
                    return e;
                }
                return "([^\\/\\?]+)";
            }).replace(u, "([^??]*?)");
            t += "(\\?.*)?";
            var i = new RegExp("^" + t + "$");
            if (n.index >= 0) {
                r >= 0 ? i.splatMatch = n.index - r.index : i.splatMatch = -1
            };
            i.paramNames = e.map(o, function(e) {
                return e.substring(1);
            });
            i.namedParameters = this.namedParameters;
            return i;
        },
        _extractParameters: function(n, s) {
            var a = n.exec(s).slice(1), u = {};
            if (a.length > 0 && e.isUndefined(a[a.length - 1])) {
                a.splice(a.length - 1, 1)
            };
            var l = a.length && a[a.length - 1] && a[a.length - 1].match(i);
            if (l) {
                var c = l[1], p = {};
                if (c) {
                    var d = this;
                    o(c, function(e, t) {
                        d._setParamValue(e, t, p);
                    });
                }
                a[a.length - 1] = p;
                e.extend(u, p);
            }
            var h = a.length;
            if (n.splatMatch && this.encodedSplatParts) {
                if (n.splatMatch < 0) {
                    return a;
                }
                h -= 1;
            }
            for (var f = 0; h > f; f++) {
                if (e.isString(a[f])) {
                    a[f] = r(a[f]), n.paramNames && n.paramNames.length >= f - 1 && (u[n.paramNames[f]] = a[f])
                };
            }
            if (t.Router.namedParameters || n.namedParameters) {
                return [ u ];
            }
            return a;
        },
        _setParamValue: function(e, t, n) {
            e = e.replace("[]", "");
            e = e.replace("%5B%5D", "");
            for (var r = e.split("."), o = n, i = 0; i < r.length; i++) {
                var s = r[i];
                i === r.length - 1 ? o[s] = this._decodeParamValue(t, o[s]) : o = o[s] = o[s] || {};
            }
        },
        _decodeParamValue: function(n, o) {
            var i = t.Router.arrayValueSplit;
            if (i && n.indexOf(i) >= 0) {
                for (var s = n.split(i), a = s.length - 1; a >= 0; a--) {
                    s[a] ? s[a] = r(s[a]) : s.splice(a, 1);
                }
                return s;
            }
            n = r(n);
            if (o) {
                if (e.isArray(o)) {
                    o.push(n);
                    return o;
                }
                return [ o, n ];
            }
            return n;
        },
        toFragment: function(t, r) {
            if (r) {
                e.isString(r) || (r = n(r)), r && (t += "?" + r)
            };
            return t;
        }
    });
});