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

Collections.Applications = function(e) {
    function Applications() {
        return Applications.__super__.constructor.apply(this, arguments);
    }
    r(Applications, e);
    Applications.prototype.url = "/rest/applications/published";
    Applications.prototype.comparator = "name";
    Applications.prototype.initialize = function(e, t) {
        this.sources = t.sources;
        this.listenTo(this.sources, "add", this.addFromSource);
        return this.listenTo(this.sources, "remove", this.deleteLastApplication);
    };
    Applications.prototype.addFromSource = function(e) {
        if (e.get("application").published) {
            return void 0;
        }
        return this.add(e.get("application"));
    };
    Applications.prototype.deleteLastApplication = function(e) {
        var t;
        t = this.sources.find(function(t) {
            return t.get("application").id === e.get("application").id;
        });
        if (t == null) {
            return this.remove(e.get("application").id);
        }
        return;
    };
    return Applications;
}(Flowdock.Collection);