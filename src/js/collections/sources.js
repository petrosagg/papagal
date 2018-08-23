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

Collections.Sources = function(e) {
    function Sources() {
        return Sources.__super__.constructor.apply(this, arguments);
    }
    r(Sources, e);
    Sources.prototype.model = Models.Source;
    Sources.prototype.comparator = function(e) {
        var t;
        if ((t = e.get("application")) != null) {
            return t.name;
        }
        return;
    };
    Sources.prototype.url = function() {
        return this.flow.url() + "/sources";
    };
    Sources.prototype.hasErrors = function() {
        return !!this.find(function(e) {
            return e.get("error_message");
        });
    };
    Sources.prototype.consume = function(e) {
        this.addStream(e.filter(function(e) {
            return e.event === "source-add";
        }).onValue(function(e) {
            return function(t) {
                return e.add(t.content);
            };
        }(this)));
        this.addStream(e.filter(function(e) {
            return e.event === "source-update";
        }).onValue(function(e) {
            return function(t) {
                var n;
                if ((n = e.get(t.content.id)) != null) {
                    return n.set(t.content);
                }
                return;
            };
        }(this)));
        return this.addStream(e.filter(function(e) {
            return e.event === "source-remove";
        }).onValue(function(e) {
            return function(t) {
                return e.remove(t.content.id);
            };
        }(this)));
    };
    return Sources;
}(Flowdock.Collection);
