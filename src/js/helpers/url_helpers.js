_.extend(Helpers, {
    absoluteUrlFor: function(e) {
        return window.location.protocol + "//" + window.location.host + Helpers.urlFor(e);
    },
    urlFor: function(e) {
        return "" + window.Router.root + Helpers.pathFor(e);
    },
    pathFor: function(e) {
        switch (null == e && (e = {}), !1) {
          case !e.flow:
            return this._flowPath(e);

          case !e["private"]:
            return this._privatePath(e);

          case !e.createFlow:
            return this._createFlowPath(e);

          case !e.createOrganization:
            return "create-organization";

          case !e.showNewTab:
            return "new-tab";

          case !e.newPrivateDialog:
            return "new-1-to-1";

          case !e.renameFlow:
            return "";

          default:
            return "";
        }
    },
    _flowPath: function(e) {
        var t, n;
        if (e == null) {
            e = {}
        };
        n = e.flow.path ? e.flow.path() : e.flow;
        n += e.users ? "/users" : e.thread ? "/threads/" + e.thread : e.message && (typeof (t = e.message).get == "function" ? t.get("thread_id") : void 0) ? "/threads/" + e.message.get("thread_id") : e.message ? "/messages/" + (e.message.id || e.message) : e.renameFlow ? "/rename" : "";
        return n += e.filter ? "" + e.filter.queryString(e.flow) : "";
    },
    _privatePath: function(e) {
        if (e == null) {
            e = {}
        };
        if (e["private"].id) {
            return "private/" + e["private"].id;
        }
        return "private/" + e["private"];
    },
    _createFlowPath: function(e) {
        if (e == null) {
            e = {}
        };
        if (e.organization) {
            return "create-flow/" + e.organization;
        }
        return "create-flow";
    },
    assetPath: function(e) {
        return Flowdock.assetHost + (e[0] === "/" ? e : "/" + e);
    },
    apiUrl: function(e) {
        var t;
        t = Helpers.url.stripHost(e);
        if (t.indexOf("/rest") === 0) {
            return t;
        }
        return "/rest" + t;
    },
    url: {
        stripHost: function(e) {
            var t, n;
            t = document.createElement("a");
            t.href = e;
            n = t.pathname.indexOf("/") === 0 ? "" : "/";
            return n + t.pathname + t.search + t.hash;
        },
        parseHostname: function(e) {
            var t;
            t = document.createElement("a");
            t.href = e;
            return t.hostname;
        }
    },
    generateQuery: function(e, t) {
        var n, r, o;
        if (t == null) {
            t = {}
        };
        t = _.extend({
            showEmpty: !0
        }, t);
        r = "";
        for (n in e) {
            o = e[n];
            if (r.length > 0) {
                r += "&"
            };
            if (t.showEmpty || o != null && (o != null ? o.length : void 0) > 0) {
                r += Helpers.urlEncode(n) + "=" + Helpers.encodeValue(o)
            };
        }
        if (r.length > 0) {
            return "?" + r;
        }
        return "";
    },
    encodeValue: function(e) {
        return Helpers.urlEncode(e).replace(/%40/g, "@").replace(/%2C/g, ",");
    },
    parseQuery: function(e) {
        var t;
        if (e.length === 0) {
            return {};
        }
        t = {};
        if (e[0] === "?") {
            e = e.slice(1)
        };
        _.each(e.split("&"), function(e) {
            var n, r, o;
            r = e.split("=", 2);
            n = r[0];
            o = r[1];
            if (n != null && o != null) {
                return t[Helpers.urlDecode(n)] = Helpers.urlDecode(o);
            }
            return;
        });
        return t;
    }
});
