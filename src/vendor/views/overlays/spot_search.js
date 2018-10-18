var r, o, i, s = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (a.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, a = {}.hasOwnProperty;

r = React.createFactory(require("components/new_tab/new_tab_form"));

i = React.createFactory(require("components/spotlight_search/spotlight_search_header"));

o = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    s(t, e);
    t.prototype.id = "spot-search-overlay";
    t.prototype.className = "spot-search-overlay";
    t.prototype.events = {
        "click .close": "close"
    };
    t.prototype.initialize = function(e) {
        this.options = e;
        return t.__super__.initialize.call(this, _.extend(this.options, {
            topAligned: true
        }));
    };
    t.prototype.onDetach = function() {
        this.destructor();
        return this.remove();
    };
    t.prototype.unmount = function() {
        return this.destroyComponents();
    };
    t.prototype.destructor = function(e) {
        var n, r;
        t.__super__.destructor.call(this, e);
        if ((n = this.users) != null) {
            n.cleanup()
        };
        if ((r = this.flows) != null) {
            r.cleanup()
        };
        return this.flows = this.users;
    };
    t.prototype.onAttach = function() {
        var e, t, n;
        e = new Models.TabSearch(Flowdock.app.allFlows(), {
            threshold: .15,
            fields: [ "name", "description", "organization.name" ]
        });
        n = new Models.TabSearch(new Collections.Users(), {
            threshold: .2,
            fields: [ "email", "name", "nick" ]
        });
        t = r({
            privates: Flowdock.app.privates,
            flows: e,
            users: n,
            header: i,
            isShortcutKeyUsed: this.options.isShortcutKeyUsed,
            shouldShowTabs: false,
            onResultClick: function(e) {
                return function() {
                    return e.close(null, true);
                };
            }(this)
        });
        this.component(this.el, t);
        n.fetch();
        return e.fetch({
            embedded: false
        });
    };
    t.prototype.close = function(e, n) {
        if (n == null) {
            n = false
        };
        t.__super__.close.call(this, e);
        if (n) {
            return undefined;
        }
        return Flowdock.app.router.activatePrevious();
    };
    return t;
}(Views.Shared.Overlay);

module.exports = o;
