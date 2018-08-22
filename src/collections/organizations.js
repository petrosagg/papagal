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

Collections.Organizations = function(e) {
    function Organizations() {
        return Organizations.__super__.constructor.apply(this, arguments);
    }
    r(Organizations, e);
    Organizations.prototype.model = Models.Organization;
    Organizations.prototype.url = function() {
        return Helpers.apiUrl("/organizations?users=0");
    };
    Organizations.prototype.initialize = function() {
        Organizations.__super__.initialize.apply(this, arguments);
        this.ready = new $.Deferred();
        this.listenTo(this, "add", function(e) {
            e.updated = new Date().getTime();
            if (this.stream) {
                return e.consume(this.stream);
            }
            return;
        });
        return this.listenTo(this, "remove", function(e) {
            return e.cleanup();
        });
    };
    Organizations.prototype.fetch = function(e) {
        return Organizations.__super__.fetch.call(this, e).done(function(e) {
            return function() {
                return e.ready.resolve();
            };
        }(this)).fail(function(e) {
            return function() {
                return e.ready.reject();
            };
        }(this));
    };
    Organizations.prototype.active = function() {
        return this.where({
            active: !0
        });
    };
    Organizations.prototype.consume = function(e) {
        this.stream = e;
        return this.each(function(e) {
            return function(t) {
                return t.consume(e.stream);
            };
        }(this));
    };
    Organizations.prototype.cleanup = function() {
        this.each(function(e) {
            return e.cleanup();
        });
        return Organizations.__super__.cleanup.apply(this, arguments);
    };
    return Organizations;
}(Flowdock.Collection);