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

Views.Thread.Title = function(t) {
    function Title() {
        return Title.__super__.constructor.apply(this, arguments);
    }
    r(Title, t);
    Title.prototype.icon = function() {
        return require("../../templates/threads/title_icon.mustache");
    };
    Title.prototype.iconAttributes = function() {
        var e, t, n;
        return ((e = this.model.get("source")) != null && (t = e.application) != null ? t.icon_url : undefined) || ((n = this.model.get("source")) != null ? n.icon : undefined);
    };
    Title.prototype.collapseTitle = function() {};
    return Title;
}(Views.Shared.Title);
