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

o = React.createFactory(require("components/new_tab/new_tab_form"));

i = React.createFactory(require("components/new_tab/new_tab_header"));

r = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    s(t, e);
    t.prototype.className = "flow new-tab";
    t.prototype.initialize = function(e) {
        this.options = e;
        t.__super__.initialize.apply(this, arguments);
        return this.untilEnd($(document).asEventStream("keydown")).filter(KeyEvent.is("esc")).onValue(function() {
            return Flowdock.app.router.activatePrevious();
        });
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
        t = o({
            privates: this.options.privates,
            flows: e,
            users: n,
            header: i,
            shouldShowTabs: true
        });
        this.component(this.el, t);
        n.fetch();
        return e.fetch({
            embedded: false
        });
    };
    return t;
}(Flowdock.HierarchicalView);

module.exports = r;
