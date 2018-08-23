var r = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (o.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, o = {}.hasOwnProperty;

Models.LegacySource = function(e) {
    function LegacySource() {
        return LegacySource.__super__.constructor.apply(this, arguments);
    }
    r(LegacySource, e);
    LegacySource.prototype.initialize = function(e, n) {
        if (e == null) {
            e = {}
        };
        if (n == null) {
            n = {}
        };
        this.flow = n.flow;
        return LegacySource.__super__.initialize.apply(this, arguments);
    };
    LegacySource.prototype.url = function() {
        var e;
        if (this.get("url")) {
            return Helpers.apiUrl(this.get("url"));
        }
        return ((e = this.flow) != null ? e.url() : void 0) + "/legacy_sources";
    };
    LegacySource.prototype.setConfig = function(e, t) {
        var n, r;
        n = this.get("config");
        r = {};
        r[e] = t;
        return this.get("config").set(_.extend({}, this.get("config"), r));
    };
    LegacySource.prototype.getConfig = function(e) {
        return this.get("config")[e];
    };
    LegacySource.prototype.displayName = function() {
        switch (this.get("type")) {
          case "twitter_user":
            return this.getConfig("name");

          case "twitter_keyword":
            return this.getConfig("param");
        }
    };
    return LegacySource;
}(Backbone.Model);
