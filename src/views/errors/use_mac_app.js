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

Views.Errors.UseMacApp = function(e) {
    function UseMacApp() {
        return UseMacApp.__super__.constructor.apply(this, arguments);
    }
    r(UseMacApp, e);
    UseMacApp.prototype.errorName = "use-mac-app";
    return UseMacApp;
}(Views.Errors.Inline);